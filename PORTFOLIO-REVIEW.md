# Portfolio Review — Hiring-Manager Assessment

_Reviewed 2026-07-25. Verdict: the retro-OS site is memorable and well built — the design itself sells the frontend skills. The gaps are in **credibility**: contact, proof, and consistency between the portfolio, resume, and GitHub._

---

## 🔴 Broken — blocks recruiters outright

- [x] **Placeholder contact email.** Every CTA ("Hire me", "Get in touch", coffee icon, contact.dat) pointed at `you@example.com`.
  _Fixed: now `shiezza.devpresso@gmail.com` (from the resume) in `src/lib/content.ts`._
- [x] **Avatar animation frame missing from git.** `public/my-dev-avatar/my-dev-avatar-1.5.png` is the first frame of the typing loop but was untracked — deploys from git would 404 it.
  _Fixed: staged. Include it in your next commit._
- [x] **Invisible in search and social shares.** Tab title was `portfolio.mdx`, description "Full stack developer — Web Edition", no favicon, no Open Graph tags — a shared link showed a blank card.
  _Fixed: `layout.tsx` metadata now leads with your name + role, added `src/app/icon.svg` (favicon) and `src/app/opengraph-image.tsx` (retro-window share card)._

## 🟠 Add — the highest-impact content work

- [ ] **Proof for projects.** Equilibria ("In TestFlight") and DeFi ("In progress") have no links, screenshots, or repos — unverifiable projects get skipped. Add per project:
  - 2–3 screenshots or a short screen recording (mobile work is judged visually)
  - GitHub repo link if public
  - TestFlight invite link for Equilibria
  - The `Project.href` field in `content.ts` already exists and is unused.
- [x] **Dates and the missing years.** Bio claims "five years" but the timeline showed Facilitron (no start year) + two 2025 freelance gigs.
  _Done: Facilitron dated May 2025 – Present, CSA 360 corrected to Jul 2022 – Feb 2025, TWIGOH (Aug 2020 – Jul 2023) added, and EdCafe / Baptist Faith / Lyra grouped in an "Also shipped for" strip. Timeline now covers 2020 → present._
  _Still open: one concrete "I built X" highlight each for CSA 360 and TWIGOH._
- [ ] **"I did X" bullets for Dash and LinkJolt.** Both entries describe the product, not your contribution. Facilitron has highlights; add 2–3 to each freelance entry ("Built the offline persistence layer for the block editor", "Integrated Stripe + Paddle billing with mass payouts", …).
- [ ] **Fix the GitHub profile** ([github.com/sh1zzle](https://github.com/sh1zzle)) — recruiters click it within seconds and it currently undercuts the portfolio:
  - Pin this portfolio repo, the DeFi app, and Equilibria (if publishable)
  - Add a profile README
  - Archive or hide tutorial-tier repos (HTML-CSS-Website, TO-DO-List, Shopping-List)

## 🟡 Remove / trim

- [x] **Version numbers in skills.txt.** Rot fast and read as padding.
  _Done: all version numbers stripped except ".NET 9" and "New Architecture"; dropped the lowest-signal chips (React Navigation, Unistyles, RN Paper, MMKV, AsyncStorage, Supabase, AWS SES, Yarn workspaces, model-name-as-skill). 58 → 47 chips._
- [ ] **Pick one audience.** "What I can build for you" outcome-cards are freelance-client copy; "open to work" + resume download is job-seeker copy. Mixed, each dilutes the other. If employment is the goal, swap the services grid for a deeper case study or "How I work" section.
- [x] **Housekeeping.** `.DS_Store` was already gitignored; `variations.html` moved from `public/explorations/` to `/explorations/` (gitignored) so it no longer ships to production.

## ✅ Keep — it's working

- The retro-OS conceit, easter eggs, and skills.txt-hidden-from-clients pattern — proof of UI polish while being memorable.
- The "why" line ("clean data models, UIs that survive flaky networks") — the most differentiating sentence on the site.
- Timezone + working hours in contact.dat; one-page resume.
