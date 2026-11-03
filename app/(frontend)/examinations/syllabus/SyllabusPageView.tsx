'use client';


import { asText } from '@/lib/content/sections';import { useState, useMemo } from 'react';
import ExaminationsHero from '@/components/ExaminationsHero';
import ExaminationsQuickNav from '@/components/ExaminationsQuickNav';
import { SYLLABUS_DATA, getSyllabusCourses, type SyllabusCourse } from '@/lib/syllabus-data';
import SideQuickNav from '@/components/SideQuickNav';

// ── Config ─────────────────────────────────────────────────────────
const DEPARTMENTS: { key: string; label: string; short: string }[] = [
  { key: 'cse',          label: 'Computer Science & Engineering',           short: 'CSE'     },
  { key: 'aiml',         label: 'AI & Machine Learning',                    short: 'AI & ML' },
  { key: 'ece',          label: 'Electronics & Communication Engineering',  short: 'ECE'     },
  { key: 'eee',          label: 'Electrical & Electronics Engineering',     short: 'EEE'     },
  { key: 'mechanical',   label: 'Mechanical Engineering',                   short: 'MECH'    },
  { key: 'aeronautical', label: 'Aeronautical Engineering',                 short: 'AERO'    },
  { key: 'cse-ds',       label: 'CSE (Data Science)',                       short: 'CSE-DS'  },
  { key: 'mba',          label: 'Master of Business Administration',         short: 'MBA'     },
];

// Programmes whose syllabus is published as one complete document rather than
// subject-wise semester PDFs.
const COMPLETE_SYLLABUS: Record<string, { code: string; title: string; meta: string; href: string }> = {
  mba: {
    code: 'MBA · R25',
    title: 'MBA R25 Syllabus',
    meta: '2025 regulation · Word document',
    href: '/syllabus/mba-r25-syllabus.docx',
  },
};

const REGULATIONS: { key: string; label: string }[] = [
  { key: 'r25',   label: 'R25'   },
  { key: 'r22',   label: 'R22'   },
  { key: 'mlr20', label: 'MLR20' },
  { key: 'mlr18', label: 'MLR18' },
];

// Cumulative semester number (1-8) → readable label
const SEM_LABELS: Record<number, string> = {
  1: 'I-I  (Sem 1)',
  2: 'I-II  (Sem 2)',
  3: 'II-I  (Sem 3)',
  4: 'II-II  (Sem 4)',
  5: 'III-I  (Sem 5)',
  6: 'III-II  (Sem 6)',
  7: 'IV-I  (Sem 7)',
  8: 'IV-II  (Sem 8)',
};

const gradientText: React.CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, var(--foreground) 0%, var(--primary) 115%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  WebkitTextFillColor: 'transparent', color: 'transparent',
};

// ── Helpers ────────────────────────────────────────────────────────
function availableRegs(dept: string): string[] {
  return Object.keys(SYLLABUS_DATA[dept] ?? {});
}

function availableSems(dept: string, reg: string): number[] {
  return Object.keys(SYLLABUS_DATA[dept]?.[reg] ?? {})
    .map(Number)
    .sort((a, b) => a - b);
}

function inferType(code: string, title: string): 'Lab' | 'Theory' {
  return code.endsWith('L') || /\blab\b/i.test(title) ? 'Lab' : 'Theory';
}

// ── Sub-components ─────────────────────────────────────────────────
function CourseRow({ course }: { course: SyllabusCourse }) {
  const type = inferType(course.code, course.title);
  const badge = type === 'Lab'
    ? 'bg-green-50 text-secondary border-green-200'
    : 'bg-blue-50 text-blue-700 border-blue-200';

  return (
    <a
      href={course.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-border px-4 py-3
        hover:border-primary/40 hover:bg-orange-50/40 transition-all"
    >
      <span className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-md border text-[0.6rem] font-mono font-bold tracking-widest uppercase ${badge}`}>
        {type}
      </span>
      <div className="min-w-0 flex-1">
        <span className="font-mono text-muted text-[0.68rem] mr-2">{course.code}</span>
        <span className="font-sans font-semibold text-foreground text-[0.88rem] group-hover:text-primary transition-colors">
          {course.title}
        </span>
      </div>
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
        className="shrink-0 text-muted group-hover:text-primary transition-colors" aria-hidden>
        <path d="M7 2v7M4 7l3 3 3-3M2 12h10"
          stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

const NAV_ITEMS = [
  { id: 'syllabus', label: 'Syllabus' },
];

// ── Page ───────────────────────────────────────────────────────────
export default function SyllabusPageView({ content }: { content: Record<string, unknown> }) {
  const copy = (key: string, fallback: string) => asText(content[key], fallback);
  const [dept,   setDept]   = useState('cse');
  const [reg,    setReg]    = useState('');
  const [sem,    setSem]    = useState<number | null>(null);

  const regsForDept  = useMemo(() => availableRegs(dept), [dept]);
  const activeReg    = reg && regsForDept.includes(reg) ? reg : (regsForDept[0] ?? '');
  const semsForReg   = useMemo(() => availableSems(dept, activeReg), [dept, activeReg]);
  const activeSem    = sem && semsForReg.includes(sem) ? sem : null;

  const courses = useMemo(
    () => activeSem ? getSyllabusCourses(dept, activeReg, activeSem) : [],
    [dept, activeReg, activeSem],
  );

  function chooseDept(d: string) { setDept(d); setReg(''); setSem(null); }
  function chooseReg(r: string)  { setReg(r);  setSem(null); }
  const completeSyllabus = COMPLETE_SYLLABUS[dept];

  return (
    <>
      <ExaminationsHero
        title="Syllabus"
        italic="Explorer."
        dek="Browse the official subject-wise syllabus for any branch, regulation, and semester. Subjects match exactly what's in the Departments section. Click a subject to download its PDF."
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Examinations', href: '/examinations/coe' },
          { label: 'Syllabus Explorer' },
        ]}
      />
      <ExaminationsQuickNav active="/examinations/syllabus" />

      <div className="lg:flex lg:gap-0 items-start">
        <aside className="hidden lg:block lg:w-56 shrink-0 self-start sticky top-28">
          <div className="pt-12 pl-6">
            <SideQuickNav items={NAV_ITEMS} />
          </div>
        </aside>
        <div className="flex-1 min-w-0">

      <section id="syllabus" className="bg-white py-8 md:py-20">
        <div className="w-full px-4 md:px-10 lg:px-12 space-y-5 md:space-y-8">

          {/* Step 1 — Department */}
          <div>
            <p className="font-mono text-[0.68rem] font-bold tracking-[0.2em] uppercase text-muted mb-3">{copy('step1Department', 'Step 1 — Department')}</p>
            <div className="flex flex-wrap gap-2">
              {DEPARTMENTS.map((d) => {
                const has = !!SYLLABUS_DATA[d.key] || !!COMPLETE_SYLLABUS[d.key];
                return (
                  <button
                    key={d.key}
                    onClick={() => has && chooseDept(d.key)}
                    disabled={!has}
                    className={`px-3.5 py-2 rounded-xl border text-[0.82rem] font-sans font-semibold transition-all ${
                      dept === d.key
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : has
                          ? 'border-border text-foreground hover:border-primary/50 hover:bg-orange-50/50'
                          : 'border-border/40 text-muted/40 cursor-not-allowed'
                    }`}
                  >
                    {d.short}
                    {!has && <span className="ml-1 text-[0.6rem] opacity-60">soon</span>}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 font-mono text-muted text-[0.68rem]">
              {DEPARTMENTS.find(d => d.key === dept)?.label}
            </p>
          </div>

          {completeSyllabus ? (
            <div>
              <div className="mb-3 md:mb-5">
                <h2 className="font-sans font-black tracking-tighter text-[1.35rem]" style={gradientText}>
                  {completeSyllabus.code}
                </h2>
                <p className="font-mono text-muted text-[0.68rem] mt-0.5">Complete programme syllabus</p>
              </div>
              <div className="flex max-w-[820px] flex-col gap-4 rounded-xl bg-white p-5 md:p-6 shadow-card-soft border-l-[3px] border-secondary sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="font-sans font-bold text-foreground text-[1rem]">{completeSyllabus.title}</div>
                  <div className="mt-0.5 text-muted text-[0.82rem]">{completeSyllabus.meta}</div>
                </div>
                <a
                  href={completeSyllabus.href}
                  download
                  className="inline-flex flex-shrink-0 items-center justify-center rounded-lg bg-secondary px-5 py-2.5 font-sans font-bold text-[0.86rem] text-white transition-colors hover:bg-secondary-pressed"
                >
                  Download
                </a>
              </div>
            </div>
          ) : (
          <>
          {/* Step 2 — Regulation */}
          <div>
            <p className="font-mono text-[0.68rem] font-bold tracking-[0.2em] uppercase text-muted mb-3">{copy('step2Regulation', 'Step 2 — Regulation')}</p>
            <div className="flex flex-wrap gap-2">
              {REGULATIONS.map((r) => {
                const avail = regsForDept.includes(r.key);
                return (
                  <button
                    key={r.key}
                    onClick={() => avail && chooseReg(r.key)}
                    disabled={!avail}
                    className={`px-3.5 py-2 rounded-xl border text-[0.82rem] font-sans font-semibold transition-all ${
                      activeReg === r.key
                        ? 'bg-secondary text-white border-secondary shadow-sm'
                        : avail
                          ? 'border-border text-foreground hover:border-secondary/50 hover:bg-green-50/50'
                          : 'border-border/40 text-muted/40 cursor-not-allowed'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3 — Semester */}
          <div>
            <p className="font-mono text-[0.68rem] font-bold tracking-[0.2em] uppercase text-muted mb-3">{copy('step3Semester', 'Step 3 — Semester')}</p>
            {semsForReg.length === 0 ? (
              <p className="text-muted text-[0.82rem]">{copy('noSemestersAvailableFor', 'No semesters available for this combination.')}</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {semsForReg.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSem(s)}
                    className={`px-3.5 py-2 rounded-xl border text-[0.82rem] font-sans font-semibold transition-all ${
                      activeSem === s
                        ? 'bg-foreground text-white border-foreground shadow-sm'
                        : 'border-border text-foreground hover:border-foreground/40 hover:bg-neutral-50'
                    }`}
                  >
                    {SEM_LABELS[s] ?? `Sem ${s}`}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results */}
          {activeSem ? (
            <div>
              <div className="mb-3 md:mb-5">
                <h2 className="font-sans font-black tracking-tighter text-[1.35rem]" style={gradientText}>
                  {DEPARTMENTS.find(d => d.key === dept)?.short}
                  {' · '}{activeReg.toUpperCase()}
                  {' · '}{SEM_LABELS[activeSem] ?? `Sem ${activeSem}`}
                </h2>
                <p className="font-mono text-muted text-[0.68rem] mt-0.5">
                  {courses.length} subject{courses.length !== 1 ? 's' : ''} — click any to download the syllabus PDF
                </p>
              </div>

              {courses.length === 0 ? (
                <div className="rounded-2xl border border-border bg-warm-light p-5 md:p-8 text-center">
                  <p className="font-sans text-muted text-[0.9rem]">{copy('syllabusDataForThis', 'Syllabus data for this combination is not yet available.')}</p>
                  <a href="https://exams.mlrinstitutions.ac.in/" target="_blank" rel="noopener noreferrer"
                    className="mt-3 inline-block text-secondary font-semibold text-[0.85rem] hover:underline">{copy('checkExamPortal', 'Check Exam Portal →')}</a>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-2.5">
                  {courses.map((c) => <CourseRow key={c.code} course={c} />)}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/60 bg-warm-light p-6 md:p-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="text-primary" aria-hidden>
                  <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="font-sans font-semibold text-foreground text-[0.95rem]">{copy('selectDepartmentRegulationAnd', 'Select department, regulation and semester above')}</p>
              <p className="font-mono text-muted text-[0.72rem] mt-1">{copy('subjectsAppearHereEach', 'Subjects appear here — each links to its official syllabus PDF')}</p>
            </div>
          )}
          </>
          )}

        </div>
      </section>

        </div>
      </div>
    </>
  );
}
