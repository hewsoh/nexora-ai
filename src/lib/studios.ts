/**
 * The single source of truth for NEXORA's studios and tools.
 *
 * Every page, the dashboard, the pricing copy and the credit logic all read
 * from here. If a tool is listed `live`, it must actually work — never list a
 * tool as live to fill out the grid.
 */

export type ToolStatus = "live" | "coming";

export type StudioId =
  | "business"
  | "creator"
  | "career"
  | "fitness"
  | "gaming"
  | "everyday";

export interface Tool {
  slug: string;
  name: string;
  studio: StudioId;
  blurb: string;
  status: ToolStatus;
}

export interface Studio {
  id: StudioId;
  name: string;
  tagline: string;
  /** Credits charged per generation. Set from measured token cost, not vibes. */
  creditCost: number;
  status: ToolStatus;
  tools: Tool[];
}

export const STUDIOS: Studio[] = [
  {
    id: "business",
    name: "Business Studio",
    tagline: "Turn an idea into a launch you can start on Monday.",
    creditCost: 2,
    status: "live",
    tools: [
      {
        slug: "launch-plan",
        name: "Launch Plan Generator",
        studio: "business",
        blurb:
          "Describe your idea, budget and hours. Get a 90-day plan with numbered weekly tasks and a cost breakdown.",
        status: "live",
      },
    ],
  },
  {
    id: "career",
    name: "Career Studio",
    tagline: "Applications that get read, and interviews you walk into ready.",
    creditCost: 2,
    status: "live",
    tools: [
      {
        slug: "resume-builder",
        name: "Resume Builder",
        studio: "career",
        blurb:
          "Paste your resume and the job ad. Get rewritten bullet points, a gap analysis and likely interview questions.",
        status: "live",
      },
      {
        slug: "interview-prep",
        name: "Interview Prep",
        studio: "career",
        blurb:
          "Role, seniority and company type in. Tailored questions, STAR answer scaffolds and questions to ask them, out.",
        status: "live",
      },
    ],
  },
  {
    id: "creator",
    name: "Creator Studio",
    tagline: "A publishing plan you can actually keep up with.",
    creditCost: 2,
    status: "coming",
    tools: [],
  },
  {
    id: "fitness",
    name: "Fitness Studio",
    tagline: "General training structure and progress tracking.",
    creditCost: 2,
    status: "coming",
    tools: [],
  },
  {
    id: "gaming",
    name: "Gaming Studio",
    tagline: "Practice routines built from your own gameplay notes.",
    creditCost: 2,
    status: "coming",
    tools: [],
  },
  {
    id: "everyday",
    name: "Everyday Studio",
    tagline: "Plan it, compare it, get it out of your head.",
    creditCost: 1,
    status: "coming",
    tools: [],
  },
];

export const LIVE_STUDIOS = STUDIOS.filter((s) => s.status === "live");

export const TOOL_COUNT_LIVE = LIVE_STUDIOS.reduce(
  (n, s) => n + s.tools.filter((t) => t.status === "live").length,
  0
);

export interface Tier {
  id: "free" | "plus" | "pro";
  name: string;
  priceAud: number;
  credits: number;
  blurb: string;
  features: string[];
  highlight?: boolean;
}

/**
 * Credit limits are set generously on purpose. A generation costs roughly
 * $0.001 in API spend, so the limit exists to stop abuse and to give the free
 * tier a ceiling — not to ration something scarce.
 */
export const TIERS: Tier[] = [
  {
    id: "free",
    name: "Free",
    priceAud: 0,
    credits: 15,
    blurb: "Enough to use all three tools properly.",
    features: [
      "15 credits every month",
      "All three live tools",
      "Saved project history",
      "Download your results",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    priceAud: 12.99,
    credits: 150,
    blurb: "For using NEXORA through a job hunt or a launch.",
    highlight: true,
    features: [
      "150 credits every month",
      "All three live tools",
      "Unlimited saved projects",
      "Priority generation speed",
      "Early access to new studios",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    priceAud: 24.99,
    credits: 500,
    blurb: "For running several things at once.",
    features: [
      "500 credits every month",
      "Everything in Plus",
      "Commercial use of outputs",
      "Bulk resume tailoring",
      "Email support",
    ],
  },
];
