/* Pure time-zone helpers for the Contact tab's time-difference strip.
   Everything goes through Intl, so offsets follow each zone's own
   daylight-saving rules and half-hour zones come out right. */

export type WallClock = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const formatters = new Map<string, Intl.DateTimeFormat>();

function numericFormatter(zone: string) {
  let f = formatters.get(zone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    });
    formatters.set(zone, f);
  }
  return f;
}

export function isValidZone(zone: string) {
  try {
    numericFormatter(zone);
    return true;
  } catch {
    return false;
  }
}

export function wallClock(zone: string, ms: number): WallClock {
  const parts = numericFormatter(zone).formatToParts(new Date(ms));
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

/** Minutes the zone is ahead of UTC at that instant (UTC+7 → 420). */
export function offsetMinutes(zone: string, ms: number) {
  const w = wallClock(zone, ms);
  const asUtc = Date.UTC(w.year, w.month - 1, w.day, w.hour, w.minute);
  return Math.round((asUtc - Math.floor(ms / 60000) * 60000) / 60000);
}

export function minuteOfDay(w: WallClock) {
  return w.hour * 60 + w.minute;
}

/** "Thu 27 Nov" */
export function formatDay(w: WallClock) {
  return new Date(Date.UTC(w.year, w.month - 1, w.day)).toLocaleDateString(
    "en-GB",
    { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" },
  );
}

/** "09:05" */
export function formatTime(w: WallClock) {
  return `${String(w.hour).padStart(2, "0")}:${String(w.minute).padStart(2, "0")}`;
}

/** "America/Los_Angeles" → "Los Angeles" */
export function cityName(zone: string) {
  return (zone.split("/").pop() ?? zone).replace(/_/g, " ");
}

function amount(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const hours = h === 1 ? "1 hour" : `${h} hours`;
  if (m === 0) return hours;
  if (m === 30 && h > 0) return `${h}.5 hours`;
  const mins = `${m} minutes`;
  return h === 0 ? mins : `${hours} ${mins}`;
}

/** How far `place` is from the visitor, given `diff` = place offset − visitor offset. */
export function describeOffset(place: string, diff: number) {
  if (diff === 0) return `${place} is on the same time as you.`;
  return `${place} is ${amount(Math.abs(diff))} ${diff > 0 ? "ahead of" : "behind"} you.`;
}

/** The instant a reply is promised by: a day from now, rounded up to the hour. */
export function replyByMs(nowMs: number) {
  const hour = 3600000;
  return Math.ceil((nowMs + 24 * hour) / hour) * hour;
}

/** Daylight level 0 (night) to 4 (midday) for a local minute of the day. */
export function daylightLevel(localMinute: number) {
  const h = (((localMinute % 1440) + 1440) % 1440) / 60;
  if (h < 5 || h >= 21) return 0;
  if (h < 6.5 || h >= 19.5) return 1;
  if (h < 8.5 || h >= 17.5) return 2;
  if (h < 10.5 || h >= 15.5) return 3;
  return 4;
}
