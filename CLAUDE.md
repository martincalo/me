# martincalo.com — project brief

Personal portfolio for Martin Calo, a Berlin-based software engineer. This file is the source of truth for scope, architecture and design. Read it fully before making changes, and ask before going beyond it.

This repo is a static site: the workspace SaaS defaults (Supabase, Stripe, Resend) do not apply.

## Goal

Rebuild martincalo.com as a fast, static, well-designed portfolio that positions Martin for senior engineering roles. The site should feel calm, precise and engineered, with a few moments of personality.

- **Headline:** Building reliable systems.
- **Subline:** Hands-on engineer. From robot cells to cloud platforms to AI.
- **Title line:** Martin Calo · Full Stack Software Engineer · Berlin (keep it in one place: `content/profile.ts`)

## Non-negotiables

- Every page is statically generated and ships real HTML. No client-side-only rendering.
- No backend, no database, no API routes, no API keys, no CMS.
- Client JavaScript only where interactivity requires it: `LoopVideo` (play/pause of the loops) and `ProductionLine` (the automation story header). Everything else is a server component.
- Accessible: semantic HTML, keyboard navigable, text contrast at least 4.5:1, `prefers-reduced-motion` respected everywhere.
- Mobile-first and fluid: no fixed pixel widths on layout containers.
- Ask before adding any dependency not listed below.

## Out of scope for v1

Chatbot, theme toggle, page-transition or scroll-jacking libraries (Barba, Locomotive, etc.), GSAP, 3D/WebGL, custom cursors, contact form, i18n, blog features (tags, pagination, RSS), analytics beyond Vercel Analytics, MDX, CV download, testimonials.

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
  page.tsx                # homepage
  work/[slug]/page.tsx    # full stories, one per experience (static)
  work/[slug]/opengraph-image.tsx
  opengraph-image.tsx     # generated OG image: name + headline
  sitemap.ts
  robots.ts
  not-found.tsx           # playful 404: "This page was dead-lettered."
  globals.css             # design tokens + Tailwind
components/
  Header.tsx
  Hero.tsx
  ExperienceSection.tsx   # server: label + story text for a section
  VideoSection.tsx        # server: homepage experience section layout
  StoryHeader.tsx         # server: story-page header (video or drawing, title block)
  LoopVideo.tsx           # "use client": muted loop + lazy next/image poster
  useInViewPlayback.ts    # plays only in view; never with reduced motion
  ProductionLine.tsx      # "use client": OP10–OP30 line drawing (automation header)
  Bookshelf.tsx
  Contact.tsx
  Footer.tsx
  icons.tsx               # inline SVG icons
content/
  profile.ts              # name, title line, headline, subline, contact points
  experience.ts           # label, title, homepage paragraphs, tags, background, full story
  media.ts                # homepage and story-header media per slug (+ framing, speed)
  books.ts
lib/                      # build-time helpers (OG fonts/colours, media check)
scripts/                  # encode-video.sh, check-video-contrast.mjs
assets/fonts/             # IBM Plex TTFs for generated OG images (OFL)
public/
  media/<name>.mp4, <name>.webm, <name>-poster.jpg   (tesla, tesla-story, robot-cell)
  martin.jpg
```

## Homepage sections (in order)

1. **Header:** "martin calo" wordmark (mono) left; nav right: work, books, contact (in-page anchors).
2. **Hero** (light background): title line with small accent status dot, headline, subline, contact links (email, LinkedIn, GitHub, WhatsApp), and Martin's photo (medium size, rounded corners, not full-bleed).
3. **Experience sections** (dark "stage" background, reverse chronological). Each is a video section (see "Video sections" below): label in mono capitals (`01 — NOW · METRIFY (ENPAL) · BERLIN`), title, 3 short paragraphs (context, what I did, outcome), stack tags in mono, and a "Read the full story →" link to `/work/[slug]`. Text alternates sides on desktop (left, right, left).
   - **01 Metrify (Enpal), now:** digitalizing the smart meter market. **No video yet:** both `Meter.mp4` and `Meter 1.mp4` are watermarked iStock/Getty previews and must not be published. Renders on plain stage until licensed footage arrives.
   - **02 Tesla:** from machine controls to factory software. Video: a drive in a Tesla (`Tesla 3.mp4`, 36–44 s). Martin confirmed the right to publish the Tesla clips (30 Sept).
   - **03 Automation, Spain:** robotic cells, from simulation to start-up. Video: `Projects Automation.mp4`, 4–8 s + 55–61 s. The third paragraph is "Worked across all five levels of the ISA-95 automation model, from controllers to ERP."
4. **Bookshelf** (light): 4 books with a one-line takeaway each, in a 2-column grid on desktop: *Designing Data-Intensive Applications* (Kleppmann), *Clean Architecture* (Martin), *AI Engineering* (Huyen), and one Harari book marked "beyond engineering".
5. **Contact** (light): "Building something that needs to be reliable? Let's talk." with email, LinkedIn, GitHub and phone number (linking to WhatsApp via `https://wa.me/<digits>`).
6. **Footer:** accent status dot + "All systems operational", © Martin Calo.

## Full-story pages (`/work/[slug]`)

One statically generated page per experience, from the `story` field in `content/experience.ts`. The header is about 65% of the screen tall (`max(26rem, 65svh)`) so the story starts above the fold: the chapter's footage fills it as a full background, with the back link, label, title (`h1`) and places (only when they differ from the label's location) bottom-left on a dark `--scrim` gradient. Header media: Metrify — none yet (see above); Tesla — `Tesla 2.mp4` (charging), 0.3–8.8 s; Automation — the OP10–OP30 `ProductionLine` drawing, beside the title, no gradient. Reduced motion shows the poster. No "how it works" diagrams inside the stories (decided 30 Sept). Then the story as `h2` sections on the light background, the stack, and a "Next story" link. Each page has its own title, description, canonical URL and generated OG image, and is listed in the sitemap.

Every story makes the same point: Martin listens to the people who will use the system, builds what they actually need, and sees it through to production.

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
  --stage: #1F1E1B;     /* experience sections (warm graphite, matches --ink) */
  --stage-ink: #ECEAE3;
  --stage-muted: #ADA89D;
  --stage-accent: #E0D3BC; /* links on stage (warm sand) */
  --scrim: #121110;     /* behind text laid over video, both themes */
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
    --stage: #2F2E2A;   /* lighter than the page so stage sections stay distinct */
  }
}
```

Dark mode follows the system only (no toggle). Every color must come from tokens so both modes work. The forest green stage was replaced by warm graphite on 30 Sept, so the dark sections match the header's ink; the green `--accent` remains for the status dot and links on light backgrounds. Links are underlined: accent vs. body text is only 2.7:1, so colour alone does not mark a link.

## Typography and layout

- IBM Plex Sans for text, IBM Plex Mono for labels, tags, nav and metadata. No other fonts.
- Headline ~92px desktop / ~48px mobile, weight 500, tight tracking. Body 17–18px, line-height ~1.6.
- Content width ~1120px max; long text max ~65ch. Left-aligned text, never centered paragraphs.
- Spacing on an 8px scale. Generous vertical space between sections.
- Thin hairline dividers, 12–20px radii on cards and media. No drop shadows and no decorative gradients (the video scrim below is the only exception).

## Video sections

`VideoSection` (server) lays out each homepage experience; `LoopVideo` (client) is the video itself, also used by the story headers.

1. **Framing:** desktop — the text sits on solid stage in one half and the video fills the other half (`object-cover`, per-clip `focus` in `content/media.ts`), fading into the stage on its inner edge, so the subject is fully in frame and the text never overlaps footage. Phones — the video fills the section behind the text.
2. **Video:** `muted loop playsInline`, `aria-hidden`, `preload="metadata"`, no `poster` attribute: the poster is a lazy-loaded `next/image` layer underneath (sized for the device, so below-the-fold posters don't compete with the page's fonts; it also shows without JavaScript). Playback is started from script so reduced motion and slow connections can be honoured. Playback rate ~0.7 if the footage feels busy.
3. **Grade:** natural colour with one shared grade baked in by `scripts/encode-video.sh` so clips from different sources sit together: saturation 0.55, contrast 0.94, a touch warmer (5600 K), whites compressed to ~86%. The highlight compression is what keeps text over the scrim at ≥4.5:1.
4. **Scrim:** wherever text overlaps video (phones; story-header title block), a `--scrim` (#121110, same in both themes) layer at ≥82%. `scripts/check-video-contrast.mjs` verifies this against the brightest decoded pixel of every loop.

Rules:
- Text contrast must pass 4.5:1 against the **brightest** frame of the video, not an average one.
- Play only while in view; pause when off-screen.
- `prefers-reduced-motion`, and small screens on slow connections (`navigator.connection.saveData` or 2g/3g `effectiveType`, where the browser supports it): poster image only, no playback.
- Files: 6–10 second loop, MP4 (H.264) + WebM, target ≤3 MB total, poster JPG/WebP. Self-hosted in `public/media/`; never a YouTube embed.
- Loops are made at up to 1920px with `scripts/encode-video.sh <name> <file> <start-end>...` (see README): tesla 8 s / ~2.7 MB, tesla-story 8.5 s / ~0.5 MB, robot-cell 10 s / ~2.8 MB. Sources below 1920px are never upscaled.
- Only publish footage Martin owns or has licensed. Watermarked stock previews (iStock, Getty, etc.) are never allowed.
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

- [x] Title line: Full Stack Software Engineer
- [ ] Photo (`public/martin.jpg`, at least 800px on the short side)
- [x] Email, phone number (for WhatsApp), LinkedIn and GitHub URLs
- [x] Robot-cell video (segments chosen; poster is the loop's first frame)
- [x] Experience texts, homepage and full-story versions (bracketed outcomes and examples still to fill)
- [ ] Book takeaways (one line each) and the Harari book title
- [x] Tesla footage (Tesla 3 homepage, Tesla 2 story header; rights confirmed by Martin)
- [ ] Licensed Metrify footage (the Meter clips are watermarked iStock previews)

## Definition of done for v1

- All sections render as static HTML; site works with JavaScript disabled (video playback aside).
- Lighthouse ≥95 for performance, accessibility, best practices and SEO on mobile.
- Correct in light and dark mode, on a phone and on desktop, with reduced motion on and off.
- Link previews verified (LinkedIn Post Inspector, Slack/WhatsApp).
- Clean repo: proper .gitignore, no template leftovers, short README describing the stack.

## Next.js version notes

@AGENTS.md
