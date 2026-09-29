## Context

The current site (`Myportfolio`) is a Create React App SPA on GitHub Pages at martincalo.com, plus two unused backends (Django and an Express OpenAI proxy). Because it renders client-side, crawlers and link-preview bots receive an empty page.

The new site is a single static page, specified in the project brief `CLAUDE.md`, which is the source of truth. It aims to feel calm, precise and engineered, with a few moments of personality: animated SVG illustrations for Enpal and Tesla, a full-bleed tinted robot-cell video for the automation years, a "dead-lettered" 404, and an "All systems operational" footer.

Carried over from the old site: the domain, the warm `#FCFBF3` background, forest `#183630` (now the stage colour), the LinkedIn URL, the experience facts (rewritten), and the robot-cell video (self-hosted from the original file).

Constraints: solo maintainer; no backend, API routes or CMS; every dependency needs approval; Berlin-based, so no third-party requests (YouTube, Google Fonts) that would need consent.

## Goals / Non-Goals

**Goals:**
- One prerendered page that reads fully without JavaScript and scores ≥95 on all four Lighthouse categories on mobile.
- Motion that adds personality without costing readability, performance or accessibility.
- Content editable in a handful of typed TS files, with the title line defined in exactly one place.
- Correct in light and dark mode (following the system), on phone and desktop, with reduced motion on and off.

**Non-Goals:**
- Case-study or `/work` pages, MDX, a CV download, a contact form.
- Theme toggle, GSAP, 3D/WebGL, scroll or page-transition libraries, custom cursor.
- Blog features and i18n.

## Decisions

### 1. Next.js App Router, statically prerendered on Vercel (not `output: 'export'`)
The single page, the 404 page, the OG image, the sitemap and robots are all static at build time. Deploying on Vercel without static export keeps `next/image` optimization, `next/og`, the `/about` redirect in `next.config.ts`, and a real 404 status, with no host-specific configuration.
- *Alternative:* `output: 'export'`. Rejected: images would be unoptimized, redirects would need separate host configuration, and nothing is gained on Vercel.

### 2. Content as typed TS instead of MDX
With no long-form pages, every piece of content is short and structured: a label, a title, three paragraphs, tags. `content/profile.ts`, `content/experience.ts`, `content/testimonials.ts` and `content/books.ts` export typed arrays and objects. The TypeScript compiler validates them, and the brief's `next-mdx-remote` and `gray-matter` dependencies are no longer needed.
- `profile.ts` holds the name, title line, headline, subline and contact points. The Hero, metadata, OG image and JSON-LD all import from it, so the title line changes in one place.
- Simple checks run at import time (for example, at most 3 testimonials, exactly one "beyond engineering" book) and throw an error, which fails the build.
- *Alternative:* MDX with frontmatter, as the brief originally proposed. Rejected: it adds two dependencies and a file-reading layer for content that fits in a typed object.

### 3. Component layers
```
content/*.ts                → content: typed data, stored in git
app/page.tsx                → composes the page and passes content as props
components/*.tsx            → sections (server components)
components/AnimatedBackground.tsx, VideoSection.tsx  → the only client components
components/icons.tsx        → inline SVG icons
app/globals.css             → tokens (light/dark) + Tailwind theme mapping
```
Sections receive data only through props, so `app/page.tsx` is the one place where every content source is visible. `ExperienceSection` is a server component that renders the label, title, paragraphs and tags, with a slot for the background element. The client components are the leaves of the tree, which keeps the JavaScript sent to the browser small.

### 4. Tokens as CSS variables, mapped into Tailwind
`globals.css` defines the brief's tokens on `:root` and overrides them in `@media (prefers-color-scheme: dark)`. Tailwind v4's `@theme inline` maps them to utilities (`bg-bg`, `text-ink`, `bg-stage`, `text-stage-accent`, …), so components never use hex values. One change from the brief: dark `--stage` becomes `#1A3A31` instead of `#10241F`, because the brief's value was only 1.13:1 against the dark page and the stage sections disappeared. With `#1A3A31` it is 1.47:1, and all stage text stays ≥6:1. Body-text links are underlined, because accent vs. ink is only 2.7:1.

### 5. IBM Plex through `next/font/google`, three files
Plex Sans at 400 and 500 (500 for the headline) and Plex Mono at 400, self-hosted at build time. The headline uses `clamp()` between about 48px and 92px, so it scales fluidly with no breakpoint jump.

### 6. AnimatedBackground: server-rendered SVG, animated by CSS, controlled by an IntersectionObserver
The component renders the full inline SVG for its variant, so the static state is part of the server HTML. All motion is CSS `@keyframes` on `transform` and `opacity`, so the browser can run it cheaply off the main thread. A small `useEffect` attaches an IntersectionObserver that sets `data-playing="true"` on the root while it is in view, and the CSS reads `[data-playing="true"] .anim { animation-play-state: running }`. A `@media (prefers-reduced-motion: reduce)` rule turns animations off entirely. The mobile version hides some SVG groups with a media query instead of shipping a second SVG.
- *Alternative:* a JS animation library, or requestAnimationFrame. Rejected: GSAP is out of scope, and CSS keyframes are cheaper and work with reduced-motion media queries.
- *Alternative:* Lottie. Rejected: it needs a new dependency and a runtime, and its colours can't follow the tokens.

### 7. VideoSection: poster first, started from script
The server HTML renders the `<video>` with a poster, `muted loop playsInline preload="metadata"` and both sources, but **without** `autoPlay`. On the client, an IntersectionObserver calls `play()` while the section is in view and `pause()` when it leaves. It is skipped entirely if `matchMedia('(prefers-reduced-motion: reduce)')` matches, or on narrow screens where `navigator.connection?.saveData` is set or `effectiveType` is `2g` or `3g`. Where that API is missing (Safari), the video plays. `playbackRate` is set to about 0.7 if the footage feels busy. Without JavaScript the poster shows, which satisfies the brief's "works with JavaScript disabled (animations aside)".
- *Alternative:* the `autoPlay` attribute, as in the brief. Rejected: it starts before script can check reduced motion or the connection.

### 8. Video tint baked in with ffmpeg
One local ffmpeg command (a dev tool, not a dependency) trims the original to a 6–10 s loop, scales it to about 1280px wide, applies the duotone (`hue=s=0` then `colorbalance`/`curves` toward forest greens), removes the audio, and encodes H.264 MP4 (`-crf ~28 -movflags +faststart`) and VP9 WebM, keeping the total at ≤3 MB. The poster frame is exported from the same pipeline. The exact command is recorded in the README so the step can be repeated. The CSS fallback (grayscale plus a `--stage` blend layer) is used only if the baked version looks wrong in dark mode.
- ffmpeg is not installed on this machine yet: `brew install ffmpeg`.

### 9. Scrim and contrast against the brightest frame
Desktop scrim: `linear-gradient(to right, var(--stage) 0 45%, transparent 75%)`, mirrored if the text sits on the right. Mobile: a solid `--stage` layer at about 65% opacity. To check contrast, find the brightest frame (ffmpeg `signalstats`, highest average luma), put it behind the scrim, and measure the text against the lightest pixel behind the text column. If it is below 4.5:1, raise the scrim opacity or darken the tint.

### 10. SEO through the Next.js metadata API
Metadata comes from `profile.ts` in `app/layout.tsx`. `app/opengraph-image.tsx` uses `next/og` with a local Plex font file. `app/sitemap.ts` and `app/robots.ts` serve the single URL. The JSON-LD Person block is an inline `<script type="application/ld+json">` in `app/page.tsx`, with no phone or email so the structured data doesn't feed scrapers.

### 11. Contact points and WhatsApp
`profile.ts` stores the phone number once in international format. A helper derives both the displayed text and `https://wa.me/<digits>`. The email, phone and WhatsApp links appear in the Hero and Contact sections only.

### 12. Verification without a test suite
The checks are: `next build` (types, content checks, static output), ESLint, Lighthouse on the Vercel preview, manual checks (light/dark × phone/desktop × reduced motion on/off, JavaScript disabled, keyboard only), a network-log check for third-party requests, a placeholder search of the build output, and link-preview inspectors. A unit-test framework would mean a new dependency that isn't justified for one static page.

## Risks / Trade-offs

- [The video hurts mobile performance and the LCP score] → Poster first, `preload="metadata"`, no playback on slow or save-data connections, playback only while in view, and the video sits below the fold. Its poster is not the LCP element because the Hero comes first.
- [The tinted footage looks wrong in dark mode, since the tint is baked for one palette] → The two stage colours are close (`#183630` vs `#1A3A31`), so one tint should work for both. If not, switch to the CSS blend fallback, which follows the tokens.
- [The animations take longer to design than expected] → Build the static SVGs first; they are already a valid launch state. Motion is added afterwards.
- [A public phone number attracts spam or scrapers] → It is kept out of JSON-LD, and the number is shown only on the page. Martin accepted this by choosing to publish it.
- [Pending inputs delay launch] → Build with visible bracketed placeholders, and fail the launch check while any remain.
- [Rights to the robot-cell footage] → Use only the original file, with rights confirmed by Martin; never an embed or a re-download from YouTube.
- [DNS cutover causes downtime] → Keep GitHub Pages enabled until Vercel serves the domain with a valid certificate, and lower the TTL a day ahead. Rollback is restoring the GitHub Pages A records.

## Migration Plan

1. Build the site (repo `martincalo/me`), deploy it to a Vercel preview, fill in all inputs, and pass every verification check on the preview.
2. The day before cutover: lower martincalo.com's DNS TTL.
3. Add `martincalo.com` (primary) and `www.martincalo.com` (redirect) in Vercel, and replace the GitHub Pages A records with Vercel's records.
4. Once the certificate is valid, verify HTTPS, www → apex, `/about` → `/`, and the 404 page.
5. Launch-day tasks: verify Search Console, submit the sitemap, check link previews.
6. Take the old stack out of service: disable GitHub Pages on `Myportfolio`, remove its `CNAME`, confirm there is no `api.martincalo.com` record, make the repo private.

**Rollback:** before step 6, restore the GitHub Pages A records.

## Open Questions

- The final title line: Full Stack Engineer or Software Engineer.
- The contact details to publish: email, phone number (international format), LinkedIn and GitHub URLs.
- The robot-cell source file, confirmed rights, and which 6–10 s segment to loop.
- The experience texts for Enpal, Tesla and Automation (context, build and decisions, outcome, stack tags, optional dates).
- Up to 3 testimonials with permission to publish, and the book takeaways plus the Harari title.
