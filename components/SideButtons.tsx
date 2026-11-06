'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_BROCHURE } from '@/lib/content/documents-shared';
import Link from 'next/link';

/* ── Sub-popup for Syllabus & PYQs ─────────────────────────────── */
function SyllabusSubPopup({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute left-0 top-full mt-2 lg:left-auto lg:top-0 lg:right-full lg:mt-0 lg:mr-2 rounded-xl border border-border/50 overflow-hidden z-20"
      style={{
        background: 'rgba(255,255,255,0.99)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        width: '210px',
      }}
    >
      <div className="px-3 py-2 border-b border-border/40">
        <p className="font-sans font-bold text-foreground text-[0.8rem]">Syllabus &amp; PYQs</p>
      </div>
      <div className="p-2 flex flex-col gap-1.5">
        <Link
          href="/examinations/syllabus"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-orange-50 transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#e8600a] shrink-0"
            style={{ background: 'rgba(232,96,10,0.09)' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="font-sans font-semibold text-foreground text-[0.8rem]">Syllabus Explorer</p>
            <p className="font-mono text-muted text-[0.62rem]">Browse by department</p>
          </div>
        </Link>
        <Link
          href="/examinations/pyqs"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-orange-50 transition-colors group"
        >
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[#e8600a] shrink-0"
            style={{ background: 'rgba(232,96,10,0.09)' }}>
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden>
              <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M7 6h6M7 9.5h6M7 13h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M13 12l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="font-sans font-semibold text-foreground text-[0.8rem]">Previous Papers</p>
            <p className="font-mono text-muted text-[0.62rem]">PYQs — all years</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

/* ── Main items ─────────────────────────────────────────────────── */
type Item = {
  label: string;
  href?: string;
  external?: boolean;
  subPopup?: boolean;
  icon: React.ReactNode;
};

const ITEMS: Item[] = [
  {
    label: 'CampusHub',
    href: 'https://campushub.mlrit.ac.in/',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    label: 'LMS',
    href: 'https://lms.mlrit.ac.in/',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M3 5h14M3 10h14M3 15h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="16" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    label: 'Exam Portal',
    href: 'https://exams.mlrinstitutions.ac.in/',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 7h6M7 10.5h6M7 14h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Transport Fee Payment',
    href: 'https://formbuilder.ccavenue.com/live/kotak-mahindra/kmr-educational-society',
    external: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 7h14" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 16v1.5M14 16v1.5M5 17.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Syllabus & PYQs',
    subPopup: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Calendar',
    href: '/examinations#calendars',
    external: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2" y="4" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M6 2v4M14 2v4M2 9h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="7" cy="13" r="1" fill="currentColor"/>
        <circle cx="10" cy="13" r="1" fill="currentColor"/>
        <circle cx="13" cy="13" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

const TAB_STYLE: React.CSSProperties = {
  writingMode: 'vertical-rl',
  textOrientation: 'mixed',
  transform: 'rotate(180deg)',
  padding: '12px 8px',
  borderRadius: '0 6px 6px 0',
  gap: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: '0.66rem',
  letterSpacing: '0.16em',
  textTransform: 'uppercase' as const,
  color: 'white',
};

export default function SideButtons({ brochureUrl = DEFAULT_BROCHURE }: { brochureUrl?: string }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const close = useCallback(() => { setOpen(false); setSubOpen(false); }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      {/* Single fixed container — both tabs stacked, centered on right edge */}
      <div
        className="fixed right-0 z-50 flex flex-col items-end"
        style={{ top: '62%', transform: 'translateY(-50%)' }}
      >
        {/* Brochure tab */}
        <a
          href={brochureUrl}
          download="MLRIT-Brochure-2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Brochure"
        >
          <div style={{ ...TAB_STYLE, background: '#01741f', boxShadow: '-2px 0 16px rgba(1,116,31,0.55), -4px 0 32px rgba(1,116,31,0.30), 0 0 8px rgba(1,116,31,0.40)' }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
              style={{ transform: 'rotate(90deg)', marginBottom: '3px' }} aria-hidden>
              <path d="M7 2v7M4 7l3 3 3-3M2 12h10"
                stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Brochure
          </div>
        </a>

        <div style={{ height: '4px' }} />

        {/* Student Corner tab */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Student Corner"
          className="focus:outline-none"
        >
          <div style={{ ...TAB_STYLE, background: '#e8600a', boxShadow: '-2px 0 16px rgba(232,96,10,0.60), -4px 0 32px rgba(232,96,10,0.32), 0 0 8px rgba(232,96,10,0.45)' }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"
              style={{ transform: 'rotate(90deg)', marginBottom: '3px' }} aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.6"/>
              <path d="M9 5L7.5 8.5 5 9l1.5-3.5L9 5z" fill="white"/>
            </svg>
            Resources
          </div>
        </button>
      </div>

      {/* Main popup */}
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-end"
          onClick={e => { if (e.target === e.currentTarget) close(); }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(10,10,10,0.45)', backdropFilter: 'blur(3px)' }}
            onClick={close}
          />

          <div
            className="relative mr-12 rounded-2xl border border-border/50"
            style={{
              background: 'rgba(255,255,255,0.99)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.14)',
              width: '292px',
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: '#e8600a' }}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.6"/>
                    <path d="M9 5L7.5 8.5 5 9l1.5-3.5L9 5z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans font-extrabold text-foreground text-[0.88rem] leading-tight">Student Corner</p>
                  <p className="font-mono text-muted text-[0.6rem] tracking-wide">Quick access to portals</p>
                </div>
              </div>
              <button
                onClick={close}
                className="w-7 h-7 rounded-full bg-black/6 hover:bg-black/10 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* 2-col icon grid */}
            <div className="p-3 grid grid-cols-2 gap-2">
              {ITEMS.map((item) => {
                const cls = `flex flex-col items-center gap-2 rounded-xl border py-4 px-2
                  transition-all group cursor-pointer ${
                    item.subPopup && subOpen
                      ? 'border-primary/60 bg-orange-50/70'
                      : 'border-border/50 hover:border-primary/50 hover:bg-orange-50/60'
                  }`;
                const iconEl = (
                  <>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        item.subPopup && subOpen
                          ? 'bg-[#e8600a] text-white'
                          : 'text-[#e8600a] group-hover:bg-[#e8600a] group-hover:text-white'
                      }`}
                      style={!(item.subPopup && subOpen) ? { background: 'rgba(232,96,10,0.09)' } : {}}
                    >
                      {item.icon}
                    </div>
                    <span className="font-sans font-semibold text-foreground text-[0.72rem] text-center leading-tight">
                      {item.label}
                    </span>
                  </>
                );

                if (item.subPopup) {
                  return (
                    <div key={item.label} className="relative">
                      <button
                        className={cls + ' w-full'}
                        onClick={() => setSubOpen(s => !s)}
                        aria-expanded={subOpen}
                      >
                        {iconEl}
                      </button>
                      {subOpen && (
                        <SyllabusSubPopup onClose={close} />
                      )}
                    </div>
                  );
                }

                return item.external ? (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                    onClick={close} className={cls}>{iconEl}</a>
                ) : (
                  <Link key={item.label} href={item.href!} onClick={close} className={cls}>{iconEl}</Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
