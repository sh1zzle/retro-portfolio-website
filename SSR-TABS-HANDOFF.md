# Handoff: only the About tab reaches the server-rendered HTML

_Written 2026-07-27. Self-contained context for a fresh session. Nothing here has been attempted yet._

## The problem

`src/app/page.tsx` is one `"use client"` component. A single piece of state picks the visible tab ([line 145](src/app/page.tsx#L145)):

```tsx
const [tab, setTab] = useState<TabKey>("welcome");
```

and each panel renders behind a conditional ([lines 386-395](src/app/page.tsx#L386-L395)):

```tsx
{tab === "welcome" && <WelcomeTab ... />}
{tab === "projects" && <ProjectsTab />}
{tab === "experience" && <ExperienceTab />}
{tab === "contact" && <ContactTab />}
{tab === "skills" && <SkillsFileTab />}
```

React renders only the true branch. Next prerenders this page at build time with `tab === "welcome"`, so the served HTML contains the About tab and nothing else. The other four panels do not exist in the DOM until a user clicks, and that click only happens in a browser.

## Evidence

Against the deployed production HTML:

```
curl -s https://devpresso.dev > /tmp/live.html
```

| String | Tab | Matches |
|---|---|---|
| `Curious by default` | About | 1 |
| `clean data models` | About | 1 |
| `Dash Notes` | Experience | 0 |
| `How I work` | Experience | 0 |
| `guard-tour` | Experience | 0 |

Use this same check to verify any fix.

## Why it matters

Search engines index the rendered DOM. Googlebot executes JS but does not click tabs, so it only ever sees the default state. The entire experience timeline, every project, and the contact details are unindexable. A search for the author's name plus "React Native" or "offline-first" cannot match copy that never renders. Recruiter scrapers and link-preview bots that read raw HTML see a single paragraph.

## Two approaches

### A. Render all panels, hide inactive ones with CSS

Replace the `&&` conditionals with always-rendered panels, each wrapped in an element carrying the `hidden` attribute when inactive. Prefer the HTML `hidden` attribute (or `display: none`) over off-screen positioning, because it also removes inactive panels from the accessibility tree, which is what you want for a tab UI.

Lower risk, keeps the single-window OS conceit intact, visually identical. Everything lands in one HTML document.

Caveat worth knowing: Google does index `display: none` tabbed content, but has historically weighted hidden content slightly lower than visible content. For this site's purpose (be findable at all) that tradeoff is fine.

### B. Real routes per tab

`/experience`, `/projects`, `/contact` as actual App Router segments, server-rendered, with the OS chrome as a shared client layout. Best possible SEO since each section gets its own indexable, linkable, rankable URL.

Much larger change, and it fights the design: the whole conceit is one window with an iOS-style bottom tab bar, not a multi-page site. Deep-linking into a "desktop OS" also needs a story for what the desktop icons do.

Recommendation: do A first. It is the small change that removes the actual harm. B is only worth it if ranking for section-specific queries becomes a goal.

## Gotchas specific to this codebase

1. **The IDE theme is applied to the shared scroll container, not the panel.** [Line 380-384](src/app/page.tsx#L380-L384) puts `theme-ide` on the `.ph-body` wrapper when `tab === "projects"`. `.theme-ide` sets a monospace font family and scopes many descendant rules (`.theme-ide .ide-breadcrumb`, etc. in `globals.css` from line 751). If all panels render inside that same container, the IDE styling will leak onto whichever panels are in the DOM. **Move `theme-ide` onto the Projects panel wrapper itself** rather than the scroll container.

2. **`zoom` lives on the same container** ([line 384](src/app/page.tsx#L384)) and applies to all children. Fine as-is, but do not accidentally drop it when restructuring.

3. **Scroll position.** The scroll container is shared and unmounting currently resets `scrollTop` implicitly on every tab switch. Once panels persist, switching tabs may keep the previous scroll offset. Reset it explicitly on tab change if it feels wrong.

4. **No `role="tabpanel"` anywhere yet** (grep returns 0). The tab bar already sets `role="tablist"`, `role="tab"`, and `aria-selected` ([lines 400-407](src/app/page.tsx#L400-L407)). While restructuring, add `role="tabpanel"` plus `aria-labelledby` wiring. Without it, four simultaneously-present panels are a genuine screen-reader regression.

5. **`WelcomeTab` takes props** (`cheering`, `onOpenSkills`) and must keep receiving them.

6. **`skills` is a fifth panel and is not in the `TABS` array.** It is reachable only via the `skills.txt` desktop icon, so it has no tab-bar button. Do not assume panels map one-to-one to tab buttons.

7. **No `useEffect` is keyed to `tab`** (verified), so there are no mount/unmount side effects to preserve.

8. Content already ships in the JS bundle via `src/lib/content.ts`, so approach A adds DOM nodes but no extra network payload.

## Definition of done

- `npm run build` clean, `npx eslint src` no new warnings (10 pre-existing `<img>` warnings are expected)
- All five panels' text present in `curl` of the built HTML
- Projects tab still renders in the IDE theme; no other panel does
- Tab switching still works, and no panel is announced by a screen reader while inactive
- Visual parity at 375 / 768 / 1100 / 1440

## Repo notes

- House rule: **no em dashes** anywhere, including code comments. Rewrite the sentence rather than substituting a hyphen. En dashes in ranges are fine.
- `AGENTS.md` requires reading the relevant guide under `node_modules/next/dist/docs/` before writing Next-specific code. This is Next 16 App Router with Turbopack.
- Dev server runs on port 3001 (`npm run dev`).
- Pushes to `main` auto-deploy to production via the connected Vercel project.
