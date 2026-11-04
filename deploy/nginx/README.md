# nginx snippets for the EC2 deployment

`s3-assets.conf` is installed on the sub.mlrit.ac.in server as
`/etc/nginx/snippets/s3-assets.conf` and included in the site's HTTPS server
block (`include snippets/s3-assets.conf;`).

It serves the files from `public/` out of the S3 bucket
`mlrit-website-assets` (prefix `site/`) instead of the instance disk. URLs do
not change: `/images/x.jpg` is fetched from `s3://mlrit-website-assets/site/images/x.jpg`.
Responses carry `X-Asset-Source: s3`. If a file is not in S3 (403/404), the
request falls back to the Next.js app, so new files in `public/` keep working
until they are uploaded.

Only the `site/` prefix is publicly readable (bucket policy). Payload media
uploads are not served by this snippet.

`/_next/image` reads its originals from the same bucket (see the location in the
snippet), and its responses are cached on the server by nginx for a day.

`image-cache.conf` is installed as `/etc/nginx/conf.d/image-cache.conf` (it
defines the cache and must live in the `http` context, so it cannot be part of
the snippet). Install both files, then:

```
sudo mkdir -p /var/cache/nginx/next-image && sudo chown www-data /var/cache/nginx/next-image
sudo nginx -t && sudo systemctl reload nginx
```

Check with `curl -sI 'https://mlrit.ac.in/_next/image?url=%2Flegacy%2Fmlrit-logo-main.png&w=384&q=75'`:
`X-Cache-Status` is `MISS` on the first request and `HIT` after. To clear the
cache: `sudo rm -rf /var/cache/nginx/next-image/*`.

## Chatbot

The chatbot is a Python service (`chatbot/`) running on this same server. The
widget calls `/chatbot-api/chat` on the site's own origin and nginx forwards it
to the service on `127.0.0.1:8001`; nothing else about it is public.

Files: `chatbot.conf` -> `/etc/nginx/snippets/chatbot.conf` (included from
`s3-assets.conf`, which must be re-installed too) and `chatbot-rate.conf` ->
`/etc/nginx/conf.d/chatbot-rate.conf` (20 messages a minute per visitor). Only
`/chat` and `/health` are exposed; `/reindex`, `/docs` and `/routes` are not.

Install order matters, because the snippet include fails `nginx -t` if the
files are missing: copy `chatbot-rate.conf` and `chatbot.conf` first, then
`s3-assets.conf`, then `sudo nginx -t && sudo systemctl reload nginx`. The
service itself is set up by `deploy/chatbot/setup.sh` (see that folder).

## Payload media in S3

Payload uploads (the `media` collection) are stored in the same bucket, at the
bucket root, when the server's `.env.local` has:

```
S3_BUCKET=mlrit-website-assets
AWS_REGION=ap-south-1
```

Those objects are private. The site serves them through Payload at
`/api/media/file/<filename>`, using the EC2 instance role (no access keys on the
server). The `20261019_061412_s3_storage` migration adds the `_objectkey`
column that the S3 storage plugin needs; run `npx payload migrate` after
pulling.
