import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs'; import path from 'path';
// Sync public/ to s3://mlrit-website-assets/site/. Run from deploy/deploy.sh.
const B = 'mlrit-website-assets', ROOT = '/home/ubuntu/mlrit-final/public', s3 = new S3Client({ region: 'ap-south-1' });
const T = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', svg: 'image/svg+xml', webp: 'image/webp', gif: 'image/gif', ico: 'image/x-icon', avif: 'image/avif', pdf: 'application/pdf', mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', json: 'application/json', txt: 'text/plain; charset=utf-8', xml: 'application/xml', css: 'text/css', js: 'text/javascript', woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf', csv: 'text/csv', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ppt: 'application/vnd.ms-powerpoint', pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', zip: 'application/zip' };
// Files whose existing S3 object must be replaced. Everything else is
// upload-once, because S3 holds compressed versions of large files (originals
// kept under originals/). These objects were first published as error pages
// saved with a .pdf extension (an HTML 403 page, and five S3 InvalidURI XML
// responses caused by an en dash encoded as %96), so each has to be
// overwritten with the real document.
const FORCE = new Set([
  'examinations/condonation-form.pdf',
  'examinations/circulars/Data-Corrections-Reminder-for-B.Tech.-M.Tech.-and-MBA-Students-Verification-of-Student-Details.pdf',
  'examinations/circulars/I-M.Tech-and-MBA-I-and-II-Semester-Regular-and-Supple-Examinations-February-2026-Results-Released-Revaluation-Notification.pdf',
  'examinations/circulars/II-B.Tech.-II-Semester-Condonation-Notification-Submission-of-Undertaking-and-Medical-Certificate-on-or-before-01-05-2026.pdf',
  'examinations/circulars/Issue-of-Provisional-Certificate-and-Consolidated-Grade-Memo-for-B.Tech-2022-26-Batch-Students.pdf',
  'examinations/circulars/JNTUH-B.Tech.-M.Tech.-and-MBA-Special-Supplementary-One-Time-Chance-Examinations-June-July-2026-Fee-Notification.pdf',
  'examinations/academic-calendar-2024-25.pdf',
  'examinations/academic-calendar-2025-26.pdf',
  'examinations/apply-for-certificates.pdf',
  'examinations/cbt-form.pdf',
  'examinations/citizen-charter.pdf',
  'examinations/coe-profile.pdf',
  'examinations/duplicate-grade-card.pdf',
  'examinations/name-correction.pdf',
  'examinations/plagiarism-check.pdf',
  'examinations/readmission.pdf',
  'examinations/student-verification.pdf',
  'examinations/transcript-form.pdf',
]);
const files = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : e.isFile() && files.push(p); } })(ROOT);
let up = 0, skip = 0, fail = 0; const failed = [], added = [], replaced = [];
async function one(p) {
  const rel = path.relative(ROOT, p).split(path.sep).join('/'), Key = 'site/' + rel, size = fs.statSync(p).size;
  const force = FORCE.has(rel);
  if (!force) {
    try { await s3.send(new HeadObjectCommand({ Bucket: B, Key })); skip++; return; } catch {}
  }
  const ext = path.extname(p).slice(1).toLowerCase();
  for (let a = 0; a < 3; a++) {
    // Corrected files get a short edge TTL so a later fix is visible quickly.
    const cache = force ? 'public, max-age=300' : 'public, max-age=86400';
    try { await s3.send(new PutObjectCommand({ Bucket: B, Key, Body: fs.createReadStream(p), ContentLength: size, ContentType: T[ext] || 'application/octet-stream', CacheControl: cache })); up++; (force ? replaced : added).push(rel); return; }
    catch (e) { if (a === 2) { fail++; failed.push(rel + ' ' + e.name); } }
  }
}
const q = [...files]; await Promise.all(Array.from({ length: 16 }, async () => { while (q.length) await one(q.shift()); }));
console.log(`s3 sync: local=${files.length} uploaded=${up} replaced=${replaced.length} unchanged=${skip} failed=${fail}`);
added.slice(0, 15).forEach(f => console.log('  + ' + f)); replaced.forEach(f => console.log('  ~ ' + f)); failed.forEach(f => console.log('  FAIL ' + f));
