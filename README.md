# NEXORA AI

Structured AI workflows that produce finished documents — not another chatbot.

## What this is

Six AI studios. Three ship first.

| Studio | Status | Tool |
| --- | --- | --- |
| Business | **Live** | Launch Plan Generator |
| Career | **Live** | Resume Builder |
| Career | **Live** | Interview Prep |
| Creator | Coming Q2 | — |
| Fitness | Coming Q2 | — |
| Gaming | Coming Q2 | — |
| Everyday | Coming Q2 | — |

## Stack

- Next.js (App Router) — one project holds the site, the app and the API routes
- Tailwind CSS — the design system lives in `tailwind.config.ts` + `globals.css`
- Supabase — Postgres, auth, row-level security (create the project, then add keys)
- Vercel — hosting
- Stripe (AU) — subscriptions
- Claude Haiku 5.5 — generation, roughly $0.001 per run

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

Then open http://localhost:3000

## Environment variables

See `.env.example`. Never commit real keys — `.env.local` is gitignored.

## Day 1 status

- [x] Brand system and design tokens
- [x] Landing page (hero, tool discovery, sample output, pricing, roadmap)
- [x] Tool registry — the single source of truth for studios and tools
- [x] Framework set to Next.js on Vercel, build verified
- [ ] Supabase project + keys
- [ ] Launch Plan prompt + API route

Nothing here is production-ready. It has not been tested with real users.
