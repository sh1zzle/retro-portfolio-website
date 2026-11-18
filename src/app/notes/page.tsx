import type { Metadata } from "next";
import Link from "next/link";
import DocWindow, { docMetadata } from "@/app/_components/doc-window";
import { notes } from "@/lib/content";

const description =
  "Short technical write-ups on bugs worth knowing about in React Native, Capacitor and iOS apps.";

export const metadata: Metadata = docMetadata("Notes", description, "website");

export default function NotesIndex() {
  return (
    <DocWindow file="notes/">
      <div className="doc-prose">
        <h1>Notes</h1>
        <p>{description}</p>
        <ul className="doc-list">
          {notes.map((n) => (
            <li key={n.slug}>
              <Link href={`/notes/${n.slug}`}>{n.title}</Link>
              <span className="doc-kicker"> · {n.date}</span>
              <p>{n.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </DocWindow>
  );
}
