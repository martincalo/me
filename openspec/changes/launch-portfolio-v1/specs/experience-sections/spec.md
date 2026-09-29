## ADDED Requirements

### Requirement: Experience content model
Experience entries SHALL be defined in `content/experience.ts` as typed objects with `order`, `label` (number, company, location), `title`, three paragraphs (context, what was built and decided, outcome), `tags` (the stack), and a `background` of `meter`, `production-line` or `video`. They SHALL render in reverse chronological order: 01 Enpal (now), 02 Tesla, 03 Automation, Spain. There SHALL be no links to separate experience pages.

#### Scenario: Entries render from data
- **WHEN** the homepage is built
- **THEN** three experience sections are rendered in the order 01, 02, 03, each with its label, title, three paragraphs and mono stack tags, and without a "read the full story" link

### Requirement: Stage section layout
Each experience section SHALL use the dark stage background (`--stage`), with its text on a slightly darker panel for readability. For 01 and 02, the animated background SHALL sit beside the text panel on desktop, alternating sides between sections, and above the text on mobile.

#### Scenario: Desktop alternation
- **WHEN** sections 01 and 02 are viewed at 1280px wide
- **THEN** the text panel and the animation are side by side, on opposite sides in 01 and 02

#### Scenario: Mobile stacking
- **WHEN** sections 01 and 02 are viewed at 360px wide
- **THEN** the animation appears above the text panel, and neither overflows the viewport

### Requirement: Animated background variants
`AnimatedBackground` SHALL be a single client component with a `variant` prop. The `meter` variant (Enpal) SHALL show an analog meter whose spinning-disc mark and counter turn into a stream of data points and pulsing bars. The `production-line` variant (Tesla) SHALL show parts moving along a conveyor through three stations, with an MES data line above whose station lights pulse. Both SHALL be built with inline SVG and CSS keyframes that animate only `transform` and `opacity`, and use only token colours (`--stage-accent`, `--stage-ink`, `--stage-muted`). Mobile SHALL use a simplified version.

#### Scenario: Colours follow the theme
- **WHEN** the system colour scheme switches between light and dark
- **THEN** the animation colours change with the tokens, and no hard-coded colour appears in the SVG or keyframes

#### Scenario: No Tesla assets
- **WHEN** the Tesla section is inspected
- **THEN** it contains no Tesla footage, logos or internal screens, only the abstract production-line SVG

### Requirement: Animations run only in view and respect reduced motion
The animated backgrounds SHALL be server-rendered in their static state. Animation SHALL start only while the section is in the viewport (IntersectionObserver) and pause when it leaves. With `prefers-reduced-motion: reduce`, or without JavaScript, the static state SHALL be shown.

#### Scenario: Scrolled out of view
- **WHEN** an experience section leaves the viewport
- **THEN** its animations pause (`animation-play-state: paused`)

#### Scenario: Reduced motion
- **WHEN** the visitor's system has reduced motion enabled
- **THEN** no animation runs and the static illustration is shown

### Requirement: Full-bleed video section
Section 03 SHALL be rendered by the `VideoSection` client component as one `relative overflow-hidden` section with stacked layers: (1) a video filling the section with `object-cover`, `muted`, `loop`, `playsInline`, `aria-hidden`, `preload="metadata"` and a poster; (2) a duotone tint toward the stage palette, preferably baked into the file (fallback: CSS grayscale plus a `--stage` blend layer); (3) a scrim — on desktop a horizontal gradient from solid `--stage` on the text side to transparent, on mobile a full scrim at about 65% opacity; (4) the content: label, title, three paragraphs including "Worked across all five levels of the ISA-95 automation model, from controllers to ERP.", and tags, on the scrim side.

#### Scenario: Desktop composition
- **WHEN** section 03 is viewed at 1280px wide with motion allowed
- **THEN** the tinted robot footage fills the section, the text sits on the solid side of the gradient, and the robot is visible on the other half

#### Scenario: ISA-95 line present
- **WHEN** section 03 is rendered
- **THEN** it contains the exact sentence "Worked across all five levels of the ISA-95 automation model, from controllers to ERP."

### Requirement: Video playback rules
The video SHALL be started from script only while the section is in view, and paused when it leaves. It SHALL NOT play — showing only the poster — when `prefers-reduced-motion: reduce` is set, when JavaScript is unavailable, or on small screens where the browser reports a slow connection (`saveData`, or an `effectiveType` of `2g` or `3g`).

#### Scenario: Reduced motion
- **WHEN** a visitor with reduced motion scrolls to section 03
- **THEN** the poster is shown and the video never starts

#### Scenario: Off-screen
- **WHEN** section 03 leaves the viewport while playing
- **THEN** the video pauses, and resumes when the section re-enters

### Requirement: Video assets
The video SHALL be self-hosted in `public/media/` as a 6–10 second loop in MP4 (H.264) and WebM, totalling ≤3 MB, with a JPG or WebP poster. No YouTube or other third-party embed SHALL be used. The footage SHALL come from the original file with confirmed rights.

#### Scenario: No third-party media requests
- **WHEN** the homepage loads and plays the video
- **THEN** the browser's network log shows no requests to YouTube, Google or other third-party media hosts

#### Scenario: Size budget
- **WHEN** the files in `public/media/` are measured
- **THEN** `robot-cell.mp4` and `robot-cell.webm` together are at most 3 MB

### Requirement: Text readability over motion
Text in every experience section SHALL meet 4.5:1 contrast. In section 03 this SHALL be measured against the brightest video frame behind the text, not an average frame.

#### Scenario: Brightest frame check
- **WHEN** the brightest frame of the loop is placed behind the scrim and text
- **THEN** body text and labels still measure at least 4.5:1
