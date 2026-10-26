export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-5 w-5 rounded bg-gradient-to-br from-violet to-electric"
          />
          <span className="text-sm font-medium tracking-tightest">NEXORA AI</span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/40">
          <span>Built in Australia</span>
          <span>Ages 16+</span>
          <span>Prices in AUD</span>
        </div>
      </div>
    </footer>
  );
}
