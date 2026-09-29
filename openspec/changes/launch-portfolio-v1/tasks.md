## 1. Repository scaffold

- [x] 1.1 Scaffold Next.js (latest stable, App Router, TypeScript strict, Tailwind, ESLint, no `src/`) in `/Users/tin/Projects/setpoint`, keeping `openspec/`, `.claude/` and `CLAUDE.md`
- [x] 1.2 Remove scaffold leftovers (default SVGs, boilerplate page and CSS, template README text)
- [x] 1.3 Write `.gitignore` (`node_modules`, `.next`, `.env*`, `.vercel`, `.DS_Store`) and a short README describing the stack
- [x] 1.4 Add `@vercel/analytics`; confirm `package.json` contains only allow-listed dependencies
- [x] 1.5 Add the `/about` → `/` permanent redirect in `next.config.ts`
- [x] 1.6 Create the public GitHub repo `martincalo/me` and push the initial commit

## 2. Design system

- [x] 2.1 Define the light and dark tokens in `app/globals.css` (dark `--stage: #1A3A31`) and map them to Tailwind with `@theme inline`
- [x] 2.2 Load IBM Plex Sans (400, 500) and IBM Plex Mono (400) with `next/font/google` as CSS variables
- [x] 2.3 Set the base styles: body 17–18px/1.6, fluid headline `clamp()` about 48→92px at weight 500 with tight tracking, underlined links, visible focus rings on light and stage backgrounds, and smooth scrolling only without reduced motion
- [x] 2.4 Build the layout helpers: max ~1120px container, ~65ch prose width, 8px spacing scale, hairline divider
- [x] 2.5 Create `components/icons.tsx` with inline SVG icons (mail, LinkedIn, GitHub, WhatsApp/phone)

## 3. Content files (with placeholders)

- [x] 3.1 `content/profile.ts`: name, title line, headline, subline, email, phone (international format), LinkedIn, GitHub, location, and a `wa.me` link helper; unknown values as bracketed placeholders
- [x] 3.2 `content/experience.ts`: typed entries 01 Enpal (`meter`), 02 Tesla (`production-line`), 03 Automation (`video`, including the ISA-95 sentence), with placeholder paragraphs and tags
- [x] 3.3 `content/testimonials.ts` (empty) with a max-3 check that fails the build
- [x] 3.4 `content/books.ts`: the 4 books with placeholder takeaways, Harari title as a placeholder, and a check for exactly one "beyond engineering" entry

## 4. Page shell and light sections

- [x] 4.1 `app/layout.tsx`: `lang="en"`, fonts, skip link, `Header`, `<main>`, `Footer`, `<Analytics />`
- [x] 4.2 `Header`: mono "martin calo" wordmark; nav with work/books/contact anchors; wraps on mobile
- [x] 4.3 `Hero`: status dot + title line, `h1` headline, subline, contact links, photo through `next/image` (placeholder image until `martin.jpg` arrives), stacked on mobile
- [x] 4.4 `Testimonials`: up to 3 quotes; returns `null` when empty
- [x] 4.5 `Bookshelf`: 2-column grid on desktop, 1 column on mobile, mono "beyond engineering" label
- [x] 4.6 `Contact`: the "Building something that needs to be reliable? Let's talk." line plus email, LinkedIn, GitHub and WhatsApp links
- [x] 4.7 `Footer`: status dot + "All systems operational", © Martin Calo with the build-time year
- [x] 4.8 `app/page.tsx`: compose the sections in the required order, passing content as props

## 5. Experience sections

- [ ] 5.1 `ExperienceSection` (server): stage background, darker text panel, label/title/3 paragraphs/mono tags, background slot, alternating desktop sides, background above text on mobile
- [ ] 5.2 `AnimatedBackground` shell (client): renders the variant SVG in its static state, adds an IntersectionObserver that toggles `data-playing`, and a reduced-motion rule that disables animation
- [ ] 5.3 `meter` variant: static SVG (analog meter, disc mark, counter, data points, bars) using token colours only
- [ ] 5.4 `meter` motion: disc spin, counter tick, points streaming out, bars pulsing (transform/opacity keyframes); simplified on mobile
- [ ] 5.5 `production-line` variant: static SVG (conveyor, three stations, parts, MES data line with station lights) using token colours only
- [ ] 5.6 `production-line` motion: parts moving along the conveyor, station lights pulsing; simplified on mobile
- [ ] 5.7 Check both variants in light and dark mode, with reduced motion on, with JavaScript off, and scrolled out of view (paused)

## 6. Video section

- [ ] 6.1 Install ffmpeg (`brew install ffmpeg`); receive the original robot-cell file and Martin's confirmation of rights
- [ ] 6.2 Pick a 6–10 s segment; export tinted MP4 (H.264, faststart, no audio) and WebM (VP9) at ≤3 MB total, plus the poster; record the command in the README
- [ ] 6.3 `VideoSection` (client): layers for video, tint fallback, scrim (desktop gradient / mobile ~65%) and content; poster in the server HTML; no `autoPlay` attribute
- [ ] 6.4 Playback control: play and pause with an IntersectionObserver; skip on reduced motion and on narrow screens with save-data/2g/3g; set `playbackRate` if needed
- [ ] 6.5 Contrast check against the brightest frame (ffmpeg `signalstats`); adjust the scrim or tint until text is ≥4.5:1
- [ ] 6.6 Check the network log: no third-party media requests; the poster alone shows with JavaScript off

## 7. Metadata, 404 and visibility

- [ ] 7.1 Root metadata from `profile.ts`: `metadataBase`, title, description, canonical, Open Graph and Twitter tags
- [ ] 7.2 `app/opengraph-image.tsx`: 1200×630, name + headline, local Plex font, light palette
- [ ] 7.3 JSON-LD Person in `app/page.tsx` (name, jobTitle, url, sameAs LinkedIn/GitHub; no phone or email)
- [ ] 7.4 `app/sitemap.ts` and `app/robots.ts`
- [ ] 7.5 `app/not-found.tsx`: "This page was dead-lettered." with a link home; confirm the 404 status
- [ ] 7.6 Favicon and app icon (simple monogram, SVG and PNG)

## 8. Fill pending inputs (blocks launch)

- [ ] 8.1 Final title line in `profile.ts`
- [ ] 8.2 `public/martin.jpg` (≥800px on the short side) wired into the Hero
- [ ] 8.3 Email, phone, LinkedIn and GitHub URLs in `profile.ts`
- [ ] 8.4 Enpal, Tesla and Automation texts and stack tags in `experience.ts`
- [ ] 8.5 Testimonials (up to 3, with permission) or leave empty
- [ ] 8.6 Book takeaways and the Harari title in `books.ts`
- [ ] 8.7 Search the build output for bracketed placeholders; none may remain

## 9. Verification on the Vercel preview

- [ ] 9.1 Connect the repo to Vercel and enable Web Analytics
- [ ] 9.2 `next build` and lint pass; the build output shows every route as static
- [ ] 9.3 Manual matrix: light/dark × 360px/1440px × reduced motion on/off; JavaScript disabled; keyboard-only navigation
- [ ] 9.4 Lighthouse (mobile) ≥95 on Performance, Accessibility, Best Practices and SEO
- [ ] 9.5 Search for colour literals outside the tokens; check `"use client"` appears only in the two allowed components
- [ ] 9.6 Validate the JSON-LD; check OG tags on the preview URL

## 10. Domain cutover and launch

- [ ] 10.1 Lower the DNS TTL on martincalo.com a day before
- [ ] 10.2 Add `martincalo.com` (primary) and `www.martincalo.com` (redirect) in Vercel; replace the GitHub Pages A records
- [ ] 10.3 Confirm HTTPS, www → apex, http → https, `/about` → `/`, and the 404 page on the live domain
- [ ] 10.4 Verify the domain in Google Search Console and submit `/sitemap.xml`
- [ ] 10.5 Test link previews in LinkedIn Post Inspector, Slack and WhatsApp

## 11. Take the old stack out of service

- [ ] 11.1 Disable GitHub Pages on `Myportfolio` and delete `frontend/public/CNAME`
- [ ] 11.2 Confirm `api.martincalo.com` has no DNS record and that no Django, Express or OpenAI proxy runs anywhere
- [ ] 11.3 Make `github.com/martincalo/Myportfolio` private
- [ ] 11.4 Confirm the old GitHub Pages URL no longer serves the old site
