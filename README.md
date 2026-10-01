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
make dev     # install if needed, then http://localhost:3000
make check   # lint + production build: run before every push
make phone   # production build served to your phone on the same Wi-Fi (prints the URL)
make         # list all commands
```

The Makefile wraps the npm scripts (`npm run dev`, `npm run build`, `npm run lint`). Use `make phone`, not `make dev`, to test on a phone: the dev server blocks its scripts for other devices, so videos don't play and the page keeps reloading.

Scope, architecture and design rules live in [`CLAUDE.md`](CLAUDE.md).

## Experience videos

Each experience section plays a short loop made from original footage with ffmpeg
(`brew install ffmpeg`):

```bash
SPEED=2 scripts/encode-video.sh meter "~/Downloads/Meter 3.mp4" 0-20   # 2× faster → 10 s
scripts/encode-video.sh tesla       "~/Downloads/Tesla 3.mp4" 36-44
scripts/encode-video.sh tesla-story "~/Downloads/Tesla 2.mp4" 0.3-8.8
scripts/encode-video.sh robot-cell  "~/Downloads/Projects Automation.mp4" 4-8 55-61
```

Segments are in seconds and joined in order. The script writes `public/media/<name>.{mp4,webm}`
and `<name>-poster.jpg` (up to 1920px) with the shared natural grade baked in, enforces the 3 MB budget, and runs
`scripts/check-video-contrast.mjs`, which fails if any text would drop below 4.5:1 over the
brightest frame. Videos are mapped to homepage sections and story headers in `content/media.ts`; a section whose files are
missing renders on the plain stage background.

Only publish footage you own or have licensed — never watermarked stock previews.
