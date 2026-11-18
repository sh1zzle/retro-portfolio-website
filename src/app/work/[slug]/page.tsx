import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DocWindow, { HireCta, docMetadata } from "@/app/_components/doc-window";
import { caseStudies } from "@/lib/content";

/* Only studies with a written-up page exist; any other slug is a 404
   rather than an on-demand render. */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.filter((c) => c.page).map((c) => ({ slug: c.slug }));
}

function findStudy(slug: string) {
  const study = caseStudies.find((c) => c.slug === slug);
  return study?.page ? { ...study, page: study.page } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const study = findStudy((await params).slug);
  if (!study) return {};
  return docMetadata(study.page.title, study.page.description, "article");
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const study = findStudy((await params).slug);
  if (!study) notFound();
  const { page } = study;

  return (
    <DocWindow file={`work/${study.slug}.md`}>
      <article className="doc-prose">
        <p className="doc-kicker">
          Case study · {study.client} · {study.kind} · {study.period}
        </p>
        <h1>{page.title}</h1>

        <h2>The problem</h2>
        {page.problem.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <h2>What I found</h2>
        {page.found.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="doc-detail">{page.detail}</p>
        {page.note && (
          <p>
            The full write-up: <Link href={page.note.href}>{page.note.label}</Link>.
          </p>
        )}

        <h2>The result</h2>
        <ul>
          {page.result.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>

        <HireCta heading="Stuck on something similar?" />

        <div className="doc-tags">
          {study.stack.map((s) => (
            <span key={s} className="code-chip">
              {s}
            </span>
          ))}
        </div>
      </article>
    </DocWindow>
  );
}
