"use client";

import { useSyncExternalStore } from "react";
import RollingDigits from "@/app/_components/rolling-digits";
import {
  cityName,
  daylightLevel,
  describeOffset,
  formatDay,
  formatTime,
  isValidZone,
  minuteOfDay,
  offsetMinutes,
  replyByMs,
  wallClock,
} from "@/lib/time-zones";

const CELLS = 48;
const CELL_MINUTES = 1440 / CELLS;

/* The server knows neither the visitor's zone nor the minute the page
   will hydrate in, so both read as null there and the strip renders its
   frame until the browser fills it in. */
function subscribeMinute(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  const schedule = () => {
    timer = setTimeout(() => {
      onChange();
      schedule();
    }, 60000 - (Date.now() % 60000));
  };
  schedule();
  return () => clearTimeout(timer);
}
const currentMinute = () => Math.floor(Date.now() / 60000) * 60000;
const subscribeNever = () => () => {};
function detectZone() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return zone && isValidZone(zone) ? zone : null;
}
const onServer = () => null;

function DayBar({ shift, now }: { shift: number; now: number | null }) {
  return (
    <div className="tz-bar" aria-hidden>
      {Array.from({ length: CELLS }, (_, i) => (
        <span
          key={i}
          className="tz-cell"
          data-level={daylightLevel(i * CELL_MINUTES + CELL_MINUTES / 2 + shift)}
        />
      ))}
      {now !== null && (
        <span className="tz-now" style={{ left: `${(now / 1440) * 100}%` }} />
      )}
    </div>
  );
}

function ClockRow({
  who,
  place,
  zone,
  ms,
  shift,
  axisMinute,
}: {
  who: string;
  place: string;
  zone: string;
  ms: number | null;
  shift: number;
  axisMinute: number | null;
}) {
  const w = ms === null ? null : wallClock(zone, ms);
  return (
    <div className="tz-row">
      <div className="tz-row-head">
        <span className="tz-who">
          <b>{who}</b> · {place}
        </span>
        <span className="tz-clock">
          <span className="tz-date">{w ? formatDay(w) : " "}</span>
          {w ? <RollingDigits text={formatTime(w)} /> : <span aria-hidden>--:--</span>}
        </span>
      </div>
      <DayBar shift={shift} now={axisMinute} />
    </div>
  );
}

/* Two 24-hour day/night bars on the visitor's own clock, so the gap to
   Chiang Mai is visible at a glance, plus the "within a day" reply
   promise turned into a time in the visitor's zone. Deliberately shows
   no working hours. */
export default function TimeDifference({
  homeZone,
  homeCity,
}: {
  homeZone: string;
  homeCity: string;
}) {
  const ms = useSyncExternalStore(subscribeMinute, currentMinute, onServer);
  const visitorZone = useSyncExternalStore(subscribeNever, detectZone, onServer);

  const diff =
    ms !== null && visitorZone !== null
      ? offsetMinutes(homeZone, ms) - offsetMinutes(visitorZone, ms)
      : null;
  const sameTime = diff === 0;
  const axisZone = visitorZone ?? homeZone;
  const axisMinute = ms === null ? null : minuteOfDay(wallClock(axisZone, ms));

  const replyBy = ms === null ? null : wallClock(axisZone, replyByMs(ms));
  const replyLine = replyBy
    ? `Send a message now and you'll hear back by ${formatDay(replyBy)}.`
    : "I usually reply within a day.";

  const summary =
    ms !== null && visitorZone !== null && !sameTime
      ? `It's ${formatTime(wallClock(visitorZone, ms))} on ${formatDay(wallClock(visitorZone, ms))} for you and ${formatTime(wallClock(homeZone, ms))} on ${formatDay(wallClock(homeZone, ms))} in ${homeCity}.`
      : null;

  return (
    <section className="tz-card mt-8" aria-label="Time difference">
      <p className="tz-label">time difference</p>
      {summary && <p className="sr-only">{summary}</p>}

      <div className="tz-rows">
        {visitorZone !== null && !sameTime && (
          <ClockRow
            who="You"
            place={cityName(visitorZone)}
            zone={visitorZone}
            ms={ms}
            shift={0}
            axisMinute={axisMinute}
          />
        )}
        <ClockRow
          who={sameTime ? "You and me" : "Me"}
          place={homeCity}
          zone={homeZone}
          ms={ms}
          shift={diff ?? 0}
          axisMinute={axisMinute}
        />
        <div className="tz-axis" aria-hidden>
          {["00", "06", "12", "18", "24"].map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
      </div>

      <div className="tz-notes">
        {diff !== null && <p>{describeOffset(homeCity, diff)}</p>}
        <p className="tz-reply">{replyLine}</p>
      </div>
    </section>
  );
}
