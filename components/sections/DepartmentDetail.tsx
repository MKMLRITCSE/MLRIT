'use client';

/**
 * Department detail page — legacy-style layout, premium polish.
 *
 *   ┌──────────────────────────────────────────────────────┐
 *   │ Hero (green) — eyebrow pill + dept title            │
 *   ├──────────────────────────────────────────────────────┤
 *   │ Sticky dark tab bar — Overview · Objectives · …     │
 *   ├──────┬───────────────────────────────────────────────┤
 *   │ Side │ Active panel content                          │
 *   │ nav  │   • Introduction + HOD card                   │
 *   │      │   • Vision & Mission                          │
 *   │      │   • Innovative Teaching                       │
 *   │      │   • History · Labs accordions                 │
 *   └──────┴───────────────────────────────────────────────┘
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Department } from '@/lib/departments';
import { DEPT_DATA, type DeptData } from '@/lib/dept-data';
import { getFacultyByDepartment, type FacultyProfile } from '@/lib/faculty';
import DepartmentHero from '@/components/sections/DepartmentHero';
import DeptIntakeChart from '@/components/DeptIntakeChart';
import { getSyllabusCourses } from '@/lib/syllabus-data';
import { useHideOnScroll } from '@/lib/useHideOnScroll';

type Props = { department: Department };
type PanelProps = { d: Department; data: DeptData };

const FALLBACK_DATA: DeptData = {
  vision: '',
  mission: [],
  history: '',
  introduction: '',
  hodMessage: '',
  teachingMethodology:
    'The department follows an active-learning pedagogy integrating project-based learning, flipped classrooms, and industry-mentored hackathons. Regular guest lectures from industry professionals complement the curriculum.',
  peos: [],
  labs: [],
  faculty: [],
  studentAchievements: [],
};
type TabId =
  | 'overview'
  | 'objectives'
  | 'faculty'
  | 'academics'
  | 'achievements'
  | 'publications'
  | 'placements'
  | 'mous'
  | 'committees';

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'objectives',   label: 'Objectives and Outcomes' },
  { id: 'faculty',      label: 'Faculty Profiles' },
  { id: 'academics',    label: 'Curriculum' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'publications', label: 'Publications and Research' },
  { id: 'placements',   label: 'Internships and Placements' },
  { id: 'mous',         label: 'MOUs' },
  { id: 'committees',   label: 'Committees' },
];

const QUICK_NAV: Record<TabId, { id: string; label: string }[]> = {
  overview: [
    { id: 'intro',     label: 'Introduction' },
    { id: 'vm',        label: 'Vision & Mission' },
    { id: 'teaching',  label: 'Teaching' },
    { id: 'history',   label: 'History' },
    { id: 'labs',      label: 'Labs' },
  ],
  objectives: [
    { id: 'peos',     label: 'PEOs' },
    { id: 'obe',      label: 'OBE' },
    { id: 'handbook', label: 'Handbook' },
  ],
  faculty: [
    { id: 'all-faculty', label: 'All Faculty' },
  ],
  academics: [
    { id: 'syllabus-pdfs', label: 'Syllabus PDFs' },
    { id: 'catalog',       label: 'Course Catalog' },
    { id: 'explorer',      label: 'Syllabus Explorer' },
  ],
  achievements: [
    { id: 'achieve', label: 'Achievements' },
    { id: 'honour',  label: 'Roll of Honour' },
  ],
  publications: [
    { id: 'pubs', label: 'Publications' },
  ],
  placements: [
    { id: 'placement-stats', label: 'Placement Highlights' },
    { id: 'intern-stats',    label: 'Internships' },
  ],
  mous: [
    { id: 'mous', label: 'MOUs' },
  ],
  committees: [
    { id: 'dac',     label: 'DAC' },
    { id: 'pac',     label: 'PAC' },
    { id: 'experts', label: 'Domain Experts' },
  ],
};

export default function DepartmentDetail({ department: d }: Props) {
  const [tab, setTab] = useState<TabId>('overview');
  const [activeNav, setActiveNav] = useState<string>('intro');
  const navHidden = useHideOnScroll();
  const data: DeptData = DEPT_DATA[d.slug] ?? {
    ...FALLBACK_DATA,
    vision: d.vision,
    mission: d.mission,
    peos: d.peos.map((p) => ({ id: p.id, text: p.text })),
  };

  // Some departments (e.g. the shared first-year foundation) have no
  // placements/internships or industry MoUs — hide those tabs rather than
  // showing an empty section.
  const showPlacements = !!(
    data.placementStats?.length ||
    data.internStats?.length ||
    data.internships?.length ||
    data.internList?.length
  );
  const showMous = !!(data.mous?.length || data.mouNote);
  const visibleTabs = TABS.filter((t) => {
    if (t.id === 'placements') return showPlacements;
    if (t.id === 'mous') return showMous;
    if (t.id === 'academics') return d.level !== 'pg' || d.slug === 'mba';
    return true;
  });

  // The H&S Curriculum tab shows each branch's Year 1 syllabus instead of the
  // usual PDFs/catalog/explorer layout — give it its own quick-nav. MBA shows a
  // single complete-syllabus document.
  const quickNavItems: { id: string; label: string }[] =
    tab === 'academics' && d.slug === 'hs'
      ? [
          { id: 'syllabus-pdfs',   label: 'Syllabus PDF' },
          { id: 'syllabus-inline', label: 'Year 1 Syllabus' },
        ]
      : tab === 'academics' && d.slug === 'mba'
        ? [{ id: 'syllabus-pdfs', label: 'Syllabus' }]
        : QUICK_NAV[tab];

  // Scroll-spy — highlight nav item matching the section in view.
  // quickNavItems is derived synchronously from tab — listing tab alone is correct.
  useEffect(() => {
    const items = quickNavItems;
    if (!items.length) return;
    setActiveNav(items[0].id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveNav(visible[0].target.id);
      },
      { rootMargin: '-220px 0px -60% 0px', threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 220;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── HERO — editorial chapter cover ─────────────────── */}
      <DepartmentHero department={d} reels={d.reels ?? []} />

      {/* ── STICKY TAB BAR ─────────────────────────────────── */}
      <nav
        className={`bg-white border-b border-border sticky z-40 transition-[top,transform] duration-300 ease-out-quart lg:translate-y-0 ${
          navHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ top: 'var(--subnav-top)' }}
      >
        {/* Mobile / tablet — all tabs visible at once, wrapping instead of scrolling off-screen.
            The whole bar slides away on scroll-down and back on scroll-up, same as the main
            navbar — but only below lg (the lg:translate-y-0 override keeps desktop static). */}
        <div className="flex flex-wrap gap-1 max-w-[1600px] mx-auto pl-4 pr-14 py-1.5 lg:hidden">
          {visibleTabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  window.scrollTo({
                    top: Math.max(0, window.scrollY),
                    behavior: 'auto',
                  });
                }}
                className={`px-2.5 py-1 rounded-full text-[0.7rem] leading-tight font-medium border transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-primary text-white border-primary font-semibold'
                    : 'bg-white text-muted border-border hover:border-primary hover:text-foreground'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Desktop — original horizontal underline tabs, unchanged */}
        <div className="hidden lg:flex items-center gap-1 max-w-[1600px] mx-auto px-2 md:px-6 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {visibleTabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  window.scrollTo({
                    top: Math.max(0, window.scrollY),
                    behavior: 'auto',
                  });
                }}
                className={`shrink-0 px-4 py-4 font-sans font-medium text-[0.88rem] border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? 'text-foreground border-primary font-semibold'
                    : 'text-muted hover:text-foreground border-transparent hover:border-primary'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── BODY — sidebar + panels ────────────────────────── */}
      <div className="bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14">
          {/* Sidebar */}
          <aside className="lg:sticky lg:self-start lg:top-[calc(var(--subnav-top)+80px)] transition-[top] duration-300 ease-out-quart">
            <div className="font-mono text-[0.62rem] font-extrabold tracking-[0.22em] uppercase text-secondary mb-4">
              Quick Nav
            </div>
            <nav className="flex flex-col gap-0.5">
              {quickNavItems.map((n) => {
                const active = activeNav === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => handleNavClick(n.id)}
                    className={`group flex items-center gap-3 py-2.5 pl-3 pr-2 rounded-r-md text-left text-[0.86rem] transition-all duration-200 border-l-2 ${
                      active
                        ? 'border-primary bg-primary/[0.08] text-primary font-bold'
                        : 'border-transparent text-muted hover:text-foreground hover:border-border'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        active ? 'bg-primary' : 'bg-subtle group-hover:bg-foreground'
                      }`}
                    />
                    {n.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Panels */}
          <div className="min-w-0">
            {tab === 'overview'     && <OverviewPanel d={d} data={data} />}
            {tab === 'objectives'   && <ObjectivesPanel d={d} data={data} />}
            {tab === 'faculty'      && <FacultyPanel d={d} data={data} />}
            {tab === 'academics'    && <AcademicsPanel d={d} data={data} />}
            {tab === 'achievements' && <AchievementsPanel d={d} data={data} />}
            {tab === 'publications' && <PublicationsPanel data={data} />}
            {tab === 'placements'   && <PlacementsPanel data={data} />}
            {tab === 'mous'         && <MousPanel data={data} />}
            {tab === 'committees'   && <CommitteesPanel data={data} />}
          </div>
        </div>
      </div>
    </>
  );
}

/* ═════════════════════════════════════════════════════════
   Reusable bits
   ═════════════════════════════════════════════════════════ */

function PanelHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-sans font-black tracking-tighter-2 text-foreground text-[clamp(1.6rem,2.5vw,2.2rem)] leading-[1.15] scroll-mt-[220px]"
    >
      {children}
      <span aria-hidden className="block mt-4 w-[60px] h-[4px] rounded-sm bg-primary" />
    </h2>
  );
}

function SubHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div
      id={id}
      className="mt-12 mb-5 pb-2 border-b-2 border-secondary/15 font-sans font-extrabold text-[0.72rem] tracking-[0.14em] uppercase text-secondary scroll-mt-[220px]"
    >
      {children}
    </div>
  );
}

function Accordion({
  id,
  title,
  defaultOpen,
  autoToggle,
  children,
}: {
  id?: string;
  title: string;
  defaultOpen?: boolean;
  autoToggle?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoToggle || !id) return;
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOpen(entry.isIntersecting),
      { rootMargin: '-220px 0px -40% 0px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoToggle, id]);

  return (
    <div
      ref={rootRef}
      id={id}
      className="mb-4 rounded-xl bg-white shadow-card-soft overflow-hidden scroll-mt-[220px]"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left border-l-[3px] transition-all duration-200 ${
          open
            ? 'border-primary bg-primary/[0.04]'
            : 'border-secondary hover:border-primary hover:bg-secondary/[0.04] hover:translate-x-1'
        }`}
      >
        <span className="font-sans font-bold text-foreground text-[0.95rem]">{title}</span>
        <span className={`text-xs transition-transform duration-300 ${open ? 'rotate-180 text-primary' : 'text-subtle'}`}>
          ▼
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out-smooth"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function AccentCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-7 shadow-card-soft border-t-[3px] border-t-secondary hover:-translate-y-1 hover:shadow-card-strong hover:border-t-primary transition-all duration-300">
      <h3 className="font-sans font-extrabold text-foreground text-xl tracking-tighter-2 mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 1 — OVERVIEW
   ═════════════════════════════════════════════════════════ */

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.?|Mr\.?|Ms\.?|Mrs\.?|Prof\.?)\s*/i, '')
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function OverviewPanel({ d, data }: PanelProps) {
  const allFaculty = getFacultyByDepartment(d.slug);
  const hods = allFaculty.filter((f) => f.isHod);
  const primaryHod = hods[0];
  const hodPhoto = primaryHod?.image ?? data.faculty.find((f) => /head|hod/i.test(f.role))?.photo;
  const initials = getInitials(d.hod.name);
  const message =
    data.hodMessage ||
    `${d.tagline} Our team delivers an industry-aligned curriculum, runs well-resourced labs, and mentors every student from foundation to final-year capstone.`;

  return (
    <div className="space-y-2">
      <PanelHeading id="intro">Introduction</PanelHeading>

      {/* ── HOD Message — editorial section ─────────────────────────────────── */}
      <div className="mt-8 space-y-4">
        {hods.length > 0 ? hods.map((hodFaculty, idx) => (
          <div
            key={hodFaculty.id}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e8e3d8', borderLeft: '4px solid var(--primary)' }}
          >
            <div className="flex flex-col sm:flex-row gap-0">
              {/* Portrait */}
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 'clamp(140px, 22%, 200px)', minHeight: 'clamp(180px, 25vw, 260px)' }}
              >
                {hodFaculty.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={hodFaculty.image}
                    alt={hodFaculty.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: '50% 12%' }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(160deg, #1F6B24 0%, #2d8b55 100%)' }}
                  >
                    <span className="font-sans font-black text-white text-[2.2rem] tracking-wider opacity-90">
                      {getInitials(hodFaculty.name)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Message */}
              <div className="flex flex-col justify-center gap-4 p-7 md:p-9 flex-1 min-w-0">
                <div
                  className="font-mono text-[0.62rem] font-extrabold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--primary)' }}
                >
                  From the HOD&apos;s Desk
                </div>

                <blockquote
                  className="font-display italic leading-[1.85] text-foreground/82"
                  style={{ fontSize: 'clamp(0.97rem, 1.3vw, 1.1rem)' }}
                >
                  &ldquo;{idx === 0 ? message : (data.hod2Message ?? hodFaculty.description ?? message)}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-1">
                  <div className="h-px w-8 rounded-full" style={{ background: 'var(--primary)', opacity: 0.5 }} />
                  <div>
                    <p className="font-sans font-bold text-foreground text-[0.9rem] leading-snug">
                      {hodFaculty.name}
                    </p>
                    <p className="font-mono text-[0.67rem] text-muted tracking-wide">
                      {hodFaculty.designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid #e8e3d8', borderLeft: '4px solid var(--primary)' }}
          >
            <div className="flex flex-col sm:flex-row gap-0">
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 'clamp(140px, 22%, 200px)', minHeight: 'clamp(180px, 25vw, 260px)' }}
              >
                {hodPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={hodPhoto}
                    alt={d.hod.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: '50% 12%' }}
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(160deg, #1F6B24 0%, #2d8b55 100%)' }}
                  >
                    <span className="font-sans font-black text-white text-[2.2rem] tracking-wider opacity-90">
                      {initials}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-center gap-4 p-7 md:p-9 flex-1 min-w-0">
                <div
                  className="font-mono text-[0.62rem] font-extrabold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--primary)' }}
                >
                  From the HOD&apos;s Desk
                </div>
                <blockquote
                  className="font-display italic leading-[1.85] text-foreground/82"
                  style={{ fontSize: 'clamp(0.97rem, 1.3vw, 1.1rem)' }}
                >
                  &ldquo;{message}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-1">
                  <div className="h-px w-8 rounded-full" style={{ background: 'var(--primary)', opacity: 0.5 }} />
                  <div>
                    <p className="font-sans font-bold text-foreground text-[0.9rem] leading-snug">{d.hod.name}</p>
                    <p className="font-mono text-[0.67rem] text-muted tracking-wide">{d.hod.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Introduction paragraph (if available) */}
      {data.introduction && (
        <p className="mt-6 text-foreground/80 leading-[1.85] text-[0.96rem] max-w-[860px]">
          {data.introduction}
        </p>
      )}

      {/* Vision and Mission */}
      <SubHeading id="vm">Vision and Mission</SubHeading>
      <div className="grid md:grid-cols-2 gap-6">
        <AccentCard title="Vision">
          <p className="text-foreground/85 leading-[1.75] text-[0.96rem]">{data.vision || d.vision}</p>
        </AccentCard>
        <AccentCard title="Mission">
          <ul className="space-y-2.5">
            {(data.mission.length ? data.mission : d.mission).map((m) => (
              <li key={m} className="flex items-start gap-3 text-foreground/85 leading-[1.7] text-[0.95rem]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {m}
              </li>
            ))}
          </ul>
        </AccentCard>
      </div>

      {/* Innovative Teaching */}
      <SubHeading id="teaching">Innovative Teaching Methodology</SubHeading>
      <p className="text-foreground/80 leading-[1.85] text-[0.96rem] max-w-[860px]">
        {data.teachingMethodology}
      </p>

      {/* History */}
      <div className="mt-12 space-y-3">
        <Accordion id="history" title="History of the Department" autoToggle>
          <p className="text-foreground/80 leading-[1.75] text-[0.94rem]">
            {data.history ||
              `The Department of ${d.short} was established as part of MLRIT's founding commitment to engineering excellence. Intake has expanded steadily as demand from industry and PG programmes grew.`}
          </p>
          {data.intakeGrowth && data.intakeGrowth.length > 0 && (
            <DeptIntakeChart data={data.intakeGrowth} />
          )}
        </Accordion>

        {/* Labs */}
        {data.labs.length > 0 && (
          <Accordion id="labs" title={`Academic Laboratories (${data.labs.length} Labs)`} autoToggle>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {data.labs.map((lab) => (
                <div
                  key={lab.name}
                  className="rounded-lg p-4 border-l-[3px] border-secondary hover:border-primary hover:-translate-y-1 hover:shadow-card-soft transition-all duration-300"
                  style={{ backgroundColor: '#f9f8f5' }}
                >
                  <div className="font-sans font-bold text-foreground text-[0.88rem] leading-tight">{lab.name}</div>
                  <div className="mt-1 text-muted text-[0.78rem] leading-snug">{lab.desc}</div>
                </div>
              ))}
            </div>
          </Accordion>
        )}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 2 — OBJECTIVES
   ═════════════════════════════════════════════════════════ */

function ObjectivesPanel({ d, data }: PanelProps) {
  const peos = data.peos.length ? data.peos : d.peos.map((p) => ({ id: p.id, text: p.text }));
  return (
    <div>
      <PanelHeading id="peos">Programme Educational Objectives</PanelHeading>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {peos.map((p) => (
          <div
            key={p.id}
            className="rounded-xl bg-white p-7 shadow-card-soft border-t-[3px] border-t-secondary hover:border-t-primary hover:-translate-y-1 hover:shadow-card-strong transition-all duration-300 text-center"
          >
            <div className="font-mono font-extrabold text-[0.7rem] tracking-[0.14em] uppercase text-secondary mb-3">
              {p.id}
            </div>
            <p className="text-foreground/85 leading-[1.7] text-[0.95rem]">{p.text}</p>
          </div>
        ))}
      </div>

      <SubHeading id="obe">Outcome Based Education (OBE)</SubHeading>
      <div className="grid md:grid-cols-2 gap-10">
        {(['B.Tech', 'M.Tech'] as const).filter((level) =>
          d.level === 'pg' ? level === 'M.Tech' : level === 'B.Tech'
        ).map((level) => (
          <div key={level}>
            <h4 className="font-sans font-extrabold text-[0.82rem] tracking-[0.08em] uppercase text-secondary mb-3">
              {level}
            </h4>
            <ul className="space-y-0">
              {[
                'Educational Objectives and Outcomes',
                'OBE Process Manual',
                'Course Outcomes Description Booklets',
                'Course Outcomes (COs) Attainment',
                'Program Outcomes (POs) Attainment',
              ].map((item) => (
                <li
                  key={item}
                  className="group py-2.5 pl-5 border-b border-foreground/[0.06] text-foreground/85 text-[0.92rem] relative cursor-default transition-all duration-200 hover:translate-x-1.5 hover:text-foreground"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[18px] w-1.5 h-1.5 rounded-full bg-primary transition-transform duration-200 group-hover:scale-150"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SubHeading id="handbook">Handbook</SubHeading>
      <div className="max-w-[500px] rounded-xl bg-white p-7 shadow-card-soft">
        <h3 className="font-sans font-extrabold text-foreground text-xl mb-2">Programme Handbook</h3>
        <p className="text-muted leading-relaxed text-[0.94rem]">
          Comprehensive document covering curriculum, regulations, attendance, evaluation, code of conduct and all
          programme-level information.
        </p>
        <p className="mt-4 text-sm text-muted">Available from the department office. Contact your HOD or email <a href="mailto:info@mlrinstitutions.ac.in" className="text-primary hover:underline">info@mlrinstitutions.ac.in</a>.</p>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 3 — FACULTY PROFILES
   ═════════════════════════════════════════════════════════ */

function FacultyPanel({ d, data }: PanelProps) {
  const newFaculty = getFacultyByDepartment(d.slug);
  const subjectMap = data.facultySubjects;
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Fall back to old data only if no new records exist for this dept
  const useNew = newFaculty.length > 0;

  if (useNew) {
    const subjects = subjectMap ? Array.from(new Set(Object.values(subjectMap))).sort() : [];
    const visibleFaculty = subjectMap && subjectFilter !== 'all'
      ? newFaculty.filter((f) => subjectMap[f.slug] === subjectFilter)
      : newFaculty;

    return (
      <div>
        <PanelHeading id="all-faculty">Faculty Profiles</PanelHeading>
        <p className="mt-6 text-muted max-w-[700px] leading-relaxed">
          The department is led by a doctoral-strong team across teaching, research and industry engagement.
          Total faculty: <strong className="text-foreground">{newFaculty.length}</strong>.
        </p>

        {subjects.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSubjectFilter('all')}
              className={`px-4 py-1.5 rounded-full font-sans font-bold text-[0.8rem] transition-all ${
                subjectFilter === 'all' ? 'bg-primary text-white' : 'bg-subtle/40 text-muted hover:text-foreground'
              }`}
            >
              All Subjects
            </button>
            {subjects.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubjectFilter(s)}
                className={`px-4 py-1.5 rounded-full font-sans font-bold text-[0.8rem] transition-all ${
                  subjectFilter === s ? 'bg-primary text-white' : 'bg-subtle/40 text-muted hover:text-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {visibleFaculty.map((f: FacultyProfile) => {
            const initials = getInitials(f.name);
            return (
              <Link
                key={f.slug}
                href={`/faculty/${f.slug}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden shadow-card-soft hover:shadow-card-strong transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                style={{ background: 'linear-gradient(135deg, #2a2f40, #3a4050)' }}
                aria-label={`View profile of ${f.name}`}
              >
                {f.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.image}
                    alt={f.imageAlt}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-400 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center font-sans font-black text-4xl text-white/35 group-hover:opacity-0 transition-opacity">
                    {initials}
                  </div>
                )}

                {/* Bottom name strip */}
                <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white group-hover:opacity-0 transition-opacity">
                  <div className="font-sans font-bold text-[0.84rem] leading-tight line-clamp-2">{f.name}</div>
                  <div className="text-white/65 text-[0.66rem] mt-0.5">{f.designation}</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center text-center p-5">
                  <div>
                    <div className="font-sans font-bold text-white text-[0.98rem] leading-tight">{f.name}</div>
                    <div className="mt-1 text-white/55 text-[0.7rem]">{f.designation}</div>
                    {f.specialization.length > 0 && (
                      <div className="mt-3 font-mono font-bold text-primary text-[0.7rem] tracking-[0.04em] leading-snug">
                        {f.specialization.slice(0, 2).join(' · ')}
                      </div>
                    )}
                    <div className="mt-5 inline-block px-4 py-1.5 rounded-md border border-white/30 text-white text-[0.7rem] font-bold">
                      View profile
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  // Legacy fallback for departments without new data yet
  const faculty = data.faculty.length > 0
    ? data.faculty
    : [{ name: d.hod.name, role: 'Head of Department', specialization: d.short }];

  return (
    <div>
      <PanelHeading id="all-faculty">Faculty Profiles</PanelHeading>
      <p className="mt-6 text-muted max-w-[700px] leading-relaxed">
        The department is led by a doctoral-strong team across teaching, research and industry engagement.
        Total faculty: <strong className="text-foreground">{faculty.length}</strong>.
      </p>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {faculty.map((f) => {
          const initials = getInitials(f.name);
          return (
            <div
              key={f.name + f.role}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer shadow-card-soft hover:shadow-card-strong transition-shadow duration-300"
              style={{ background: 'linear-gradient(135deg, #2a2f40, #3a4050)' }}
            >
              {f.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={f.photo}
                  alt={f.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-400 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center font-sans font-black text-4xl text-white/35 group-hover:opacity-0 transition-opacity">
                  {initials}
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/90 via-black/55 to-transparent text-white group-hover:opacity-0 transition-opacity">
                <div className="font-sans font-bold text-[0.84rem] leading-tight line-clamp-2">{f.name}</div>
                <div className="text-white/65 text-[0.66rem] mt-0.5">{f.role}</div>
              </div>
              <div className="absolute inset-0 bg-ink/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 grid place-items-center text-center p-5">
                <div>
                  <div className="font-sans font-bold text-white text-[0.98rem] leading-tight">{f.name}</div>
                  <div className="mt-1 text-white/55 text-[0.7rem]">{f.role}</div>
                  {f.specialization && (
                    <div className="mt-3 font-mono font-bold text-primary text-[0.7rem] tracking-[0.04em] leading-snug">
                      {f.specialization}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 4 — ACADEMICS
   ═════════════════════════════════════════════════════════ */

const SYLLABUS_REGS: { code: string; slug: string; label: string }[] = [
  { code: 'R25',   slug: 'r25',   label: '2025 regulation' },
  { code: 'R22',   slug: 'r22',   label: '2022 regulation' },
  { code: 'MLR20', slug: 'mlr20', label: 'MLR 2020 regulation' },
  { code: 'MLR18', slug: 'mlr18', label: 'MLR 2018 regulation' },
];

// Department slug → prefix used by the complete-syllabus PDFs in /public/syllabus.
// Most departments match their slug; mechanical/aeronautical use shortened prefixes.
const SYLLABUS_FILE_PREFIX: Record<string, string> = {
  mechanical: 'mech',
  aeronautical: 'aero',
};

// Which regulations have a complete-syllabus PDF on disk, per department.
// Source: scraped from mlrit.ac.in and saved to /public/syllabus/<prefix>-<reg>-syllabus.pdf.
const SYLLABUS_AVAILABLE: Record<string, string[]> = {
  cse:          ['r25', 'r22', 'mlr20', 'mlr18'],
  'cse-ds':     ['r25', 'r22', 'mlr20'],
  aiml:         ['r25', 'r22', 'mlr20'],
  ece:          ['r25', 'r22', 'mlr20'],
  eee:          ['r25', 'r22', 'mlr20', 'mlr18'],
  mechanical:   ['r25', 'r22', 'mlr20', 'mlr18'],
  aeronautical: ['r25', 'r22', 'mlr18'],
};

function syllabusPdfHref(deptSlug: string, regSlug: string): string {
  const prefix = SYLLABUS_FILE_PREFIX[deptSlug] ?? deptSlug;
  return `/syllabus/${prefix}-${regSlug}-syllabus.pdf`;
}

// The Department of Humanities and Sciences teaches the shared first year of
// every B.Tech branch — its own curriculum is each branch's Year 1 (semesters
// 1 and 2), not a syllabus of its own.
const FIRST_YEAR_BRANCHES: { slug: string; code: string; label: string }[] = [
  { slug: 'cse',          code: 'CSE',    label: 'Computer Science and Engineering' },
  { slug: 'cse-ds',       code: 'CSE-DS', label: 'CSE (Data Science)' },
  { slug: 'aiml',         code: 'AIML',   label: 'CSE (AI and ML)' },
  { slug: 'ece',          code: 'ECE',    label: 'Electronics and Communication Engineering' },
  { slug: 'eee',          code: 'EEE',    label: 'Electrical and Electronics Engineering' },
  { slug: 'mechanical',   code: 'MECH',   label: 'Mechanical Engineering' },
  { slug: 'aeronautical', code: 'AERO',   label: 'Aeronautical Engineering' },
];

function FreshmanCurriculumPanel() {
  const [branch, setBranch] = useState(FIRST_YEAR_BRANCHES[0].slug);
  const availableRegSlugs = SYLLABUS_AVAILABLE[branch] ?? [];
  const availableRegs = SYLLABUS_REGS.filter((r) => availableRegSlugs.includes(r.slug));

  const allRegsWithData = SYLLABUS_REGS.filter((r) =>
    [1, 2].some((sem) => getSyllabusCourses(branch, r.slug, sem).length > 0)
  );
  // Show only the most recent regulation for the freshman department
  const regsWithData = allRegsWithData.slice(0, 1);
  const [activeReg, setActiveReg] = useState(regsWithData[0]?.slug ?? 'r25');
  const effectiveReg = regsWithData.some((r) => r.slug === activeReg) ? activeReg : (regsWithData[0]?.slug ?? 'r25');

  const semesters = [1, 2].map((semNum) => ({
    semNum,
    courses: getSyllabusCourses(branch, effectiveReg, semNum),
  })).filter((s) => s.courses.length > 0);

  const activeBranch = FIRST_YEAR_BRANCHES.find((b) => b.slug === branch);

  return (
    <div>
      <PanelHeading id="syllabus-pdfs">Curriculum</PanelHeading>
      <p className="mt-6 text-muted max-w-[760px] leading-relaxed text-[0.94rem]">
        Every B.Tech branch shares a common first year — mathematics, sciences, programming and communication —
        delivered by the Department of Humanities and Sciences. Select a branch below to view its Year 1 syllabus.
      </p>

      <SubHeading>Branch</SubHeading>
      <div className="flex flex-wrap gap-2 mb-8">
        {FIRST_YEAR_BRANCHES.map((b) => (
          <button
            key={b.slug}
            onClick={() => setBranch(b.slug)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
              branch === b.slug
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-border text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {b.code}
          </button>
        ))}
      </div>

      {activeBranch && (
        <p className="text-muted text-[0.88rem] mb-8">
          Showing Year 1 of the <strong className="text-foreground">{activeBranch.label}</strong> syllabus.
        </p>
      )}

      {availableRegs.length > 0 && (
        <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-5 md:p-6 shadow-card-soft border-l-[3px] border-secondary sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="font-sans font-bold text-foreground text-[1rem]">
              {activeBranch?.code} Complete Syllabus
            </div>
            <div className="mt-0.5 text-muted text-[0.82rem]">Full 4-year programme document</div>
          </div>
          <div className="flex flex-shrink-0 items-center gap-3">
            <a
              href={syllabusPdfHref(branch, effectiveReg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-primary px-5 py-2.5 font-sans font-bold text-[0.86rem] text-primary transition-colors hover:bg-primary/[0.06]"
            >
              View
            </a>
            <a
              href={syllabusPdfHref(branch, effectiveReg)}
              download
              className="inline-flex items-center justify-center rounded-lg bg-secondary px-5 py-2.5 font-sans font-bold text-[0.86rem] text-white transition-colors hover:bg-secondary-pressed"
            >
              Download
            </a>
          </div>
        </div>
      )}

      <SubHeading id="syllabus-inline">Year 1 — Subject-wise Syllabus</SubHeading>
      <div className="flex flex-wrap gap-2 mb-8">
        {regsWithData.map((r) => (
          <button
            key={r.slug}
            onClick={() => setActiveReg(r.slug)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
              effectiveReg === r.slug
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-border text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {r.code}
          </button>
        ))}
      </div>

      {semesters.length === 0 ? (
        <p className="text-muted text-[0.92rem]">
          Subject-wise data for {effectiveReg.toUpperCase()} hasn&apos;t been published yet.
        </p>
      ) : (
        <div className="space-y-10">
          {semesters.map(({ semNum, courses }) => (
            <div key={semNum}>
              <p className="font-mono text-[0.62rem] font-bold tracking-[0.18em] uppercase text-primary mb-1">
                Year 1 · Semester {semNum}
              </p>
              <h4 className="font-sans font-extrabold text-foreground text-lg tracking-tight mb-4">
                Semester {semNum}
              </h4>
              <div className="overflow-x-auto overflow-hidden rounded-xl border border-border bg-white">
                <table className="w-full text-left text-[0.9rem]">
                  <thead className="bg-warm-light/50">
                    <tr>
                      <th className="px-4 py-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted">Code</th>
                      <th className="px-4 py-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted">Subject</th>
                      <th className="px-4 py-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted text-right">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => (
                      <tr key={`${c.code}-${i}`} className="border-t border-border hover:bg-warm-light/40 transition-colors">
                        <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap align-top">{c.code}</td>
                        <td className="px-4 py-3">
                          <a
                            href={c.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-foreground hover:text-primary hover:underline"
                          >
                            {c.title}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <a
                            href={c.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[0.72rem] font-bold text-primary hover:underline"
                          >
                            View ↗
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MbaCurriculumPanel() {
  return (
    <div>
      <PanelHeading id="syllabus-pdfs">Curriculum</PanelHeading>

      <SubHeading>Syllabus</SubHeading>
      <div className="flex flex-col gap-4 rounded-xl bg-white p-5 md:p-6 shadow-card-soft border-l-[3px] border-secondary transition-all hover:-translate-y-0.5 hover:shadow-card-strong sm:flex-row sm:items-center sm:justify-between">
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
    </div>
  );
}

function AcademicsPanel({ d }: PanelProps) {
  const availableRegSlugs = SYLLABUS_AVAILABLE[d.slug] ?? [];
  const availableRegs = SYLLABUS_REGS.filter((r) => availableRegSlugs.includes(r.slug));
  const regsForCatalog = availableRegs.length ? availableRegs : SYLLABUS_REGS;

  // Regulations that actually have per-subject data in SYLLABUS_DATA
  const regsWithData = SYLLABUS_REGS.filter((r) =>
    [1, 2, 3, 4, 5, 6, 7, 8].some((sem) => getSyllabusCourses(d.slug, r.slug, sem).length > 0)
  );

  const [activeReg, setActiveReg] = useState(regsWithData[0]?.slug ?? regsForCatalog[0]?.slug ?? 'r25');

  if (d.slug === 'hs') return <FreshmanCurriculumPanel />;
  if (d.slug === 'mba') return <MbaCurriculumPanel />;

  const semesters = Array.from({ length: 8 }, (_, i) => {
    const semNum = i + 1;
    return { semNum, courses: getSyllabusCourses(d.slug, activeReg, semNum) };
  }).filter((s) => s.courses.length > 0);

  return (
    <div>
      <PanelHeading id="syllabus-pdfs">Curriculum</PanelHeading>

      {/* ── Syllabus PDFs ── */}
      <SubHeading>Syllabus PDFs</SubHeading>
      {availableRegs.length === 0 ? (
        <p className="text-muted leading-relaxed text-[0.92rem]">
          Complete syllabus PDFs for this programme will be published here soon.
        </p>
      ) : (
        <div className="space-y-4">
          {availableRegs.map((r) => {
            const pdfHref = syllabusPdfHref(d.slug, r.slug);
            return (
              <div
                key={r.slug}
                className="flex flex-col gap-4 rounded-xl bg-white p-5 md:p-6 shadow-card-soft border-l-[3px] border-secondary transition-all hover:-translate-y-0.5 hover:shadow-card-strong sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="font-sans font-bold text-foreground text-[1rem]">{r.code} Complete Syllabus</div>
                  <div className="mt-0.5 text-muted text-[0.82rem]">{r.label}</div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-3">
                  <a
                    href={pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border-[1.5px] border-primary px-5 py-2.5 font-sans font-bold text-[0.86rem] text-primary transition-colors hover:bg-primary/[0.06]"
                  >
                    View
                  </a>
                  <a
                    href={pdfHref}
                    download
                    className="inline-flex items-center justify-center rounded-lg bg-secondary px-5 py-2.5 font-sans font-bold text-[0.86rem] text-white transition-colors hover:bg-secondary-pressed"
                  >
                    Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Online Course Catalog ── */}
      <SubHeading id="catalog">Online Course Catalog</SubHeading>
      <div className="space-y-4">
        {regsForCatalog.map((r) => (
          <Link
            key={r.slug}
            href={`/departments/syllabus/${d.slug}/${r.slug}`}
            className="group flex items-center justify-between gap-4 rounded-xl bg-white p-5 md:p-6 shadow-card-soft border-l-[3px] border-secondary transition-all hover:-translate-y-0.5 hover:shadow-card-strong"
          >
            <div className="min-w-0">
              <div className="font-sans font-bold text-foreground text-[1rem]">{r.code} Course Catalog</div>
              <div className="mt-0.5 text-muted text-[0.82rem]">{r.label} · all semesters</div>
            </div>
            <span className="inline-flex flex-shrink-0 items-center gap-2 font-mono text-[0.76rem] font-bold text-primary transition-all group-hover:gap-3">
              Open ↗
            </span>
          </Link>
        ))}
      </div>

      {/* ── Inline Syllabus ── */}
      <SubHeading id="syllabus-inline">Subject-wise Syllabus</SubHeading>

      {/* Regulation pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {regsWithData.map((r) => (
          <button
            key={r.slug}
            onClick={() => setActiveReg(r.slug)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
              activeReg === r.slug
                ? 'bg-primary text-white border-primary'
                : 'bg-white border-border text-foreground hover:border-primary hover:text-primary'
            }`}
          >
            {r.code}
          </button>
        ))}
      </div>

      {semesters.length === 0 ? (
        <p className="text-muted text-[0.92rem]">
          Subject-wise data for {activeReg.toUpperCase()} hasn&apos;t been published yet.
        </p>
      ) : (
        <div className="space-y-10">
          {semesters.map(({ semNum, courses }) => (
            <div key={semNum}>
              <p className="font-mono text-[0.62rem] font-bold tracking-[0.18em] uppercase text-primary mb-1">
                Year {Math.ceil(semNum / 2)} · Semester {((semNum - 1) % 2) + 1}
              </p>
              <h4 className="font-sans font-extrabold text-foreground text-lg tracking-tight mb-4">
                Semester {semNum}
              </h4>
              <div className="overflow-x-auto overflow-hidden rounded-xl border border-border bg-white">
                <table className="w-full text-left text-[0.9rem]">
                  <thead className="bg-warm-light/50">
                    <tr>
                      <th className="px-4 py-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted">Code</th>
                      <th className="px-4 py-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted">Subject</th>
                      <th className="px-4 py-3 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted text-right">PDF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => (
                      <tr key={`${c.code}-${i}`} className="border-t border-border hover:bg-warm-light/40 transition-colors">
                        <td className="px-4 py-3 font-bold text-foreground whitespace-nowrap align-top">{c.code}</td>
                        <td className="px-4 py-3">
                          <a
                            href={c.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-foreground hover:text-primary hover:underline"
                          >
                            {c.title}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <a
                            href={c.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[0.72rem] font-bold text-primary hover:underline"
                          >
                            View ↗
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 5 — ACHIEVEMENTS
   ═════════════════════════════════════════════════════════ */

function AchievementsPanel({ d, data }: PanelProps) {
  const [view, setView] = useState<'student' | 'faculty'>('student');

  const studentItems = data.studentAchievements.length
    ? data.studentAchievements
    : [
        { title: 'NBA Accreditation', desc: `${d.code} programme accredited by the National Board of Accreditation.` },
        { title: 'Highest package',   desc: '44 LPA in 2024-25 — top quartile placements.' },
        { title: 'Industry MoUs',     desc: 'Active partnerships with Virtusa, EPAM, Boeing, Cyient and TATA.' },
      ];

  const facultyItems = data.publications && data.publications.length
    ? data.publications.slice(0, 4).map((p) => ({
        title: p.title,
        desc: `${p.authors} — ${p.journal} (${p.year})`,
      }))
    : [];

  const items = view === 'student' ? studentItems : facultyItems;

  return (
    <div>
      <PanelHeading id="achieve">Achievements</PanelHeading>

      <div className="mt-6 inline-flex rounded-full bg-subtle/40 p-1 gap-1">
        {(['student', 'faculty'] as const).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`px-5 py-2 rounded-full font-sans font-bold text-[0.82rem] transition-all duration-200 ${
              view === v ? 'bg-primary text-white shadow-card-soft' : 'text-muted hover:text-foreground'
            }`}
          >
            {v === 'student' ? 'Student Achievements' : 'Faculty Achievements'}
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-[900px]">
          {items.map((a) => (
            <div
              key={a.title}
              className="rounded-xl bg-white p-6 shadow-card-soft border-l-[3px] border-primary hover:-translate-y-1 hover:shadow-card-strong transition-all"
            >
              <h4 className="font-sans font-bold text-foreground text-[0.98rem] mb-1.5">{a.title}</h4>
              <p className="text-muted text-[0.88rem] leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-muted leading-relaxed max-w-[720px]">
          {data.publicationsNote || 'Faculty achievements for this department will be updated soon.'}
        </p>
      )}

      <SubHeading id="honour">Roll of Honour</SubHeading>
      {data.rollOfHonour && data.rollOfHonour.length > 0 ? (
        <div className="max-w-[720px] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[0.72rem] font-sans font-extrabold tracking-[0.08em] uppercase text-muted border-b border-foreground/10">
                <th className="py-2 pr-4">Year</th>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Achievement</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.rollOfHonour.map((h, i) => (
                <tr key={i} className="border-b border-foreground/[0.06] text-[0.9rem]">
                  <td className="py-2.5 pr-4 text-muted">{h.year}</td>
                  <td className="py-2.5 pr-4 font-sans font-semibold text-foreground">{h.name}</td>
                  <td className="py-2.5 pr-4 text-foreground/80">{h.achievement}</td>
                  <td className="py-2.5 font-sans font-bold text-primary">{h.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted leading-relaxed max-w-[720px]">
          Student achievers, gold-medalists and university rank-holders are honoured each year.
        </p>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 5b — PUBLICATIONS AND RESEARCH
   ═════════════════════════════════════════════════════════ */

function PublicationsPanel({ data }: { data: DeptData }) {
  const pubs = data.publications ?? [];
  const years = Array.from(new Set(pubs.map((p) => p.year))).sort((a, b) => Number(b) - Number(a));
  const [year, setYear] = useState<string>('all');
  const filtered = year === 'all' ? pubs : pubs.filter((p) => p.year === year);

  return (
    <div>
      <PanelHeading id="pubs">Publications and Research</PanelHeading>

      {pubs.length > 0 ? (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setYear('all')}
              className={`px-4 py-1.5 rounded-full font-sans font-bold text-[0.8rem] transition-all ${
                year === 'all' ? 'bg-primary text-white' : 'bg-subtle/40 text-muted hover:text-foreground'
              }`}
            >
              All
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={`px-4 py-1.5 rounded-full font-sans font-bold text-[0.8rem] transition-all ${
                  year === y ? 'bg-primary text-white' : 'bg-subtle/40 text-muted hover:text-foreground'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4 max-w-[820px]">
            {filtered.map((p, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-5 shadow-card-soft border-l-[3px] border-secondary hover:-translate-y-0.5 hover:shadow-card-strong transition-all flex items-start justify-between gap-4"
              >
                <div>
                  <h4 className="font-sans font-bold text-foreground text-[0.95rem] leading-snug mb-1.5">{p.title}</h4>
                  <p className="text-muted text-[0.82rem] mb-1">{p.authors}</p>
                  <p className="text-secondary text-[0.82rem] font-semibold">{p.journal}</p>
                </div>
                <span className="flex-shrink-0 font-mono text-[0.72rem] font-extrabold text-muted">{p.year}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-8 text-muted leading-relaxed max-w-[720px]">
          {data.publicationsNote || "Faculty publications for this department are being compiled."}
        </p>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 5c — INTERNSHIPS AND PLACEMENTS
   ═════════════════════════════════════════════════════════ */

function StatTiles({ stats }: { stats: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[720px]">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl bg-white p-5 shadow-card-soft text-center">
          <div className="font-sans font-black text-primary text-[1.5rem] leading-none">{s.value}</div>
          <div className="mt-2 text-muted text-[0.72rem] font-semibold uppercase tracking-[0.06em]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function PlacementsPanel({ data }: { data: DeptData }) {
  return (
    <div>
      <PanelHeading id="placement-stats">Internships and Placements</PanelHeading>

      {data.placementStats && data.placementStats.length > 0 && (
        <>
          <SubHeading>Placement Highlights</SubHeading>
          <StatTiles stats={data.placementStats} />
          {data.placementNote && (
            <p className="mt-5 text-muted leading-relaxed max-w-[720px]">{data.placementNote}</p>
          )}
        </>
      )}

      <SubHeading id="intern-stats">Internships</SubHeading>
      {data.internStats && data.internStats.length > 0 && <StatTiles stats={data.internStats} />}

      {data.internships && data.internships.length > 0 && (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px]">
          {data.internships.map((it, i) => (
            <div
              key={i}
              className="rounded-xl bg-white p-5 shadow-card-soft border-l-[3px] border-primary hover:-translate-y-1 hover:shadow-card-strong transition-all"
            >
              <h4 className="font-sans font-bold text-foreground text-[0.95rem] mb-1">{it.company}</h4>
              <p className="text-muted text-[0.8rem] mb-2">{it.type}</p>
              <p className="text-[0.82rem] font-sans font-semibold text-secondary">
                {it.students} Students — {it.year}
              </p>
            </div>
          ))}
        </div>
      )}

      {data.internList && data.internList.length > 0 && (
        <ul className="mt-6 space-y-2.5 max-w-[820px]">
          {data.internList.map((li) => (
            <li key={li} className="flex items-start gap-3 text-foreground/85 leading-[1.7] text-[0.92rem]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {li}
            </li>
          ))}
        </ul>
      )}

      {data.internNote && (
        <p className="mt-6 text-muted leading-relaxed max-w-[720px]">{data.internNote}</p>
      )}

      <p className="mt-8 text-muted leading-relaxed max-w-[720px]">
        See the full institute-wide placement performance on the{' '}
        <Link href="/placements" className="text-primary font-semibold hover:underline">
          Placements page
        </Link>
        .
      </p>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 5d — MOUs
   ═════════════════════════════════════════════════════════ */

// Well-known brand → logo path map. Any MOU whose name matches (case-insensitive,
// startsWith) automatically gets the logo painted in the card.
const BRAND_LOGOS: { match: RegExp; src: string; alt: string }[] = [
  { match: /^boeing/i, src: '/images/brands/boeing.svg', alt: 'Boeing' },
  { match: /^cyient/i, src: '/images/brands/cyient.svg', alt: 'Cyient' },
  { match: /^epam/i,   src: '/images/brands/epam.svg',   alt: 'EPAM' },
];
function brandLogoFor(name: string): { src: string; alt: string } | null {
  for (const b of BRAND_LOGOS) if (b.match.test(name.trim())) return b;
  return null;
}

function MousPanel({ data }: { data: DeptData }) {
  const mous = data.mous ?? [];

  return (
    <div>
      <PanelHeading id="mous">MOUs</PanelHeading>
      <p className="mt-6 text-muted leading-relaxed max-w-[820px]">
        Memorandums of Understanding with industry, research and academic organisations specific to this department.
      </p>

      {mous.length > 0 ? (
        <div className="mt-8 grid sm:grid-cols-2 gap-5 max-w-[900px]">
          {mous.map((m) => {
            const logo = m.logo
              ? { src: m.logo, alt: m.name }
              : brandLogoFor(m.name);
            return (
              <div
                key={m.name}
                className="group relative rounded-xl bg-white p-6 shadow-card-soft border-l-[3px] border-secondary hover:-translate-y-1 hover:shadow-card-strong transition-all overflow-hidden"
              >
                {/* Brand logo — top-right, quiet, colored, saturates on hover */}
                {logo && (
                  <div className="absolute top-4 right-4 h-8 md:h-9 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-full w-auto object-contain"
                    />
                  </div>
                )}
                <h4 className={`font-sans font-bold text-foreground text-[0.98rem] mb-1.5 ${logo ? 'pr-24' : ''}`}>{m.name}</h4>
                <p className="text-muted text-[0.88rem] leading-relaxed">{m.domain}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-8 text-muted leading-relaxed max-w-[720px]">
          {data.mouNote || 'MoU details for this department will be added soon.'}
        </p>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════
   Panel 6 — COMMITTEES
   ═════════════════════════════════════════════════════════ */

function CommitteesPanel({ data }: { data: DeptData }) {
  const committees =
    data.committees && data.committees.length
      ? data.committees.map((c, i) => ({
          id: i === 0 ? 'dac' : i === 1 ? 'pac' : 'experts',
          name: c.name,
          members: c.members,
        }))
      : [
          { id: 'dac',     name: 'Departmental Advisory Committee (DAC)', members: undefined },
          { id: 'pac',     name: 'Programme Advisory Committee (PAC)',    members: undefined },
          { id: 'experts', name: 'Domain Experts',                        members: undefined },
        ];

  return (
    <div>
      <PanelHeading>Departmental Committees</PanelHeading>
      <div className="mt-8 space-y-5">
        {committees.map((c) => (
          <div
            key={c.id + c.name}
            id={c.id}
            className="rounded-xl bg-white p-7 shadow-card-soft border-l-[3px] border-secondary scroll-mt-[220px]"
          >
            <div className="font-mono text-[0.7rem] font-extrabold tracking-[0.14em] uppercase text-secondary mb-2">
              {c.id.toUpperCase()}
            </div>
            <h3 className="font-sans font-extrabold text-foreground text-xl">{c.name}</h3>
            {c.members && c.members.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {c.members.map((m) => (
                  <li key={m} className="flex items-start gap-3 text-foreground/85 text-[0.93rem] leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-muted leading-relaxed">
                Senior internal &amp; external advisors shaping departmental direction.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
