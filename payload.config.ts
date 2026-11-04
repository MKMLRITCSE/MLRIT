import path from 'path';
import { fileURLToPath } from 'url';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { s3Storage } from '@payloadcms/storage-s3';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import sharp from 'sharp';

import { Media } from './payload/collections/Media';
import { Users } from './payload/collections/Users';
import { sectionGlobals } from './payload/globals';
import { MEDIA_PREFIX, publicMediaUrl } from './lib/content/media-url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * S3-backed media, enabled only when a bucket is configured.
 *
 * Uploads otherwise go to public/uploads on the instance's own disk, which is
 * fine for local development but means an EC2 instance replacement — or a
 * second instance behind the load balancer — loses or never sees them. With
 * the bucket set, the disk holds nothing that matters.
 *
 * Credentials are left to the default provider chain rather than read from
 * env: on EC2 that resolves to the instance role, so no long-lived key needs
 * to exist on the host at all. Set AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY
 * only when running outside AWS.
 */
const storagePlugins = process.env.S3_BUCKET
  ? [
      s3Storage({
        // Uploads go under site/media/, the publicly readable part of the
        // bucket, and each file's URL is its /media/... path on the site itself
        // (nginx serves it from S3, Cloudflare caches it) rather than a
        // download proxied through this app. Composite prefixes keep the
        // upload key and that URL derived from the same folder.
        collections: { media: { prefix: MEDIA_PREFIX, generateFileURL: publicMediaUrl } },
        useCompositePrefixes: true,
        bucket: process.env.S3_BUCKET,
        config: { region: process.env.AWS_REGION ?? 'ap-south-1' },
      }),
    ]
  : [];

export default buildConfig({
  plugins: storagePlugins,
  admin: {
    user: Users.slug,
    // Mounted at /admin, the URL the previous hand-rolled admin used, so
    // existing bookmarks keep working now that it is gone.
    importMap: { baseDir: dirname },
    livePreview: {
      breakpoints: [
        { name: 'mobile', label: 'Mobile', width: 390, height: 844 },
        { name: 'tablet', label: 'Tablet', width: 834, height: 1112 },
        { name: 'desktop', label: 'Desktop', width: 1440, height: 900 },
      ],
    },
  },
  // The previous admin is gone, so Payload takes the URL people already know.
  // Defaults would be /admin and /api anyway; stated explicitly because the
  // route folders under app/(payload) have to match.
  routes: { admin: '/admin', api: '/api' },
  collections: [Users, Media],
  globals: sectionGlobals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // No dev-time schema push. Left on, `next dev` silently syncs the schema
    // and writes a `dev` row into payload_migrations, after which
    // `payload migrate` refuses to run without a "data loss will occur" prompt
    // because it can no longer tell what is already applied. Migrations are the
    // only way the schema changes here, which is also what the eventual move to
    // RDS needs.
    push: false,
    // Payload's tables live beside the existing public.content_blocks rather
    // than in it. Keeping them in their own schema means the migration can be
    // re-run and the old CMS rolled back to without either side colliding.
    schemaName: 'payload',
  }),
  sharp,
})
