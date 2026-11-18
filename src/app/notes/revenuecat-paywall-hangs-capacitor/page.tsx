import type { Metadata } from "next";
import Link from "next/link";
import DocWindow, { HireCta, docMetadata } from "@/app/_components/doc-window";
import { notes } from "@/lib/content";

const SLUG = "revenuecat-paywall-hangs-capacitor";
function findNote() {
  const found = notes.find((n) => n.slug === SLUG);
  if (!found) throw new Error(`notes entry "${SLUG}" is missing from content.ts`);
  return found;
}
const note = findNote();

export const metadata: Metadata = docMetadata(note.title, note.description, "article");

const BROKEN = `let purchasesPromise;

function getPurchases() {
  purchasesPromise ??= import("@revenuecat/purchases-capacitor")
    .then((mod) => mod.Purchases); // resolves with the plugin proxy
  return purchasesPromise;
}

const Purchases = await getPurchases(); // never returns`;

const WHY = `typeof Purchases.then; // "function"

// Resolving a promise with a thenable adopts it:
// the engine calls Purchases.then(resolve, reject)
// and waits for one of those callbacks.`;

const FIXED = `function getPurchases() {
  purchasesPromise ??= import("@revenuecat/purchases-capacitor")
    .then((mod) => ({ Purchases: mod.Purchases })); // a box, not the proxy
  return purchasesPromise;
}

const { Purchases } = await getPurchases(); // resolves`;

export default function RevenueCatPaywallNote() {
  return (
    <DocWindow file={`notes/${SLUG}.md`}>
      <article className="doc-prose">
        <p className="doc-kicker">Note · {note.date}</p>
        <h1>{note.title}</h1>

        <h2>The symptom</h2>
        <p>
          On iOS the paywall spinner never stops. Nothing throws, nothing
          times out, and the console has nothing that points at the paywall.
          An <code>await</code> on the RevenueCat SDK simply never returns.
          The same code works in the browser, so it looks like a native or
          StoreKit problem, and App Review rejects the build for a paywall
          that loads indefinitely.
        </p>
        <p>
          The usual trigger is lazy-loading the SDK, which is sensible in a
          Capacitor app that also ships to web or desktop:
        </p>
        <pre>
          <code>{BROKEN}</code>
        </pre>

        <h2>Why it never settles</h2>
        <p>
          Capacitor registers every native plugin as a JavaScript{" "}
          <code>Proxy</code>. Its <code>get</code> trap special-cases four
          names (<code>$$typeof</code>, <code>toJSON</code>,{" "}
          <code>addListener</code>, <code>removeListener</code>) and answers
          every other property with a function that forwards the call to the
          native side. That includes <code>then</code>.
        </p>
        <p>
          So the plugin object looks like a promise. When a promise is
          resolved with a value that has a callable <code>then</code>, the
          JavaScript engine does not hand the value over. It adopts it: it
          calls <code>value.then(resolve, reject)</code> and waits for one of
          those two callbacks.
        </p>
        <pre>
          <code>{WHY}</code>
        </pre>
        <p>
          With the plugin proxy, that call goes to a native method named{" "}
          <code>then</code>, which does not exist. The failure lands on a
          separate promise nobody is holding, at most an unhandled rejection
          saying <code>Purchases.then()</code> is not implemented, and the{" "}
          <code>resolve</code> and <code>reject</code> the engine passed in
          are never called. The promise you are awaiting stays pending
          forever.
        </p>
        <p>
          Anything that resolves a promise with the proxy does this: returning
          it from an <code>async</code> function, returning it from a{" "}
          <code>.then</code> callback, or <code>Promise.resolve(Purchases)</code>.
          It is not specific to RevenueCat either; any Capacitor plugin object
          behaves the same way.
        </p>

        <h2>The fix</h2>
        <p>
          Never let a promise resolve with the plugin object. Put it in a
          plain object and take it out after the <code>await</code>:
        </p>
        <pre>
          <code>{FIXED}</code>
        </pre>
        <p>
          The box has no <code>then</code>, so the promise resolves normally,
          and destructuring it afterwards is a plain property read with no
          promise involved.
        </p>
        <p>Two related guards worth adding while you are in there:</p>
        <ul>
          <li>
            Run <code>configure()</code> once and make every SDK call wait for
            it. A paywall that opens quickly can otherwise reach the SDK
            before it is configured, and that call is rejected.
          </li>
          <li>
            Put a timeout on loading the SDK and on fetching offerings, and
            do not cache a failed load, so the paywall can show a retry
            instead of spinning.
          </li>
        </ul>
        <p>
          This was the root cause behind a stuck App Store release I fixed.
          The full story is in the <Link href="/work/dash">Dash case study</Link>.
        </p>

        <HireCta heading="Paywall or purchases misbehaving?" />
      </article>
    </DocWindow>
  );
}
