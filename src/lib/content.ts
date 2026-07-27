export const profile = {
  name: "Shiezza Lauron",
  role: "Full Stack Web and Mobile Developer",
  location: "Chiang Mai, Thailand",
  /* Headline statement. Leads with personality, not job title.
     Split into two lines so the H1 can be a single punchy sentence
     and the subhead carries the rest as supporting copy. */
  tagline: "Curious by default.",
  taglineSub:
    "Building from scratch to shipping, for the fun of learning.",
  /* The "why" lands first in the bio so visitors get a point of view
     before the tech-stack name-soup. */
  why:
    "I care about clean data models, UIs that survive flaky networks, and shipping things that actually work.",
  /* The "what". Short, punchy. Tech details live in the stack chips below. */
  bio:
    "Five years building web and mobile apps. Currently working at Facilitron, a facility-management platform, on React Native apps and a .NET 9 API.",
  /* Tiny availability/status line shown in the window status bar. */
  status: "open to projects and full-time · responds within a day",
  /* Shown in the contact.dat block so someone reaching out knows which
     timezone they are writing into. `availability` is currently unused:
     the working-hours line was cut from contact.dat. */
  timezone: "Asia/Bangkok (UTC+7)",
  availability: "Mon–Fri · 09:00–18:00 ICT",
  email: "shiezza.devpresso@gmail.com",
  github: "https://github.com/sh1zzle",
  linkedin: "https://www.linkedin.com/in/shizzie/",
};

/* Compact stack for the welcome tab: three category chip rows.
   The full per-discipline list still lives in `skills` below. */
export const heroStack: { label: string; items: string[] }[] = [
  { label: "Web", items: ["Next.js", "Tailwind", "Vercel"] },
  { label: "Mobile", items: ["React Native", "Expo", "Offline-first"] },
  {
    label: "Server",
    items: ["Fastify", "Drizzle", "Postgres", ".NET 9", "Azure SQL"],
  },
];

/* Client-facing capability cards for the About tab. Written for a
   non-technical reader. Each card sells an outcome, with only a couple
   of recognizable tech names as supporting chips. The full technical
   inventory stays in `skills` below and renders under skills.txt. */
export type Service = {
  key: string;
  title: string;
  blurb: string;
  chips: string[];
};

export const services: Service[] = [
  {
    key: "mobile",
    title: "Mobile apps",
    blurb:
      "iPhone and Android from one codebase, idea to App Store, including apps that keep working offline in the field.",
    chips: ["React Native", "Expo"],
  },
  {
    key: "web",
    title: "Web apps & sites",
    blurb:
      "Fast, modern websites and dashboards, from a landing page to a full product your customers log into.",
    chips: ["Next.js", "React"],
  },
  {
    key: "backend",
    title: "Backends & APIs",
    blurb:
      "The engine behind the app: accounts, payments, notifications, and real-time updates that stay up.",
    chips: [".NET", "Node.js", "Postgres"],
  },
  {
    key: "ai",
    title: "AI features",
    blurb:
      "Practical AI inside your product: chat, summaries, and smart automation that saves your team hours.",
    chips: ["Claude", "Anthropic API"],
  },
];

export type SkillGroup = { label: string; items: string[] };

/* Version numbers are deliberately omitted because they rot fast and read as
   padding. Exceptions: ".NET 9" and "New Architecture", which signal
   current-generation work. */
export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "C# (.NET)", "SQL"] },
  { label: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind"] },
  /* Within each group, the leading items are the ones surfaced when the
     chip row is collapsed to a single line, so keep the most important
     first. */
  {
    label: "Mobile",
    items: [
      "React Native",
      "Expo",
      "Expo Router",
      "New Architecture (Fabric/TurboModules)",
      "EAS Build / Update",
      "Reanimated",
    ],
  },
  {
    label: "Backend",
    items: ["Fastify", "ASP.NET Core (.NET 9)", "Vercel Functions", "Node.js"],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL",
      "Azure SQL",
      "Drizzle ORM",
      "EF Core",
      "Dapper",
      "Zod",
    ],
  },
  {
    label: "State & Data Fetching",
    items: [
      "TanStack Query",
      "Zustand",
      "Optimistic updates",
      "Sync queues",
    ],
  },
  {
    label: "Auth & Real-time",
    items: [
      "Custom JWT",
      "Apple / Google Sign-In",
      "Refresh-token rotation",
      "SignalR (Azure)",
      "Push (FCM via Expo)",
    ],
  },
  {
    label: "AI",
    items: [
      "Anthropic API",
      "tool_use / structured output",
      "LM Studio (local)",
    ],
  },
  {
    label: "Cloud / DevOps",
    items: [
      "Vercel",
      "Azure (SQL, SignalR, Blob, Service Bus)",
      "Fly.io",
      "Neon",
      "Docker",
      "Turborepo",
      "Bitbucket Pipelines",
    ],
  },
  {
    label: "Observability",
    items: ["Datadog RUM", "FullStory", "Application Insights", "Serilog"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  status: string;
  href?: string;
  /* Public GitHub URL. Deliberately unset on every project: the Atlas,
     Equilibria, and Recall repos stay private by choice, and a repo
     link that 404s for visitors costs more credibility than a missing
     one. Kept so publishing a repo later is a one-line change. */
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "atlas",
    name: "Atlas",
    tagline:
      "A personal training app that knows your program, your numbers, and your history.",
    description:
      "Mobile-first workout tracker with training programs, session logging, per-exercise history, stats charts, and an anatomical muscle map. Works offline via a mutation queue that syncs when you're back, ships six switchable themes, installs as a PWA, and has a native iOS app in Expo. Next.js 16 App Router with server actions, Neon Postgres + Drizzle, Better Auth.",
    stack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind v4",
      "Neon Postgres",
      "Drizzle ORM",
      "Better Auth",
      "Zustand",
      "Recharts",
      "Expo",
      "PWA",
      "Vercel",
    ],
    status: "Live",
    href: "https://workout-tracker-ebon-delta.vercel.app",
  },
  {
    slug: "equilibria",
    name: "Equilibria",
    tagline: "A habit-building health app across four pillars of wellness.",
    description:
      "Mobile-first habit tracker across four pillars of wellness: physical activity, nutrition, sleep, stress. Custom JWT with Apple + Google Sign-In, Fastify API on Fly.io (Singapore), managed Postgres on Neon (migrated off Fly Postgres after a 256MB OOM ceiling). English + Spanish via i18next, RN New Architecture (Fabric/TurboModules) enabled, Turborepo monorepo. Currently in TestFlight.",
    stack: [
      "React Native",
      "Expo SDK 54",
      "TypeScript",
      "Expo Router",
      "TanStack Query",
      "Zustand",
      "Unistyles",
      "Reanimated",
      "Fastify",
      "Drizzle ORM",
      "PostgreSQL 17",
      "Neon",
      "Fly.io",
      "Zod",
    ],
    status: "In TestFlight",
  },
  {
    slug: "recall",
    name: "Recall",
    tagline:
      "A learning tracker that derives mastery from how you actually score, not from what you check off. Currently loaded with a DeFi curriculum.",
    description:
      "Single-user learning tracker over a static curriculum. Mastery is computed at read time from recorded quiz attempts (80% correct across a term's last five) rather than pre-aggregated, so changing the rule is a one-function edit with no backfill. Wrong answers get diagnosed instead of just corrected: a dedicated endpoint names the misconception a specific choice implies. Glossary definitions and schema-validated quizzes run on Claude tool_use, with a pluggable provider (Anthropic in production, LM Studio locally).",
    stack: [
      "React 18",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Vercel Functions",
      "Anthropic API",
      "Claude",
      "tool_use",
    ],
    status: "In progress",
    href: "https://defi-app-eosin.vercel.app",
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights?: string[];
  stack?: string[];
};

export const experience: Job[] = [
  {
    company: "Facilitron",
    role: "Full Stack Developer",
    period: "May 2025 – Present",
    summary:
      "Building two production React Native apps (Works and FIT) for facility-management workflows, plus the shared .NET 9 backend on Azure SQL.",
    highlights: [
      "Works app: five role-based navigation stacks, offline-first sync queue, real-time SignalR updates, and push notifications, all from one codebase shipping to iOS, Android, and web.",
      "FIT app: offline-first field inspections with optimistic mutations, EAS Build across dev / staging / prod, shipping to iOS, Android, web, and Windows (React Native Windows).",
      "API: feature-based .NET 9 backend with EF Core + Dapper, real-time via Azure SignalR, batch PDF and Excel reporting.",
    ],
    stack: [
      "React Native",
      "Expo",
      "Expo Web",
      "React Native Windows",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      ".NET 9",
      "EF Core",
      "Dapper",
      "Azure SQL",
      "SignalR",
    ],
  },
  {
    company: "Dash",
    role: "Freelance Full Stack Developer",
    period: "2025",
    summary:
      "Brought in on Dash Notes 1.5 (dashnote.io) after the release stalled in App Store review, and got it approved and live by root-causing the iOS-only defects blocking it, from a paywall nobody could pay through to silent crashes on launch. Dash is a privacy-first notes app for macOS, web, and iOS: everything encrypted on-device with AES-256, no accounts, no cloud sync, no telemetry.",
    highlights: [
      "Worked the release through round after round of App Store review to approval, each one a distinct iOS-only defect root-caused and fixed in turn, plus one App Store Connect submission-mechanics trap.",
      "Restored iOS subscriptions when the paywall hung forever and no customer could complete a purchase: the RevenueCat Capacitor plugin proxy fabricates a .then, so promises resolved with it never settle. Boxed the proxy and gated SDK init.",
      "Stopped the app terminating silently on launch (missing camera usage descriptions), brought the local-AI features back within reach inside the WebView, and fixed a Deno-deployed sync relay that was dropping CORS preflight headers.",
    ],
    stack: [
      "Next.js",
      "React 18",
      "Editor.js",
      "Electron",
      "Capacitor",
      "RevenueCat",
      "Tailwind",
      "Zustand",
      "GitHub Actions",
    ],
  },
  {
    company: "LinkJolt",
    role: "Freelance Full Stack Developer",
    period: "2025",
    summary:
      "Cut the request load behind LinkJolt's affiliate dashboards, the screens its customers live in all day. LinkJolt is an affiliate-marketing SaaS covering link-based and coupon-based attribution, campaign invitations, Stripe and Paddle billing, and mass payouts.",
    highlights: [
      "Traced the platform's excessive API traffic to redundant and duplicated requests firing on every dashboard view, then eliminated them, cutting round-trips per page load and database work per user.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "MUI",
      "Drizzle ORM",
      "TanStack Query",
      "NextAuth",
      "Stripe",
      "Paddle",
      "PostHog",
    ],
  },
  {
    company: "CSA 360 Software",
    role: "Freelance Full Stack Developer",
    period: "Jul 2022 – Feb 2025",
    summary:
      "Owned the GPS-verified guard-tour module and shipped operational screens across CSA360, then kept it all running in production for two and a half years. CSA360 is a security-operations platform for guard companies, covering officer scheduling, patrol tracking, incident reporting, visitor management, and real-time dispatch, on web plus iOS and Android.",
    highlights: [
      "Built the guard-tour module end to end: the GPS-verified patrol tracking that proves a guard actually walked the route, on the schedule the contract promised.",
      "Shipped operational pages across the product: filterable tables, list/detail views, and search for day-to-day security-team workflows.",
      "Ran the Jira-driven bug queue on a live platform, the unglamorous reliability work that keeps security operations running.",
    ],
    stack: [
      "React",
      "React Native",
      "React-Bootstrap",
      "PHP",
      "MySQL",
      "Twilio",
      "AWS",
    ],
  },
  {
    company: "TWIGOH",
    role: "Freelance Front End Developer",
    period: "Aug 2020 – 2022",
    summary:
      "Two years of front-end work at an early-stage startup, a unified social marketplace where users discover products and services through trusted reviews from friends, family, and influencers.",
  },
];

/* Answers the questions a buyer has that a job history can't: how the
   work is run, where the speed comes from, and what stops it shipping
   broken. Sits above the timeline so the method frames the track
   record. Mirrors the plan / build / audit pipeline I actually run. */
export type WorkingNote = { title: string; body: string };

export const howIWork: WorkingNote[] = [
  {
    title: "Plan before code",
    body: "Every change starts as a written plan with scope and impact spelled out. Corrections are cheap there and expensive once it is built.",
  },
  {
    title: "AI on the grunt work",
    body: "A custom agent pipeline handles spec extraction, scaffolding, and audits. The repetitive work compresses, so the hours go into architecture and judgment.",
  },
  {
    title: "Built to your conventions",
    body: "New code follows the patterns already in your repo, down to field names and component styles. Anyone on the team can pick it up and keep going.",
  },
  {
    title: "Nothing ships unaudited",
    body: "Every build clears an automated gate before it counts as done: lint and typecheck clean, behavior verified against the spec.",
  },
];

/* Short freelance engagements, rendered as a compact "Also shipped for"
   strip on the Experience tab rather than full cards, so brief gigs read
   as breadth instead of churn. */
export type ShortGig = {
  company: string;
  role: string;
  period: string;
  note: string;
};

export const shortGigs: ShortGig[] = [
  {
    company: "EdCafe",
    role: "Front End Developer",
    period: "2025",
    note: "Interactive web apps with AI-powered features; front- and back-end architecture work.",
  },
  {
    company: "Baptist Faith",
    role: "Front End Mobile Developer",
    period: "2024",
    note: "Mobile app serving 10,000+ Bible-based audio and video files across music, bible, and preaching.",
  },
  {
    company: "Lyra",
    role: "Front End Mobile Developer",
    period: "2024",
    note: "Stability, UI/UX polish, and bug fixes for a caregiver-focused mobile app.",
  },
];
