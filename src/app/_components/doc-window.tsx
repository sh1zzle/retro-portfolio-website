import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { hireHint, hireMailto, profile } from "@/lib/content";

/* Metadata for a document page. Child metadata replaces the root's
   `openGraph` and `twitter` objects wholesale, so the shared share image
   from app/opengraph-image.tsx has to be named again here. */
export function docMetadata(
  heading: string,
  description: string,
  type: "article" | "website",
): Metadata {
  const title = `${heading} · ${profile.name}`;
  const images = ["/opengraph-image"];
  return {
    title,
    description,
    openGraph: { title, description, type, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/* Closing call to action for case studies and notes. */
export function HireCta({ heading }: { heading: string }) {
  return (
    <div className="doc-cta">
      <p className="font-bold">{heading}</p>
      <p className="mt-1 text-sm">
        {hireHint}{" "}
        <a href={profile.booking} target="_blank" rel="noopener noreferrer">
          Or book a call
        </a>
        .
      </p>
      <a href={hireMailto} className="btn-primary mt-3">
        Tell me about your app
      </a>
    </div>
  );
}

/* One document window on the desktop wallpaper, for the standalone pages
   (case studies, notes). The homepage's window is part of its client-side
   tab shell, so this is a second, static copy of its title bar. The page
   scrolls as a whole rather than inside the window, since each page is a
   single document. */
export default function DocWindow({
  file,
  children,
}: {
  /** File-style name shown in the title bar, e.g. "work/dash.md". */
  file: string;
  children: ReactNode;
}) {
  return (
    <main className="os-desktop min-h-dvh px-4 py-8 md:py-12">
      <div className="ph-window relative mx-auto w-full max-w-3xl">
        <div className="mac-titlebar">
          <div className="mac-traffic" aria-label="Window controls">
            <Link href="/" className="mac-dot" aria-label="Close and go to the homepage" title="close · back to the desktop">
              <img src="/icons/macClose.png" alt="" aria-hidden width={20} height={20} />
            </Link>
            <span className="mac-dot" aria-hidden>
              <img src="/icons/macMin.png" alt="" width={20} height={20} />
            </span>
            <span className="mac-dot" aria-hidden>
              <img src="/icons/macResize.png" alt="" width={20} height={20} />
            </span>
          </div>
          <span className="mac-title">
            <img src="/icons/portfolio.svg" alt="" aria-hidden width={16} height={16} />
            <span>{file}</span>
          </span>
          <Link href="/#contact" className="btn-primary btn-sm hire-me-btn mac-titlebar-cta">
            <span className="hire-me-dot" aria-hidden /> Hire me
          </Link>
        </div>

        <div className="doc-body px-6 md:px-10 pt-6 pb-10">
          <Link href="/" className="doc-back">
            ← devpresso.dev
          </Link>
          {children}
        </div>
      </div>
    </main>
  );
}
