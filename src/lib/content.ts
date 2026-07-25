export const profile = {
  name: "Shiezza Lauron",
  role: "Full Stack Web and Mobile Developer",
  location: "Chiang Mai, Thailand",
  /* Headline statement — leads with personality, not job title.
     Split into two lines so the H1 can be a single punchy sentence
     and the subhead carries the rest as supporting copy. */
  tagline: "Curious by default.",
  taglineSub:
    "Building from scratch to shipping — for the fun of learning.",
  /* The "why" lands first in the bio so visitors get a point of view
     before the tech-stack name-soup. */
  why:
    "I care about clean data models, UIs that survive flaky networks, and shipping things that actually work.",
  /* The "what" — short, punchy. Tech details live in the stack chips below. */
  bio:
    "Five years building web and mobile apps. Currently working at Facilitron, a facility-management platform — React Native apps and a .NET 9 API.",
  /* Tiny availability/status line shown in the window status bar. */
  status: "open to work · responds within a day",
  /* Used by the contact.dat block — surfaces timezone + working hours so
     someone reaching out knows when to expect a reply. */
  timezone: "Asia/Bangkok (UTC+7)",
  availability: "Mon–Fri · 09:00–18:00 ICT",
  email: "shiezza.devpresso@gmail.com",
  github: "https://github.com/sh1zzle",
  linkedin: "https://www.linkedin.com/in/shizzie/",
};

/* Compact stack for the welcome tab — three category chip rows.
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
   non-technical reader — each card sells an outcome, with only a couple
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
      "iPhone and Android from one codebase, idea to App Store — including apps that keep working offline in the field.",
    chips: ["React Native", "Expo"],
  },
  {
    key: "web",
    title: "Web apps & sites",
    blurb:
      "Fast, modern websites and dashboards — from a landing page to a full product your customers log into.",
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
      "Practical AI inside your product — chat, summaries, and smart automation that saves your team hours.",
    chips: ["Claude", "Anthropic API"],
  },
];

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "C# (.NET)", "SQL"] },
  { label: "Frontend", items: ["React 18/19", "Next.js", "Vite", "Tailwind"] },
  /* Within each group, the leading items are the ones surfaced when the
     chip row is collapsed to a single line — keep the most important
     first. */
  {
    label: "Mobile",
    items: [
      "React Native",
      "Expo SDK 54/55",
      "Expo Router",
      "React Navigation",
      "Reanimated",
      "Unistyles",
      "React Native Paper",
      "MMKV",
      "EAS Build / Submit / Update",
      "New Architecture (Fabric/TurboModules)",
      "Detox",
    ],
  },
  {
    label: "Backend",
    items: ["Fastify", "ASP.NET Core (.NET 9)", "Vercel Functions", "Node 20"],
  },
  {
    label: "Data",
    items: [
      "PostgreSQL 17",
      "Azure SQL",
      "Drizzle ORM",
      "EF Core",
      "Dapper",
      "Supabase",
      "Zod",
    ],
  },
  {
    label: "State & Data Fetching",
    items: [
      "TanStack Query",
      "Zustand",
      "AsyncStorage",
      "Optimistic updates",
      "Sync queues",
    ],
  },
  {
    label: "Auth & Real-time",
    items: [
      "Custom JWT",
      "Apple Sign-In",
      "Google Sign-In",
      "Refresh-token rotation",
      "SignalR (Azure)",
      "Push (FCM via Expo)",
    ],
  },
  {
    label: "AI",
    items: [
      "Anthropic API",
      "Claude Sonnet 4.5",
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
      "AWS SES",
      "Turborepo",
      "Yarn 4 workspaces",
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
};

export const projects: Project[] = [
  {
    slug: "atlas",
    name: "Atlas",
    tagline:
      "A personal training app that knows your program, your numbers, and your history.",
    description:
      "Mobile-first workout tracker — training programs, session logging, per-exercise history, stats charts, and an anatomical muscle map. Works offline via a mutation queue that syncs when you're back, ships six switchable themes, installs as a PWA, and has a native iOS app in Expo. Next.js 16 App Router with server actions, Neon Postgres + Drizzle, Better Auth.",
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
      "Mobile-first habit tracker across four pillars of wellness — physical activity, nutrition, sleep, stress. Custom JWT with Apple + Google Sign-In, Fastify API on Fly.io (Singapore), managed Postgres on Neon (migrated off Fly Postgres after a 256MB OOM ceiling). English + Spanish via i18next, RN New Architecture (Fabric/TurboModules) enabled, Turborepo monorepo. Currently in TestFlight.",
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
    slug: "defi-app",
    name: "DeFi Learning Path",
    tagline:
      "A structured DeFi curriculum app with AI-assisted glossary and quiz generation.",
    description:
      "Single-user full-stack app pairing a static curriculum with persisted progress, an Anthropic-powered glossary, and AI-generated quizzes using Claude tool_use for schema-validated output. Provider is pluggable — Anthropic in production, LM Studio locally for offline iteration.",
    stack: [
      "React 18",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "Vercel Functions",
      "Anthropic API",
      "Claude Sonnet 4.5",
      "tool_use",
    ],
    status: "In progress",
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
    period: "Present",
    summary:
      "Building two production React Native apps (Works and FIT) for facility-management workflows, plus the shared .NET 9 backend on Azure SQL.",
    highlights: [
      "Works app — five role-based navigation stacks, offline-first sync queue, real-time SignalR updates, push notifications, Detox E2E.",
      "FIT app — offline-first field inspections with optimistic mutations, EAS Build pipeline across dev / staging / prod.",
      "API — feature-based .NET 9 backend with EF Core + Dapper, real-time via Azure SignalR, batch PDF and Excel reporting.",
    ],
    stack: [
      "React Native",
      "Expo",
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
    period: "2025 – Present",
    summary:
      "Dash (dashnote.io) is a privacy-first, offline-first note-taking app for macOS, web, and iOS. Everything is stored locally with AES-256 encryption — no accounts, no cloud sync, no telemetry. Rich block editor with 15+ block types, wiki-style page linking, self-destructing notes, a duress password mode, and Touch ID unlock.",
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
      "LinkJolt is an affiliate-marketing SaaS platform that lets SaaS companies run affiliate programs with both traditional link-based tracking and coupon-based attribution — affiliate dashboards, campaign invitations, Stripe and Paddle billing integrations, and mass payouts.",
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
];
