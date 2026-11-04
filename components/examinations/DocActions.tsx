import type { ComponentProps } from 'react';

interface DocActionsProps {
  href: string;
  external?: boolean;
  filename?: string;
  viewLabel?: string;
  downloadLabel?: string;
}

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 7s2.25-4 6-4 6 4 6 4-2.25 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="7" cy="7" r="1.8" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 2v7M4 7l3 3 3-3M2 12h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/**
 * View + Download button pair for a PDF or document link.
 * View opens the file in a new tab; Download triggers a browser download.
 * For external URLs (not hosted on this domain) both buttons open in a new
 * tab, because browsers ignore `download` across origins — the PDF viewer
 * provides the actual save action.
 */
export default function DocActions({
  href,
  external = false,
  filename,
  viewLabel = 'View',
  downloadLabel = 'Download',
}: DocActionsProps) {
  const isLocal = !external && !href.startsWith('http');

  return (
    <div className="flex items-center gap-2 shrink-0">
      {/* View */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border
          bg-white text-foreground font-semibold text-[0.75rem] hover:border-secondary hover:text-secondary
          transition-all whitespace-nowrap"
        aria-label={`View ${viewLabel}`}
      >
        <EyeIcon />
        {viewLabel}
      </a>

      {/* Download — only works reliably for same-origin files */}
      {isLocal ? (
        <a
          href={href}
          download={filename ?? true}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary
            text-white font-semibold text-[0.75rem] hover:bg-secondary/90
            transition-all whitespace-nowrap"
          aria-label={`Download ${downloadLabel}`}
        >
          <DownloadIcon />
          {downloadLabel}
        </a>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary
            text-white font-semibold text-[0.75rem] hover:bg-secondary/90
            transition-all whitespace-nowrap"
          aria-label={`Download ${downloadLabel}`}
        >
          <DownloadIcon />
          {downloadLabel}
        </a>
      )}
    </div>
  );
}
