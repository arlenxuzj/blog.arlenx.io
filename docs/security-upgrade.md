# Runtime and security maintenance (2026-10-23)

## Supported development workflow

Use Node.js **24.22.1** (24 LTS) and npm **11.19.1**. Next.js is **16.4.2** with Pages Router and webpack. React **18.3.1** and MUI **5.18.0** preserve the existing UI; Next 16 still supports React 18 but warns that Next 17 will require React 19. The OG endpoint retains its working Edge runtime, which Next 16 also marks deprecated. These are future migration items, not suppressed warnings.

```sh
npm ci
npm run db:generate
npm run content
npm run dev
```

`npm run dev -- --hostname 127.0.0.1 --port 3000` accepts Next CLI options. The development wrapper regenerates repository MDX after content/plugin/image changes and starts Next only after the initial content build succeeds. Only repository-authored MDX is trusted for compilation and evaluation. Generated modules live in `.generated/content` and are ignored by Git. Keep the generated directory out of manual edits.

Contentlayer and its outdated telemetry/MDX dependency graph were removed. `@mdx-js/mdx` retains the existing document types, dates, slugs, reading time, custom components, heading sections, callouts and syntax highlighting. Required frontmatter is checked during compilation. Remote HTTPS image decoding has a 10-second deadline, a 10 MiB response limit and explicit HTTP/stream/decoding failure handling. Prisma remains on **6.19.3**, using the existing MongoDB schema; no database migration is part of this upgrade.

## Configuration and credentials

Use `.env.local` for private local values and Vercel environment settings for deployment. Never commit either credentials or connection strings.

- `DATABASE_URL`: MongoDB Atlas connection used by reading-count APIs. Without a database, articles still render but live counts are unavailable. Database errors return a generic message rather than raw Prisma errors. No database writes were used to validate the upgrade.
- `WAKATIME_API_KEY`: optional coding statistics. Missing, rejected, timed-out or malformed responses show an unavailable message on About instead of breaking the entire build. Statistics are revalidated hourly. Request errors containing keys are never logged. Only displayed statistics fields are published; private provider fields such as project names are excluded.
- `GITHUB_TOKEN`: optional for public repository metadata; use a valid token to avoid unauthenticated rate limits. Missing tokens are omitted from requests. Failed requests produce a sanitized warning and omit optional repository statistics, preserving project content and repository links. The Projects page revalidates hourly so statistics can recover without a redeploy. Axios errors containing authorization headers are never logged.
- Giscus and analytics variables remain optional. Empty Giscus values are serializable and omit the comments widget.

On Vercel, select Node.js **24.x**, install with `npm ci` using npm **11.19.1**, and build with `npm run build`. Review a deployment before replacing production. MongoDB credentials and Giscus configuration remain yours; no production settings were changed by this task.

## Security results and the remaining upstream advisory

The baseline lockfile reported **111 affected packages**, including **5 critical** and **46 high**. After upgrades, `npm audit --omit=dev` reports **zero vulnerabilities**.

The complete audit still reports **13 affected development packages**, all from **GHSA-vfj7-8cjw-p6xm**, because upstream `braces@3.0.3` has no fixed release at this date. These are dependency-chain reports of one advisory, not thirteen distinct flaws. They are deliberately not suppressed or relabeled as an audit pass.

`scripts/patch-dependencies.mjs`, run by `postinstall`, mitigates that advisory in every installed lockfile-listed `braces` copy by rejecting brace/parenthesis nesting beyond 127 levels before recursive traversal. It verifies the original and patched SHA-256 hashes, refuses unreviewed source/version changes, and is idempotent. The package version and npm integrity metadata are unchanged, so scanners still identify the upstream version. Tests verify rejection of deep input and preservation of ordinary glob expansion. Do not install with `--ignore-scripts` without subsequently running the reviewed postinstall patch. Remove the patch only after upgrading to and testing an upstream fixed release.

Two narrowly scoped dependency overrides are retained:

- `deepmerge-ts@8.0.2`: fixes recursive-merge stack exhaustion in Prisma's configuration dependency; Prisma generation and build are validated with this override.
- `fflate@0.8.3`: fixes the vulnerable ZIP parser used by the OG renderer; the OG endpoint is validated as a 1200×630 PNG.

Dependency install scripts use an explicit versioned `allowScripts` policy supported by npm 11.19.1. CI pins action commits and runs the runtime audit plus the patch regression tests. Dependabot is configured for weekly npm and action updates. The GitHub Security APIs returned **403**, so Dependabot, code-scanning and secret-scanning alert status cannot be claimed cleared; local npm audit does not replace those scans. No exposed production credentials have been rotated by this change.

## Verification commands

```sh
npm run lint
npm run typecheck
npm test
npm run audit:runtime
npm run audit                 # currently fails on the documented upstream development advisory
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In a second shell, with a local Chromium/Chrome installation:
BROWSER_EXECUTABLE_PATH=/usr/bin/chromium npm run test:browser
```

The browser check covers rendered pages, client navigation, theme switching, mobile layout and unhandled client exceptions. It intentionally blocks counter POST requests to avoid writing to a real database. Optional link-preview generation needs a browser; set `PUPPETEER_EXECUTABLE_PATH` to your installed Chromium/Chrome when using `PUPPETEER_SKIP_DOWNLOAD=true`. The sitemap and OG generation commands can update tracked generated assets, so inspect their diffs before committing.

Validation completed: clean dependency installation, 21 unit tests, lint, TypeScript, production build, development plugin reload, sitemap generation, OG image response and eight production browser routes with navigation/theme/mobile checks. Optional link-preview crawling and live MongoDB/WakaTime account integration were not tested. Cloud Node 24 setup/start instructions were saved as a draft; review/save and publish in environment settings to activate them. Fresh-task restoration remains unverified.
