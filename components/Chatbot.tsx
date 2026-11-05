'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DEFAULT_BROCHURE } from '@/lib/content/documents-shared';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Send, User, Loader2,
  Maximize2, Minimize2, Navigation2, RefreshCw,
  WifiOff, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

type EntityLink = { label: string; url: string };

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  navigation_target?: string;
  navigation_url?: string;
  sources?: Array<{ source: string; page?: number }>;
  isError?: boolean;
  entities?: EntityLink[];
};

type ConnectionStatus = 'idle' | 'connecting' | 'online' | 'offline';

// ─── Constants ───────────────────────────────────────────────────────────────

// In production the chatbot runs on the same server as the site and nginx
// forwards /chatbot-api/ to it (deploy/nginx/chatbot.conf), so the widget calls
// the site's own origin: no CORS, no extra public port. A visitor's browser can
// never reach 127.0.0.1, so that address is only the local-development default.
const CHATBOT_URL =
  process.env.NEXT_PUBLIC_CHATBOT_URL ??
  (process.env.NODE_ENV === 'production' ? '/chatbot-api' : 'http://127.0.0.1:8001');

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: "I'm **MLRIT Assistant**. How can I help you?",
  timestamp: new Date(),
};

const FAQ_TOPICS = [
  { label: 'How do I apply for admission?', query: 'How do I apply for admission?' },
  { label: 'What are the eligibility criteria for admission?', query: 'What are the eligibility criteria for admission?' },
  { label: 'Tell me about placements.', query: 'Tell me about placements.' },
  { label: 'Tell me about academics.', query: 'Tell me about academics.' },
  { label: 'What departments are available?', query: 'What departments are available?' },
];

// Department slugs that have a real /departments/[slug] page (matches WEBSITE_ROUTES in chatbot/config.py)
const DEPARTMENT_SLUGS = [
  'cse', 'cse-cs', 'cse-ds', 'aiml', 'ece', 'eee', 'it', 'csit', 'mechanical', 'aeronautical', 'mba',
];

type SmartAction = { label: string; href: string };

// Downloadable/static assets (PDFs, etc.) and off-site URLs must do a normal
// browser navigation; everything else is an internal page route and should use
// Next's client-side router so the chatbot (mounted once in the root layout)
// never unmounts/resets on navigation.
function isExternalOrAsset(href: string): boolean {
  if (/^https?:\/\//.test(href)) return true;
  const path = href.split('#')[0].split('?')[0];
  return /\.[a-z0-9]{2,5}$/i.test(path);
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternalOrAsset(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

// Descriptive primary-button labels per canonical navigation target — keeps the
// primary CTA text aligned with what the user actually asked for instead of a
// generic "Go to <target>".
const PRIMARY_ACTION_LABELS: Record<string, string> = {
  admissions: 'Open Admissions',
  placements: 'View Placements',
  academics: 'View Academics',
  examinations: 'View Examinations',
  contact: 'Contact MLRIT',
  research: 'View Research',
  chronicles: 'View Chronicles',
  faculty: 'View Faculty Profile',
  departments: 'View Departments',
};

const TITLE_CASE_ACRONYMS = new Set(['naac', 'nirf', 'iqac', 'nba', 'mlrit', 'ug', 'pg']);

function toTitleCase(target: string): string {
  return target
    .split(/[-\s]+/)
    .map((w) => (TITLE_CASE_ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

// Derives the primary CTA label from the response's navigation target/url —
// a faculty-anchored department link ("#all-faculty") always reads as "View
// Faculty Profile" even though its navigation_target is the department slug.
function getPrimaryLabel(msg: Message): string {
  const target = msg.navigation_target?.toLowerCase();
  const url = msg.navigation_url ?? '';
  if (url.includes('#all-faculty')) return 'View Faculty Profile';
  if (target && DEPARTMENT_SLUGS.includes(target)) return 'View Department';
  if (!target) return 'View Page';
  if (PRIMARY_ACTION_LABELS[target]) return PRIMARY_ACTION_LABELS[target];
  return `View ${toTitleCase(target)}`;
}

// Derives contextual quick-action links from an assistant reply, using only real,
// existing site routes. Returns [] when nothing relevant applies.
function getSmartActions(msg: Message, brochureUrl: string = DEFAULT_BROCHURE): SmartAction[] {
  if (msg.role !== 'assistant' || msg.isError) return [];

  // Multi-entity responses (faculty lists, HOD lists, etc.) make each entity
  // individually clickable instead — never pair that with generic buttons too.
  if (msg.entities && msg.entities.length > 0) return [];

  const target = msg.navigation_target?.toLowerCase();
  const text = msg.content.toLowerCase();
  let actions: SmartAction[] = [];

  if (target && DEPARTMENT_SLUGS.includes(target) && msg.navigation_url) {
    // Strip any anchor so both branches build clean hrefs off the bare department page.
    const baseUrl = msg.navigation_url.split('#')[0];
    const isFacultyPrimary = msg.navigation_url.includes('#all-faculty');
    actions = isFacultyPrimary
      ? [
          { label: 'View Department', href: baseUrl },
          { label: 'Laboratories', href: `${baseUrl}#labs` },
        ]
      : [
          { label: 'Faculty', href: `${baseUrl}#all-faculty` },
          { label: 'Laboratories', href: `${baseUrl}#labs` },
        ];
  } else if (target === 'departments') {
    actions = [
      { label: 'Undergraduate Departments', href: '/departments/ug' },
      { label: 'Postgraduate Departments', href: '/departments/pg' },
    ];
  } else if (target === 'location') {
    actions = [
      {
        label: '🗺️ View on Google Maps',
        href: 'https://maps.app.goo.gl/UJSbCCDzhnMJ82Vd8',
      },
      { label: 'Contact MLRIT', href: '/contact' },
    ];
  } else if (target === 'admissions' || /\badmissions?\b/.test(text)) {
    actions = [
      { label: 'Open Admissions', href: '/admissions' },
      { label: 'Download Brochure', href: brochureUrl },
      { label: 'Contact Admissions', href: '/admissions/support' },
    ];
  } else if (/\bacademics?\b|curriculum|regulations?/.test(text)) {
    actions = [
      { label: 'Academic Calendar', href: '/examinations#calendars' },
      { label: 'Regulations', href: '/examinations/regulations' },
    ];
  } else if (target === 'placements' || /\bplacements?\b/.test(text)) {
    actions = [
      { label: 'Placement Cell', href: '/placements/overview' },
      { label: 'Placement Statistics', href: '/placements/statistics' },
    ];
  } else if (target === 'chronicles' || /\bchronicles?\b/.test(text)) {
    actions = [{ label: 'View Chronicles', href: '/chronicles' }];
  }

  // Never duplicate the primary navigation CTA already shown for this message.
  return actions.filter((a) => a.href !== msg.navigation_url);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Facts that are always bold but never a link (dates, emails, phone numbers) —
// entity *navigation* itself is driven entirely by the `entities` array the
// backend attaches per-response (see `_build_entity_registry` /
// `_attach_entities` in chatbot/chatbot.py), not by any category list here.
// That single backend registry is the one place new entity types (departments,
// faculty, labs, facilities, or anything added later) become navigable — this
// file never special-cases a category by name.
const KEY_INFO_REGEX = new RegExp(
  [
    '[\\w.+-]+@[\\w-]+\\.[\\w.-]+',
    '(?:\\+91[\\s-]?)?\\d{10}\\b',
    '\\b\\d{1,2}\\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-zA-Z]*\\.?\\s+\\d{4}\\b',
    '\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-zA-Z]*\\.?\\s+\\d{1,2},?\\s+\\d{4}\\b',
  ].join('|'),
  'g'
);

const LINK_TEXT_CLASSNAME =
  'font-semibold text-green-700 underline decoration-green-300 underline-offset-2 hover:text-green-800';

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Builds a regex matching any of this response's entity labels — longest first,
// so overlapping labels (e.g. "CSE" vs "CSE-DS") resolve correctly — with
// boundaries that also exclude '-' so "CSE" can't falsely match inside an
// unrelated hyphenated token like "CSE-CS".
function buildEntityRegex(entities: EntityLink[]): RegExp {
  const labels = [...entities].sort((a, b) => b.label.length - a.label.length).map((e) => escapeRegExp(e.label));
  return new RegExp(`(?<![\\w-])(?:${labels.join('|')})(?![\\w-])`, 'g');
}

// Highlights emails/phones/dates in bold, and — whenever the response carries
// navigable `entities` — turns any mention of one of those labels into a link.
// This is the single, category-agnostic place plain-text entity navigation happens.
function highlightText(text: string, keyPrefix: string, entities?: EntityLink[]): React.ReactNode {
  if (!text) return text;

  const hasEntities = !!entities && entities.length > 0;
  const regex = hasEntities
    ? new RegExp(`${buildEntityRegex(entities!).source}|${KEY_INFO_REGEX.source}`, 'g')
    : KEY_INFO_REGEX;
  const entityMap = hasEntities ? new Map(entities!.map((e) => [e.label, e.url])) : null;

  const matches = text.match(regex);
  if (!matches || matches.length === 0) return text;

  const parts = text.split(regex);
  const nodes: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(<React.Fragment key={`${keyPrefix}-t${i}`}>{part}</React.Fragment>);
    if (matches[i]) {
      const href = entityMap?.get(matches[i]);
      nodes.push(
        href ? (
          <SmartLink key={`${keyPrefix}-h${i}`} href={href} className={LINK_TEXT_CLASSNAME}>
            {matches[i]}
          </SmartLink>
        ) : (
          <strong key={`${keyPrefix}-h${i}`} className="font-semibold text-green-700">
            {matches[i]}
          </strong>
        )
      );
    }
  });
  return nodes;
}

// Renders a **bold** segment's inner text. If it exactly matches an entity
// label, the whole thing is a link. Otherwise — e.g. the bold span is "Dr. S V S
// Prasad, HOD" and the label is just "Dr. S V S Prasad" — the entity label is
// still located and linkified inside the span, with the rest staying bold text.
function renderBoldSegment(inner: string, keyPrefix: string, entities?: EntityLink[]): React.ReactNode {
  const boldFallback = <strong className="font-semibold text-green-700">{inner}</strong>;
  if (!entities || entities.length === 0) return boldFallback;

  const exact = entities.find((e) => e.label === inner);
  if (exact) {
    return (
      <SmartLink href={exact.url} className={LINK_TEXT_CLASSNAME}>
        {inner}
      </SmartLink>
    );
  }

  const regex = buildEntityRegex(entities);
  const matches = inner.match(regex);
  if (!matches || matches.length === 0) return boldFallback;

  const entityMap = new Map(entities.map((e) => [e.label, e.url]));
  const parts = inner.split(regex);
  const nodes: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) {
      nodes.push(
        <strong key={`${keyPrefix}-bs-t${i}`} className="font-semibold text-green-700">
          {part}
        </strong>
      );
    }
    if (matches[i]) {
      const url = entityMap.get(matches[i]);
      nodes.push(
        url ? (
          <SmartLink key={`${keyPrefix}-bs-l${i}`} href={url} className={LINK_TEXT_CLASSNAME}>
            {matches[i]}
          </SmartLink>
        ) : (
          <strong key={`${keyPrefix}-bs-s${i}`} className="font-semibold text-green-700">
            {matches[i]}
          </strong>
        )
      );
    }
  });
  return <>{nodes}</>;
}

// Parse **bold** segments, then run entity/key-info highlighting over the
// remaining plain text. A bold segment that matches (fully or in part) one of
// the response's `entities` (e.g. a name in a faculty/HOD list) becomes clickable.
function parseInline(text: string, keyPrefix: string, entities?: EntityLink[]): React.ReactNode {
  return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <React.Fragment key={`${keyPrefix}-b${i}`}>
          {renderBoldSegment(part.slice(2, -2), `${keyPrefix}-b${i}`, entities)}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment key={`${keyPrefix}-p${i}`}>{highlightText(part, `${keyPrefix}-${i}`, entities)}</React.Fragment>
    );
  });
}

function formatContent(content: string, entities?: EntityLink[]) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let bulletBuffer: React.ReactNode[] = [];
  let numberedBuffer: React.ReactNode[] = [];

  const flushBullets = () => {
    if (bulletBuffer.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-1.5 space-y-1 pl-1">
          {bulletBuffer}
        </ul>
      );
      bulletBuffer = [];
    }
  };

  const flushNumbered = () => {
    if (numberedBuffer.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-1.5 space-y-1 pl-5 list-decimal marker:text-green-700 marker:font-semibold">
          {numberedBuffer}
        </ol>
      );
      numberedBuffer = [];
    }
  };

  const flushAll = () => {
    flushBullets();
    flushNumbered();
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ');
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);

    // A line that is entirely bold (optionally trailing ':') reads as a section heading.
    const headingMatch = trimmed.match(/^\*\*(.+?)\*\*:?$/);

    if (headingMatch) {
      flushAll();
      elements.push(
        <p
          key={lineIdx}
          className="text-[0.86rem] font-semibold text-green-800 mt-2.5 mb-1 first:mt-0"
        >
          {headingMatch[1]}
        </p>
      );
      return;
    }

    if (isBullet) {
      flushNumbered();
      const cleanLine = trimmed.replace(/^[-*•]\s+/, '');
      bulletBuffer.push(
        <li key={lineIdx} className="flex items-start gap-2 text-[0.84rem] leading-[1.55] text-foreground/85">
          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
          <span>{parseInline(cleanLine, `${lineIdx}`, entities)}</span>
        </li>
      );
      return;
    }

    if (numberedMatch) {
      flushBullets();
      numberedBuffer.push(
        <li key={lineIdx} className="text-[0.84rem] leading-[1.55] text-foreground/85 pl-1">
          {parseInline(numberedMatch[2], `${lineIdx}`, entities)}
        </li>
      );
      return;
    }

    flushAll();
    if (trimmed === '') {
      elements.push(<div key={lineIdx} className="h-1.5" />);
    } else {
      elements.push(
        <p key={lineIdx} className="text-[0.84rem] leading-[1.55] text-foreground/85 mb-1">
          {parseInline(line, `${lineIdx}`, entities)}
        </p>
      );
    }
  });

  flushAll();
  return elements;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Chatbot({ brochureUrl = DEFAULT_BROCHURE }: { brochureUrl?: string }) {
  // Plain in-memory state — the chatbot is mounted once in the root layout, so
  // ordinary client-side navigation (Smart Actions, entity links, any internal
  // <Link>) never unmounts it and the conversation naturally survives. A full
  // page reload or a new tab re-runs this module from scratch, which is exactly
  // the "start a fresh conversation" behavior we want — nothing is persisted to
  // localStorage on purpose.
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}`);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Show scroll-down button when user scrolls up
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const isScrolledUp = el.scrollHeight - el.scrollTop - el.clientHeight > 80;
      setShowScrollDown(isScrolledUp);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  // Track unread messages when minimized
  useEffect(() => {
    if (!isOpen || isMinimized) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg?.role === 'assistant' && messages.length > 1) {
        setUnreadCount((c) => c + 1);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const clearUnread = () => setUnreadCount(0);

  // Global keyboard shortcut: Ctrl+? opens chatbot
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen((v) => !v);
        setIsMinimized(false);
        clearUnread();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      clearUnread();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // ─── Send message ──────────────────────────────────────────────────────────

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setStatus('connecting');

    try {
      const res = await fetch(`${CHATBOT_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
        signal: AbortSignal.timeout(60000),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setStatus('online');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.answer,
          timestamp: new Date(),
          navigation_target: data.navigation_target,
          navigation_url: data.navigation_url,
          entities: data.entities,
          sources: data.sources,
        },
      ]);
    } catch (err) {
      console.error('Chatbot request failed:', err);
      setStatus('offline');
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'MLRIT Assistant is currently unavailable. Please try again shortly.',
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);
  const handleSuggest = (q: string) => sendMessage(q);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    clearUnread();
  };

  const handleClose = () => setIsOpen(false);
  const handleMinimize = () => setIsMinimized(true);
  const handleRestore = () => {
    setIsMinimized(false);
    clearUnread();
  };

  const handleRetry = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUser) sendMessage(lastUser.content);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 select-none">

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'w-[calc(100vw-2rem)] sm:w-[400px]',
              'h-[min(560px,calc(100vh-8rem))]',
              'bg-white rounded-2xl shadow-lg shadow-black/[0.08] border border-border',
              'flex flex-col overflow-hidden'
            )}
          >
            {/* Header */}
            <div className="bg-green-700 px-4 py-3 flex items-center justify-between text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center ring-2 ring-white/20 overflow-hidden p-1">
                  <img src="/assets/mlrit-emblem.png" alt="MLRIT" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-semibold text-sm leading-tight">MLRIT Assistant</div>
                  <div className="text-[11px] text-white/75 leading-tight">Your Digital Campus Assistant</div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={handleMinimize}
                  className="p-2 hover:bg-white/15 rounded-lg transition-colors"
                  title="Minimise"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/15 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white relative scroll-smooth"
            >
              {messages.map((msg, idx) => {
                const smartActions = idx === 0 ? [] : getSmartActions(msg, brochureUrl);
                return (
                <div
                  key={idx}
                  className={cn('flex gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs leading-none text-green-700" aria-hidden="true">✦</span>
                    </div>
                  )}

                  <div
                    className={cn(
                      'max-w-[82%] text-sm shadow-sm',
                      msg.role === 'user'
                        ? 'rounded-xl px-3 py-2 bg-green-700 text-white rounded-tr-[4px]'
                        : msg.isError
                        ? 'rounded-xl px-3.5 py-2.5 bg-red-50 border border-red-200 text-red-800 rounded-tl-[4px]'
                        : 'rounded-xl px-3.5 py-2.5 bg-white border border-border text-foreground rounded-tl-[4px]'
                    )}
                  >
                    {msg.role === 'assistant'
                      ? formatContent(msg.content, msg.entities)
                      : <p className="text-[0.84rem] leading-relaxed">{msg.content}</p>}

                    {/* Welcome FAQ topics */}
                    {idx === 0 && messages.length <= 1 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {FAQ_TOPICS.map((topic) => (
                          <button
                            key={topic.label}
                            onClick={() => handleSuggest(topic.query)}
                            className="text-[11.5px] leading-none bg-green-50 hover:bg-green-100 active:bg-green-200 active:scale-[0.97] border border-green-200 text-green-800 font-medium rounded-full px-3 py-1.5 transition-all duration-150"
                          >
                            {topic.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Navigation CTA — hidden for multi-entity responses, which use
                        inline clickable names instead of a single generic button. */}
                    {msg.navigation_url && !(msg.entities && msg.entities.length > 0) && (
                      <SmartLink
                        href={msg.navigation_url}
                        className="mt-2.5 flex items-center justify-between gap-2 px-3 py-2 bg-green-50 rounded-xl text-green-800 font-semibold text-[11px] hover:bg-green-100 transition-colors border border-green-200"
                      >
                        <span>→ {getPrimaryLabel(msg)}</span>
                        <Navigation2 className="w-3 h-3 rotate-45" />
                      </SmartLink>
                    )}

                    {/* Smart contextual actions */}
                    {smartActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {smartActions.map((action) => (
                          <SmartLink
                            key={action.label}
                            href={action.href}
                            className="text-[11px] font-medium bg-white hover:bg-green-50 active:scale-[0.97] border border-green-200 text-green-800 rounded-full px-3 py-1.5 transition-all duration-150"
                          >
                            {action.label}
                          </SmartLink>
                        ))}
                      </div>
                    )}

                    {/* Error retry */}
                    {msg.isError && (
                      <button
                        onClick={handleRetry}
                        className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-600 hover:text-red-800 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" /> Retry
                      </button>
                    )}

                    {/* Timestamp */}
                    <div className={cn('text-[9px] mt-1.5 opacity-40 font-mono', msg.role === 'user' ? 'text-right' : 'text-left')}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-green-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                );
              })}

              {/* Loading bubble */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs leading-none text-green-700" aria-hidden="true">✦</span>
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-green-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Scroll-to-bottom button */}
              <AnimatePresence>
                {showScrollDown && (
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    onClick={() => scrollToBottom()}
                    className="sticky bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-green-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-green-800 transition-colors"
                  >
                    <ChevronDown className="w-3 h-3" /> New message
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="flex-shrink-0 p-3 bg-white border-t border-border">
              <div className="flex items-center gap-2 bg-[#f8f9fa] border border-border rounded-xl px-3 py-2 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/10 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask about MLRIT…"
                  className="flex-1 bg-transparent border-none outline-none text-[0.86rem] text-foreground placeholder:text-muted/60"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                    input.trim() && !isLoading
                      ? 'bg-green-700 text-white hover:bg-green-800 shadow-sm'
                      : 'text-muted/40 cursor-not-allowed'
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[9px] text-center mt-2 text-muted/50">
                MLRIT Assistant may occasionally make mistakes · Press <kbd className="font-mono bg-border/60 rounded px-1">Ctrl+/</kbd> to toggle
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Minimised pill ── */}
      <AnimatePresence>
        {isMinimized && isOpen && (
          <motion.button
            key="minimised-pill"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            onClick={handleRestore}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-green-800 transition-colors font-semibold text-[0.8rem]"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            MLRIT Assistant
            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={isOpen ? handleClose : handleOpen}
        className={cn(
          'relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ring-2',
          isOpen
            ? 'bg-white text-green-700 ring-green-200 hover:ring-green-300'
            : 'bg-green-700 text-white ring-green-600/30 hover:bg-green-800'
        )}
        aria-label="Toggle MLRIT chatbot (Ctrl+/)"
        title="MLRIT Assistant (Ctrl+/)"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center shadow-md"
          >
            {unreadCount}
          </motion.span>
        )}

      </motion.button>
    </div>
  );
}
