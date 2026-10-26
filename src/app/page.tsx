import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StudioGrid from "@/components/StudioGrid";
import SampleOutput from "@/components/SampleOutput";
import Pricing from "@/components/Pricing";
import Roadmap from "@/components/Roadmap";
import { TOOL_COUNT_LIVE } from "@/lib/studios";

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(124,92,255,0.22),transparent_70%)]"
          />

          <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 sm:pt-32">
            <span className="glass inline-flex items-center gap-2 px-3.5 py-1.5 text-xs text-white/60">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-electric" />
              {TOOL_COUNT_LIVE} tools live today
            </span>

            <h1 className="mt-7 max-w-3xl text-[2.6rem] font-semibold leading-[1.05] tracking-tightest sm:text-6xl">
              AI that finishes the job,
              <br />
              <span className="bg-gradient-to-r from-violet-soft to-electric bg-clip-text text-transparent">
                not another chat box.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/55">
              NEXORA turns what you type into a finished document — a 90-day launch plan, a
              rewritten resume, a full interview prep pack. Structure in. Something usable out.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="/signup" className="btn-primary">
                Start free — 15 credits
              </a>
              <a href="#tools" className="btn-ghost">
                See the tools
              </a>
            </div>

            <p className="mt-4 text-xs text-white/35">
              No card required. Ages 16+. Prices in AUD.
            </p>
          </div>
        </section>

        <StudioGrid />
        <SampleOutput />
        <Pricing />
        <Roadmap />
      </main>

      <Footer />
    </>
  );
}
