# Wedding Invitation — Iqra Maheen & Abdul Rahman

A bilingual (English with Urdu Nastaliq accents) animated wedding invitation website built
with Next.js, React, TypeScript, Tailwind CSS and Framer Motion, in violet, white and
champagne gold.

Guests see a sealed opening card (pearl garlands, gold arch, wax seal) — tapping the seal
unrolls the invitation, followed by a full-screen section for each ceremony, the family's
welcome and contact numbers.

## Editing the content

**All editable content lives in one file: [`config/wedding.ts`](config/wedding.ts).**

English is the main language; fields ending in `Ur` (e.g. `titleUr`, `eyebrowUr`) hold the
Urdu text shown alongside it.

| What | Where in `config/wedding.ts` |
| --- | --- |
| Couple names (English + Urdu), seal initials, optional photo | `couple` |
| Ceremony date, time, venue, colour theme | `ceremonies` |
| Family members (closing section) | `family.members` |
| Contact numbers / show or hide contacts | `contacts` |
| WhatsApp RSVP button | `rsvp` |
| Countdown timer | `countdown` |
| Invitation and footer wording | `invitation`, `footer` |

### When the wedding month and year are confirmed

Fill in `month` (1–12) and `year` for each ceremony, for example:

```ts
date: { day: 12, month: 3, year: 2027 },
```

The site will then automatically:

- show the month, weekday and year in each ceremony's date block (e.g. "March · Friday 12 7:00 PM · 2027"),
- hide the "Month & year to be announced" note,
- show the countdown on the intro page (to the Mehndi by default; change `countdown.targetCeremony`,
  or set `countdown.enabled: false` to hide it).

Times are in Pakistan Standard Time, 24-hour format (`"19:00"`, `"18:30"`).

### Background music

Set in `music`. The song plays through YouTube's embedded player (hidden), starts when the
guest taps the seal, loops, and can be paused with the round button in the bottom-right corner.
To change the song, put the `v=` value of another YouTube link into `music.youtubeId`; use
`music.startSeconds` to skip an intro, or set `music.enabled: false` to turn music off.

### WhatsApp

- Per contact: set `whatsapp: true` on a contact to show a WhatsApp button.
- RSVP: set `rsvp.enabled: true` and `rsvp.whatsappNumber: "0308 9875977"` (or another
  number) to show a "Confirm attendance" button that opens WhatsApp with a prefilled message.

Both are off by default until the family confirms which numbers to use.

## Requirements

- [Node.js](https://nodejs.org/) 18.18 or newer (20 LTS recommended)
- Git (for publishing to GitHub)

## Install and run locally

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. Edits to `config/wedding.ts` appear instantly.

> The opening screen is shown once per browser tab. To see it again, open the site in a new tab.

## Production build

```bash
npm run build
```

```bash
npm start
```

## Publish to GitHub

1. Create a new **empty** repository on https://github.com/new (e.g. `wedding-invitation`).
   Choose **Private** if you prefer — Vercel can still deploy it.
2. In this folder run:

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Wedding invitation website"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/<your-username>/wedding-invitation.git
```

```bash
git push -u origin main
```

## Deploy on Vercel

1. Sign in at https://vercel.com with your GitHub account.
2. Click **Add New → Project**, select the `wedding-invitation` repository, and click **Import**.
3. Keep the detected defaults (Framework: Next.js) and click **Deploy**.
4. After about a minute you get a public link like `https://wedding-invitation.vercel.app`.
   Share this link with guests (WhatsApp, SMS, etc.).

Every later `git push` to `main` redeploys automatically — so to update dates, simply edit
`config/wedding.ts`, commit and push.

Optional: under **Project → Settings → Environment Variables**, set
`NEXT_PUBLIC_SITE_URL` to your final URL (e.g. `https://iqra-weds-abdulrahman.com`) so link
previews use the correct address.

### Alternative: Netlify

Import the GitHub repository at https://app.netlify.com → **Add new site → Import an existing
project**. Netlify detects Next.js automatically.

## Custom domain (optional)

1. Buy a domain (e.g. from Namecheap, GoDaddy, or a Pakistani registrar such as PKNIC for `.pk`).
2. In Vercel: **Project → Settings → Domains → Add**, enter the domain.
3. Vercel shows the DNS records to add at your registrar — usually:
   - `A` record for `@` → `76.76.21.21`
   - `CNAME` record for `www` → `cname.vercel-dns.com`
4. Wait for DNS to propagate (minutes to a few hours). HTTPS is set up automatically.

Always use the exact values Vercel displays for your project.

## Project structure

```
app/
  layout.tsx        Root layout, fonts (Cormorant Garamond, Great Vibes, Noto Nastaliq Urdu), metadata
  page.tsx          Page composition
  globals.css       Theme, patterns, animations, reduced-motion rules
  icon.svg          Favicon
components/
  InvitationShell   Opening state, hero, page frame
  OpeningGate       Sealed card: garlands, arch, names, wax seal, paper-unroll reveal
  Hero              Bismillah, invitation wording, names, programme pills, countdown
  Ceremonies        Full-screen Mehndi (light) and Baraat (dark) sections with date blocks
  Countdown         Appears only once a complete date is configured
  Family            "منجانب اہلِ خانہ" — family members
  Contact           Phone numbers, optional WhatsApp/RSVP
  Footer            Closing message
  ornaments/        SVG arches, rosettes, garlands, fairy lights, petals, seal
config/wedding.ts   ← all editable content
lib/format.ts       Date, time and phone helpers
```

## Accessibility & performance notes

- Respects `prefers-reduced-motion`: petals are hidden and animations are reduced to simple fades.
- Opening screen is keyboard-accessible (focus starts on the open button) and the page behind it
  is `inert` until opened. Without JavaScript the full invitation is shown directly.
- Urdu text is marked `lang="ur"` and flows right-to-left inside the English page.
- Fonts are self-hosted at build time via `next/font` (no runtime request to Google).
- Search engines are asked not to index the invitation (`robots: noindex`).
