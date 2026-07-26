# Waheedul Islam — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion portfolio.

## Troubleshooting

**`/api/github` or `/api/contributions` returns 502 in the browser console**
This means the *real* GitHub/contributions API call failed — the 502 is just
our route reporting that. The actual reason is logged in your terminal
(where `npm run dev` is running), not the browser console. Check there first —
you'll see the real HTTP status GitHub returned. The most common cause is
GitHub's unauthenticated rate limit (60 requests/hour, shared across your
whole network). Fix: copy `.env.example` to `.env.local` and set a
`GITHUB_TOKEN` (a token with no scopes is enough for public data) — this
raises the limit to 5,000/hour.

**`site.webmanifest` 404 in console**
Already fixed — `/public/site.webmanifest`, `/public/favicon.ico` and
`/public/apple-touch-icon.png` are included. If you still see this, make
sure you copied the full `public/` folder when deploying.

## Setup

```bash
npm install
npm run dev
```

## Before deploying — things that still need your input

1. **`src/data/site.ts`** → set `links.site` to your real deployed domain (used in
   SEO metadata, canonical URL, sitemap, JSON-LD).
2. **`src/data/projects.ts`** → currently empty. Add each real project with the full
   case-study fields (problem, solution, architecture, challenges, lessons). The
   Projects section renders an empty state until this is filled in — nothing is
   fabricated automatically.
3. **`src/data/timeline.ts`** → review/replace the four starter entries with your
   own real milestones, freelance work, or open-source contributions.
4. ~~`/public/profile.jpg`~~ → done — your photo is in place, and the accent color
   (`--accent` in `src/app/globals.css`) is tuned to the deep indigo/violet from its
   background.
5. **`/public/og-image.png`** (1200×630), **favicon.ico**, **apple-touch-icon.png**,
   **site.webmanifest** → add these for social previews and PWA metadata.
6. **GitHub token (optional)** → copy `.env.example` to `.env.local` and add a
   `GITHUB_TOKEN` if you hit GitHub's unauthenticated rate limit (60 req/hr).
7. **Contact form** → `src/sections/contact.tsx` currently simulates submission.
   Wire the `handleSubmit` TODO to a real email service (Resend, Formspree, or
   your own API route).

## Folder structure

```
src/
 ├── app/            # routes, layout, metadata, API route
 ├── components/     # shared UI (navbar, footer, theme, ui primitives)
 ├── sections/       # one file per homepage section
 ├── data/           # single source of truth: site info, skills, projects, timeline
 ├── types/          # shared TypeScript types
 ├── lib/            # utilities (cn helper)
 └── hooks/          # custom hooks (currently empty, ready for use)
```

## Notes

- Dark mode is the default theme; toggle persists via `next-themes` (localStorage).
- GitHub stats/repos are fetched live from `/api/github`, which calls the GitHub
  REST API server-side and revalidates hourly.
- Every animation respects `prefers-reduced-motion`.
