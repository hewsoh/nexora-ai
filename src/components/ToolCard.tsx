import Link from "next/link";
import type { Tool } from "@/lib/studios";

interface Props {
  tool: Tool;
  studioName: string;
}

export default function ToolCard({ tool, studioName }: Props) {
  const live = tool.status === "live";

  const body = (
    <div
      className={`group flex h-full flex-col gap-3 rounded-xl2 border p-6 ${
        live
          ? "border-white/[0.08] bg-white/[0.04] transition-colors duration-200 ease-calm hover:border-violet/40 hover:bg-white/[0.07]"
          : "border-white/[0.05] bg-white/[0.02]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`text-xs font-medium uppercase tracking-[0.14em] ${
            live ? "text-violet-soft" : "text-white/30"
          }`}
        >
          {studioName}
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
            live ? "bg-violet/15 text-violet-soft" : "bg-white/[0.05] text-white/35"
          }`}
        >
          {live ? "Live" : "Coming soon"}
        </span>
      </div>

      <h3 className={`text-lg font-semibold tracking-tight ${live ? "" : "text-white/50"}`}>
        {tool.name}
      </h3>

      <p className={`text-sm leading-relaxed ${live ? "text-white/55" : "text-white/35"}`}>
        {tool.blurb}
      </p>

      {live && (
        <span className="mt-auto pt-2 text-sm font-medium text-violet-soft">
          Open tool
          <span className="ml-1 inline-block transition-transform duration-200 ease-calm group-hover:translate-x-0.5">
            →
          </span>
        </span>
      )}
    </div>
  );

  // A coming-soon card is never a link. It must not look clickable.
  return live ? (
    <Link href={`/tools/${tool.slug}`} className="block h-full">
      {body}
    </Link>
  ) : (
    <div className="h-full">{body}</div>
  );
}
