# Runtime and security upgrade

> Execution: superpowers:executing-plans; user approved direct implementation and delegated technical choices.

**Goal:** Upgrade Node.js and Next.js and resolve dependency vulnerabilities while preserving the blog's pages, URLs and Pages Router.

**Architecture:** Node.js 24 LTS, Next.js 16, React 18-compatible Pages Router, maintained content tooling. Preserve MongoDB data/schema and existing visual design. Upgrade or replace vulnerable dependency chains rather than suppressing audit findings.

**Baseline:** Node 18.14.2, Next 13.3.2; npm audit reports 111 affected dependencies (5 critical, 46 high). GitHub Dependabot, code scanning and secret scanning APIs return 403; these remote findings cannot be claimed cleared.

## Tasks

- [x] Upgrade runtime pins, Next, dependency graph and lint tooling; regenerate lockfile and inspect audit results.
- [x] Adapt MDX/image integrations and external-service configuration with meaningful regression tests where behavior changes.
- [x] Verify clean installation, lint, types, tests, production build, production/dev pages and image endpoint; review the full change.
- [x] Document versions, remaining limitations, deployment steps and refresh cloud setup instructions.

## Validation and review focus

- MDX posts/snippets and syntax highlighting retain real rendered content.
- Missing optional third-party credentials must not leak secrets or silently fabricate statistics.
- MongoDB remains MongoDB; no migrations or production writes during verification.
- Remote image requests reject failures promptly and preserve TLS verification.
- Dependency overrides, if needed, are documented and validated rather than used to hide advisories.

No deployment, production credential rotation or merging is included. The user authorized this maintenance task, superseding the onboarding-only restriction on editing tracked files.
