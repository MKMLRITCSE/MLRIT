import type { Metadata } from 'next';
import { getSection } from '@/lib/content/client';
import { asText } from '@/lib/content/sections';
import { circularsFrom } from '@/lib/content/circulars';
import type { CircularCategory } from '@/lib/content/circulars-data';
import ExaminationsHero from '@/components/ExaminationsHero';
import ExaminationsQuickNav from '@/components/ExaminationsQuickNav';
import DocActions from '@/components/examinations/DocActions';
import Reveal, { Stagger, StaggerItem } from '@/components/motion/Reveal';
import SideQuickNav from '@/components/SideQuickNav';

export const metadata: Metadata = {
  title: 'Circulars — Examinations — MLRIT',
  description: 'Official examination circulars published by the Controller of Examinations at MLRIT.',
};

const BADGE_STYLES: Record<CircularCategory, string> = {
  Timetable:   'bg-green-50 border-green-200 text-secondary',
  Fee:         'bg-orange-50 border-orange-200 text-primary',
  Results:     'bg-blue-50 border-blue-200 text-blue-700',
  Notice:      'bg-warm-light border-border text-muted',
  Condonation: 'bg-purple-50 border-purple-200 text-purple-700',
};

const NAV_ITEMS = [
  { id: 'circulars', label: 'Circulars' },
];

export const revalidate = 60;

export default async function CircularsPage() {
  const row = await getSection('examinations', 'circulars').catch(() => null);
  const c = (row?.content ?? {}) as Record<string, unknown>;
  const copy = (key: string, fallback: string) => asText(c[key], fallback);
  const circulars = circularsFrom(c.circulars);

  return (
    <>
      <ExaminationsHero
        title="COE"
        italic="Circulars."
        dek="Official circulars issued by the Controller of Examinations — examination schedules, fee notifications, mark verifications and general instructions."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Examinations', href: '/examinations/coe' },
          { label: 'Circulars' },
        ]}
      />
      <ExaminationsQuickNav active="/examinations/circulars" />

      <div className="lg:flex lg:gap-0 items-start">
        <aside className="hidden lg:block lg:w-56 shrink-0 self-start sticky top-28">
          <div className="pt-12 pl-6">
            <SideQuickNav items={NAV_ITEMS} />
          </div>
        </aside>
        <div className="flex-1 min-w-0">

      <section id="circulars" className="bg-warm-light min-h-[60vh] py-8 md:py-14">
        <div className="w-full px-4 md:px-10 lg:px-12">

          <Reveal>
            <span className="font-mono text-[0.7rem] font-bold tracking-[0.22em] uppercase text-secondary">
              {circulars.length} Circulars
            </span>
            <h2 className="mt-3 font-sans font-black tracking-tighter text-foreground text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.04]">{copy('recent', 'Recent')}<span className="font-display italic font-medium text-primary">{copy('circulars', 'circulars.')}</span>
            </h2>
          </Reveal>

          <Stagger className="mt-6 md:mt-10 space-y-3" delay={0.04} amount={0.01}>
            {circulars.map((c) => (
              <StaggerItem key={c.id}>
                <div className="bg-white rounded-2xl border border-border px-4 py-3 md:px-5 md:py-4 flex items-center gap-3 md:gap-4 hover:border-secondary/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[0.6rem] font-mono font-bold tracking-widest uppercase ${BADGE_STYLES[c.category]}`}>
                        {c.category}
                      </span>
                      <span className="font-mono text-[0.62rem] text-muted tracking-wide">{c.date}</span>
                    </div>
                    <p className="font-sans font-semibold text-foreground text-[0.88rem] leading-snug truncate" title={c.title}>
                      {c.title}
                    </p>
                  </div>
                  <DocActions
                    href={c.href}
                    filename={c.filename}
                    viewLabel={copy('viewLabel', 'View')}
                    downloadLabel={copy('downloadLabel', 'Download')}
                  />
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal preset="up" delay={0.2}>
            <div className="mt-6 md:mt-8 p-4 md:p-5 rounded-xl border border-border bg-white flex items-start gap-3">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-secondary shrink-0 mt-0.5" aria-hidden>
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 7v5M8 5v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p className="text-muted text-[0.85rem] leading-relaxed">
                For queries about a specific circular, contact the COE office at{' '}
                <a href="mailto:coe@mlrinstitutions.ac.in" className="text-secondary font-semibold hover:underline">{copy('coeMlrinstitutionsAcIn', 'coe@mlrinstitutions.ac.in')}</a>{' '}
                or visit the{' '}
                <a href="/examinations/contact" className="text-secondary font-semibold hover:underline">{copy('contactUs', 'Contact Us')}</a>{' '}
                page.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

        </div>
      </div>
    </>
  );
}
