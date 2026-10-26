import { TIERS } from "@/lib/studios";

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Pricing</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tightest sm:text-4xl">
          Start free. Pay when it&apos;s earning its keep.
        </h2>
        <p className="mt-4 text-white/55">
          Credits are how we meter generation. A typical run costs 1–2 credits.
        </p>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-xl2 border p-7 ${
              tier.highlight
                ? "border-violet/40 bg-white/[0.06]"
                : "border-white/[0.08] bg-white/[0.03]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
              {tier.highlight && (
                <span className="rounded-full bg-violet/20 px-2.5 py-1 text-[11px] font-medium text-violet-soft">
                  Most popular
                </span>
              )}
            </div>

            <p className="mt-4 flex items-baseline gap-1.5">
              <span className="text-4xl font-semibold tracking-tightest">
                ${tier.priceAud.toFixed(2)}
              </span>
              <span className="text-sm text-white/45">AUD / month</span>
            </p>

            <p className="mt-2 text-sm text-white/50">{tier.blurb}</p>

            <ul className="mt-6 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-white/70">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet-soft" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={tier.id === "free" ? "/signup" : `/signup?plan=${tier.id}`}
              className={`mt-8 ${tier.highlight ? "btn-primary" : "btn-ghost"} w-full`}
            >
              {tier.id === "free" ? "Start free" : `Choose ${tier.name}`}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-white/35">
        Payments are not connected yet — the paid buttons lead to the sign-up page while we finish
        Stage 3.
      </p>
    </section>
  );
}
