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
- [ ] **Dates and the missing years.** Bio claims "five years" but the timeline shows Facilitron (no start year) + two 2025 freelance gigs. Recruiters cross-check this reflexively. Add the Facilitron start date and earlier roles (one line each is enough), or soften the claim.
- [ ] **"I did X" bullets for Dash and LinkJolt.** Both entries describe the product, not your contribution. Facilitron has highlights; add 2–3 to each freelance entry ("Built the offline persistence layer for the block editor", "Integrated Stripe + Paddle billing with mass payouts", …).
- [ ] **Fix the GitHub profile** ([github.com/sh1zzle](https://github.com/sh1zzle)) — recruiters click it within seconds and it currently undercuts the portfolio:
  - Pin this portfolio repo, the DeFi app, and Equilibria (if publishable)
  - Add a profile README
  - Archive or hide tutorial-tier repos (HTML-CSS-Website, TO-DO-List, Shopping-List)

## 🟡 Remove / trim

- [ ] **Version numbers in skills.txt.** "React 18/19", "Expo SDK 54/55", "PostgreSQL 17", "Node 20", "Claude Sonnet 4.5" rot fast and read as padding. Cut ~⅓ of the list; keep versions only where they're a real signal (".NET 9", "RN New Architecture").
- [ ] **Pick one audience.** "What I can build for you" outcome-cards are freelance-client copy; "open to work" + resume download is job-seeker copy. Mixed, each dilutes the other. If employment is the goal, swap the services grid for a deeper case study or "How I work" section.
- [ ] **Housekeeping.** Add `.DS_Store` to `.gitignore` (several sit in `public/`); delete or relocate `public/explorations/variations.html` — anything in `public/` ships to production.

## ✅ Keep — it's working

- The retro-OS conceit, easter eggs, and skills.txt-hidden-from-clients pattern — proof of UI polish while being memorable.
- The "why" line ("clean data models, UIs that survive flaky networks") — the most differentiating sentence on the site.
- Timezone + working hours in contact.dat; one-page resume.
