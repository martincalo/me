## ADDED Requirements

### Requirement: Experience content model
Experience entries SHALL be defined in `content/experience.ts` as typed objects with `slug`, `number`, optional `period`, `company`, `location`, `title`, three homepage paragraphs (context, what I did, outcome), `tags`, and a `story` (the places involved plus headed sections of paragraphs); each section's video is mapped by slug in `content/media.ts`. They SHALL render in reverse chronological order: 01 Metrify (Enpal), 02 Tesla, 03 Automation. The label SHALL read `<number> — <period> · <company> · <location>` in mono capitals, and each section SHALL end with a "Read the full story →" link to `/work/<slug>`.

#### Scenario: Entries render from data
- **WHEN** the homepage is built
- **THEN** three experience sections are rendered in the order 01, 02, 03, each with its label (e.g. `01 — NOW · METRIFY (ENPAL) · BERLIN`), title, three paragraphs, mono stack tags and a link to its full story

### Requirement: Full-story pages
Each experience SHALL have a statically generated page at `/work/<slug>` whose header is about 65% of the screen tall (`max(26rem, 65svh)`) so the first story section starts above the fold. The header SHALL show the chapter's media as a full background — Tesla: the charging loop; Automation: the OP10–OP30 production-line drawing beside the title; Metrify: plain stage until licensed footage exists — with the back link, label, title (the page's only `h1`) and places bottom-left; over video, the title block SHALL sit on a `--scrim` gradient of at least 82%. The places line SHALL be omitted when it equals the label's location. With reduced motion the header SHALL show the poster. Below: the story sections as `h2`, the stack, and a link to the next story. Unknown slugs SHALL return 404.

#### Scenario: Story page
- **WHEN** a visitor requests `/work/tesla`
- **THEN** prerendered HTML shows the charging loop header with "From machine controls to factory software" as `h1` and "Berlin, Austin, Chicago, Italy", the sections in order, the stack, and a "Next story" link to `/work/automation`

#### Scenario: Unknown story
- **WHEN** a visitor requests `/work/unknown`
- **THEN** the response is a 404 with the dead-lettered page

### Requirement: Every experience is a video section
Experience sections SHALL be video sections on the stage background: 02 Tesla with the drive loop and 03 Automation with the robot-cell loop; 01 Metrify SHALL render on plain stage until licensed footage exists. On desktop the text SHALL alternate sides (left, right, left) on solid stage, and the video SHALL fill the other half, framed on its subject, fading into the stage on its inner edge; the text SHALL NOT overlap footage on desktop. On phones the video SHALL fill the section behind the text under the scrim.

#### Scenario: Desktop framing
- **WHEN** the homepage is viewed at 1440px wide
- **THEN** each video occupies the half opposite its text, with its subject fully in frame, and no text overlaps the footage

#### Scenario: Missing footage
- **WHEN** a section's files do not exist at build time
- **THEN** it renders its text on the plain stage background with no `<video>` element

### Requirement: Video layers
Each video SHALL be rendered by the `LoopVideo` client component: a lazy-loaded `next/image` poster underneath and a `<video>` (`muted`, `loop`, `playsInline`, `aria-hidden`, `preload="metadata"`, no `poster` attribute) on top, both `object-cover` with the clip's configured focus. Footage SHALL use one shared natural grade (slightly desaturated, warmer, highlights compressed) baked into the files. Wherever text overlaps video, a `--scrim` layer of at least 82% SHALL sit between them. In section 03 the third paragraph is "Worked across all five levels of the ISA-95 automation model, from controllers to ERP."

#### Scenario: Poster does not delay the page
- **WHEN** the homepage loads on a throttled mobile connection
- **THEN** below-the-fold posters are not requested before the headline font, and Lighthouse performance stays ≥95

#### Scenario: ISA-95 line present
- **WHEN** section 03 is rendered
- **THEN** it contains the exact sentence "Worked across all five levels of the ISA-95 automation model, from controllers to ERP."

### Requirement: Video playback rules
The video SHALL be started from script only while the section is in view, and paused when it leaves. It SHALL NOT play — showing only the poster — when `prefers-reduced-motion: reduce` is set, when JavaScript is unavailable, or on small screens where the browser reports a slow connection (`saveData`, or an `effectiveType` of `2g` or `3g`).

#### Scenario: Reduced motion
- **WHEN** a visitor with reduced motion scrolls to any video section
- **THEN** the poster is shown and the video never starts

#### Scenario: Off-screen
- **WHEN** a video section leaves the viewport while playing
- **THEN** the video pauses, and resumes when the section re-enters

### Requirement: Video assets
Each video SHALL be self-hosted in `public/media/` as a 6–10 second loop in MP4 (H.264) and WebM, totalling ≤3 MB, with a JPG or WebP poster. No YouTube or other third-party embed SHALL be used. The footage SHALL come from files Martin owns or has licensed; watermarked stock previews SHALL NOT be published.

#### Scenario: No third-party media requests
- **WHEN** the homepage loads and plays the video
- **THEN** the browser's network log shows no requests to YouTube, Google or other third-party media hosts

#### Scenario: Size budget
- **WHEN** the files in `public/media/` are measured
- **THEN** each video's `.mp4` and `.webm` together are at most 3 MB

### Requirement: Text readability over motion
Text in every experience section SHALL meet 4.5:1 contrast, measured against the brightest video frame behind the text, not an average frame.

#### Scenario: Brightest frame check
- **WHEN** the brightest frame of the loop is placed behind the scrim and text
- **THEN** body text and labels still measure at least 4.5:1
