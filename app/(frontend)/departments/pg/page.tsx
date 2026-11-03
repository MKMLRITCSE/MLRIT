import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { Section, H2, Lede } from '@/components/PageSection';
import { DEPARTMENTS } from '@/lib/departments';
import AcademicsQuickNav from '@/components/AcademicsQuickNav';
import { getSection } from '@/lib/content/client';
import { asText } from '@/lib/content/sections';

export const metadata: Metadata = { title: 'Postgraduate Programmes — MLRIT' };

const MTECH = [
  { code: 'MTech-CSE',  name: 'Computer Science & Engineering', tag: 'AI/ML and systems specialisations.' },
  { code: 'MTech-VLSI', name: 'VLSI System Design',             tag: 'Front-end and back-end VLSI tracks with FPGA labs.' },
  { code: 'MTech-PS',   name: 'Power Systems',                  tag: 'Smart grid, renewables and protection.' },
  { code: 'MTech-AERO', name: 'Aerospace Propulsion',           tag: 'Propulsion, materials and unmanned systems.' },
];

export default async function PGPage() {
  const row = await getSection('departments', 'pg').catch(() => null);
  const c = (row?.content ?? {}) as Record<string, unknown>;
  const copy = (key: string, fallback: string) => asText(c[key], fallback);
  const mba = DEPARTMENTS.find((d) => d.slug === 'mba')!;
  return (
    <>
      <PageHeader
        eyebrow="M.Tech & MBA"
        title="Postgraduate"
        italic="programmes."
        dek="Two-year M.Tech specialisations and a two-year MBA — research-led, industry-anchored, designed for postgraduate growth."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Academics' }, { label: 'Postgraduate' }]}
        variant="green"
      />
      <AcademicsQuickNav active="/departments/pg" />
      <Section>
        <H2 italic="specialisations">{copy('mTech', 'M.Tech')}</H2>
        <Lede>{copy('fourResearchLedM', 'Four research-led M.Tech tracks across CSE, VLSI, Power Systems and Aerospace Propulsion.')}</Lede>
        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-3 md:gap-5">
          {MTECH.map((m) => (
            <div key={m.code} className="rounded-2xl border border-border bg-white p-4 md:p-7 hover:border-primary transition-colors">
              <div className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-secondary">{m.code}</div>
              <div className="mt-2 font-sans font-extrabold text-foreground text-xl">{m.name}</div>
              <p className="mt-3 text-muted leading-relaxed">{m.tag}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section surface>
        <H2 italic="(Management)">MBA</H2>
        <Lede>{mba.tagline}</Lede>
        <div className="mt-6 max-w-[880px] flex flex-col gap-4 rounded-xl bg-white p-5 md:p-6 shadow-card-soft border-l-[3px] border-secondary sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="font-sans font-bold text-foreground text-[1rem]">MBA R25 Syllabus</div>
            <div className="mt-0.5 text-muted text-[0.82rem]">2025 regulation · Word document</div>
          </div>
          <a
            href="/syllabus/mba-r25-syllabus.docx"
            download
            className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-secondary px-5 py-2.5 font-sans font-bold text-[0.86rem] text-white transition-colors hover:bg-secondary-pressed"
          >
            Download
          </a>
        </div>
        <Link href="/departments/mba" className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-white font-semibold hover:bg-primary transition-colors">{copy('exploreMbaProgramme', 'Explore MBA programme →')}</Link>
      </Section>
    </>
  );
}
