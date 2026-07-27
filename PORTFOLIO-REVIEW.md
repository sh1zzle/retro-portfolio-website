# Portfolio Review: Hiring-Manager Assessment

_Reviewed 2026-07-25, updated 2026-07-26. Verdict: the retro-OS site is memorable and well built, and the design itself sells the frontend skills. The gaps are in **credibility**: contact, proof, and consistency between the portfolio, resume, and GitHub._

---

## 🔴 Broken: blocks recruiters outright

- [x] **Placeholder contact email.** Every CTA ("Hire me", "Get in touch", coffee icon, contact.dat) pointed at `you@example.com`.
  _Fixed: now `shiezza.devpresso@gmail.com` (from the resume) in `src/lib/content.ts`._
- [x] **Avatar animation frame missing from git.** `public/my-dev-avatar/my-dev-avatar-1.5.png` is the first frame of the typing loop but was untracked, so deploys from git would 404 it.
  _Fixed: committed._
- [x] **Invisible in search and social shares.** Tab title was `portfolio.mdx`, description "Full stack developer, Web Edition", no favicon, no Open Graph tags, so a shared link showed a blank card.
  _Fixed: `layout.tsx` metadata now leads with your name + role, added `src/app/icon.png` (favicon) and `src/app/opengraph-image.tsx` (retro-window share card)._
- [x] **Never deployed.** The repo had a GitHub remote but no Vercel project, so none of the above was reachable by anyone.
  _Fixed 2026-07-26: Vercel project `portfolio` created and connected to the GitHub repo, so pushes auto-deploy. Live at https://portfolio-jade-six-1n5r0jkuse.vercel.app. Also set `metadataBase` from `VERCEL_PROJECT_PRODUCTION_URL`, which was silently resolving share-card images against `localhost:3000`._

## 🟠 Add: the highest-impact content work

- [ ] **Proof for projects.** Unverifiable projects get skipped.
  - [ ] 2–3 screenshots or a short screen recording per project (mobile work is judged visually). **Still the single biggest gap.**
  - [ ] TestFlight invite link for Equilibria, which is still the only project with no link at all
  - [x] `Project.href` is now used: Atlas and Recall both link to live deployments
  - [x] ~~GitHub repo link if public~~ **Declined 2026-07-26.** Atlas, Equilibria, and Recall repos stay private by choice. `Project.repo` exists and renders if ever set, but nothing populates it. Do not re-raise.
- [ ] **Only the About tab is server-rendered.** The whole page is one `"use client"` component with tab state defaulting to `welcome`, so the prerendered HTML contains just that tab. Crawlers and link-preview scrapers never see Experience, Projects, or Contact. Verified against the deployed HTML: "Dash Notes", "How I work", and "guard-tour" return zero matches. Fix by rendering all four panels and hiding inactive ones with CSS, or by moving content to the server layer.
- [x] **Dates and the missing years.** Bio claims "five years" but the timeline showed Facilitron (no start year) + two 2025 freelance gigs.
  _Done: Facilitron dated May 2025 – Present, CSA 360 corrected to Jul 2022 – Feb 2025, TWIGOH (Aug 2020 – 2022) added, and EdCafe / Baptist Faith / Lyra grouped in an "Also shipped for" strip with bare years. Timeline now covers 2020 → present._
- [x] **"I did X" bullets for Dash and LinkJolt.** Both entries described the product, not your contribution.
  _Done 2026-07-26: all three freelance summaries (Dash, LinkJolt, CSA 360) now open with the work done, with the product description demoted to a trailing clause. Dash reframed as an inherited release taken to App Store approval. CSA 360 gained a concrete guard-tour highlight._
  _~~Still open: one concrete "I built X" highlight for TWIGOH.~~ **Skipped 2026-07-26** by choice. TWIGOH keeps its summary-only card. Do not re-raise. If the empty card ever bothers you, the alternative is folding it into the "Also shipped for" strip, but two years sits oddly next to gigs measured in months._
- [ ] **Numbers.** There is still not a single metric anywhere in the experience timeline. Best three slots: LinkJolt round-trips saved (before/after), Facilitron scale (users, sites, work orders), CSA 360 reach (how many guard companies ran on it).
- [ ] **Fix the GitHub profile** ([github.com/sh1zzle](https://github.com/sh1zzle)). Recruiters click it within seconds and it currently undercuts the portfolio:
  - Pin this portfolio repo. It is the only public one, since the project repos stay private.
  - Add a profile README
  - Archive or hide tutorial-tier repos (HTML-CSS-Website, TO-DO-List, Shopping-List)
  - Note: Atlas lives under a second account (`Efesop/workout-tracker`), which splits your visible history across two usernames.

## 🟡 Remove / trim

- [x] **Version numbers in skills.txt.** Rot fast and read as padding.
  _Done: all version numbers stripped except ".NET 9" and "New Architecture"; dropped the lowest-signal chips (React Navigation, Unistyles, RN Paper, MMKV, AsyncStorage, Supabase, AWS SES, Yarn workspaces, model-name-as-skill). 58 → 47 chips._
- [ ] **Name both audiences instead of implying one.** ~~Pick one audience.~~ **Reframed 2026-07-27:** the goal is genuinely both project work and a full-time team role, so cutting either the services grid or the job-seeker signals would be wrong. Both audiences want the same three things anyway (proof you can build, evidence you shipped, how you work), and the "How I work" strip added 2026-07-26 serves both.
  _The real problem is ambiguity, not duality. `status` reads "open to work", which sounds like job hunting, while the About tab offers a services menu, which sounds like an agency. Each makes the other look less committed. Fix by saying both out loud: `status` to something like "open to projects and full-time", plus a matching clause in the contact intro._
- [x] **Housekeeping.** `.DS_Store` was already gitignored; `variations.html` moved from `public/explorations/` to `/explorations/` (gitignored) so it no longer ships to production.

## ✅ Keep: it's working

- The retro-OS conceit, easter eggs, and skills.txt-hidden-from-clients pattern. Proof of UI polish while being memorable.
- The "why" line ("clean data models, UIs that survive flaky networks"). Still the most differentiating sentence on the site.
- Timezone in contact.dat; one-page resume. (Working hours were cut 2026-07-26 as a duplicate of the `status` line.)
