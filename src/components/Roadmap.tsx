import { COMING_STUDIOS } from "@/lib/studios";

const STAGES = [
  {
    stage: "Stage 1",
    title: "Brand and validation",
    detail: "Landing page live, domain and ABN sorted, first emails from real people.",
    active: true,
  },
  {
    stage: "Stage 2",
    title: "Three tools and accounts",
    detail:
      "Launch Plan, Resume Builder and Interview Prep working end to end, with login and history.",
    active: false,
  },
  {
    stage: "Stage 3",
    title: "Payments and beta",
    detail: "Stripe subscriptions live, 20–30 invited beta users, first paying customers.",
    active: false,
  },
  {
    stage: "Stage 4",
    title: "More tools and scaling",
    detail: `${COMING_STUDIOS.length} more studios, daily content, and SEO pages per tool.`,
    active: false,
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Roadmap</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tightest sm:text-4xl">
          Where this is going.
        </h2>
        <p className="mt-4 text-white/55">
          Published so you can hold us to it. Anything past Stage 1 does not work yet.
        </p>
      </div>

      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((s) => (
          <li
            key={s.stage}
            className={`rounded-xl2 border p-6 ${
              s.active ? "border-violet/35 bg-white/[0.05]" : "border-white/[0.07] bg-white/[0.02]"
            }`}
          >
            <span
              className={`text-xs font-medium uppercase tracking-[0.14em] ${
                s.active ? "text-violet-soft" : "text-white/30"
              }`}
            >
              {s.stage}
            </span>
            <h3 className="mt-3 font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/45">{s.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
