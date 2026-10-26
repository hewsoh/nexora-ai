"use client";

import { useState } from "react";

interface Week {
  week: number;
  theme: string;
  tasks: string[];
  cost: string;
  proof: string;
}

interface Plan {
  summary: string;
  weeks: Week[];
  total_cost: string;
  first_three_steps: string[];
  risks: string[];
  stop_signal: string;
}

export default function LaunchPlanForm() {
  const [idea, setIdea] = useState("");
  const [budgetAud, setBudgetAud] = useState("300");
  const [hoursPerWeek, setHoursPerWeek] = useState("10");
  const [skills, setSkills] = useState("");
  const [audience, setAudience] = useState("");

  const [result, setResult] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/tools/launch-plan", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          idea,
          budgetAud: Number(budgetAud),
          hoursPerWeek: Number(hoursPerWeek),
          skills,
          audience,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error ?? "Something went wrong. Try again.");
        return;
      }

      setResult(data.plan);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
      <form onSubmit={onSubmit} className="glass space-y-5 p-6">
        <div>
          <label htmlFor="idea" className="text-sm font-medium text-white/80">
            What&apos;s the idea?
          </label>
          <textarea
            id="idea"
            required
            minLength={20}
            maxLength={1200}
            rows={5}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="A dog-washing service for apartment buildings. I'd come to the building, wash dogs in the courtyard, charge per dog."
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/25 focus:border-violet/60 focus:outline-none"
          />
          <p className="mt-1 text-xs text-white/30">{idea.length}/1200</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="budget" className="text-sm font-medium text-white/80">
              Budget (AUD)
            </label>
            <input
              id="budget"
              type="number"
              min={0}
              max={100000}
              required
              value={budgetAud}
              onChange={(e) => setBudgetAud(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-violet/60 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="hours" className="text-sm font-medium text-white/80">
              Hours / week
            </label>
            <input
              id="hours"
              type="number"
              min={1}
              max={80}
              required
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white focus:border-violet/60 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="skills" className="text-sm font-medium text-white/80">
            Skills you already have <span className="text-white/30">(optional)</span>
          </label>
          <input
            id="skills"
            maxLength={600}
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Good with dogs, can drive, no design skills"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/25 focus:border-violet/60 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="audience" className="text-sm font-medium text-white/80">
            Who is it for? <span className="text-white/30">(optional)</span>
          </label>
          <input
            id="audience"
            maxLength={600}
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="Busy apartment dog owners in Brisbane"
            className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-white placeholder:text-white/25 focus:border-violet/60 focus:outline-none"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Building your plan…" : "Generate my 90-day plan"}
        </button>

        {error && (
          <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">
            {error}
          </p>
        )}
      </form>

      <div className="min-h-[300px]">
        {!result && !loading && (
          <div className="glass flex h-full min-h-[300px] flex-col items-center justify-center p-8 text-center">
            <p className="text-sm text-white/40">
              Fill in the form and your plan appears here.
            </p>
          </div>
        )}

        {loading && (
          <div className="glass flex h-full min-h-[300px] items-center justify-center p-8">
            <p className="text-sm text-white/40">Writing a plan around your budget and hours…</p>
          </div>
        )}

        {result && <PlanView plan={result} />}
      </div>
    </div>
  );
}

function PlanView({ plan }: { plan: Plan }) {
  return (
    <div className="space-y-5">
      <div className="glass p-6">
        <p className="eyebrow">The plan</p>
        <p className="mt-3 leading-relaxed text-white/75">{plan.summary}</p>
      </div>

      <div className="glass p-6">
        <p className="eyebrow">Do these first</p>
        <ol className="mt-3 space-y-2">
          {plan.first_three_steps?.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-white/75">
              <span className="shrink-0 font-mono text-violet-soft">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-3">
        {plan.weeks?.map((week) => (
          <div key={week.week} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold tracking-tight">
                Week {week.week} — {week.theme}
              </p>
              <span className="text-xs text-white/35">{week.cost}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {week.tasks?.map((task, i) => (
                <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-white/65">
                  <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                  {task}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-white/40">
              <span className="text-white/55">By Friday you&apos;ll know:</span> {week.proof}
            </p>
          </div>
        ))}
      </div>

      <div className="glass p-6">
        <p className="eyebrow">Total cost</p>
        <p className="mt-2 text-sm text-white/70">{plan.total_cost}</p>
      </div>

      <div className="glass p-6">
        <p className="eyebrow">Risks worth knowing</p>
        <ul className="mt-3 space-y-2">
          {plan.risks?.map((risk, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-white/70">
              <span className="shrink-0 text-amber-300/70">!</span>
              {risk}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.06] p-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-200/80">
          Stop signal
        </p>
        <p className="mt-2 text-sm text-white/70">{plan.stop_signal}</p>
      </div>
    </div>
  );
}
