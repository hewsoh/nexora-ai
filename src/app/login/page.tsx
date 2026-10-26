import Link from "next/link";
import Nav from "@/components/Nav";

/** Placeholder — see the note in signup/page.tsx. */
export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-24">
        <p className="eyebrow">Stage 2</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tightest">
          Log in comes with accounts.
        </h1>
        <p className="mt-4 text-white/55">Authentication is not connected yet. Coming next stage.</p>
        <Link href="/" className="btn-ghost mt-8 self-start">
          Back to home
        </Link>
      </main>
    </>
  );
}
