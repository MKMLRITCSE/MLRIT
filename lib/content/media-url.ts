/**
 * Uploads (the Media collection) are stored under this prefix in the bucket.
 * Everything under `site/` is publicly readable and nginx serves it at the site
 * root, so a file at `site/media/<key>/<name>` is reachable at
 * `/media/<key>/<name>` — cached by Cloudflare, no trip through the app.
 */
export const MEDIA_PREFIX = 'site/media';

/**
 * Public URL of an uploaded file, for the S3 plugin's `generateFileURL`.
 *
 * `prefix` is the object's folder under the collection prefix (the plugin's own
 * key segment). With `useCompositePrefixes` the object lives at
 * `<MEDIA_PREFIX>/<prefix>/<filename>`; this must stay in step with that
 * layout, or the link points at nothing.
 */
export const publicMediaUrl = ({ filename, prefix }: { filename: string; prefix?: string }): string => {
  const folder = (prefix ?? '').split('/').filter(Boolean);
  return '/' + ['media', ...folder, filename].map(encodeURIComponent).join('/');
};
