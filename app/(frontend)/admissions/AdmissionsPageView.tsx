'use client';


import { asText } from '@/lib/content/sections';import { useState, useEffect, useRef } from 'react';
import { useBrochureUrl } from '@/lib/content/documents-client';
import Link from 'next/link';
import Reveal, { Stagger, StaggerItem } from '@/components/motion/Reveal';
import AdmissionsQuickNav from '@/components/AdmissionsQuickNav';


const STEPS = [
  {
    num: 1,
    title: 'Choose Your Programme',
    desc: 'Explore our 10 B.Tech branches, M.Tech specialisations and MBA — find the one that aligns with your passion and career goals.',
  },
  {
    num: 2,
    title: 'Check Eligibility',
    desc: 'Review TS EAMCET / ICET / PGECET cutoffs and minimum qualifying marks. Most UG programmes accept TS EAMCET scores.',
  },
  {
    num: 3,
    title: 'Apply Online',
    desc: 'Download the application form from the MLRIT admissions office or apply during state counselling. Walk-in admissions are also welcome.',
  },
  {
    num: 4,
    title: 'Attend Counselling',
    desc: 'Receive your counselling schedule. Bring originals of all documents — mark sheets, TC, caste certificate, photographs.',
  },
  {
    num: 5,
    title: 'Secure Your Seat',
    desc: 'Pay the semester fee, collect your allotment letter and student ID. Your MLRIT journey begins here.',
  },
];

// Row 1 — pill · photo · pill · photo · pill · photo · pill · photo · pill
const ROW1 = [
  { type: 'pill',  label: 'Integrity',        bg: '#f5e8ea', color: '#3d1f24' },
  { type: 'photo', src: '/images/students/p1.png', pos: 'center 18%' },
  { type: 'pill',  label: 'Inclusivity',      bg: '#e8edf5', color: '#1f2d4a' },
  { type: 'photo', src: '/images/students/p2.png', pos: 'center 15%' },
  { type: 'pill',  label: 'Empathy',          bg: '#f5e8ea', color: '#3d1f24' },
  { type: 'photo', src: '/images/students/p3.png', pos: 'center 12%' },
  { type: 'pill',  label: 'Excellence',       bg: '#e8edf5', color: '#1f2d4a' },
  { type: 'photo', src: '/images/students/p4.png', pos: 'center 18%' },
  { type: 'pill',  label: 'Innovation',       bg: '#edf5ea', color: '#1f3d20' },
];

// Row 2 — photo · pill · photo · pill · photo · pill · photo · pill
const ROW2 = [
  { type: 'photo', src: '/images/students/p5.png', pos: 'center 12%' },
  { type: 'pill',  label: 'Learning for Life', bg: '#e8edf5', color: '#1f2d4a' },
  { type: 'photo', src: '/images/students/p6.png', pos: 'center 10%' },
  { type: 'pill',  label: 'Leadership',        bg: '#f5e8ea', color: '#3d1f24' },
  { type: 'photo', src: '/images/students/p7.png', pos: 'center 18%' },
  { type: 'pill',  label: 'Research',          bg: '#edf5ea', color: '#1f3d20' },
  { type: 'photo', src: '/images/students/p8.png', pos: 'center 15%' },
  { type: 'pill',  label: 'Community',         bg: '#e8edf5', color: '#1f2d4a' },
];

const SCHOLARSHIPS = [
  {
    type: 'Sports',
    sub: 'State · National · International athletes',
    img: '/images/sports/football-team.png',
    href: '/admissions/scholarships',
  },
  {
    type: 'Industry & External',
    sub: 'Cybage Khushboo Trust · Partner schemes',
    img: '/placements/drives/drive-seminar.jpg',
    href: '/admissions/scholarships',
  },
  {
    type: 'SC / ST / EWS',
    sub: 'Full fee reimbursement via state ePass',
    img: '/images/students/students-laughing.png',
    href: '/admissions/scholarships',
  },
];

const STATS = [
  { value: '10+',      label: 'Programmes Offered',  sub: 'B.Tech · M.Tech · MBA' },
  { value: '621',      label: 'Placement Offers',     sub: '2025–26 season' },
  { value: '200+',     label: 'Hiring Partners',      sub: 'Campus recruiters' },
  { value: '₹51 LPA',  label: 'Top Package',          sub: 'Highest offer 2025–26' },
];

// ── Scroll-driven values marquee ─────────────────────────────────────────────
function ValuesMarquee({ gradientText }: { gradientText: React.CSSProperties }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const row1Ref     = useRef<HTMLDivElement>(null);
  const row2Ref     = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef(0);
  const rafRef      = useRef<number | null>(null);
  const targetRef   = useRef(0);

  useEffect(() => {
    // Runs while the lerp is catching up with a scroll, then stops until the
    // next scroll event, instead of measuring layout every frame forever.
    const onScroll = () => {
      targetRef.current = window.scrollY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      // Smooth lerp toward target
      scrollRef.current += (targetRef.current - scrollRef.current) * 0.08;
      const settled = Math.abs(targetRef.current - scrollRef.current) < 0.1;
      if (settled) scrollRef.current = targetRef.current;

      const section = sectionRef.current;
      if (section) {
        const rect   = section.getBoundingClientRect();
        const top    = rect.top + window.scrollY;
        const offset = scrollRef.current - top + window.innerHeight * 0.3;
        const travel = offset * 0.18; // speed factor

        if (row1Ref.current) row1Ref.current.style.transform = `translateX(${-travel}px)`;
        if (row2Ref.current) row2Ref.current.style.transform = `translateX(${travel}px)`;
      }
      rafRef.current = settled ? null : requestAnimationFrame(tick);
    };

    targetRef.current = window.scrollY;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const renderRow = (items: typeof ROW1, ref: React.RefObject<HTMLDivElement | null>) => (
    <div className="relative overflow-hidden mb-5">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 z-10"
        style={{ background: 'linear-gradient(to right, white 0%, transparent 100%)' }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 z-10"
        style={{ background: 'linear-gradient(to left, white 0%, transparent 100%)' }} />
      <div
        ref={ref}
        className="flex items-center gap-3 md:gap-5 py-2"
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {/* Render items twice for seamless visual density */}
        {[...items, ...items].map((item, i) =>
          item.type === 'pill' ? (
            <div
              key={i}
              className="shrink-0 px-5 py-3 md:px-9 md:py-5 font-sans font-bold text-[1.05rem] md:text-[1.35rem] select-none"
              style={{
                background: item.bg,
                color: item.color,
                borderRadius: '999px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              {item.label}
            </div>
          ) : (
            <div
              key={i}
              className="shrink-0 w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-white"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
            >
              <img
                src={item.src!}
                alt="MLRIT student"
                className="w-full h-full object-cover"
                style={{ objectPosition: item.pos ?? 'center 20%' }}
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/about/milestone-2005.jpg'; }}
              />
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-white py-10 md:py-14 overflow-hidden">
      <div className="w-full px-6 md:px-10 lg:px-12 mb-8 md:mb-14">
        <div className="text-center">
          <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-secondary font-bold">Our Foundation</span>
          <h2 className="mt-3 font-sans font-black tracking-tighter-2 text-[clamp(2rem,3.5vw,3rem)] leading-[1.04] text-foreground">
            Values that guide <span className="font-display italic font-medium" style={gradientText}>every decision.</span>
          </h2>
          <p className="mt-4 text-muted text-[1rem] max-w-[480px] mx-auto leading-relaxed">
            These aren&apos;t just words on a wall — they shape how we teach, hire and welcome every student.
          </p>
        </div>
      </div>

      {renderRow(ROW1, row1Ref)}
      {renderRow(ROW2, row2Ref)}
    </section>
  );
}

const gradientText: React.CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, var(--foreground) 0%, var(--primary) 115%)',
  WebkitBackgroundClip: 'text', backgroundClip: 'text',
  WebkitTextFillColor: 'transparent', color: 'transparent',
};

export default function AdmissionsPageView({ content }: { content: Record<string, unknown> }) {
  const copy = (key: string, fallback: string) => asText(content[key], fallback);
  const brochureUrl = useBrochureUrl();

  const stepRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let closest = 0;
      let minDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elMid = rect.top + rect.height / 2;
        const dist = Math.abs(elMid - mid);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveStep(closest);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── HERO ── dark ink, matches About/Research/Examinations PageHeader system */}
      <section className="ph-hero relative overflow-hidden bg-black text-white" style={{ minHeight: 'clamp(440px, 60vh, 620px)' }}>
        {/* Ambient masked grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-[0]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(114,114,114,1) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(114,114,114,1) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
            opacity: 0.08,
            WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 30% 45%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 60% 55% at 30% 45%, #000 0%, rgba(0,0,0,0.5) 55%, transparent 100%)',
          }}
        />
        {/* Accent glows */}
        <div aria-hidden className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none blur-[100px] z-[0]" style={{ backgroundColor: '#01741f', opacity: 0.14 }} />
        <div aria-hidden className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none blur-[100px] z-[0]" style={{ backgroundColor: '#01741f', opacity: 0.10 }} />

        {/* Ghost display word */}
        <div aria-hidden className="absolute -left-4 md:-left-8 lg:-left-12 pointer-events-none select-none z-[0] hidden md:block" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="ph-ghost font-sans font-black leading-[0.78] tracking-tighter-3 whitespace-nowrap" style={{ fontSize: 'clamp(14rem, 28vw, 36rem)', color: 'rgba(255,255,255,0.05)' }}>
            ADMISSIONS
          </div>
        </div>

        {/* Corner bracket */}
        <div aria-hidden className="ph-bracket absolute top-8 right-8 w-8 h-8 pointer-events-none hidden md:block z-[3]">
          <span className="absolute top-0 right-0 w-full h-px" style={{ backgroundColor: '#01741f' }} />
          <span className="absolute top-0 right-0 w-px h-full" style={{ backgroundColor: '#01741f' }} />
        </div>

        <div className="relative z-[2] max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20 lg:py-28 flex flex-col justify-center" style={{ minHeight: 'clamp(440px, 60vh, 620px)' }}>
          {/* Breadcrumbs */}
          <div className="ph-crumbs flex flex-wrap items-center gap-2 font-mono text-[0.66rem] font-bold tracking-[0.24em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <Link href="/" style={{ opacity: 0.85 }}>{copy('home', 'Home')}</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{copy('admissions2', 'Admissions')}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: headline + CTAs */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden className="ph-rule h-px w-8 origin-left block" style={{ backgroundColor: '#01741f' }} />
                <span className="ph-eyebrow font-mono text-[0.68rem] font-bold tracking-[0.3em] uppercase" style={{ color: '#01741f' }}>{copy('admissions202526', 'Admissions 2025–26')}</span>
              </div>

              <h1 className="ph-title font-sans font-black tracking-tighter-3 leading-[0.98] text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
                {['You\'re', 'more', 'than'].map((word, i) => (
                  <span key={i} className="ph-word inline-block" style={{ marginRight: '0.28em', animationDelay: `${0.2 + i * 0.06}s` }}>{word}</span>
                ))}
                {['a', 'score.'].map((word, i) => (
                  <span key={i} className="ph-word inline-block" style={{ marginRight: '0.28em', animationDelay: `${0.38 + i * 0.06}s` }}>{word}</span>
                ))}
                <span className="block font-display italic font-medium mt-2" style={{ color: '#01741f', fontSize: '0.86em', lineHeight: 1.05 }}>
                    {['We', 'are', 'more', 'than', 'a', 'college.'].map((word, i) => (
                    <span key={i} className="ph-word inline-block" style={{ marginRight: '0.24em', animationDelay: `${0.56 + i * 0.05}s` }}>{word}</span>
                  ))}
                </span>
              </h1>

              <span aria-hidden className="ph-underline block mt-7 h-px origin-left" style={{ width: '22%', minWidth: '120px', backgroundColor: 'rgba(255,255,255,0.25)' }} />

              <p className="ph-dek mt-7 leading-[1.7] text-[clamp(1rem,1.3vw,1.18rem)] max-w-[62ch] text-white/70">{copy('mlritOpensItsDoors', 'MLRIT opens its doors to students who are curious, driven and ready to shape the future. A transparent, merit-based admissions process — designed for you.')}</p>

              <div className="ph-dek mt-10 flex flex-wrap gap-4">
                <Link
                  href="/admissions/why-mlrit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-foreground font-bold text-sm hover:bg-warm-light transition-all hover:scale-105"
                >{copy('whyMlrit', 'Why MLRIT')}<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <Link
                  href="/admissions/b-category"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all hover:scale-105"
                  style={{ boxShadow: '0 0 0 2px rgba(232,93,4,0.35)' }}
                >{copy('bCategory', 'B-Category')}<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Link>
                <a
                  href={brochureUrl}
                  download="MLRIT-Brochure-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 2v8m-3-3 3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{copy('downloadBrochure', 'Download Brochure')}</a>
              </div>
            </div>

            {/* Right: stats grid */}
            <div className="ph-dek grid grid-cols-2 gap-4" style={{ animationDelay: '0.5s' }}>
              {STATS.map((s, i) => (
                <div key={s.label} className="relative rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-5 md:p-6 hover:bg-white/[0.09] transition-colors">
                  <div className="font-mono text-[0.6rem] font-bold tracking-[0.2em] text-white/35 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-sans font-black tracking-tighter-2 text-white" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div className="mt-2 font-sans font-bold text-white/80 text-[0.88rem]">{s.label}</div>
                  <div className="mt-0.5 font-mono text-white/40 text-[0.62rem] tracking-wide uppercase">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO APPLY — sticky image left, scroll-driven steps right */}
      <section className="bg-warm-light py-10 md:py-14">
        <div className="w-full px-6 md:px-10 lg:px-12">
          <Reveal>
            <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-secondary font-bold">{copy('howToApply', 'How to Apply')}</span>
            <h2 className="mt-3 font-sans font-black tracking-tighter-2 text-[clamp(2rem,3.5vw,3rem)] leading-[1.04] text-foreground">{copy('fiveStepsTo', 'Five steps to')}<span className="font-display italic font-medium" style={gradientText}>{copy('yourSeat', 'your seat.')}</span>
            </h2>
          </Reveal>

          <div className="mt-8 md:mt-14 flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">

            {/* Sticky image */}
            <div className="lg:sticky lg:top-28 lg:w-[420px] shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-card-strong aspect-[4/5]">
                <img
                  src="/images/admin/admin-block.jpg"
                  alt="MLRIT Administrative Office corridor"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl px-5 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-muted">
                        Step {activeStep + 1} of {STEPS.length}
                      </p>
                      <span className="font-mono text-[0.62rem] text-secondary font-bold">
                        {Math.round(((activeStep + 1) / STEPS.length) * 100)}%
                      </span>
                    </div>
                    <p className="font-sans font-bold text-foreground text-[0.95rem]">
                      {STEPS[activeStep].title}
                    </p>
                    <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%`, background: '#1F6B24' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll-driven steps */}
            <div className="flex-1">
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  ref={el => { stepRefs.current[i] = el; }}
                  className="relative flex gap-3 md:gap-5 pb-4 last:pb-0"
                >
                  {/* Vertical connector */}
                  {i < STEPS.length - 1 && (
                    <div
                      className="absolute left-[22px] top-[52px] bottom-0 w-0.5 transition-colors duration-500"
                      style={{ background: activeStep > i ? '#01741f' : '#d1cec9' }}
                    />
                  )}

                  {/* Circle node */}
                  <div
                    className="shrink-0 mt-3 w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 z-10 border-2"
                    style={{
                      borderColor: activeStep >= i ? '#01741f' : '#d1cec9',
                      background:  activeStep === i ? '#01741f' : activeStep > i ? '#d4f0d8' : '#ffffff',
                      color:       activeStep === i ? '#ffffff' : activeStep > i ? '#01741f' : '#9ca3af',
                      transform:   activeStep === i ? 'scale(1.15)' : 'scale(1)',
                      boxShadow:   activeStep === i ? '0 0 0 4px rgba(1,116,31,0.15)' : 'none',
                    }}
                  >
                    {activeStep > i ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : s.num}
                  </div>

                  {/* Card — full highlighted when active */}
                  <div
                    className="flex-1 rounded-2xl border-2 px-4 py-4 md:px-6 md:py-5 mb-3 md:mb-5 transition-all duration-500"
                    style={{
                      borderColor:  activeStep === i ? '#01741f' : activeStep > i ? '#d4f0d8' : '#e5e0d8',
                      background:   activeStep === i ? '#f0faf1' : activeStep > i ? '#fafffe' : '#ffffff',
                      boxShadow:    activeStep === i ? '0 4px 24px rgba(1,116,31,0.12)' : 'none',
                      opacity:      activeStep < i ? 0.5 : 1,
                    }}
                  >
                    {/* Step label */}
                    <div
                      className="font-mono text-[0.62rem] font-bold tracking-[0.2em] uppercase mb-2 transition-colors duration-500"
                      style={{ color: activeStep === i ? '#01741f' : '#9ca3af' }}
                    >
                      Step {s.num}
                    </div>
                    <h3
                      className="font-sans font-extrabold text-[1rem] md:text-[1.2rem] leading-snug transition-colors duration-500"
                      style={{ color: activeStep === i ? '#0a2e0f' : activeStep > i ? '#4a5568' : '#6b7280' }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-2 text-[0.95rem] leading-relaxed transition-colors duration-500"
                      style={{ color: activeStep === i ? '#374151' : '#9ca3af' }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-6 md:mt-10 ml-[3.75rem] flex flex-wrap gap-4">
                <Link
                  href="/admissions/how-to-apply"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-all shadow-primary-glow hover:scale-105"
                >{copy('checkDetails', 'Check Details')}<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link
                  href="/admissions/b-category"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-primary text-primary font-bold text-sm hover:bg-primary hover:text-white transition-all hover:scale-105"
                >{copy('bCatDetails', 'B-Cat Details')}<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIP TYPES — 3 photo cards */}
      <section className="bg-white py-10 md:py-14">
        <div className="w-full px-6 md:px-10 lg:px-12">
          <Reveal>
            <div className="mb-8 md:mb-12">
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-secondary font-bold">{copy('financialSupport', 'Financial Support')}</span>
              <h2 className="mt-3 font-sans font-black tracking-tighter-2 text-[clamp(2rem,3.5vw,3rem)] leading-[1.04] text-foreground">{copy('scholarship', 'Scholarship')}<span className="font-display italic font-medium" style={gradientText}>{copy('types', 'types.')}</span>
              </h2>
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-4 md:gap-6">
            {SCHOLARSHIPS.map(s => (
              <StaggerItem key={s.type}>
                <Link href={s.href} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-card-soft aspect-[4/3] relative">
                    <img
                      src={s.img}
                      alt={s.type}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="mt-4 px-1">
                    <h3 className="font-sans font-bold text-foreground text-[1.05rem]">{s.type}</h3>
                    <p className="mt-1 text-muted text-[0.88rem]">{s.sub}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-foreground text-white text-[0.8rem] font-semibold group-hover:bg-primary transition-colors">{copy('exploreMore', 'Explore More')}<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6h8M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── VALUES — scroll-driven: row1 moves left, row2 moves right on scroll */}
      <ValuesMarquee gradientText={gradientText} />

      {/* ── FEES & SCHOLARSHIPS — brand card with overlapping image */}
      <section className="py-10 md:py-14 bg-warm-light">
        <div className="w-full px-6 md:px-10 lg:px-12">
          <Reveal>
            <div
              className="relative rounded-3xl overflow-hidden px-6 md:px-16 pt-8 md:pt-14 pb-0 md:pb-0"
              style={{ background: '#01741f' }}
            >
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #e85d04, transparent 70%)' }} />
              </div>
              <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
                <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, #ffffff, transparent 70%)' }} />
              </div>

              <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-end">
                {/* Text */}
                <div className="pb-8 md:pb-14">
                  <h2 className="font-sans font-black text-white text-[clamp(2rem,3.5vw,3.2rem)] leading-[1.06] tracking-tighter-2">{copy('fees', 'Fees &')}<br />{copy('scholarships', 'Scholarships')}</h2>
                  <p className="mt-5 text-white/75 text-[1rem] leading-relaxed max-w-[420px]">{copy('weBelieveNoStudent', 'We believe no student should miss out on quality education for financial reasons. MLRIT disburses scholarships across merit, need, sports and SC/ST categories every year.')}</p>
                  <div className="mt-5 md:mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/admissions/fees"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-foreground font-bold text-sm hover:bg-warm-light transition-colors"
                    >{copy('viewFeeStructure', 'View Fee Structure')}</Link>
                    <Link
                      href="/admissions/scholarships"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/25 text-white font-semibold text-sm hover:bg-white/20 transition-colors"
                    >{copy('exploreScholarships', 'Explore Scholarships')}</Link>
                  </div>
                </div>

                {/* Overlapping image */}
                <div className="relative mt-auto">
                  <div className="mx-auto w-full max-w-[320px] md:ml-auto md:mr-0 md:max-w-[360px] aspect-[3/4] max-h-[360px] rounded-t-2xl overflow-hidden shadow-card-strong bg-[#145326]">
                    <img
                      src="/images/about/milestone-2025.jpg"
                      alt="MLRIT students"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: '68% center' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
