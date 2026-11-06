import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { Section, H2, Lede } from '@/components/PageSection';
import { DEFAULT_BROCHURE } from '@/lib/content/documents-shared';

export const metadata: Metadata = {
  title: 'Mandatory Disclosures — MLRIT',
  description:
    'AICTE mandatory disclosure documents for MLR Institute of Technology, year-wise from 2017-18 to 2025-26.',
};

// Source: mlrit.ac.in/mandatory-disclosures/ — PDFs hosted on files.mlrit.ac.in.
const DOCS = [
  { tag: 'Disclosure', label: 'Mandatory Disclosure 2025-26', href: 'https://files.mlrit.ac.in/uploads/AICTE_Mandatory_Disclosure-2025-26_FINAL.pdf' },
  { tag: 'Disclosure', label: 'Mandatory Disclosure 2024-25', href: 'https://files.mlrit.ac.in/uploads/2024-25.pdf' },
  { tag: 'Disclosure', label: 'Mandatory Disclosure 2023-24', href: 'https://files.mlrit.ac.in/uploads/2023-24.pdf' },
  { tag: 'Disclosure', label: 'Mandatory Disclosure 2022-23', href: 'https://files.mlrit.ac.in/uploads/AICTEMandatoryDisclosure-2022-23.pdf' },
  { tag: 'Brochure', label: 'Institutional Brochure 2026', href: DEFAULT_BROCHURE },
];

export default function MandatoryDisclosuresPage() {
  return (
    <>
      <PageHeader
        eyebrow="Governance"
        title="Mandatory Disclosures"
        italic=""
        dek="AICTE mandatory disclosure documents and institutional publications, published year-wise."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Mandatory Disclosures' }]}
      />

      <Section id="documents">
        <H2 italic="">Disclosure Documents</H2>
        <Lede>Official disclosure filings hosted on the institutional file server.</Lede>
        <div className="mt-5 md:mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {DOCS.map((d) => (
            <a
              key={d.label}
              href={d.href}
              target={d.href.startsWith('http') ? '_blank' : undefined}
              rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group block rounded-2xl border border-border bg-white p-4 md:p-6 hover:border-secondary hover:-translate-y-1 transition-all"
            >
              <div className="font-mono text-[0.62rem] font-bold tracking-[0.2em] uppercase text-secondary mb-2">{d.tag}</div>
              <div className="font-sans font-extrabold text-foreground text-[0.95rem] group-hover:text-secondary transition-colors leading-snug">{d.label}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-secondary font-semibold text-[0.78rem] group-hover:gap-2 transition-all">Open →</div>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
