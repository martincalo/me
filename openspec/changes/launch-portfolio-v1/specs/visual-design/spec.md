## ADDED Requirements

### Requirement: Colour tokens with system dark mode
All colours SHALL be defined as CSS custom properties in `app/globals.css` and exposed to Tailwind. Light values: `--bg #FCFBF3`, `--surface #F7F4EC`, `--ink #1A1A18`, `--ink-muted #45433F`, `--label #5E5C57`, `--line #DDD9D0`, `--stage #1F1E1B`, `--stage-ink #ECEAE3`, `--stage-muted #ADA89D`, `--stage-accent #E0D3BC`, `--scrim #121110` (both themes). Under `prefers-color-scheme: dark`: `--bg #151513`, `--surface #1D1D1A`, `--ink #ECEAE3`, `--ink-muted #C9C6BD`, `--label #9A978E`, `--line #2E2D29`, `--stage #2F2E2A`. There SHALL be no theme toggle, and no colour literal SHALL appear outside the token definitions (the video scrim included).

#### Scenario: System dark mode
- **WHEN** the operating system is set to dark mode
- **THEN** the page uses the dark tokens, and the stage sections are still visibly distinct from the page background

#### Scenario: No stray colours
- **WHEN** components, SVGs and CSS are searched for hex, `rgb(` or `hsl(` literals
- **THEN** the only matches are in the token definitions and the OG image generator

### Requirement: Text contrast and link styling
Every text/background pair SHALL meet at least 4.5:1 contrast in both themes. Links SHALL use the text colour (`--ink`, or `--stage-accent` on stage) and SHALL be underlined; there is no green accent colour.

#### Scenario: Link in a paragraph
- **WHEN** a link appears inside body text
- **THEN** it is underlined and uses `--ink`, not green

### Requirement: Typography
The site SHALL use only IBM Plex Sans (text, headings) and IBM Plex Mono (labels, tags, nav, metadata), self-hosted through `next/font` with at most 4 font files. The headline SHALL be about 92px on desktop and 48px on mobile, weight 500, with tight tracking, sized fluidly between the two. Body text SHALL be 17–18px with a line-height of about 1.6.

#### Scenario: No external font requests
- **WHEN** the page loads
- **THEN** no request goes to `fonts.googleapis.com` or `fonts.gstatic.com`

### Requirement: Layout and spacing
Content width SHALL be at most about 1120px, and long text at most about 65ch. Text SHALL be left-aligned; paragraphs SHALL never be centred. Spacing SHALL use an 8px scale. Layout containers SHALL NOT have fixed pixel widths. Cards and media SHALL use 12–20px radii, with thin hairline dividers in `--line`. There SHALL be no drop shadows and no decorative gradients; the video scrim is the only gradient.

#### Scenario: Narrow viewport
- **WHEN** the homepage is viewed at 360px wide
- **THEN** there is no horizontal scrolling and tap targets are at least 44×44px

#### Scenario: Wide viewport
- **WHEN** the homepage is viewed at 1920px wide
- **THEN** content is limited to about 1120px, and paragraphs to about 65ch

### Requirement: Minimal client JavaScript
Components SHALL be React Server Components, except `LoopVideo` and `ProductionLine` (plus Vercel Analytics). Icons SHALL be inline SVG; no icon font or icon library SHALL be used. All raster images SHALL use `next/image`.

#### Scenario: Client component audit
- **WHEN** the codebase is searched for `"use client"`
- **THEN** only `LoopVideo.tsx` and `ProductionLine.tsx` match

### Requirement: Accessibility baseline
The site SHALL use semantic landmarks (`header`, `main`, `section` with headings, `footer`), one `h1` per page, headings that don't skip levels, a skip-to-content link as the first focusable element, visible focus indicators, `lang="en"`, and `prefers-reduced-motion` handling for every motion effect, including smooth scrolling.

#### Scenario: Keyboard navigation
- **WHEN** a keyboard user tabs through the homepage
- **THEN** focus starts at the skip link, reaches every link in visual order, and is always visible on both light and stage backgrounds
