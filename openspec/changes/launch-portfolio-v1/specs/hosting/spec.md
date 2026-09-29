## ADDED Requirements

### Requirement: Vercel deployment
The `martincalo/me` repository SHALL be deployed on Vercel. Pushes to `main` SHALL deploy to production, and pull requests SHALL get preview deployments. A failed build SHALL NOT replace the current production deployment.

#### Scenario: Push to main
- **WHEN** a commit is pushed to `main` and `next build` succeeds
- **THEN** Vercel promotes it to production at martincalo.com

#### Scenario: Broken build
- **WHEN** a commit fails `next build`
- **THEN** production keeps serving the previous deployment

### Requirement: Domain and canonical host
martincalo.com SHALL be served by Vercel over HTTPS. The apex domain SHALL be canonical, and `www.martincalo.com` SHALL permanently redirect to it.

#### Scenario: www redirect
- **WHEN** a visitor requests `https://www.martincalo.com/`
- **THEN** they are permanently redirected to `https://martincalo.com/`

#### Scenario: HTTPS
- **WHEN** a visitor requests `http://martincalo.com`
- **THEN** they are redirected to `https://martincalo.com` with a valid certificate

### Requirement: Analytics and Search Console
Vercel Web Analytics SHALL be the only analytics. The domain SHALL be verified in Google Search Console, and the sitemap SHALL be submitted on launch day.

#### Scenario: Launch-day checks
- **WHEN** the site is live
- **THEN** Vercel Analytics records page views, and Search Console shows the domain as verified with the sitemap fetched successfully

### Requirement: Dependency allow-list
Runtime and build dependencies SHALL be limited to `next`, `react`, `react-dom`, `tailwindcss` and its PostCSS plugin, `@vercel/analytics`, TypeScript and its types, and ESLint with the Next.js config. Any other dependency SHALL be approved by Martin before it is added.

#### Scenario: Dependency audit
- **WHEN** `package.json` is inspected at launch
- **THEN** it lists only allow-listed packages, plus any recorded as approved

### Requirement: Repository hygiene
The repository SHALL contain a `.gitignore` covering `node_modules`, `.next`, `.env*`, `.vercel` and OS files; a short README describing the stack; the `CLAUDE.md` project brief; and no secrets, `.env` files, template leftovers or build output.

#### Scenario: Clean repository
- **WHEN** the repository is inspected at launch
- **THEN** it contains no `.env` files, no `.DS_Store`, no `.next` or `node_modules`, and no default scaffold assets or boilerplate content

### Requirement: Old stack taken out of service
After the new site is verified on martincalo.com: GitHub Pages SHALL be disabled on `Myportfolio`, its `CNAME` removed, any `api.martincalo.com` DNS record removed, and the `Myportfolio` repository made private. No Django, Express or OpenAI proxy service SHALL remain publicly reachable.

#### Scenario: Old endpoints gone
- **WHEN** the shutdown is complete
- **THEN** `api.martincalo.com` does not resolve, the old GitHub Pages URL does not serve the old site, and `github.com/martincalo/Myportfolio` is not publicly visible
