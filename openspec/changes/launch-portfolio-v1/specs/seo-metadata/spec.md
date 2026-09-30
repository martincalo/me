## ADDED Requirements

### Requirement: Page metadata
The root layout SHALL set `metadataBase` to `https://martincalo.com`, the title "Martin Calo — Full-Stack Software Engineer", the description "Full-stack software engineer in Berlin. Over a decade building systems that have to work, from robot cells to cloud platforms, now bringing AI into production.", a canonical URL, Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type=website`) and `twitter:card=summary_large_image`.

#### Scenario: Homepage head
- **WHEN** `/` is rendered
- **THEN** `<title>`, the meta description, the canonical link (`https://martincalo.com`) and all Open Graph and Twitter tags are present with the specified values

### Requirement: Story page metadata
Each `/work/<slug>` page SHALL set its own title (`<story title> — Martin Calo`), description (the first homepage paragraph), canonical URL `https://martincalo.com/work/<slug>`, `og:type=article`, and its own generated 1200×630 OG image showing the label and title on the stage colour, generated at build time.

#### Scenario: Story preview
- **WHEN** `/work/metrify` is shared
- **THEN** the preview shows "Digitalizing the smart meter market — Martin Calo" with its own image, not the homepage image

### Requirement: Generated OG image
`app/opengraph-image.tsx` SHALL generate a 1200×630 image at build time showing Martin's name and location, the role and the tagline, in the site's light palette and IBM Plex typography (loaded from a local font file).

#### Scenario: Link preview
- **WHEN** `https://martincalo.com` is checked in LinkedIn Post Inspector, Slack and WhatsApp
- **THEN** each preview shows the title, the description and the generated image

### Requirement: JSON-LD Person
The homepage SHALL include a `schema.org/Person` JSON-LD block with `name`, `jobTitle` (from the title line in `content/profile.ts`), `url` `https://martincalo.com`, and `sameAs` holding the LinkedIn and GitHub URLs. The phone number and email SHALL NOT be included.

#### Scenario: Structured data is valid
- **WHEN** the homepage is tested with the Schema.org validator
- **THEN** one Person entity is detected with no errors, and no telephone or email property

### Requirement: Sitemap and robots
The site SHALL serve `/sitemap.xml`, listing `https://martincalo.com` and every `/work/<slug>` page, and `/robots.txt`, allowing all crawlers and pointing to the sitemap.

#### Scenario: Robots points to sitemap
- **WHEN** `/robots.txt` is requested
- **THEN** it allows all user agents and contains `Sitemap: https://martincalo.com/sitemap.xml`

### Requirement: Playful 404
Unknown paths SHALL return HTTP 404 and show a not-found page with the line "This page was dead-lettered.", a link back to the homepage, and the normal header and footer.

#### Scenario: Unknown URL
- **WHEN** a visitor requests `/does-not-exist`
- **THEN** the status is 404 and the page reads "This page was dead-lettered." with a working link to `/`

### Requirement: Legacy URL redirect
Requests to `/about` (the old site's page) SHALL permanently redirect (308) to `/`.

#### Scenario: Old About link
- **WHEN** `/about` is requested
- **THEN** the response is a 308 redirect to `/`
