"use client";

import { useEffect, useState, type ComponentType, type CSSProperties, type SVGProps } from "react";
import {
  Building2,
  FileText,
  Mail,
  Code2,
  Terminal,
  Hash,
  Asterisk,
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

/* ---------------- Tabs (iOS-style bottom bar) ---------------- */
/* Icons are PNGs from /public/icons. Drop replacement art at the same
   path to swap. Defaults reuse existing assets so nothing 404s. */
const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "welcome", label: "About", icon: "/icons/resume.png" },
  { key: "projects", label: "Projects", icon: "/icons/skills.png" },
  { key: "experience", label: "Experience", icon: "/icons/coffee.png" },
  { key: "contact", label: "Contact", icon: "/icons/contact.png" },
];

/* ---------------- Desktop icons ----------------
   Each icon either has an `imageSrc` (custom SVG, rendered bare) OR
   a Lucide `Icon` + colored tile (placeholder until SVG arrives).
*/
type DesktopIconDef = {
  key: string;
  label: string;
  imageSrc?: string;
  /** Multiplier for the rendered image. Use >1 for PNGs with heavy
      transparent padding so the artwork reads at the same visual size
      as tightly-cropped neighbours. Default 1. */
  imageScale?: number;
  Icon?: LucideLike;
  bg?: string;
  fg?: string;
  href?: string;
  tab?: TabKey;
  external?: boolean;
};

const LEFT_ICONS: DesktopIconDef[] = [
  { key: "about", imageScale: 1.3, imageSrc: "/icons/about-me.png", label: "about-me", tab: "welcome" },
  { key: "equilibria", imageSrc: "/icons/equilibria.png", imageScale: 1.5, label: "equilibria", tab: "projects" },
  { key: "defi", imageSrc: "/icons/defi.png", imageScale: 2, label: "defi-app", tab: "projects" },
  { key: "facilitron", imageSrc: "/icons/facilitron.png", imageScale: 1.3, label: "facilitron", tab: "experience" },
  { key: "resume", imageSrc: "/icons/resume.png", imageScale: 1.7, label: "resume.pdf", href: "/resume.pdf", external: true },
  { key: "contact", imageScale: 1.1, imageSrc: "/icons/contact.png", label: "contact.dat", tab: "contact" },
];

const RIGHT_ICONS: DesktopIconDef[] = [
  { key: "github",imageScale: 1.2, imageSrc: "/icons/github.png", label: "github", href: profile.github, external: true },
  { key: "linkedin", imageScale: 1.2,imageSrc: "/icons/linkedin.png", label: "linkedin", href: profile.linkedin, external: true },
  { key: "skills",imageScale: 1.2, imageSrc: "/icons/skills.png", label: "skills.txt", tab: "welcome" },
  { key: "coffee", imageSrc: "/icons/coffee.png", label: "love coffee", imageScale: 1.2, href: `mailto:${profile.email}`, external: true },
  { key: "trash", imageScale: 1.2, imageSrc: "/icons/trash.png", label: "trash" },
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
          {/* Title bar — macOS traffic-light style */}
          <div className="mac-titlebar shrink-0">
            <div className="mac-traffic" aria-label="Window controls">
              <button
                type="button"
                tabIndex={-1}
                aria-label="Close"
                className="mac-dot mac-close"
              >
                <svg viewBox="0 0 8 8" aria-hidden>
                  <path d="M1.5 1.5 L6.5 6.5 M6.5 1.5 L1.5 6.5" />
                </svg>
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Minimize"
                className="mac-dot mac-min"
              >
                <svg viewBox="0 0 8 8" aria-hidden>
                  <path d="M1.5 4 L6.5 4" />
                </svg>
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Zoom"
                className="mac-dot mac-zoom"
              >
                <svg viewBox="0 0 8 8" aria-hidden>
                  <path d="M2 1.5 L6.5 1.5 L6.5 6 Z M6 6.5 L1.5 6.5 L1.5 2 Z" />
                </svg>
              </button>
            </div>
            <button
              className="mac-title"
              aria-label="File menu"
            >
              <img src="/icons/portfolio.svg" alt="" aria-hidden width={16} height={16} />
              <span>{currentTitle(tab)}</span>
              <ChevronDown size={12} className="text-[#9b9b9b]" />
            </button>
            <div className="mac-titlebar-spacer" aria-hidden />
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
          <div
            className={`ph-body flex-1 overflow-y-auto px-6 md:px-10 pt-10 pb-8 ${
              tab === "projects" ? "theme-ide" : ""
            }`}
          >
            {tab === "welcome" && <WelcomeTab />}
            {tab === "projects" && <ProjectsTab />}
            {tab === "experience" && <ExperienceTab />}
            {tab === "contact" && <ContactTab />}
          </div>

          {/* Tabs (iOS-style bottom bar, pinned) */}
          <div className="ios-tabbar shrink-0">
            <nav role="tablist" aria-label="Sections" className="ios-tabbar-nav">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  data-active={tab === t.key}
                  onClick={() => setTab(t.key)}
                  className="ios-tab"
                >
                  <span className="ios-tab-icon-wrap">
                    <img
                      src={t.icon}
                      alt=""
                      aria-hidden
                      width={28}
                      height={28}
                      className="ios-tab-icon"
                    />
                  </span>
                  <span className="ios-tab-label">{t.label}</span>
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
    const scale = icon.imageScale ?? 1;
    Visual = (
      <img
        src={icon.imageSrc}
        alt=""
        aria-hidden
        width={56}
        height={56}
        className="desktop-icon-img"
        style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
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

/* ---------------- Dev avatar typing animation ----------------
   Build the slot sequence and per-slot delays so the markup matches
   the CSS keyframes. Tweak the constants here; the CSS reads its
   total loop duration from `AVATAR_LOOP_SECONDS` via inline style.
*/
/* These constants must match the keyframe windows in globals.css.
   31 typing × 0.25s = 7.75s total loop.
   Typing window = 0.25 / 7.75 ≈ 3.23%   (CSS: 0%, 4% / 5%, 100%)
   Yawn   window unused — yawns disabled below */
const TYPING_SLOT_SECONDS = 0.25;
const YAWN_SLOT_SECONDS = 1.0; // 4× a typing slot — clearly held pause

type AvatarSlot = { n: string; type: "typing" | "yawn"; delay: number };

function buildAvatarSequence(): { slots: AvatarSlot[]; totalSeconds: number } {
  const slots: AvatarSlot[] = [];
  let t = 0;
  const pushTyping = (n: string) => {
    slots.push({ n, type: "typing", delay: t });
    t += TYPING_SLOT_SECONDS;
  };
  // Re-enable when adding yawn frames back into the sequence.
  // const pushYawn = (n: string) => {
  //   slots.push({ n, type: "yawn", delay: t });
  //   t += YAWN_SLOT_SECONDS;
  // };

  // 10 typing cycles of (1, 2, 2.5) then a single closer on avatar 3.
  for (let i = 0; i < 10; i++) {
    pushTyping("1");
    pushTyping("2");
    pushTyping("2.5");
  }
  pushTyping("3");

  return { slots, totalSeconds: t };
}

const { slots: AVATAR_SEQUENCE, totalSeconds: AVATAR_LOOP_SECONDS } =
  buildAvatarSequence();

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

      <div className="welcome-hero">
        <div className="welcome-hero-text">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
            The new way to build software.
          </h1>

          <p className="mt-4 text-base md:text-lg text-[#3f3f3f] leading-relaxed">
            {profile.blurb}
          </p>
          <p className="mt-3 text-base md:text-lg text-[#3f3f3f] leading-relaxed">
            {profile.longBio}
          </p>
        </div>

        <div
          className="dev-avatar"
          aria-label="Animated illustration of me typing at my computer"
          role="img"
          style={{ "--avatar-loop": `${AVATAR_LOOP_SECONDS}s` } as CSSProperties}
        >
          {/* Sequence: (1,2,3 × 4) → yawn-4 → (1,2,3 × 4) → yawn-5 → loop.
              Yawn frames hold ~3× longer than typing frames so they read
              as a deliberate pause rather than another quick beat. */}
          {AVATAR_SEQUENCE.map((slot, i) => (
            <img
              key={i}
              src={`/my-dev-avatar/my-dev-avatar-${slot.n}.png`}
              alt=""
              aria-hidden
              className={`dev-avatar-frame dev-avatar-frame--${slot.type}`}
              style={{ animationDelay: `${slot.delay.toFixed(3)}s` }}
              loading="eager"
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <Mail size={16} strokeWidth={2.5} /> Get in touch
        </a>
        <a href="/resume.pdf" className="btn-secondary">
          <FileText size={16} strokeWidth={2.5} /> View resume
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
      {/* IDE-style breadcrumb + branch + run pill */}
      <div className="ide-breadcrumb">
        <span>src</span>
        <span>›</span>
        <span>projects</span>
        <span>›</span>
        <b>{projects[0].slug}.mdx</b>
        <span className="branch">main · clean</span>
        <button type="button" className="ide-runbtn ml-2" aria-label="Run">
          ▶ Run
        </button>
      </div>

      <h1 className="ide-h1">Selected work</h1>
      <p className="ide-sub">
        A handful of things I&apos;ve built lately. Each one taught me something.
      </p>

      {/* File-tab strip — one tab per project file */}
      <div className="ide-tabbar mt-2">
        {projects.map((p, i) => (
          <span
            key={p.slug}
            className="ide-tab"
            data-active={i === 0 ? "true" : "false"}
          >
            <span className="dot" /> {p.slug}.mdx
          </span>
        ))}
      </div>

      {projects.map((p) => (
        <div key={p.slug} className="ide-file">
          <div className="ide-line">
            <span className="ide-rule">---</span>
          </div>
          <div className="ide-line">
            <span>
              <span className="ide-key">slug</span>
              <span className="ide-rule">: </span>
              <span className="ide-str">&quot;{p.slug}&quot;</span>
            </span>
          </div>
          <div className="ide-line">
            <span>
              <span className="ide-key">name</span>
              <span className="ide-rule">: </span>
              <span className="ide-str">&quot;{p.name}&quot;</span>
            </span>
          </div>
          <div className="ide-line">
            <span>
              <span className="ide-key">status</span>
              <span className="ide-rule">: </span>
              <span className="ide-str">&quot;{p.status}&quot;</span>
            </span>
          </div>
          <div className="ide-line">
            <span className="ide-rule">---</span>
          </div>
          <div className="ide-line blank">
            <span>&nbsp;</span>
          </div>
          <div className="ide-line">
            <h3 className="ide-file-h">
              {p.name}
              <span className="status-tag">{p.status}</span>
            </h3>
          </div>
          <div className="ide-line blank">
            <span>&nbsp;</span>
          </div>
          <div className="ide-line">
            <p className="ide-comment">{p.tagline}</p>
          </div>
          <div className="ide-line blank">
            <span>&nbsp;</span>
          </div>
          <div className="ide-line">
            <p className="ide-prose">{p.description}</p>
          </div>
          <div className="ide-line blank">
            <span>&nbsp;</span>
          </div>
          <div className="ide-line">
            <div className="ide-stack">
              {p.stack.map((s) => (
                <span key={s} className="ide-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceTab() {
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        Experience.
      </h1>
      <p className="mt-3 text-[#3f3f3f]">Where I&apos;ve been working lately.</p>

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
        Let&apos;s talk.
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
