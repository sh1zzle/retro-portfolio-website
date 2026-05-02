export const profile = {
  name: "Your Name",
  role: "Full Stack Developer",
  location: "Based in [City]",
  blurb:
    "Full stack developer at Facilitron. I build mobile and web apps end-to-end — from Postgres schemas to React Native UIs.",
  longBio:
    "I work across the stack — TypeScript everywhere, React Native on the client, Node and Postgres on the server. Currently building Equilibria, a habit-building health app, and exploring DeFi on the side. I care about clean data models, fast UIs, and shipping things that actually work.",
  email: "you@example.com",
  github: "https://github.com/sh1zzle",
  linkedin: "https://linkedin.com/in/your-handle",
};

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
      "Mobile-first habit tracker covering physical activity, nutrition, sleep, and stress. Offline-first with optimistic sync, custom JWT auth, and a Drizzle/Postgres backend. Currently in TestFlight.",
    stack: [
      "React Native",
      "Expo",
      "Fastify",
      "Drizzle",
      "Postgres",
      "TanStack Query",
    ],
    status: "In TestFlight",
  },
  {
    slug: "defi-app",
    name: "DeFi App",
    tagline: "Decentralized finance interface — a deep-dive learning project.",
    description:
      "Exploring on-chain mechanics: AMMs, lending pools, yield strategies. Reading-heavy UI for understanding positions and risk across protocols.",
    stack: ["TypeScript", "Next.js", "wagmi", "viem", "ethers"],
    status: "In progress",
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export const experience: Job[] = [
  {
    company: "Facilitron",
    role: "Full Stack Developer",
    period: "Present",
    summary:
      "Building internal tools and customer-facing features across web and mobile. Day-to-day across React, TypeScript, Node, and Postgres.",
  },
];
