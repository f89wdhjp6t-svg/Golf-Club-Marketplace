# FairwayFind

A golf club marketplace: browse and buy used clubs, get an AI-powered buy
verdict (by typing your current club or scanning a photo of it), and list
your own clubs for sale with an AI-generated valuation and spec sheet.

Built with Next.js (App Router) + TypeScript.

## Features

- **Buy** — browse listings, filter by club type, view full specs and
  photos, add to cart.
- **AI Club Advisor** — on any listing, either type the club you currently
  play or upload a photo of it, and Claude compares it to the listing and
  gives a buy verdict, value/upgrade scores, pros/cons, and a recommendation.
- **Sell** — a 3-step flow (club details → AI valuation & pricing → preview)
  where Claude appraises the club, suggests a price range, writes the
  listing title/description/specs, and gives selling tips.

## Getting started

```bash
npm install
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Configuration

The AI features (buy verdict, photo scan, sell valuation, offer negotiation,
store price comparison) are powered by the Claude API and run **server-side
only** — set `ANTHROPIC_API_KEY` in `.env` (see `.env.example`). The key is
never sent to the browser. If it's missing, those features return a clear
error instead of failing silently; everything else (browsing, filtering)
works without it.

Optionally set `ANTHROPIC_MODEL` to override the default model.

### Accounts and persistence (Supabase)

Sign-up/login, selling clubs, and the cart require a Supabase project:

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run `supabase/schema.sql` once
3. In Project Settings → API, copy the Project URL and `anon public` key
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`
5. In Authentication → Settings, you can turn off "Confirm email" for easier
   local testing (optional)

Without these set, the app still runs — browsing works, and Sign In shows a
message explaining accounts aren't configured yet instead of failing.

## Project structure

```
app/
  page.tsx              main client-side app (listing / detail / sell views)
  api/
    analyze/            POST — text-based buy verdict vs. a described club
    analyze-photo/       POST — buy verdict from an uploaded club photo
    valuation/            POST — sell-side AI valuation + spec generation
components/               UI components (ClubCard, SellView, AIResultBody, ...)
lib/
  clubs.ts               mock listing data + condition color maps
  types.ts                shared TypeScript types
  anthropic.ts            server-side Claude API helper
```

## Notes

- Listings are the static mock data (`lib/clubs.ts`) plus anything sold
  through the Sell flow, which is persisted to Supabase and visible to
  everyone. Cart contents persist per-account too.
- Checkout is a UI placeholder — no payment processing is wired up. Selling
  a club doesn't ship anything or move real money.
- There's no in-app messaging, shipping labels, or seller reputation built
  from real sales history yet — those still need real infrastructure beyond
  accounts + a database.
