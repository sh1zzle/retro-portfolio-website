const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/* Odometer-style text: each digit is a column of 0–9 that slides to the
   current value, so a change rolls instead of snapping. Non-digits
   (":" or ",") render as-is. Hidden from assistive tech; callers give
   the plain value in text nearby. */
export default function RollingDigits({ text }: { text: string }) {
  return (
    <span className="roll" aria-hidden>
      {[...text].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="roll-digit">
            <span className="roll-track" style={{ transform: `translateY(${-Number(ch)}em)` }}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </span>
  );
}
