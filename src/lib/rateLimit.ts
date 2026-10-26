import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Crude in-memory rate limiter for the no-login phase.
 *
 * This lives in module memory, so it resets on every cold start and is per
 * serverless instance — it slows casual abuse, it does not stop a determined
 * one. Replace with a Supabase-backed counter before you charge money.
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 8;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function checkRateLimit(request: NextRequest): NextResponse | null {
  // Vercel sets x-forwarded-for; fall back to a constant so we at least
  // throttle together rather than not at all.
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "unknown";

  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return null;
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    const minutes = Math.ceil((bucket.resetAt - now) / 60000);
    return NextResponse.json(
      { error: `You've hit the hourly limit. Try again in ${minutes} minutes.` },
      { status: 429 }
    );
  }

  bucket.count += 1;
  return null;
}
