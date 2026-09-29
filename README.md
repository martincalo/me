# me

Source for [martincalo.com](https://martincalo.com): a single, statically generated portfolio page.

## Stack

- Next.js (App Router, static prerendering), TypeScript strict
- Tailwind CSS v4 with design tokens as CSS variables (`app/globals.css`)
- IBM Plex Sans + Mono via `next/font`
- Content as typed TS in `content/` — no CMS, no MDX, no backend
- Hosted on Vercel, with Vercel Analytics

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass before every push
npm run lint
```

Scope, architecture and design rules live in [`CLAUDE.md`](CLAUDE.md).

## Robot-cell video (section 03)

The loop is made from the original footage with ffmpeg (`brew install ffmpeg`):

```bash
scripts/encode-video.sh path/to/original.mov 12 8   # start at 12 s, 8 s long
```

It writes `public/media/robot-cell.{mp4,webm}` and `robot-cell-poster.jpg` with the duotone
tint baked in, enforces the 3 MB budget, and runs `scripts/check-video-contrast.mjs`, which fails
if any text in the section would drop below 4.5:1 over the brightest frame. Until these files
exist, section 03 renders on the plain stage background.
