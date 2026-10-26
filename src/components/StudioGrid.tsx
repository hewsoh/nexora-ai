import ToolCard from "./ToolCard";
import { STUDIOS } from "@/lib/studios";

export default function StudioGrid() {
  return (
    <section id="tools" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <div className="max-w-2xl">
        <p className="eyebrow">Tool discovery</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tightest sm:text-4xl">
          Six studios. Three shipping now.
        </h2>
        <p className="mt-4 text-white/55">
          Everything here produces a document you can use — a plan, a resume, a set of answers.
          The other three studios are labelled honestly while we build them.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STUDIOS.map((studio) => (
          <ToolCard
            key={studio.id}
            tool={
              studio.tools[0] ?? {
                slug: studio.id,
                name: studio.name,
                studio: studio.id,
                blurb: studio.tagline,
                status: studio.status,
              }
            }
            studioName={studio.name}
          />
        ))}
      </div>
    </section>
  );
}
