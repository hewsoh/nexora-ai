import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-6 w-6 rounded-md bg-gradient-to-br from-violet to-electric"
          />
          <span className="text-[15px] font-semibold tracking-tightest">NEXORA</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <Link href="#tools" className="transition-colors hover:text-white">
            Tools
          </Link>
          <Link href="#roadmap" className="transition-colors hover:text-white">
            Roadmap
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-white">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm text-white/70 transition-colors hover:text-white sm:block"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-white/[0.08] px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.14]"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
