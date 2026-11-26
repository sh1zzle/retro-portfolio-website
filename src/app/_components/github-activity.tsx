"use client";

import { useEffect, useState } from "react";
import RollingDigits from "@/app/_components/rolling-digits";
import type { ContributionDay, ContributionsPayload } from "@/app/api/github-contributions/route";

type Load =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; data: ContributionsPayload };

const RANGES = [
  { key: "30", label: "30 days", days: 30 },
  { key: "90", label: "90 days", days: 90 },
  { key: "year", label: "Year", days: 365 },
] as const;
type RangeKey = (typeof RANGES)[number]["key"];

const SKELETON_WEEKS: ContributionDay[][] = Array.from({ length: 53 }, () =>
  Array.from({ length: 7 }, () => ({ date: "", count: 0 })),
);

function dayLabel(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function shiftIso(iso: string, days: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/* GitHub-style shading: quartiles of the days that had any activity, so
   one huge day does not flatten everything else to the lightest shade. */
function levelScale(days: ContributionDay[]) {
  const counts = days.map((d) => d.count).filter((c) => c > 0).sort((a, b) => a - b);
  const q = (p: number) => counts[Math.floor((counts.length - 1) * p)] ?? 0;
  const [q1, q2, q3] = [q(0.25), q(0.5), q(0.75)];
  return (c: number) => (c === 0 ? 0 : c <= q1 ? 1 : c <= q2 ? 2 : c <= q3 ? 3 : 4);
}

/* Contribution calendar for the About tab, in the site's orange scale.
   Most activity is in private client repos, which GitHub reports as
   counts only. */
export default function GithubActivity({ profileUrl }: { profileUrl: string }) {
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [range, setRange] = useState<RangeKey>("year");

  useEffect(() => {
    let alive = true;
    async function run() {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data = (await res.json()) as ContributionsPayload;
        if (alive) setLoad({ status: "ready", data });
      } catch (err) {
        console.warn("GitHub activity unavailable:", err);
        if (alive) setLoad({ status: "error" });
      }
    }
    void run();
    return () => {
      alive = false;
    };
  }, []);

  const handle = new URL(profileUrl).pathname.replace(/\//g, "");

  if (load.status === "error") {
    return (
      <p className="mt-10 text-sm text-[#3f3f3f]">
        My commit history is on{" "}
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          github.com/{handle}
        </a>
        .
      </p>
    );
  }

  const weeks = load.status === "ready" ? load.data.weeks : SKELETON_WEEKS;
  const days = weeks.flat();
  const lastDate = days.at(-1)?.date ?? "";
  const span = RANGES.find((r) => r.key === range)?.days ?? 365;
  const cutoff = lastDate ? shiftIso(lastDate, -(span - 1)) : "";
  const inRange = (d: ContributionDay) => d.date >= cutoff;

  const ranged = days.filter((d) => d.date && inRange(d));
  const total = ranged.reduce((sum, d) => sum + d.count, 0);
  const activeDays = ranged.filter((d) => d.count > 0).length;
  const perWeek = ranged.length ? Math.round(total / (ranged.length / 7)) : 0;
  const level = levelScale(days);
  const ready = load.status === "ready";
  const rangeLabel = range === "year" ? "the last year" : `the last ${span} days`;

  return (
    <section className="gh-shell mt-10" aria-label="GitHub activity">
      <div className="gh-head">
        <span>
          <span className="gh-handle">{handle}</span> <span className="text-[#9b9b9b]">on</span> GitHub
        </span>
        <span className="text-[#6b6b6b]">{ready ? "updated daily" : "loading…"}</span>
      </div>

      <div className="gh-inner">
        <div className="gh-stats">
          <p className="gh-total">
            {ready ? <RollingDigits text={total.toLocaleString("en-US")} /> : <span aria-hidden>—</span>}
            <span className="gh-total-unit">contributions</span>
            {ready && <span className="sr-only">{`${total.toLocaleString("en-US")} contributions in ${rangeLabel}`}</span>}
          </p>
          {ready && (
            <p className="gh-side">
              <b>≈ {perWeek} / week</b>
              <span>
                active {activeDays} of {ranged.length} days
              </span>
            </p>
          )}
        </div>

        <div
          className="gh-grid"
          role="img"
          aria-label={ready ? `Contribution calendar for ${rangeLabel}` : "Loading contribution calendar"}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="gh-week">
              {week.map((d, di) => (
                <span
                  key={d.date || di}
                  className="gh-cell"
                  data-level={ready ? level(d.count) : 0}
                  data-out={ready && !inRange(d) ? "" : undefined}
                  title={d.date ? `${d.count} contribution${d.count === 1 ? "" : "s"} on ${dayLabel(d.date)}` : undefined}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="gh-legend" aria-hidden>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className="gh-cell" data-level={l} />
          ))}
          <span>More</span>
        </div>

        <div className="gh-ranges" role="group" aria-label="Range">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={range === r.key}
              className="gh-range"
              disabled={!ready}
              onClick={() => setRange(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <p className="gh-foot">
        Most of my work lives in private client repos. GitHub counts it here without naming them.
      </p>
    </section>
  );
}
