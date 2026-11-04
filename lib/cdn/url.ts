/**
 * Resolve a stored media value to something an <img>/<video> can load.
 *
 * blob: URLs, absolute URLs and rooted paths are already loadable; a bare
 * storage key is served through the /cdn proxy.
 *
 * Deliberately NOT in lib/preview/context.tsx: that module is 'use client', so
 * a Server Component importing this from there receives a client reference
 * proxy rather than a function, and calling it throws during prerender
 * ("TypeError: i is not a function"). A neutral module is importable by both.
 */
export const resolveAssetUrl = (
  value?: string,
  options?: { allowTransient?: boolean }
): string | undefined => {
  if (!value) return undefined;

  // blob:/data: are document-scoped handles. They are legitimate ONLY while the
  // admin live preview holds a not-yet-uploaded file (allowTransient). Reaching
  // here from saved content means a bad value was persisted despite the
  // server-side guard — return undefined so the component falls back to its
  // built-in asset rather than rendering a permanently broken element.
  if (/^(blob|data):/i.test(value)) {
    return options?.allowTransient ? value : undefined;
  }

  // Saved slides still hot-link full-size (11–17 MB) photos from the old
  // Vercel preview; the same photos are served resized from our own CDN.
  // ponytail: drop once those CMS rows are re-saved with /images/events/ paths.
  if (value.startsWith('https://mlrit-next.vercel.app/assets/'))
    return value.replace('https://mlrit-next.vercel.app/assets/', '/images/events/');

  // A link pasted straight from the bucket is served through the site itself
  // (nginx proxies it from S3), so it gets a real Download button and the CDN.
  const bucket = 'https://mlrit-website-assets.s3.ap-south-1.amazonaws.com/site/';
  if (value.startsWith(bucket)) return '/' + value.slice(bucket.length);

  if (value.startsWith('/') || /^https?:\/\//i.test(value)) return value;
  return `/cdn/${value}`;
};
