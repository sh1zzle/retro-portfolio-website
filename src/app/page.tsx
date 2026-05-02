"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import {
  User,
  Sparkles,
  Coins,
  Building2,
  FileText,
  Mail,
  Code2,
  Coffee,
  Trash2,
  Terminal,
  Hash,
  Asterisk,
  Slash,
  Search,
  Settings,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  MessageSquare,
  Undo2,
  Redo2,
  ChevronDown,
} from "lucide-react";
import { profile, projects, experience } from "@/lib/content";

type TabKey = "welcome" | "projects" | "experience" | "contact";

type LucideLike = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/* ---------------- Brand SVG icons (Lucide v1 dropped these) ---------------- */
const GithubMark: LucideLike = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.69-3.87-1.36-3.87-1.36-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.49 3.14-1.18 3.14-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const LinkedinMark: LucideLike = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07 0 1.14-.93 2.07-2.07 2.07zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

/* ---------------- Tabs ---------------- */
const TABS: { key: TabKey; label: string }[] = [
  { key: "welcome", label: "welcome" },
  { key: "projects", label: "projects" },
  { key: "experience", label: "experience" },
  { key: "contact", label: "contact" },
];

/* ---------------- Desktop icons ----------------
   Each icon either has an `imageSrc` (custom SVG, rendered bare) OR
   a Lucide `Icon` + colored tile (placeholder until SVG arrives).
*/
type DesktopIconDef = {
  key: string;
  label: string;
  imageSrc?: string;
  Icon?: LucideLike;
  bg?: string;
  fg?: string;
  href?: string;
  tab?: TabKey;
  external?: boolean;
};

const LEFT_ICONS: DesktopIconDef[] = [
  { key: "about", imageSrc: "/icons/about.svg", label: "about.mdx", tab: "welcome" },
  { key: "equilibria", Icon: Sparkles, label: "equilibria", bg: "#c5e0c4", fg: "#1f5f2a", tab: "projects" },
  { key: "defi", Icon: Coins, label: "defi-app", bg: "#f4d09a", fg: "#7a3f0a", tab: "projects" },
  { key: "facilitron", Icon: Building2, label: "facilitron", bg: "#b8c4d6", fg: "#1e3556", tab: "experience" },
  { key: "resume", imageSrc: "/icons/resume.png", label: "résumé.pdf", href: "/resume.pdf", external: true },
  { key: "contact", imageSrc: "/icons/contact.png", label: "contact.dat", tab: "contact" },
];

const RIGHT_ICONS: DesktopIconDef[] = [
  { key: "github", imageSrc: "/icons/github.png", label: "github", href: profile.github, external: true },
  { key: "linkedin", imageSrc: "/icons/linkedin.png", label: "linkedin", href: profile.linkedin, external: true },
  { key: "skills", imageSrc: "/icons/skills.png", label: "skills.txt", tab: "welcome" },
  { key: "coffee", imageSrc: "/icons/coffee.png", label: "coffee chat", href: `mailto:${profile.email}`, external: true },
  { key: "trash", imageSrc: "/icons/trash.png", label: "trash" },
];

/* ---------------- Background decorations ----------------
   Positioned in the horizontal-center bands (top + bottom) so they
   never overlap the left/right icon columns or the centered window.
*/
type BgDecoration = {
  Icon: LucideLike;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  rotate: number;
};
const BG_DECORATIONS: BgDecoration[] = [
  { Icon: Code2, top: "4%", left: "30%", size: 64, rotate: -12 },
  { Icon: Terminal, top: "7%", right: "28%", size: 56, rotate: 8 },
  { Icon: Hash, bottom: "6%", left: "28%", size: 52, rotate: -4 },
  { Icon: Asterisk, bottom: "9%", right: "30%", size: 56, rotate: 14 },
];

export default function PortfolioOS() {
  const [tab, setTab] = useState<TabKey>("welcome");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="os-desktop relative overflow-hidden min-h-dvh flex items-center justify-center px-4 py-6 md:py-10 lg:px-44">
      {/* Decorative scattered code symbols */}
      {BG_DECORATIONS.map(({ Icon, top, bottom, left, right, size, rotate }, i) => (
        <Icon
          key={i}
          className="bg-decoration"
          style={{
            top,
            bottom,
            left,
            right,
            width: size,
            height: size,
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}

      {/* Left desktop icons */}
      <aside
        aria-label="Left side desktop"
        className="hidden lg:flex flex-col gap-3 absolute left-4 top-6 z-10"
      >
        {LEFT_ICONS.map((i) => (
          <DesktopIcon key={i.key} icon={i} activeTab={tab} onSelectTab={setTab} />
        ))}
      </aside>

      {/* Right desktop icons */}
      <aside
        aria-label="Right side desktop"
        className="hidden lg:flex flex-col gap-3 absolute right-4 top-6 z-10"
      >
        {RIGHT_ICONS.map((i) => (
          <DesktopIcon key={i.key} icon={i} activeTab={tab} onSelectTab={setTab} />
        ))}
      </aside>

      {/* Window — fixed height with internal scroll */}
      <div className="ph-window relative z-0 w-full max-w-3xl h-[88vh] max-h-[820px] min-h-[560px] flex flex-col overflow-hidden">
          {/* Title bar */}
          <div className="ph-titlebar flex items-center px-3 py-2 gap-3 shrink-0">
            <img src="/icons/portfolio.svg" alt="" aria-hidden width={22} height={22} />
            <button
              className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-1.5 hover:bg-[#f0f0f0] rounded px-1.5 py-0.5"
              aria-label="File menu"
            >
              {currentTitle(tab)}
              <ChevronDown size={14} className="text-[#9b9b9b]" />
            </button>
            <div className="flex-1" />
            <WinDot label="−" />
            <WinDot label="▢" />
            <WinDot label="✕" />
          </div>

          {/* Toolbar */}
          <div className="ph-toolbar flex items-center px-2.5 py-1.5 gap-0.5 overflow-x-auto shrink-0">
            <span className="tool-btn"><Undo2 size={14} /></span>
            <span className="tool-btn"><Redo2 size={14} /></span>
            <span className="tool-divider" />
            <span className="tool-btn">
              Zoom <ChevronDown size={12} />
            </span>
            <span className="tool-divider" />
            <span className="tool-btn"><Bold size={14} /></span>
            <span className="tool-btn"><Italic size={14} /></span>
            <span className="tool-btn"><Underline size={14} /></span>
            <span className="tool-divider" />
            <span className="tool-btn">
              Font <ChevronDown size={12} />
            </span>
            <span className="tool-divider" />
            <span className="tool-btn"><AlignLeft size={14} /></span>
            <span className="tool-btn"><AlignCenter size={14} /></span>
            <span className="tool-btn"><AlignRight size={14} /></span>
            <span className="tool-divider" />
            <span className="tool-btn"><LinkIcon size={14} /></span>
            <span className="tool-btn"><MessageSquare size={14} /></span>
            <div className="flex-1" />
            <span className="tool-btn"><Search size={14} /></span>
            <span className="tool-btn"><Settings size={14} /></span>
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary btn-sm ml-1"
            >
              Hire me - free
            </a>
          </div>

          {/* Scrollable body */}
          <div className="ph-body flex-1 overflow-y-auto px-6 md:px-10 pt-10 pb-8">
            {tab === "welcome" && <WelcomeTab />}
            {tab === "projects" && <ProjectsTab />}
            {tab === "experience" && <ExperienceTab />}
            {tab === "contact" && <ContactTab />}
          </div>

          {/* Tabs (pinned) */}
          <div className="px-6 md:px-10 border-t border-[#e5e5e5] shrink-0">
            <nav role="tablist" aria-label="Sections" className="flex gap-1 -mb-px overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  data-active={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className="ph-tab"
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Status bar */}
          <div className="status-bar flex items-center justify-between px-3 py-1.5 text-xs shrink-0">
            <span className="flex items-center gap-2">
              <span className="text-[#10b981]">●</span>
              ready · {tab}
            </span>
            <span>{time || "--:--"}</span>
          </div>
        </div>
    </main>
  );
}

function currentTitle(tab: TabKey) {
  switch (tab) {
    case "welcome":
      return "home.mdx";
    case "projects":
      return "projects.mdx";
    case "experience":
      return "experience.log";
    case "contact":
      return "contact.dat";
  }
}

function WinDot({ label }: { label: string }) {
  return (
    <button
      tabIndex={-1}
      aria-hidden
      className="w-7 h-7 flex items-center justify-center rounded text-[#6b6b6b] hover:bg-[#f0f0f0] hover:text-[#1a1a1a] text-sm"
    >
      {label}
    </button>
  );
}

function DesktopIcon({
  icon,
  activeTab,
  onSelectTab,
}: {
  icon: DesktopIconDef;
  activeTab: TabKey;
  onSelectTab: (t: TabKey) => void;
}) {
  const isActive = !!icon.tab && icon.tab === activeTab;

  let Visual: React.ReactNode;
  if (icon.imageSrc) {
    Visual = (
      <img
        src={icon.imageSrc}
        alt=""
        aria-hidden
        width={56}
        height={56}
        className="desktop-icon-img"
      />
    );
  } else if (icon.Icon) {
    Visual = (
      <span
        className="desktop-icon-tile"
        style={{ background: icon.bg }}
      >
        <icon.Icon size={22} strokeWidth={2.25} style={{ color: icon.fg }} />
      </span>
    );
  }

  if (icon.href) {
    return (
      <a
        href={icon.href}
        target={icon.external ? "_blank" : undefined}
        rel={icon.external ? "noopener noreferrer" : undefined}
        className="desktop-icon"
      >
        {Visual}
        <span className="desktop-icon-label">{icon.label}</span>
      </a>
    );
  }

  return (
    <button
      onClick={() => icon.tab && onSelectTab(icon.tab)}
      className="desktop-icon"
      data-active={isActive}
    >
      {Visual}
      <span className="desktop-icon-label">{icon.label}</span>
    </button>
  );
}

/* ---------------- Tabs ---------------- */

function WelcomeTab() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-md bg-[#1a1a1a] text-[#f49a3a] flex items-center justify-center font-bold text-sm">
          {profile.name
            .split(" ")
            .map((s) => s[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <span className="text-xl font-extrabold tracking-tight">
          {profile.name}
        </span>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        The new way to build software.
      </h1>

      <p className="mt-4 text-base md:text-lg text-[#3f3f3f] leading-relaxed max-w-2xl">
        {profile.blurb}
      </p>
      <p className="mt-3 text-base md:text-lg text-[#3f3f3f] leading-relaxed max-w-2xl">
        {profile.longBio}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <Mail size={16} strokeWidth={2.5} /> Get in touch
        </a>
        <a href="/resume.pdf" className="btn-secondary">
          <FileText size={16} strokeWidth={2.5} /> View résumé
        </a>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#4b4b4b]">
        <a href={profile.github} className="flex items-center gap-1.5 hover:text-[#1a1a1a] underline-offset-2 hover:underline">
          <GithubMark width={14} height={14} /> github
        </a>
        <span className="text-[#c8c0b0]">·</span>
        <a href={profile.linkedin} className="flex items-center gap-1.5 hover:text-[#1a1a1a] underline-offset-2 hover:underline">
          <LinkedinMark width={14} height={14} /> linkedin
        </a>
        <span className="text-[#c8c0b0]">·</span>
        <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-[#1a1a1a] underline-offset-2 hover:underline">
          <Mail size={14} /> email
        </a>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#6b6b6b] mb-3">
          Now Playing
        </h2>
        <ul className="space-y-2 text-[#1a1a1a]">
          <li className="flex items-center gap-3">
            <span className="code-chip">building</span>
            <strong>Equilibria</strong>{" "}
            <span className="text-[#6b6b6b]">— habit-tracking health app</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="code-chip">exploring</span>
            <strong>DeFi</strong>{" "}
            <span className="text-[#6b6b6b]">— on-chain mechanics</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="code-chip">working</span>
            <strong>Facilitron</strong>{" "}
            <span className="text-[#6b6b6b]">— full stack</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function ProjectsTab() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        Selected work.
      </h1>
      <p className="mt-3 text-[#3f3f3f] max-w-2xl">
        A handful of things I've built lately. Each one taught me something.
      </p>

      <ul className="mt-8 space-y-6">
        {projects.map((p, i) => (
          <li
            key={p.slug}
            className="rounded-lg border border-[#e5e5e5] p-5 hover:border-[#1a1a1a] transition"
          >
            <div className="flex items-start gap-4">
              <div
                className="h-12 w-12 rounded-md border-[1.5px] border-[#1a1a1a] flex items-center justify-center"
                style={{
                  background: p.slug === "equilibria" ? "#c5e0c4" : "#f4d09a",
                  boxShadow: "2px 2px 0 #1a1a1a",
                }}
              >
                {p.slug === "equilibria" ? (
                  <Sparkles size={22} strokeWidth={2.25} style={{ color: "#1f5f2a" }} />
                ) : (
                  <Coins size={22} strokeWidth={2.25} style={{ color: "#7a3f0a" }} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-xl font-bold">
                    <span className="text-[#9b9b9b] mr-2 text-base">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.name}
                  </h3>
                  <span className="status-tag">{p.status}</span>
                </div>
                <p className="mt-1 text-[#3f3f3f]">{p.tagline}</p>
                <p className="mt-3 text-[#4b4b4b] leading-relaxed">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="code-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceTab() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        Experience.
      </h1>
      <p className="mt-3 text-[#3f3f3f]">Where I've been working lately.</p>

      <ul className="mt-8 space-y-6">
        {experience.map((job) => (
          <li key={job.company} className="rounded-lg border border-[#e5e5e5] p-5">
            <div className="flex items-start gap-4">
              <div
                className="h-12 w-12 rounded-md border-[1.5px] border-[#1a1a1a] flex items-center justify-center bg-[#b8c4d6] shrink-0"
                style={{ boxShadow: "2px 2px 0 #1a1a1a" }}
              >
                <Building2 size={22} strokeWidth={2.25} className="text-[#1e3556]" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h3 className="text-xl font-bold">{job.company}</h3>
                  <span className="text-sm text-[#6b6b6b]">{job.period}</span>
                </div>
                <p className="text-sm text-[#6b6b6b] mt-0.5">{job.role}</p>
                <p className="mt-3 text-[#3f3f3f] leading-relaxed">{job.summary}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactTab() {
  const lines: { label: string; value: string; href: string; Icon: LucideLike }[] = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "github", value: profile.github, href: profile.github, Icon: GithubMark },
    { label: "linkedin", value: profile.linkedin, href: profile.linkedin, Icon: LinkedinMark },
    { label: "résumé", value: "/resume.pdf", href: "/resume.pdf", Icon: FileText },
  ];
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        Let's talk.
      </h1>
      <p className="mt-3 text-[#3f3f3f] max-w-2xl">
        Best place to reach me. Pick whichever works.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <Mail size={16} strokeWidth={2.5} /> Send an email
        </a>
        <a href={profile.linkedin} className="btn-secondary">
          <LinkedinMark width={16} height={16} /> Connect on LinkedIn
        </a>
      </div>

      <div className="mt-10 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-5 text-sm">
        <p className="text-[#6b6b6b] flex items-center gap-2">
          <Terminal size={14} /> $ cat contact.dat
        </p>
        <ul className="mt-3 space-y-1.5">
          {lines.map((l) => (
            <li key={l.label} className="flex flex-wrap items-center gap-3">
              <span className="text-[#6b3f5f] w-20 shrink-0 flex items-center gap-1.5">
                <l.Icon width={12} height={12} /> {l.label}
              </span>
              <span className="text-[#9b9b9b]">::</span>
              <a
                href={l.href}
                className="text-[#1a1a1a] hover:bg-[#f49a3a] px-1 -mx-1 rounded"
              >
                {l.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
