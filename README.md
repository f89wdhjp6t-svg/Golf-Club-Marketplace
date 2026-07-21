# The Ultimate Baby Guide (Pre & Post Baby)

A pregnancy and newborn guide for parents: what to expect week by week, what's
normal to feel, what's safe to eat or take, what labor and postpartum
recovery look like, and a balanced look at vaccines from both sides — plus a
baby tracker and a shared family calendar that both parents can use from
their own phones.

Built with Next.js (App Router) + TypeScript.

## Features

- **Pregnancy guide** — trimester-by-trimester overview of what's normal to
  feel (physically and emotionally), plus a week-by-week breakdown (weeks
  4–40) of baby's development and common symptoms.
- **Food & medication safety** — a searchable, filterable reference of foods
  and common medications, flagged as generally safe, caution/limit, or avoid.
- **Labor & birth** — signs labor is starting, the stages of labor, pain
  management options, what a C-section involves, what happens right after
  birth, and things worth deciding ahead of time in a birth plan.
- **Postpartum & newborn care** — physical and emotional recovery after
  birth, newborn basics (feeding, sleep, diapers, jaundice, and more), and
  clear warning signs for when to call your provider or pediatrician.
- **Vaccines: both sides** — pros and cons for following the standard
  schedule, delaying/spacing out, or declining, common concerns addressed
  factually, and questions worth bringing to your pediatrician. This is
  presented neutrally to support your conversation with a doctor, not to
  make the decision for you.
- **Baby tracker** — log feedings, diapers, and sleep with one tap; see a
  day-by-day timeline of who logged what and when.
- **Shared family calendar** — appointments, childcare days, and reminders,
  visible to both parents on separate phones via a family invite code.

## Getting started

```bash
npm install
cp .env.example .env
# edit .env and set your Supabase credentials
npm run dev
```

Open http://localhost:3000.

## Configuration

### Accounts, tracker, and calendar (Supabase)

Signing in, the baby tracker, and the shared calendar all require a Supabase
project:

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run `supabase/schema.sql` once
3. In Project Settings → API, copy the Project URL and `anon public` key
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env`
5. In Authentication → Settings, you can turn off "Confirm email" for easier
   local testing (optional)

Without these set, the guide content (pregnancy weeks, food/medication
safety, labor, postpartum, vaccines) still works — only accounts, the
tracker, and the calendar require Supabase.

### How the shared family works

One parent signs up and creates a family (Family → Start a new family),
which generates a 6-character invite code. The other parent signs up on
their own phone and joins with that code (Family → Join with a code). From
then on, both accounts see the same babies, tracker entries, and calendar
events — enforced by Postgres Row Level Security policies in
`supabase/schema.sql`, not just app logic.

## Project structure

```
app/
  page.tsx                  home / dashboard
  guide/
    page.tsx                 trimester overview + week-by-week
    nutrition/                food & medication safety
    birth/                    labor & delivery
    postpartum/                postpartum & newborn care
    vaccines/                  balanced vaccine pros/cons
  tracker/                   baby tracker (feeding/diaper/sleep)
  calendar/                  shared family calendar
  family/                    create/join family, invite code, add baby
components/                  UI components (Nav, TrackerLogger, CalendarView, ...)
lib/
  content/                   static guide content (weeks, nutrition, birth, postpartum, vaccines)
  family-data.ts              Supabase queries for family/baby/tracker/calendar
  family-context.tsx          React context for the signed-in user's family
  auth-context.tsx            React context for Supabase auth
  types.ts                    shared TypeScript types
supabase/schema.sql          tables, RLS policies, and invite-code join functions
```

## Notes

- All guide content (pregnancy, birth, postpartum, vaccines, food/medication
  safety) is general educational information, not medical advice, and isn't
  exhaustive — the app says so throughout. Always defer to your OB, midwife,
  or pediatrician for anything specific to you or your baby.
- The vaccines page intentionally lays out reasons for and against different
  choices rather than pushing one answer, since it's a decision families
  make with their own doctor.
- There's no push-notification or offline support yet — the tracker and
  calendar are live Supabase data, so both parents' phones need a network
  connection to sync.
