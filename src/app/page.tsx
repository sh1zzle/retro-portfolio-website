"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type SVGProps,
} from "react";
import {
  Building2,
  FileText,
  Mail,
  Code2,
  Terminal,
  Hash,
  Asterisk,
  Bold,
  Italic,
  Underline,
  Undo2,
  Redo2,
  ChevronDown,
} from "lucide-react";
import { profile, projects, experience, skills, heroStack } from "@/lib/content";

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
  { key: "resume", imageSrc: "/icons/resume.png", imageScale: 1.7, label: "resume.pdf", href: "/Shiezza-Lauron-Resume.pdf", external: true },
  { key: "contact", imageScale: 1.1, imageSrc: "/icons/contact.png", label: "contact.dat", tab: "contact" },
];

const RIGHT_ICONS: DesktopIconDef[] = [
  { key: "github",imageScale: 1.2, imageSrc: "/icons/github.png", label: "github", href: profile.github, external: true },
  { key: "linkedin", imageScale: 1.2,imageSrc: "/icons/linkedin.png", label: "linkedin", href: profile.linkedin, external: true },
  { key: "skills",imageScale: 1.2, imageSrc: "/icons/skills.png", label: "skills.txt", tab: "welcome" },
  { key: "coffee", imageSrc: "/icons/coffee.png", label: "love coffee", imageScale: 1.2, href: `mailto:${profile.email}` },
  { key: "trash", imageScale: 1.2, imageSrc: "/icons/trash.png", label: "Bin" },
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
/* Spread across all four quadrants of the viewport so the cream desktop
   reads as patterned even on narrow screens (where the desktop icons are
   hidden by `hidden lg:flex`). The window and icon columns have higher
   stacking than the decorations so they paint over wherever they overlap. */
const BG_DECORATIONS: BgDecoration[] = [
  // Top band
  { Icon: Code2,    top: "5%",  left: "8%",   size: 52, rotate: -12 },
  { Icon: Terminal, top: "3%",  left: "32%",  size: 56, rotate: 8 },
  { Icon: Hash,     top: "9%",  left: "56%",  size: 48, rotate: -6 },
  { Icon: Asterisk, top: "4%",  right: "8%",  size: 60, rotate: 14 },

  // Mid band (covered by window on lg+, visible on smaller screens)
  { Icon: Hash,     top: "32%", left: "10%",  size: 44, rotate: 18 },
  { Icon: Code2,    top: "44%", right: "9%",  size: 56, rotate: -22 },
  { Icon: Asterisk, top: "55%", left: "6%",   size: 48, rotate: -8 },
  { Icon: Terminal, top: "58%", right: "11%", size: 44, rotate: 6 },

  // Bottom band
  { Icon: Hash,     bottom: "8%",  left: "9%",   size: 52, rotate: -4 },
  { Icon: Code2,    bottom: "4%",  left: "33%",  size: 48, rotate: 16 },
  { Icon: Asterisk, bottom: "10%", left: "57%",  size: 56, rotate: -14 },
  { Icon: Terminal, bottom: "5%",  right: "9%",  size: 52, rotate: 12 },
];

export default function PortfolioOS() {
  const [tab, setTab] = useState<TabKey>("welcome");
  const [time, setTime] = useState<string>("");

  /* Coffee-bean rain trigger fired by the "love coffee" desktop icon.
     Auto-clears after 8s; clicking again restarts the timer. */
  const [isRaining, setIsRaining] = useState(false);
  const rainTimerRef = useRef<number | null>(null);

  /* "Cheering" state — swaps the dev-avatar typing loop for the yeepee
     pose when the Hire-me button is clicked. Auto-clears after 5s. */
  const [isCheering, setIsCheering] = useState(false);
  const cheerTimerRef = useRef<number | null>(null);
  const triggerCheer = () => {
    setIsCheering(true);
    if (cheerTimerRef.current !== null) {
      window.clearTimeout(cheerTimerRef.current);
    }
    cheerTimerRef.current = window.setTimeout(() => {
      setIsCheering(false);
      cheerTimerRef.current = null;
    }, 5000);
  };
  useEffect(() => {
    return () => {
      if (cheerTimerRef.current !== null) {
        window.clearTimeout(cheerTimerRef.current);
      }
    };
  }, []);

  /* Toolbar Zoom — cycles small / normal / large for the body content
     so the "Zoom" button is no longer dead chrome. */
  const ZOOM_LEVELS = [0.9, 1.0, 1.1] as const;
  const [zoomIdx, setZoomIdx] = useState<number>(1); // start at 1.0
  const zoom = ZOOM_LEVELS[zoomIdx];
  const cycleZoom = () => setZoomIdx((i) => (i + 1) % ZOOM_LEVELS.length);
  const triggerRain = () => {
    setIsRaining(true);
    if (rainTimerRef.current !== null) {
      window.clearTimeout(rainTimerRef.current);
    }
    rainTimerRef.current = window.setTimeout(() => {
      setIsRaining(false);
      rainTimerRef.current = null;
    }, 8000);
  };
  useEffect(() => {
    return () => {
      if (rainTimerRef.current !== null) {
        window.clearTimeout(rainTimerRef.current);
      }
    };
  }, []);

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

      {/* Coffee-bean easter egg. Rendered before the window in DOM, with no
         z-index, so the window paints over it — beans only show in the
         desktop area around the window. */}
      {isRaining && <BeanRain />}

      {/* Left desktop icons */}
      <aside
        aria-label="Left side desktop"
        className="hidden lg:flex flex-col gap-3 absolute left-4 top-6 z-10"
      >
        {LEFT_ICONS.map((i) => (
          <DesktopIcon
            key={i.key}
            icon={i}
            activeTab={tab}
            onSelectTab={setTab}
            onAction={i.key === "coffee" ? triggerRain : undefined}
          />
        ))}
      </aside>

      {/* Right desktop icons */}
      <aside
        aria-label="Right side desktop"
        className="hidden lg:flex flex-col gap-3 absolute right-4 top-6 z-10"
      >
        {RIGHT_ICONS.map((i) => (
          <DesktopIcon
            key={i.key}
            icon={i}
            activeTab={tab}
            onSelectTab={setTab}
            onAction={i.key === "coffee" ? triggerRain : undefined}
          />
        ))}
      </aside>

      {/* Window — fixed height with internal scroll */}
      <div className="ph-window relative z-0 w-full max-w-3xl h-[88vh] max-h-[820px] min-h-[560px] flex flex-col overflow-hidden">
          {/* Title bar — macOS traffic-light style, hand-illustrated */}
          <div className="mac-titlebar shrink-0">
            <div className="mac-traffic" aria-label="Window controls">
              <button
                type="button"
                tabIndex={-1}
                aria-label="Close"
                title="close (but please don't)"
                className="mac-dot"
              >
                <img
                  src="/icons/macClose.png"
                  alt=""
                  aria-hidden
                  width={20}
                  height={20}
                />
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Minimize"
                title="minimize · I'll wait"
                className="mac-dot"
              >
                <img
                  src="/icons/macMin.png"
                  alt=""
                  aria-hidden
                  width={20}
                  height={20}
                />
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Resize"
                title="full screen · for the immersive bio experience"
                className="mac-dot"
              >
                <img
                  src="/icons/macResize.png"
                  alt=""
                  aria-hidden
                  width={20}
                  height={20}
                />
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

          {/* Toolbar — trimmed to only the controls that earn their keep:
              Undo/Redo and B/I/U are decorative editor-feel; Zoom and Font
              are functional/expandable; Hire-me is the real CTA. */}
          <div className="ph-toolbar flex items-center px-2.5 py-1.5 gap-0.5 overflow-x-auto shrink-0">
            <span className="tool-btn"><Undo2 size={14} /></span>
            <span className="tool-btn"><Redo2 size={14} /></span>
            <span className="tool-divider" />
            <button
              type="button"
              className="tool-btn cursor-pointer"
              onClick={cycleZoom}
              title={`Zoom ${Math.round(zoom * 100)}% · click to cycle`}
            >
              Zoom {Math.round(zoom * 100)}% <ChevronDown size={12} />
            </button>
            <span className="tool-divider" />
            <span className="tool-btn"><Bold size={14} /></span>
            <span className="tool-btn"><Italic size={14} /></span>
            <span className="tool-btn"><Underline size={14} /></span>
            <span className="tool-divider" />
            <span className="tool-btn">
              Font <ChevronDown size={12} />
            </span>
            <div className="flex-1" />
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary btn-sm ml-1 hire-me-btn"
              onClick={triggerCheer}
            >
              <span className="hire-me-dot" aria-hidden /> Hire me
            </a>
          </div>

          {/* Scrollable body. Zoom uses the CSS `zoom` property (now
              standardized) so it scales layout + fonts + padding all
              proportionally — `font-size` alone doesn't because most
              children use rem-based sizes that don't cascade. */}
          <div
            className={`ph-body flex-1 overflow-y-auto px-6 md:px-10 pt-10 pb-8 ${
              tab === "projects" ? "theme-ide" : ""
            }`}
            style={{ zoom }}
          >
            {tab === "welcome" && <WelcomeTab cheering={isCheering} />}
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
          <div className="status-bar flex items-center justify-between px-3 py-1.5 text-xs shrink-0 gap-3">
            <span className="flex items-center gap-2 min-w-0">
              <span className="text-[#10b981]">●</span>
              <span className="truncate">
                ready · {tab}
                <span className="hidden sm:inline"> · {profile.status}</span>
              </span>
            </span>
            <span className="shrink-0">{time || "--:--"}</span>
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
  onAction,
}: {
  icon: DesktopIconDef;
  activeTab: TabKey;
  onSelectTab: (t: TabKey) => void;
  /** Side-effect run alongside the icon's normal click behaviour
      (href navigation or tab switch). Used by the coffee icon to fire
      the bean-rain easter egg. */
  onAction?: () => void;
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
        onClick={onAction}
      >
        {Visual}
        <span className="desktop-icon-label">{icon.label}</span>
      </a>
    );
  }

  return (
    <button
      onClick={() => {
        onAction?.();
        if (icon.tab) onSelectTab(icon.tab);
      }}
      className="desktop-icon"
      data-active={isActive}
    >
      {Visual}
      <span className="desktop-icon-label">{icon.label}</span>
    </button>
  );
}

/* ---------------- Coffee-bean rain easter egg ----------------
   Rendered into the desktop area when "love coffee" is clicked. Each
   bean is positioned absolutely with randomized horizontal start, fall
   duration, delay, scale, drift and rotation. The component is mounted
   for ~8s then unmounted by the parent.
*/
type Bean = {
  id: number;
  left: number;       // 0–100 (% of container width)
  duration: number;   // seconds — vertical traversal
  delay: number;      // seconds before first appearance
  scale: number;      // 0.4–1.4
  drift: number;      // -120 to 120 (px sideways travel)
  rotateEnd: number;  // total rotation degrees over the fall
  rotateDir: 1 | -1;  // spin direction
};

function makeBeans(count: number): Bean[] {
  const beans: Bean[] = [];
  for (let i = 0; i < count; i++) {
    beans.push({
      id: i,
      left: Math.random() * 100,
      duration: 3 + Math.random() * 3.5,        // 3–6.5s
      delay: -Math.random() * 4,                // negative -> some beans
                                                // mid-fall on mount
      scale: 0.45 + Math.random() * 0.95,       // 0.45–1.4
      drift: (Math.random() - 0.5) * 220,       // ±110px
      rotateEnd: 360 + Math.random() * 720,     // 1–3 full rotations
      rotateDir: Math.random() < 0.5 ? 1 : -1,
    });
  }
  return beans;
}

function BeanRain() {
  // Beans are generated once per mount so they don't re-randomize on
  // every render of the parent.
  const beans = useMemo(() => makeBeans(60), []);
  return (
    <div className="bean-rain" aria-hidden>
      {beans.map((b) => (
        <span
          key={b.id}
          className="bean-rain-cell"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration.toFixed(2)}s`,
            animationDelay: `${b.delay.toFixed(2)}s`,
            ["--bean-drift" as string]: `${b.drift.toFixed(0)}px`,
            ["--bean-rotate" as string]: `${(b.rotateEnd * b.rotateDir).toFixed(0)}deg`,
            ["--bean-scale" as string]: b.scale.toFixed(2),
          } as CSSProperties}
        >
          <img
            src="/icons/cofee-bean.png"
            alt=""
            className="bean-rain-img"
            draggable={false}
          />
        </span>
      ))}
    </div>
  );
}

/* ---------------- Dev avatar typing animation ----------------
   Drives a single visible <img> through a scripted sequence:
     [1, 2, 2.5] × 7   then the next closer in CLOSER_SEQUENCE
   Closers rotate in fixed order, looping back when the list ends.
   All frames are mounted to the DOM so the browser caches/decodes them
   once and frame swaps don't flash.
*/
/* Per-frame durations — typing is the fast cadence; expression frames
   (3, 4, 5) hold longer so closers don't feel rushed past. */
const TYPING_MS = 250;
const EXPRESSION_MS = 800;
const TYPING_PATTERN = ["1", "2", "2.5"] as const;
const TYPING_BLOCK_LENGTH = TYPING_PATTERN.length * 7; // 21 typing slots
const ALL_FRAMES = ["1", "2", "2.5", "3", "4", "5"] as const;
const EXPRESSION_FRAMES = new Set(["3", "4", "5"]);

/* Closers cycle in fixed order through this list — block 1 ends with the
   first entry, block 2 with the second, … then wraps back to the start.
   Add or reorder entries to change the rotation. */
const CLOSER_SEQUENCE: ReadonlyArray<readonly string[]> = [
  ["3"],
  ["5"],
  ["4", "5"],
];

function useDevAvatarFrame(): string {
  const [n, setN] = useState<string>(TYPING_PATTERN[0]);

  useEffect(() => {
    let pos = 0;
    let closerIndex = 0;
    let closer: readonly string[] = CLOSER_SEQUENCE[closerIndex];
    let timeoutId: number | null = null;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      pos += 1;
      let frame: string;
      if (pos < TYPING_BLOCK_LENGTH) {
        frame = TYPING_PATTERN[pos % TYPING_PATTERN.length];
      } else if (pos < TYPING_BLOCK_LENGTH + closer.length) {
        frame = closer[pos - TYPING_BLOCK_LENGTH];
      } else {
        // Block finished — restart on a typing frame and advance to the
        // next closer in the rotation.
        pos = 0;
        closerIndex = (closerIndex + 1) % CLOSER_SEQUENCE.length;
        closer = CLOSER_SEQUENCE[closerIndex];
        frame = TYPING_PATTERN[0];
      }
      setN(frame);
      const delay = EXPRESSION_FRAMES.has(frame) ? EXPRESSION_MS : TYPING_MS;
      timeoutId = window.setTimeout(tick, delay);
    };

    // First frame ("1") is already shown via initial state — schedule the
    // next swap after a typing-length hold so frame 1 reads at full speed.
    timeoutId = window.setTimeout(tick, TYPING_MS);

    return () => {
      cancelled = true;
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, []);

  return n;
}

function DevAvatar({ cheering = false }: { cheering?: boolean }) {
  const active = useDevAvatarFrame();
  return (
    <div
      className="dev-avatar"
      aria-label={
        cheering
          ? "Cheering illustration — celebrating the Hire-me click"
          : "Animated illustration of me typing at my computer"
      }
      role="img"
    >
      {/* All 6 typing frames + the cheering frame are mounted so they
          decode once and swaps are instant — no decode flash. While
          `cheering` is true, every typing frame is forced inactive and
          the yeepee frame takes over. */}
      {ALL_FRAMES.map((k) => (
        <img
          key={k}
          src={`/my-dev-avatar/my-dev-avatar-${k}.png`}
          alt=""
          aria-hidden
          className="dev-avatar-frame"
          data-active={!cheering && k === active}
          loading="eager"
        />
      ))}
      <img
        key="yeepee"
        src="/my-dev-avatar/yeepee.png"
        alt=""
        aria-hidden
        className="dev-avatar-frame"
        data-active={cheering}
        loading="eager"
      />
    </div>
  );
}

/* ---------------- Tabs ---------------- */

function WelcomeTab({ cheering = false }: { cheering?: boolean }) {
  return (
    <div>
      {/* Hero: tagline + why + bio on the left, animated avatar on the
          right. CTAs sit inside the hero column so they're visible above
          the scroll line on desktop. */}
      <div className="welcome-hero">
        <div className="welcome-hero-text">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8a7457] mb-2 flex items-center gap-1.5">
            <img
              src="/icons/location.png"
              alt=""
              aria-hidden
              width={14}
              height={14}
              className="inline-block shrink-0"
            />
            {profile.location}
          </p>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-[1.1] text-[#1a1a1a]">
            {profile.tagline}
          </h1>
          <p className="mt-2 text-base md:text-lg text-[#3f3f3f] leading-snug font-medium">
            Building from scratch to shipping — for the{" "}
            <span className="text-[#b56d1a]">fun</span> of learning.
          </p>

          <p className="mt-5 text-base md:text-lg text-[#1a1a1a] font-medium leading-relaxed">
            {profile.why}
          </p>
          <p className="mt-2 text-sm md:text-base text-[#4b4b4b] leading-relaxed">
            {profile.bio}
          </p>

          {/* Currently-building one-liner — saves recruiters a tab switch. */}
          <div className="mt-4 text-sm text-[#3f3f3f]">
            Currently building{" "}
            <strong className="text-[#1a1a1a]">
              {profile.currentlyBuilding.name}
            </strong>{" "}
            — {profile.currentlyBuilding.note}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">
              <Mail size={16} strokeWidth={2.5} /> Get in touch
            </a>
            <a href="/Shiezza-Lauron-Resume.pdf" download className="btn-download">
              <FileText size={16} strokeWidth={2.5} /> Download resume
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#4b4b4b]">
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
        </div>

        <DevAvatar cheering={cheering} />
      </div>

      {/* Compact stack — three rows of chips so the framework names are
          present without dominating the prose. */}
      <div className="mt-8 space-y-2">
        {heroStack.map((g) => (
          <div key={g.label} className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-[0.14em] text-[#9b8a6f] w-14 shrink-0">
              {g.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="code-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
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

      <div className="mt-10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#6b6b6b] mb-3">
          Skills
        </h2>
        <div className="space-y-3">
          {skills.map((g) => (
            <div key={g.label}>
              <p className="text-xs text-[#9b9b9b] mb-1.5">{g.label}</p>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((s) => (
                  <span key={s} className="code-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
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

                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-[#3f3f3f] leading-relaxed">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#f49a3a] mt-[2px] shrink-0">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.stack && job.stack.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <span key={s} className="code-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactTab() {
  type ContactLine = {
    label: string;
    value: string;
    href?: string;
    Icon: LucideLike;
  };
  const lines: ContactLine[] = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
    { label: "github", value: profile.github, href: profile.github, Icon: GithubMark },
    { label: "linkedin", value: profile.linkedin, href: profile.linkedin, Icon: LinkedinMark },
    { label: "résumé", value: "/Shiezza-Lauron-Resume.pdf", href: "/Shiezza-Lauron-Resume.pdf", Icon: FileText },
    { label: "tz", value: profile.timezone, Icon: Hash },
    { label: "hours", value: profile.availability, Icon: Hash },
  ];
  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15]">
        Let&apos;s talk.
      </h1>
      <p className="mt-3 text-[#3f3f3f] max-w-2xl">
        Best place to reach me. Pick whichever works — I usually reply
        within a day.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${profile.email}`} className="btn-primary">
          <Mail size={16} strokeWidth={2.5} /> Send an email
        </a>
        <a href={profile.linkedin} className="btn-secondary">
          <LinkedinMark width={16} height={16} /> Connect on LinkedIn
        </a>
        <a href="/Shiezza-Lauron-Resume.pdf" download className="btn-download">
          <FileText size={16} strokeWidth={2.5} /> Download resume
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
              {l.href ? (
                <a
                  href={l.href}
                  className="text-[#1a1a1a] hover:bg-[#f49a3a] px-1 -mx-1 rounded"
                >
                  {l.value}
                </a>
              ) : (
                <span className="text-[#1a1a1a]">{l.value}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
