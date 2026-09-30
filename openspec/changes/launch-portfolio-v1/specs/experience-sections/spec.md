## ADDED Requirements

### Requirement: Experience content model
Experience entries SHALL be defined in `content/experience.ts` as typed objects with `slug`, `number`, optional `period`, `company`, `location`, `title`, three homepage paragraphs (context, what I did, outcome), `tags`, and a `story` (the places involved plus headed sections of paragraphs); each section's video is mapped by slug in `content/media.ts`. They SHALL render in reverse chronological order: 01 Metrify (Enpal), 02 Tesla, 03 Automation. The label SHALL read `<number> — <period> · <company> · <location>` in mono capitals, and each section SHALL end with a "Read the full story →" link to `/work/<slug>`.

#### Scenario: Entries render from data
- **WHEN** the homepage is built
- **THEN** three experience sections are rendered in the order 01, 02, 03, each with its label (e.g. `01 — NOW · METRIFY (ENPAL) · BERLIN`), title, three paragraphs, mono stack tags and a link to its full story

### Requirement: Full-story pages
Each experience SHALL have a statically generated page at `/work/<slug>`: a stage header with a link back to `/#work`, the label, the title as the page's only `h1`, the places involved and the section's video poster; then the story sections as `h2` headings with their paragraphs, the stack, and a link to the next story. Unknown slugs SHALL return 404.

#### Scenario: Story page
- **WHEN** a visitor requests `/work/tesla`
- **THEN** prerendered HTML shows "From machine controls to factory software" as `h1`, "Berlin, Austin, Chicago, Italy", the video poster, the sections in order, the stack, and a "Next story" link to `/work/automation`

#### Scenario: Unknown story
- **WHEN** a visitor requests `/work/unknown`
- **THEN** the response is a 404 with the dead-lettered page

### Requirement: Every experience is a video section
All three experience sections SHALL be full-bleed video sections on the stage background: 01 Metrify with the dial-meter loop, 02 Tesla with the drive loop, 03 Automation with the robot-cell loop. On desktop the text SHALL alternate sides (left, right, left), with the scrim mirrored so the text column always sits on solid stage. Until a section's files exist, it SHALL render on the plain stage background.

#### Scenario: Alternating sides
- **WHEN** the homepage is viewed at 1440px wide
- **THEN** the text of 01 and 03 sits on the left half and 02 on the right half, each over solid stage, with the footage visible on the other half

#### Scenario: Missing footage
- **WHEN** `public/media/tesla.*` does not exist at build time
- **THEN** section 02 renders its text on the plain stage background with no `<video>` element

### Requirement: Full-bleed video section
Each experience section SHALL be rendered by the `VideoSection` client component as one `relative overflow-hidden` section with stacked layers: (1) a video filling the section with `object-cover`, `muted`, `loop`, `playsInline`, `aria-hidden`, `preload="metadata"` and a poster; (2) a warm-graphite duotone toward the stage palette, preferably baked into the file (fallback: CSS grayscale plus a `--stage` blend layer); (3) a scrim — on desktop a horizontal gradient from solid `--stage` under the whole text column to transparent, on mobile a full scrim at 80% opacity; (4) the content: label, title, three paragraphs, tags and the full-story link, on the scrim side. In section 03 the third paragraph is "Worked across all five levels of the ISA-95 automation model, from controllers to ERP."

#### Scenario: Desktop composition
- **WHEN** a video section is viewed at 1280px wide with motion allowed
- **THEN** the tinted footage fills the section, the text sits on the solid side of the gradient, and the robot is visible on the other half

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
Each video SHALL be self-hosted in `public/media/` as a 6–10 second loop in MP4 (H.264) and WebM, totalling ≤3 MB, with a JPG or WebP poster. No YouTube or other third-party embed SHALL be used. The footage SHALL come from original files Martin has the right to publish (confirmed for the automation, meter and Tesla clips).

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
