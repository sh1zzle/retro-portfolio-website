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
    "Shipping React Native apps and a .NET 9 backend at Facilitron. Five years of production work across web, mobile, and the API layer.",
  /* "Currently working on" callout shown above the CTAs on the welcome
     tab so a recruiter doesn't have to switch tabs to learn project state. */
  currentlyBuilding: {
    name: "Equilibria",
    note: "habit app shipping in TestFlight",
  },
  /* Tiny availability/status line shown in the window status bar. */
  status: "open to work · responds within a day",
  /* Used by the contact.dat block — surfaces timezone + working hours so
     someone reaching out knows when to expect a reply. */
  timezone: "Asia/Bangkok (UTC+7)",
  availability: "Mon–Fri · 09:00–18:00 ICT",
  email: "you@example.com",
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

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "C# (.NET)", "SQL"] },
  { label: "Frontend", items: ["React 18/19", "Next.js", "Vite", "Tailwind"] },
  {
    label: "Mobile",
    items: [
      "React Native",
      "Expo SDK 54/55",
      "New Architecture (Fabric/TurboModules)",
      "Expo Router",
      "React Navigation",
      "Reanimated",
      "Unistyles",
      "React Native Paper",
      "MMKV",
      "EAS Build / Submit / Update",
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
      "Fly.io",
      "Neon",
      "Docker",
      "Azure (SQL, SignalR, Blob, Service Bus)",
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
      "Works app — five role-based navigation stacks (Maintenance Technician, Order Approver, Order Originator, Order Administrator, Site-Based Plant Manager), offline-first sync queue with 40+ action types, real-time SignalR updates, FCM push notifications, react-native-maps with custom property markers, Detox E2E.",
      "FIT app — field inspections with optimistic offline mutations, MMKV-backed Zustand stores, custom Axios interceptor with single-flight refresh-token deduplication and SignalR ConnectionId injection (prevents self-notifications), EAS Build pipeline across dev / staging / prod with Bitbucket Pipelines automation.",
      "API — feature-based .NET 9 (45 controllers across Roles / WorkOrders / Fit / Customers), EF Core for identity + Dapper for business queries, Azure SignalR Service for real-time, Azure Blob Storage for files, AWS SES + Service Bus for async email, batch PDF and Excel report generation via QuestPDF and EPPlus.",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "React Navigation",
      "Expo Router",
      "Zustand",
      "TanStack Query",
      "Axios",
      "MMKV",
      "Reanimated",
      "React Native Paper",
      ".NET 9",
      "EF Core",
      "Dapper",
      "Azure SQL",
      "Azure SignalR",
      "Azure Blob Storage",
      "Datadog RUM",
      "FullStory",
      "Detox",
    ],
  },
];
