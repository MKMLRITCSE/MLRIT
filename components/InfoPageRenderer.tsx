'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen, Lightbulb, Briefcase, Trophy, Eye, Target, Award, FlaskConical,
  Scale, Rocket, TrendingUp, Users, Building2, Star, FileText, Download,
  Globe, BadgeCheck, GraduationCap, ArrowRight,
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '@/components/motion/Reveal';
import PageHeader from '@/components/PageHeader';
import AboutQuickNav from '@/components/AboutQuickNav';
import AdmissionsQuickNav from '@/components/AdmissionsQuickNav';
import type { InfoPage, InfoBlock } from '@/lib/info-pages';

/* ── Icon registry — string name → lucide icon ───────────────────────── */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  academics: BookOpen, book: BookOpen,
  innovation: Lightbulb,
  employability: Briefcase, briefcase: Briefcase, placement: Briefcase,
  sports: Trophy, trophy: Trophy,
  vision: Eye,
  mission: Target,
  excellence: Award, award: Award,
  research: FlaskConical,
  ethics: Scale,
  entrepreneurship: Rocket,
  growth: TrendingUp,
  community: Users, users: Users, social: Users,
  building: Building2, campus: Building2,
  star: Star,
  file: FileText,
  download: Download,
  globe: Globe,
  check: BadgeCheck,
  graduation: GraduationCap,
};

function Ico({ name, className }: { name?: string; className?: string }) {
  const C = (name && ICONS[name]) || Award;
  return <C className={className} />;
}

/* Derive initials from a person's name, ignoring honorifics & single-letter initials. */
const HONORIFICS = new Set(['shri', 'smt', 'ms', 'mr', 'mrs', 'dr', 'prof', 'sri', 'kumari']);
function initials(name: string) {
  const parts = name
    .replace(/\./g, '')
    .split(/\s+/)
    .filter((p) => p && p.length > 1 && !HONORIFICS.has(p.toLowerCase()));
  if (parts.length === 0) return name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || '·';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

const ABOUT_PATHS = [
  '/about/vision-mission/introduction',
  '/about/vision-mission/vision-mission',
  '/about/legacy',
  '/about/timeline',
  '/about/rankings-awards',
  '/about/internal-governance',
];

const ADMISSIONS_PATHS = [
  '/admissions',
  '/admissions/how-to-apply',
  '/admissions/eligibility',
  '/admissions/fees',
  '/admissions/scholarships',
  '/admissions/counselling',
  '/admissions/why-mlrit',
  '/admissions/support',
];

function PageQuickNav() {
  const pathname = usePathname();
  if (ABOUT_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return <AboutQuickNav active={pathname} />;
  }
  if (ADMISSIONS_PATHS.some((p) => pathname === p)) {
    return <AdmissionsQuickNav active={pathname} />;
  }
  return null;
}

/* Reusable block list — lets other sections (e.g. Research) compose their own
   header + container while sharing the exact same block design language. */
export function Blocks({ blocks }: { blocks: InfoBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} index={i} />
      ))}
    </>
  );
}

export default function InfoPageRenderer({ page }: { page: InfoPage }) {
  return (
    <>
      <PageHeader
        tone="light"
        eyebrow={page.eyebrow}
        title={page.title}
        italic={page.italic}
        dek={page.dek}
        crumbs={page.crumbs}
      />
      <PageQuickNav />
      <div className="bg-white">
        <div className="w-full px-4 md:px-10 lg:px-12 py-6 md:py-10 space-y-7 md:space-y-14">
          {page.blocks.map((block, i) => (
            <Block key={i} block={block} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function Block({ block, index }: { block: InfoBlock; index: number }) {
  switch (block.kind) {
    case 'lead':
      return (
        <Reveal>
          <p className="text-foreground/85 text-[clamp(1.3rem,1.9vw,1.7rem)] leading-[1.5] font-sans font-medium max-w-[960px]">
            {block.text}
          </p>
        </Reveal>
      );

    case 'paragraph':
      return (
        <Reveal>
          <p className="text-foreground/80 leading-[1.75] text-[clamp(1.05rem,1.25vw,1.2rem)] max-w-[880px]">{block.text}</p>
        </Reveal>
      );

    case 'figure':
      return (
        <Reveal preset="scale">
          <figure className="mx-auto w-full max-w-[860px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-card-soft">
              <Image
                src={block.src}
                alt={block.alt}
                width={block.width}
                height={block.height}
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 860px"
                className="h-auto w-full"
              />
            </div>
          </figure>
        </Reveal>
      );

    case 'bullets':
      return (
        <Reveal>
          {block.title && (
            <h3 className="font-sans font-extrabold text-foreground text-[clamp(1.25rem,1.8vw,1.65rem)] tracking-tighter-2 mb-6">
              {block.title}
            </h3>
          )}
          <ul className="space-y-3.5">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3.5 text-foreground/85 leading-[1.7] text-[1.02rem]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      );

    case 'bullet-groups':
      return (
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5" delay={0.06}>
          {block.items.map((g) => (
            <StaggerItem key={g.title}>
              <div className="rounded-2xl border border-border bg-white p-4 md:p-7 h-full">
                <h3 className="font-sans font-extrabold text-foreground text-[1.05rem] tracking-tight mb-3 md:mb-4">
                  {g.title}
                </h3>
                <ul className="space-y-3">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-foreground/85 leading-[1.6] text-[0.92rem]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case 'stat-grid':
      return (
        <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6" delay={0.06}>
          {block.items.map((s) => (
            <StaggerItem key={s.label}>
              <div className="rounded-2xl border border-border bg-cream p-4 md:p-7 hover:-translate-y-1 hover:shadow-card-soft transition-all duration-300 h-full">
                <div className="font-sans font-black tracking-tighter-2 text-foreground text-[clamp(2rem,3vw,2.6rem)] leading-none">
                  {s.num}
                </div>
                <div className="mt-2 md:mt-3 font-mono text-[0.66rem] tracking-[0.18em] uppercase text-muted leading-tight">
                  {s.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case 'cards':
      return (
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5" delay={0.06}>
          {block.items.map((c) => {
            const inner = (
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-border bg-white p-4 md:p-7 h-full hover:border-primary hover:shadow-card-soft transition-all duration-300"
              >
                <h3 className="font-sans font-extrabold text-foreground text-[1rem] md:text-[1.15rem] tracking-tighter-2 leading-tight">
                  {c.title}
                </h3>
                <p className="mt-1.5 md:mt-3 text-muted leading-relaxed text-[0.85rem] md:text-[0.96rem]">{c.body}</p>
                {c.href && (
                  <div className="mt-3 md:mt-5 inline-flex items-center gap-1.5 text-primary font-sans font-bold text-[0.86rem]">
                    Learn more <span>→</span>
                  </div>
                )}
              </motion.div>
            );
            return (
              <StaggerItem key={c.title}>
                {c.href ? (
                  <Link href={c.href} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      );

    case 'quote':
      return (
        <Reveal>
          <div className="border-l-[3px] border-primary pl-5 md:pl-10 max-w-[820px]">
            <span aria-hidden className="font-display text-primary text-[3rem] md:text-[5rem] leading-[0.7] block">&ldquo;</span>
            <p className="font-display italic font-medium text-foreground text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.4] tracking-tight">
              {block.text}
            </p>
            <div className="mt-5 md:mt-7 flex items-center gap-4">
              <span className="w-12 h-px bg-primary" />
              <div>
                <div className="font-sans font-bold text-foreground text-[0.98rem]">{block.attribution}</div>
                {block.role && <div className="text-muted text-[0.86rem] mt-0.5">{block.role}</div>}
              </div>
            </div>
          </div>
        </Reveal>
      );

    case 'cta':
      return (
        <Reveal>
          <a
            href={block.href}
            target={block.external ? '_blank' : undefined}
            rel={block.external ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-white font-sans font-bold text-[0.92rem] hover:bg-primary transition-colors"
          >
            {block.label}
          </a>
        </Reveal>
      );

    /* ── Rich blocks ─────────────────────────────────────────────── */

    case 'heading':
      return (
        <Reveal>
          {block.eyebrow && (
            <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-bold tracking-[0.22em] uppercase text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {block.eyebrow}
            </span>
          )}
          <h2 className="mt-3 font-sans font-black tracking-tighter-2 text-foreground text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.05]">
            {block.title}
            {block.italic && <> <span className="font-display italic font-medium text-secondary">{block.italic}</span></>}
          </h2>
        </Reveal>
      );

    case 'stat-strip': {
      const green = block.variant === 'green';
      return (
        <Reveal>
          <div
            className={`flex flex-col sm:flex-row rounded-2xl overflow-hidden text-white ${
              green ? 'bg-green-hero' : 'bg-ink'
            }`}
          >
            {block.items.map((s) => (
              <div
                key={s.label}
                className="flex-1 px-6 py-5 md:py-7 md:px-8 border-b sm:border-b-0 sm:border-r last:border-0 border-white/10"
              >
                <div className="font-sans font-black tracking-tighter-2 text-white text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none">
                  {s.num}
                </div>
                <div className="mt-2.5 font-mono text-[0.62rem] tracking-[0.18em] uppercase text-white/55 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      );
    }

    case 'feature-cards': {
      const cols =
        block.items.length % 4 === 0
          ? 'lg:grid-cols-4'
          : block.items.length % 3 === 0
          ? 'lg:grid-cols-3'
          : 'lg:grid-cols-2';
      return (
        <Stagger className={`grid sm:grid-cols-2 ${cols} gap-3 md:gap-5`} delay={0.06}>
          {block.items.map((c) => {
            const inner = (
              <div className="group rounded-2xl border border-border bg-white p-4 md:p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-soft">
                <span className="inline-flex w-12 h-12 rounded-xl bg-secondary/10 text-secondary items-center justify-center transition-colors group-hover:bg-secondary group-hover:text-white">
                  <Ico name={c.icon} className="w-6 h-6" />
                </span>
                <h3 className="mt-3 md:mt-5 font-sans font-extrabold text-foreground text-[1rem] md:text-[1.12rem] tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-1.5 md:mt-2 text-muted leading-relaxed text-[0.85rem] md:text-[0.95rem]">{c.body}</p>
                {c.href && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-primary font-sans font-bold text-[0.84rem]">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
            return (
              <StaggerItem key={c.title}>
                {c.href ? (
                  <Link href={c.href} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      );
    }

    case 'numbered-cards':
      return (
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5" delay={0.06}>
          {block.items.map((c, i) => (
            <StaggerItem key={c.title}>
              <div className="rounded-2xl border border-border bg-white p-4 md:p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-soft">
                <span className="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 md:mt-3 font-sans font-extrabold text-foreground text-[1rem] md:text-[1.08rem] tracking-tight">
                  {c.title}
                </h3>
                <p className="mt-1.5 md:mt-2 text-muted leading-relaxed text-[0.85rem] md:text-[0.92rem]">{c.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case 'ranking-cards':
      return (
        <Stagger className="grid sm:grid-cols-2 gap-3 md:gap-5" delay={0.06}>
          {block.items.map((c) => (
            <StaggerItem key={c.title}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-4 md:p-6 h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-soft">
                <span className="inline-flex w-11 h-11 rounded-xl bg-secondary/10 text-secondary items-center justify-center flex-shrink-0">
                  <Ico name={c.icon} className="w-5 h-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {c.eyebrow && (
                        <div className="font-mono text-[0.6rem] font-bold tracking-[0.18em] uppercase text-subtle">
                          {c.eyebrow}
                        </div>
                      )}
                      <h3 className="mt-1 font-sans font-extrabold text-foreground text-[1.02rem] leading-snug">
                        {c.title}
                      </h3>
                    </div>
                    {c.badge && (
                      <span className="flex-shrink-0 font-display italic font-bold text-secondary text-[1.05rem] leading-none">
                        {c.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-muted leading-relaxed text-[0.9rem]">{c.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case 'pillars':
      return (
        <Stagger className="grid md:grid-cols-2 gap-4 md:gap-6" delay={0.1}>
          {block.items.map((p) => {
            const green = p.variant === 'green';
            return (
              <StaggerItem key={p.title}>
                <div
                  className={`rounded-3xl p-5 md:p-10 h-full border ${
                    green
                      ? 'bg-green-hero text-white border-transparent'
                      : 'bg-white border-border'
                  }`}
                >
                  <span
                    className={`inline-flex w-12 h-12 rounded-xl items-center justify-center ${
                      green ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Ico name={p.icon} className="w-6 h-6" />
                  </span>
                  <div
                    className={`mt-4 md:mt-6 font-mono text-[0.66rem] font-bold tracking-[0.2em] uppercase ${
                      green ? 'text-white/60' : 'text-secondary'
                    }`}
                  >
                    {p.eyebrow}
                  </div>
                  <h3
                    className={`mt-2 font-sans font-extrabold tracking-tight text-[1.2rem] md:text-[1.6rem] leading-[1.2] ${
                      green ? 'text-white' : 'text-foreground'
                    }`}
                  >
                    {p.title}
                  </h3>
                  {p.body && (
                    <p className={`mt-3 md:mt-4 leading-relaxed ${green ? 'text-white/80' : 'text-muted'}`}>
                      {p.body}
                    </p>
                  )}
                  {p.bullets && (
                    <ul className="mt-4 md:mt-5 space-y-3">
                      {p.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-start gap-3 leading-relaxed ${
                            green ? 'text-white/85' : 'text-foreground/85'
                          }`}
                        >
                          <span
                            className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              green ? 'bg-warm' : 'bg-primary'
                            }`}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      );

    case 'leadership':
      return (
        <Stagger className="grid md:grid-cols-2 gap-4 md:gap-6" delay={0.08}>
          {block.items.map((l) => {
            const orange = l.accent === 'orange';
            return (
              <StaggerItem key={l.name}>
                <div className="relative rounded-2xl border border-border bg-white p-5 md:p-8 h-full overflow-hidden">
                  <span className={`absolute top-0 inset-x-0 h-1 ${orange ? 'bg-primary' : 'bg-secondary'}`} />
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex w-12 h-12 rounded-full items-center justify-center ${
                        orange ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                      }`}
                    >
                      <Users className="w-6 h-6" />
                    </span>
                    <div>
                      <div
                        className={`font-mono text-[0.62rem] font-bold tracking-[0.2em] uppercase ${
                          orange ? 'text-primary' : 'text-secondary'
                        }`}
                      >
                        {l.role}
                      </div>
                      <div className="font-sans font-extrabold text-foreground text-[1.1rem]">{l.name}</div>
                    </div>
                  </div>
                  <p className="mt-3 md:mt-5 font-display italic text-foreground/80 leading-[1.6] text-[0.95rem] md:text-[1.05rem]">
                    &ldquo;{l.quote}&rdquo;
                  </p>
                  {l.href && (
                    <Link
                      href={l.href}
                      className={`mt-4 md:mt-6 inline-flex items-center gap-2 font-sans font-bold text-[0.86rem] ${
                        orange ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      Read Full Message <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      );

    case 'chips':
      return (
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-3.5" delay={0.04}>
          {block.items.map((c) => (
            <StaggerItem key={c.label}>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3 md:px-5 md:py-4 h-full">
                <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                <div className="min-w-0">
                  <div className="font-sans font-bold text-foreground text-[0.95rem]">{c.label}</div>
                  {c.sub && <div className="text-muted text-[0.8rem]">{c.sub}</div>}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );

    case 'pill-band':
      return (
        <Reveal preset="scale">
          <div className="relative rounded-3xl overflow-hidden bg-ink">
            {block.video ? (
              <video
                src={block.video}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : block.image ? (
              <img src={block.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
            <div className="relative px-4 md:px-12 py-8 md:py-20">
              {block.title && (
                <h3 className="text-center font-display italic font-bold text-white text-[clamp(1.8rem,3.6vw,2.8rem)] mb-6 md:mb-12">
                  {block.title}
                </h3>
              )}
              <Stagger
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-[880px] mx-auto"
                delay={0.05}
              >
                {block.items.map((it) => (
                  <StaggerItem key={it.label}>
                    <div className="rounded-full bg-white/95 hover:bg-white transition-colors aspect-[1.7/1] flex items-center justify-center text-center px-4 shadow-lg">
                      <span className="font-sans font-extrabold text-foreground text-[0.92rem] md:text-[0.98rem] tracking-tight leading-tight">
                        {it.label}
                      </span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Reveal>
      );

    case 'brochure-card':
      return (
        <Reveal preset="scale">
          <div className="relative rounded-3xl overflow-hidden bg-green-hero text-white p-5 md:p-12">
            <div aria-hidden className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-white/5 blur-[60px]" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-12">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
                  <GraduationCap className="w-7 h-7 text-warm" /> MLRIT
                </span>
                <h3 className="mt-5 font-sans font-black tracking-tighter-2 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.1]">
                  {block.title}
                </h3>
                {block.subtitle && <p className="mt-2 text-white/75">{block.subtitle}</p>}
                {block.meta && (
                  <p className="mt-1 font-mono text-[0.72rem] tracking-[0.14em] uppercase text-white/50">
                    {block.meta}
                  </p>
                )}
              </div>
              <a
                href={block.href}
                target={block.external ? '_blank' : undefined}
                rel={block.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-foreground font-sans font-bold text-[0.95rem] hover:bg-warm transition-colors flex-shrink-0"
              >
                <Download className="w-5 h-5" /> Download PDF
              </a>
            </div>
          </div>
        </Reveal>
      );

    case 'button-group':
      return (
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {block.items.map((b) => (
              <a
                key={b.label}
                href={b.href}
                target={b.external ? '_blank' : undefined}
                rel={b.external ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-sans font-bold text-[0.9rem] transition-colors ${
                  b.variant === 'outline'
                    ? 'border border-border text-foreground hover:border-primary hover:text-primary'
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                {b.label}
              </a>
            ))}
          </div>
        </Reveal>
      );

    case 'roster':
      return (
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.04}>
          {block.items.map((m) => {
            const accent = /chairman|principal/i.test(m.tag || '');
            return (
              <StaggerItem key={m.name}>
                <div className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-soft">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <span className="inline-flex w-12 h-12 rounded-full bg-secondary/10 text-secondary items-center justify-center font-sans font-extrabold text-[0.9rem] flex-shrink-0">
                      {initials(m.name)}
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-foreground text-[0.98rem] leading-tight">{m.name}</div>
                    {m.detail && <div className="mt-1 text-muted text-[0.82rem] leading-snug">{m.detail}</div>}
                    {m.tag && (
                      <span
                        className={`mt-2.5 inline-block rounded-full px-2.5 py-0.5 font-mono text-[0.58rem] font-bold tracking-[0.16em] uppercase ${
                          accent ? 'bg-secondary/12 text-secondary' : 'bg-neutral-100 text-muted'
                        }`}
                      >
                        {m.tag}
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      );

    case 'table':
      return (
        <Reveal>
          <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-card-soft">
            <table className={`w-full border-collapse text-left ${block.fitMobile ? 'md:min-w-[640px]' : 'min-w-[640px]'}`}>
              <thead>
                <tr className="bg-cream-2 border-b border-border">
                  {block.columns.map((c) => (
                    <th
                      key={c}
                      className={`${block.fitMobile ? 'px-2.5 first:pl-3.5 md:first:pl-5' : 'px-3'} py-3 md:px-5 md:py-4 font-mono text-[0.62rem] font-bold tracking-[0.16em] uppercase text-muted whitespace-nowrap`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b border-border/60 last:border-0 hover:bg-cream/60 transition-colors"
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`${block.fitMobile ? 'px-2.5 first:pl-3.5 md:first:pl-5 text-[0.8rem]' : 'px-3 text-[0.92rem]'} py-3 md:px-5 md:py-4 md:text-[0.92rem] leading-snug align-top ${
                          ci === 0 ? 'font-sans font-bold text-foreground' : 'text-muted'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <p className="mt-3 font-mono text-[0.72rem] tracking-[0.08em] text-subtle">{block.caption}</p>
          )}
        </Reveal>
      );

    case 'timeline':
      return (
        <div>
          {(block.eyebrow || block.title) && (
            <Reveal className="mb-12 md:mb-14">
              {block.eyebrow && (
                <span className="inline-flex items-center gap-2 font-mono text-[0.7rem] font-bold tracking-[0.22em] uppercase text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {block.eyebrow}
                </span>
              )}
              {block.title && (
                <h2 className="mt-3 font-sans font-black tracking-tighter-2 text-foreground text-[clamp(1.7rem,3vw,2.5rem)] leading-[1.05]">
                  {block.title}
                </h2>
              )}
            </Reveal>
          )}
          <Stagger className="relative" delay={0.08}>
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="space-y-6 md:space-y-10">
              {block.items.map((t, i) => {
                const isRight = i % 2 === 1;
                return (
                  <StaggerItem key={t.y}>
                    <div className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-16">
                      <div
                        className={`pl-12 md:pl-0 ${
                          isRight ? 'md:col-start-2' : 'md:col-start-1 md:text-right'
                        }`}
                      >
                        <div className="group block rounded-2xl border border-border bg-white p-4 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card-soft">
                          <div className={`flex items-baseline gap-3 ${isRight ? '' : 'md:justify-end'}`}>
                            <span className="font-display italic font-black text-secondary text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none tracking-tighter-2">
                              {t.y}
                            </span>
                            <span className="font-mono text-[0.58rem] font-bold tracking-[0.2em] uppercase text-subtle">
                              {String(i + 1).padStart(2, '0')} / {String(block.items.length).padStart(2, '0')}
                            </span>
                          </div>
                          <h3 className="mt-3 font-sans font-extrabold text-foreground text-[1.12rem] tracking-tight leading-snug">
                            {t.t}
                          </h3>
                          <p className="mt-2 text-muted leading-relaxed text-[0.93rem]">{t.d}</p>
                        </div>
                      </div>
                      <span className="absolute left-[19px] md:left-1/2 top-7 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 grid place-items-center w-4 h-4 rounded-full border-2 border-primary bg-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </span>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </Stagger>
        </div>
      );

    default:
      void index;
      return null;
  }
}
