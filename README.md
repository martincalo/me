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
