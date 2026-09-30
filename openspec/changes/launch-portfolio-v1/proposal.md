## Why

martincalo.com currently runs a client-side-rendered Create React App on GitHub Pages: crawlers and link previews see an empty page, the layout breaks on mobile because of hard-coded widths, and the content reads like job descriptions with stock images. The site should position Martin for senior engineering roles as a hands-on engineer building reliable systems — calm, precise and engineered, with a few moments of personality.

## What Changes

- New repo `martincalo/me` (local folder `setpoint`): a single-page, statically generated Next.js (App Router) site. Content lives in typed TS files; there is no MDX, no CMS and no backend. `CLAUDE.md` holds the project brief and is the source of truth.
- **Positioning:** title line "Martin Calo · Full Stack Software Engineer · Berlin" (kept in one place), headline "Building reliable systems", subline "Hands-on engineer. From robot cells to cloud platforms to AI."
- **Homepage, top to bottom:** Header → Hero (with photo) → three Experience sections on a dark "stage" background, each linking to its full story → Bookshelf → Contact → Footer ("All systems operational").
- **Full stories:** each experience also has a static page at `/work/metrify`, `/work/tesla` and `/work/automation`, with its own metadata and generated preview image.
- **Experience sections:** 01 Enpal and 02 Tesla each have a text panel beside an animated SVG background (`meter`, `production-line`). 03 Automation shows the self-hosted robot-cell video full-bleed behind the text, with a duotone tint and a scrim.
- **Contact points:** email, LinkedIn, GitHub, and a phone number that opens WhatsApp. There is no CV download.
- **Design:** warm `#FCFBF3` light theme and forest `#183630` stage sections; dark mode follows the system setting, with no toggle. IBM Plex Sans and Mono. All colours, including inside animations, come from tokens.
- **Personality:** a 404 page reading "This page was dead-lettered." and an "All systems operational" status line in the footer.
- **Visibility:** title and description, Open Graph and Twitter tags, generated OG image, JSON-LD Person, sitemap, robots, canonical URL, Vercel Analytics.
- **Hosting:** Vercel; martincalo.com moves from GitHub Pages to Vercel.
- **BREAKING (old site):** the `Myportfolio` stack is taken out of service. The CRA frontend, Django API, Express OpenAI proxy, chatbot, stock images, company logos, the YouTube embed and `/about` are all dropped. After cutover GitHub Pages is turned off and the repo is made private.
- **Not in v1:** chatbot, theme toggle, page-transition or scroll libraries, GSAP, 3D/WebGL, custom cursor, contact form, i18n, blog features, testimonials, CV download.

## Capabilities

### New Capabilities
- `home-page`: Header, Hero, Bookshelf, Contact and Footer, their content sources, and the placeholder rules.
- `experience-sections`: the three stage sections — text panel layout, the `AnimatedBackground` variants, and the full-bleed `VideoSection`, including motion and performance rules — and the static full-story page for each experience at `/work/[slug]`.
- `visual-design`: design tokens (light and dark), typography, layout and spacing rules, accessibility baseline, and the minimal-client-JavaScript rule.
- `seo-metadata`: page metadata, Open Graph and generated OG image, JSON-LD Person, sitemap, robots, canonical URL, the 404 page, and the `/about` redirect.
- `hosting`: Vercel deployment, domain cutover, analytics and Search Console, repo hygiene, and taking the old stack out of service.

### Modified Capabilities
<!-- None — new repository, no existing specs. -->

## Impact

- **New repo:** `github.com/martincalo/me`. Dependencies are limited to `next`, `react`, `react-dom`, `tailwindcss` (+ its PostCSS plugin), `@vercel/analytics` and TypeScript/ESLint tooling. Adding anything else requires asking first.
- **Media pipeline:** the robot-cell video is re-encoded locally with ffmpeg (a dev tool, not a dependency) into a tinted 6–10 s MP4 and WebM loop of ≤3 MB, plus a poster frame.
- **DNS:** martincalo.com's records move from GitHub Pages (185.199.108–111.153) to Vercel.
- **Old repo** `github.com/martincalo/Myportfolio`: Pages turned off, `CNAME` removed, made private.
- **Pending inputs from Martin** (the site is built with placeholders until they arrive): photo, book takeaways, the bracketed outcomes and examples in the experience stories, and any further videos.
