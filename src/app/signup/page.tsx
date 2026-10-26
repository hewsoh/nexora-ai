import Link from "next/link";
import Nav from "@/components/Nav";

/**
 * Placeholder. Real Supabase auth lands in Stage 2 — this page exists so the
 * CTAs resolve instead of 404ing, and it must not pretend to collect anything.
 */
export default function SignupPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-24">
        <p className="eyebrow">Stage 2</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tightest">Accounts are next.</h1>
        <p className="mt-4 text-white/55">
          Sign-up is not wired up yet. This page is here so nothing 404s while we build the three
          tools and connect Supabase auth.
        </p>
        <Link href="/" className="btn-ghost mt-8 self-start">
          Back to home
        </Link>
      </main>
    </>
  );
}
