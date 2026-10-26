import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

/**
 * Launch Plan Generator — API route.
 *
 * Server-side only. The API key is read from process.env on the server and is
 * never sent to the browser.
 *
 * Diagnostic build: upstream failures report the HTTP status from the AI
 * service so a misconfigured key can be told apart from a bad model name or a
 * billing problem. The upstream body is never passed on — it can contain
 * account details. Once the tool is confirmed working, tighten these messages.
 */

const MODEL = "claude-sonnet-4-5-20250929";

const SYSTEM_PROMPT = `You help someone turn a vague idea into a concrete 90-day launch plan.

Rules you must follow:
- Write like a blunt, practical advisor. No motivational filler.
- Every step must be a physical action someone can do in under two hours: "email 5 local dog groomers and ask what they charge", not "research the market".
- Use the person's stated budget and hours per week. Never plan work that exceeds their hours.
- If the idea is unrealistic for the budget, say so plainly in the "risks" field rather than padding the plan.
- Never invent statistics, market sizes, competitor names or customer counts. If you don't have a number, describe what they must go and find out.
- No emoji. No markdown inside the JSON strings.
- Return ONLY the JSON object described below, with no commentary before or after it.`;

const OUTPUT_SCHEMA = `{
  "summary": "2-3 sentences describing what they are building and the single most important thing to prove in 90 days",
  "weeks": [
    {
      "week": 1,
      "theme": "short label, e.g. 'Talk to five people'",
      "tasks": ["action", "action", "action"],
      "cost": "estimated cost in AUD for this week, e.g. '$0' or 'up to $40'",
      "proof": "what they will know by the end of this week that they didn't before"
    }
  ],
  "total_cost": "estimated total cost over 90 days in AUD, with a short breakdown",
  "first_three_steps": ["the first three things to do, in order"],
  "risks": ["blunt, specific risks based on their inputs"],
  "stop_signal": "the specific thing that, if it happens, means they should stop and change direction"
}`;

interface Body {
  idea?: string;
  budgetAud?: number | string;
  hoursPerWeek?: number | string;
  skills?: string;
  audience?: string;
}

/** Strip characters that break JSON or bloat token count. */
function clean(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").trim().slice(0, maxLength);
}

/** Turn an upstream HTTP status into something a non-developer can act on. */
function explainUpstream(status: number): string {
  if (status === 401)
    return "The AI service rejected the key (401). Check the key was pasted in full, with no spaces.";
  if (status === 403)
    return "The AI service refused access (403). The key may be revoked or lack permission.";
  if (status === 404)
    return "The AI model name wasn't recognised (404). This is a code setting, not your key.";
  if (status === 429)
    return "Too many requests or no credit left on the AI account (429). Check billing.";
  if (status === 529 || status === 503)
    return "The AI service is overloaded right now (503). Try again in a minute.";
  if (status === 400)
    return "The AI service rejected the request format (400). Tell the developer this status.";
  return `The AI service failed with status ${status}. Tell the developer this number.`;
}

export async function POST(request: NextRequest) {
  const limited = checkRateLimit(request);
  if (limited) return limited;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "The AI service is not configured yet." }, { status: 503 });
  }

  if (!apiKey.startsWith("sk-ant-") || apiKey.length < 40) {
    return NextResponse.json(
      {
        error: `The saved key doesn't look like a valid Anthropic key (length ${apiKey.length}, starts "${apiKey.slice(0, 6)}"). Re-paste it in Vercel.`,
      },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const idea = clean(body.idea, 1200);
  const budgetAud = Number(body.budgetAud);
  const hoursPerWeek = Number(body.hoursPerWeek);
  const skills = clean(body.skills, 600);
  const audience = clean(body.audience, 600);

  if (idea.length < 20) {
    return NextResponse.json(
      { error: "Describe your idea in at least a sentence or two." },
      { status: 400 }
    );
  }
  if (!Number.isFinite(budgetAud) || budgetAud < 0 || budgetAud > 100000) {
    return responseError("Enter a budget between 0 and 100,000 AUD.");
  }
  if (!Number.isFinite(hoursPerWeek) || hoursPerWeek < 1 || hoursPerWeek > 80) {
    return responseError("Hours per week needs to be between 1 and 80.");
  }

  const userPrompt = [
    `Idea: ${idea}`,
    `Budget available: $${budgetAud} AUD total`,
    `Time available: ${hoursPerWeek} hours per week`,
    `Skills I already have: ${skills || "not specified"}`,
    `Who I want to help: ${audience || "not specified"}`,
    "",
    "Build me a 13-week launch plan. A realistic one for this budget and these hours.",
  ].join("\n");

  let upstream: Response;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `${userPrompt}\n\nReturn JSON matching exactly this shape:\n${OUTPUT_SCHEMA}`,
          },
        ],
      }),
    });
  } catch (err) {
    console.error("fetch failed", err);
    return responseError("Couldn't reach the AI service. Try again.", 502);
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("Upstream error", upstream.status, detail.slice(0, 500));
    return responseError(explainUpstream(upstream.status), 502);
  }

  const payload = await upstream.json();
  const text: string =
    payload?.content?.find?.((block: { type: string }) => block.type === "text")?.text ?? "";

  const jsonText = extractJson(text);
  if (!jsonText) {
    console.error("Unparseable model output");
    return responseError("The plan came back malformed. Try again.", 502);
  }

  let plan: unknown;
  try {
    plan = JSON.parse(jsonText);
  } catch {
    console.error("JSON.parse failed");
    return responseError("The plan came back malformed. Try again.", 502);
  }

  return NextResponse.json({ plan });
}

function responseError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function extractJson(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced?.[1]) return fenced[1].trim();

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start !== -1 && end > start) return trimmed.slice(start, end + 1);

  return null;
}
