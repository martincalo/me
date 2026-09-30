## ADDED Requirements

### Requirement: Single-page layout and section order
The homepage at `/` SHALL render, in order: Header, Hero, Experience sections (01 Metrify (Enpal), 02 Tesla, 03 Automation), Bookshelf, Contact, Footer. There SHALL be no Testimonials section. The HTML SHALL be fully prerendered at build time.

#### Scenario: Visitor opens the homepage
- **WHEN** a visitor requests `/`
- **THEN** the response is prerendered HTML containing all sections that have content, in the required order

#### Scenario: JavaScript disabled
- **WHEN** the homepage is loaded with JavaScript disabled
- **THEN** all text, links, images and the video poster are visible and readable; only the animations and video playback are missing

### Requirement: Header
The header SHALL show the wordmark "martin calo" in IBM Plex Mono on the left and navigation on the right, with the in-page anchor links "work", "books" and "contact". It SHALL NOT include a CV link. The "books" and "contact" links SHALL point to sections that exist on the page.

#### Scenario: Navigation jumps to sections
- **WHEN** a visitor activates "work", "books" or "contact"
- **THEN** the page scrolls to the Experience, Bookshelf or Contact section, and keyboard focus moves to that section

### Requirement: Hero
The Hero SHALL fill the first screen below the site header. On desktop a full-bleed photo from `content/profile.ts` (`heroImage`, rendered with `next/image`, loaded eagerly) SHALL sit behind the text under a page-colour gradient that is solid behind the text column and clears towards the right, where the subject is; on phones the photo SHALL stack above the text and fade into the page. The text SHALL be, top to bottom: the role "Full-Stack Software Engineer" as the page's only `h1`; the tagline "Building reliable systems." as a paragraph (not a heading), on one line on desktop; and the subtitle "Over a decade building systems that have to work, from robot cells to cloud platforms. Now bringing AI into production with the same rigour." There SHALL be no eyebrow line and no contact links in the Hero.

#### Scenario: Role is defined once
- **WHEN** `jobTitle` in `content/profile.ts` changes
- **THEN** the Hero h1, page title, OG image and JSON-LD all show the new role after a rebuild, with no other file edited

#### Scenario: Readable over the photo
- **WHEN** the Hero is viewed at 1440px wide with any photo
- **THEN** all Hero text sits on the solid part of the gradient, and the subject is visible on the right

#### Scenario: Phone layout
- **WHEN** the Hero is viewed at 390px wide
- **THEN** the photo sits above the text, the text is on the plain page colour, and the dark Work section is not visible before scrolling

### Requirement: Contact points
The site SHALL offer exactly these contact points, defined once in `content/profile.ts`: email (`mailto:`), LinkedIn URL, GitHub URL, and a phone number shown as text and linked to WhatsApp with `https://wa.me/<digits in international format>`. There SHALL be no CV or PDF download and no contact form.

#### Scenario: WhatsApp link
- **WHEN** a visitor activates the phone number link
- **THEN** it opens `https://wa.me/` followed by the number in international format with no `+`, spaces or dashes

#### Scenario: Unset contact point
- **WHEN** a contact value in `content/profile.ts` is still a bracketed placeholder
- **THEN** the build shows it as a visible placeholder in development, and the launch checklist blocks deployment until it is filled

### Requirement: Bookshelf
The Bookshelf SHALL show 4 books from `content/books.ts` in a 2-column grid on desktop and a single column on mobile. Each entry SHALL show the title, the author and a one-line takeaway. The books SHALL be *Designing Data-Intensive Applications* (Kleppmann), *Clean Architecture* (Martin), *AI Engineering* (Huyen), and *Nexus* (Yuval Noah Harari) labelled "beyond engineering" on the same line as its title.

#### Scenario: Beyond-engineering label
- **WHEN** the Bookshelf is rendered
- **THEN** only *Nexus* carries the "beyond engineering" label, in IBM Plex Mono on the title's line, so all titles align

### Requirement: Contact section
The Contact section SHALL be centred and SHALL show the line "Building something that needs to be reliable? Let's talk." followed by the email, LinkedIn, GitHub and WhatsApp phone links.

#### Scenario: Contact renders
- **WHEN** the homepage is rendered
- **THEN** the Contact section contains the line and all four contact links, each with an accessible name

### Requirement: Footer
The footer SHALL show "© <year> Martin Calo · Berlin" with the year set at build time, centred. There SHALL be no "All systems operational" line anywhere on the site.

#### Scenario: Footer renders
- **WHEN** any page is rendered, including the 404 page
- **THEN** the footer shows the copyright and no status line

### Requirement: No invented content
Outcomes, numbers, quotes, dates and contact details SHALL come only from Martin. Until provided, they SHALL appear as bracketed placeholders (e.g. `[Outcome]`), and the site SHALL NOT launch while any placeholder remains.

#### Scenario: Pre-launch placeholder check
- **WHEN** the launch check searches the production build output for bracketed placeholders
- **THEN** it finds none; otherwise launch is blocked
