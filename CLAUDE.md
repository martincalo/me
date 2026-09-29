# martincalo.com — project brief

Personal portfolio for Martin Calo, a Berlin-based software engineer. This file is the source of truth for scope, architecture and design. Read it fully before making changes, and ask before going beyond it.

This repo is a static site: the workspace SaaS defaults (Supabase, Stripe, Resend) do not apply.

## Goal

Rebuild martincalo.com as a fast, static, well-designed portfolio that positions Martin for senior engineering roles. The site should feel calm, precise and engineered, with a few moments of personality.

- **Headline:** Building reliable systems.
- **Subline:** Hands-on engineer. From robot cells to cloud platforms to AI.
- **Title line:** Martin Calo · Full Stack Engineer · Berlin (title may change; keep it in one place: `content/profile.ts`)

## Non-negotiables

- Every page is statically generated and ships real HTML. No client-side-only rendering.
- No backend, no database, no API routes, no API keys, no CMS.
- Client JavaScript only where interactivity requires it (the animated backgrounds and the video section). Everything else is a server component.
- Accessible: semantic HTML, keyboard navigable, text contrast at least 4.5:1, `prefers-reduced-motion` respected everywhere.
- Mobile-first and fluid: no fixed pixel widths on layout containers.
- Ask before adding any dependency not listed below.

## Out of scope for v1

Chatbot, theme toggle, page-transition or scroll-jacking libraries (Barba, Locomotive, etc.), GSAP, 3D/WebGL, custom cursors, contact form, i18n, blog features (tags, pagination, RSS), analytics beyond Vercel Analytics, case-study / `/work` pages, MDX, CV download.

## Stack

- Next.js (latest stable), App Router, TypeScript strict
- Tailwind CSS (latest), with design tokens as CSS variables
- Content as typed TS files in `content/` (no MDX)
- `next/font` for IBM Plex Sans and IBM Plex Mono
- `next/image` for all images
- Inline SVG for icons (no icon font)
- `@vercel/analytics`
- Hosting: Vercel. Domain martincalo.com is repointed from GitHub Pages.

## Structure

```
app/
  layout.tsx              # fonts, tokens, base metadata, header, footer, analytics
  page.tsx                # homepage (the only content page)
  opengraph-image.tsx     # generated OG image: name + headline
  sitemap.ts
  robots.ts
  not-found.tsx           # playful 404: "This page was dead-lettered."
  globals.css             # design tokens + Tailwind
components/
  Header.tsx
  Hero.tsx
  ExperienceSection.tsx   # server component: text panel + background slot
  AnimatedBackground.tsx  # "use client": meter, production-line
  VideoSection.tsx        # "use client": full-bleed video experience section
  Testimonials.tsx
  Bookshelf.tsx
  Contact.tsx
  Footer.tsx
  icons.tsx               # inline SVG icons
content/
  profile.ts              # name, title line, headline, subline, contact points
  experience.ts           # order, label, title, paragraphs, tags, background
  testimonials.ts
  books.ts
public/
  media/robot-cell.mp4, robot-cell.webm, robot-cell-poster.jpg
  martin.jpg
```

## Homepage sections (in order)

1. **Header:** "martin calo" wordmark (mono) left; nav right: work, books, contact (in-page anchors).
2. **Hero** (light background): title line with small accent status dot, headline, subline, contact links (email, LinkedIn, GitHub, WhatsApp), and Martin's photo (medium size, rounded corners, not full-bleed).
3. **Experience sections** (dark "stage" background, reverse chronological). Each: label (number, company, location), title, 3 short paragraphs (context, what was built and decided, outcome), stack tags in mono. No link to a separate page. Text sits on a slightly darker panel for readability; the animated background sits beside it on desktop and above it on mobile. Alternate text/visual sides on desktop.
   - **01 Enpal (now):** digitalizing smart meters. Background variant `meter`: an analog meter whose spinning-disc mark and counter turn into a stream of data points and pulsing bars.
   - **02 Tesla:** manufacturing execution systems. Background variant `production-line`: parts moving along a conveyor through three stations, with an MES data line above whose station lights pulse. **Never use Tesla footage, logos or internal screens.**
   - **03 Automation, Spain:** robotic cells for automotive. Layout differs from 01 and 02: the robot-cell video runs **full-bleed behind the text** (see "Video section" below). Include the line "Worked across all five levels of the ISA-95 automation model, from controllers to ERP."
4. **Testimonials** (light): up to 3 short quotes with name and role. Real quotes only; the section is not rendered while there are none.
5. **Bookshelf** (light): 4 books with a one-line takeaway each, in a 2-column grid on desktop: *Designing Data-Intensive Applications* (Kleppmann), *Clean Architecture* (Martin), *AI Engineering* (Huyen), and one Harari book marked "beyond engineering".
6. **Contact** (light): "Building something that needs to be reliable? Let's talk." with email, LinkedIn, GitHub and phone number (linking to WhatsApp via `https://wa.me/<digits>`).
7. **Footer:** accent status dot + "All systems operational", © Martin Calo.

Content placeholders in brackets (e.g. `[Outcome]`) are to be filled by Martin. Never invent outcomes, numbers, quotes, dates or contact details.

## Design tokens

```css
:root {
  --bg: #FCFBF3;        /* page background (warm off-white) */
  --surface: #F7F4EC;   /* cards */
  --ink: #1A1A18;       /* text */
  --ink-muted: #45433F;
  --label: #5E5C57;     /* mono labels */
  --line: #DDD9D0;      /* hairlines */
  --accent: #1F6B46;    /* links, status dot */
  --stage: #183630;     /* experience sections ("forest") */
  --stage-ink: #ECEAE3;
  --stage-muted: #A9B8B0;
  --stage-accent: #7FD1A3;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #151513;
    --surface: #1D1D1A;
    --ink: #ECEAE3;
    --ink-muted: #C9C6BD;
    --label: #9A978E;
    --line: #2E2D29;
    --accent: #6CC495;
    --stage: #1A3A31;   /* lighter than the page so stage sections stay distinct */
  }
}
```

Dark mode follows the system only (no toggle). Every color, including inside animations, must come from tokens so both modes work. Links are underlined: accent vs. body text is only 2.7:1, so colour alone does not mark a link.

## Typography and layout

- IBM Plex Sans for text, IBM Plex Mono for labels, tags, nav and metadata. No other fonts.
- Headline ~92px desktop / ~48px mobile, weight 500, tight tracking. Body 17–18px, line-height ~1.6.
- Content width ~1120px max; long text max ~65ch. Left-aligned text, never centered paragraphs.
- Spacing on an 8px scale. Generous vertical space between sections.
- Thin hairline dividers, 12–20px radii on cards and media. No drop shadows and no decorative gradients (the video scrim below is the only exception).

## Animated backgrounds

- One client component, `AnimatedBackground`, with a `variant` prop: `meter`, `production-line`. Built with inline SVG and CSS keyframes only (transform and opacity). Colors from tokens (`--stage-accent`, `--stage-ink`).
- The SVG is server-rendered in its static state; animation starts only when the section is in view (IntersectionObserver) and pauses when it leaves. Without JavaScript it stays static.
- `prefers-reduced-motion: reduce` → static state.
- Mobile: simplified animation, placed above the text.
- Animations must never reduce text readability; in sections 01 and 02 the text sits on its own panel beside the animation.

## Video section (03 Automation)

A separate client component, `VideoSection`. Stacked layers inside one `relative overflow-hidden` section:

1. **Video:** `absolute inset-0`, `object-cover`, `muted loop playsInline`, `aria-hidden`, `preload="metadata"`, poster image. Playback is started from script (not the `autoPlay` attribute) so reduced motion and slow connections can be honoured; without JavaScript the poster shows. Playback rate ~0.7 if the footage feels busy.
2. **Tint (duotone look):** the footage is recolored toward the stage palette so it matches the site. Preferred approach: bake the tint into the exported video file (grayscale mapped from `--stage` in the shadows to `#6A8578` in the highlights, via `scripts/encode-video.sh`). The highlight cap is what guarantees text contrast on every frame. Fallback in CSS: `grayscale(1)` on the video plus a `mix-blend-mode` color layer in `--stage`.
3. **Scrim:** desktop, a horizontal gradient from solid `--stage` under the whole text column (0–52%) to transparent at 82%, so the robot stays visible on the other half. Mobile, a full scrim at 80% opacity (65% left the mono labels at ~3.6:1 over the brightest tinted frame).
4. **Content:** `relative`, same label/title/story/tags as other experience sections, text on the scrim side.

Rules:
- Text contrast must pass 4.5:1 against the **brightest** frame of the video, not an average one.
- Play only while in view; pause when off-screen.
- `prefers-reduced-motion`, and small screens on slow connections (`navigator.connection.saveData` or 2g/3g `effectiveType`, where the browser supports it): poster image only, no playback.
- Files: 6–10 second loop, MP4 (H.264) + WebM, target ≤3 MB total, poster JPG/WebP. Self-hosted in `public/media/`; never a YouTube embed.
- Optional, only if everything else is done: the section title rendered as large letters filled with the video (`background-clip: text` with a video layer or an SVG mask). One place on the site at most, never on body text.

## Metadata and visibility

- Page title: "Martin Calo — Building reliable systems"; description: "Hands-on engineer building reliable systems, from robot cells to cloud platforms to AI. Based in Berlin."
- Metadata per page, Open Graph + Twitter tags, generated OG image.
- JSON-LD `Person` (name, job title, url, sameAs: LinkedIn, GitHub). The phone number is not added to structured data.
- `sitemap.ts`, `robots.ts`, canonical URLs.
- Vercel Analytics only.

## Migration notes from the old site

The old site (create-react-app + Django + Express) is replaced entirely; start from a new repo. Carry over only: the domain, the warm background color, the LinkedIn URL, the experience texts as raw material to rewrite, and the robot-cell video (self-hosted, rights confirmed). Do not copy any code, backend, `.env` values or secrets.

After the domain is live on Vercel: disable GitHub Pages on `Myportfolio`, remove its `CNAME`, confirm `api.martincalo.com` has no DNS record, and make the `Myportfolio` repo private.

## Inputs from Martin (pending)

Build with placeholders until these arrive; never invent them.

- [ ] Final title line (Full Stack Engineer or Software Engineer)
- [ ] Photo (`public/martin.jpg`, at least 800px on the short side)
- [ ] Email address, phone number (for WhatsApp), LinkedIn and GitHub URLs to publish
- [ ] Robot-cell video: original file, rights confirmed, plus a poster frame
- [ ] Experience texts for Enpal, Tesla and Automation: context, what was built and decided, outcome, stack tags, and dates if wanted
- [ ] Up to 3 testimonials: quote, name, role, company, with permission to publish
- [ ] Book takeaways (one line each) and the Harari book title

## Definition of done for v1

- All sections render as static HTML; site works with JavaScript disabled (animations aside).
- Lighthouse ≥95 for performance, accessibility, best practices and SEO on mobile.
- Correct in light and dark mode, on a phone and on desktop, with reduced motion on and off.
- Link previews verified (LinkedIn Post Inspector, Slack/WhatsApp).
- Clean repo: proper .gitignore, no template leftovers, short README describing the stack.

## Next.js version notes

@AGENTS.md
