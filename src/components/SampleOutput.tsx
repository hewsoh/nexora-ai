import Link from "next/link";

/**
 * A real, fixed example of what the Launch Plan Generator returns. Hard-coded
 * on purpose: the homepage must never fabricate a live demo, and it also must
 * not wait on an API call to render. Replace this with a real saved generation
 * once the tool has user output worth showing.
 */
const PLAN = [
  {
    week: "Week 1",
    items: [
      "Write down 10 people you can ask about the problem this week",
      "Set up a one-page site with an email signup — nothing else",
      "Interview 3 of those 10; record what they already pay for",
    ],
  },
  {
    week: "Week 2",
    items: [
      "Build the smallest version that does one thing well",
      "Show it to the 3 people you interviewed",
      "Charge for it — even $10 — and note exactly who says no",
    ],
  },
  {
    week: "Week 3",
    items: [
      "Fix the one thing every user stumbled on",
      "Post one honest build update where your users already are",
      "Ask the people who paid what made them decide",
    ],
  },
];

export default function SampleOutput() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="eyebrow">See it work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tightest sm:text-4xl">
            It hands you the document, not a conversation.
          </h2>
          <p className="mt-4 text-white/55">
            You type your idea, your budget and how many hours a week you have. What comes back is
            a 90-day plan with numbered weekly tasks and a cost breakdown — something you can
            print, follow, and edit.
          </p>
          <p className="mt-4 text-white/55">
            This is a sample of the format the Launch Plan Generator produces.
          </p>
          <Link href="/tools/launch-plan" className="btn-primary mt-7">
            Try the Launch Plan Generator
          </Link>
        </div>

        <div className="glass overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-3 text-xs text-white/40">launch-plan.md</span>
          </div>

          <div className="space-y-5 p-6">
            {PLAN.map((block) => (
              <div key={block.week}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-violet-soft">
                  {block.week}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/70">
                      <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="pt-2 text-xs text-white/30">Weeks 4–13 continue in the same format.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
