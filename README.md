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

The AI features (buy verdict, photo scan, sell valuation) are powered by
the Claude API and run **server-side only** — set `ANTHROPIC_API_KEY` in
`.env` (see `.env.example`). The key is never sent to the browser. If it's
missing, those features return a clear error instead of failing silently;
everything else (browsing, filtering, cart) works without it.

Optionally set `ANTHROPIC_MODEL` to override the default model.

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

- Listings are in-memory mock data (`lib/clubs.ts`) plus anything you list
  through the Sell flow during the session — there's no database yet, so
  new listings and cart contents reset on reload. Swapping in persistence
  (e.g. Postgres + Prisma) is the natural next step for real usage.
- Checkout is a UI placeholder — no payment processing is wired up.
