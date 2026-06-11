# Project Type Profiles

Use this reference to adapt the harness to the project type. Treat profiles as starting points, not fixed templates.

## Common Baseline

All project types usually need:

- Agent entrypoint.
- Project docs index.
- Verification commands.
- Coding/testing policies.
- Tools index.
- Evidence expectations.
- Known manual setup gaps.

## Frontend App

Prioritize:

- Dev server and build commands.
- Typecheck, lint, unit/component tests.
- Browser automation and screenshot evidence.
- Accessibility or UI smoke checks when available.
- Component, route, state, and design-system docs.

Useful tools: Playwright, framework test runner, browser MCP, screenshot tooling, accessibility checks.

## Backend API

Prioritize:

- API contract docs or OpenAPI reference.
- Request/response schema validation.
- Unit and integration tests.
- Database migration and seed instructions.
- Auth, permission, logging, tracing, and error-handling policies.

Useful tools: API client, database inspector, logs/traces connector, schema validators.

## Full-Stack App

Combine frontend and backend profiles. Add:

- Local environment setup.
- Service startup order.
- End-to-end smoke tests.
- Database state verification.
- Cross-boundary API docs.

## Library Or SDK

Prioritize:

- Public API reference.
- Examples and compatibility matrix.
- Type tests or API surface tests.
- Build/package/publish commands.
- Semver and backward compatibility policies.

## CLI Tool

Prioritize:

- Command reference.
- Golden output or snapshot tests.
- Cross-platform behavior notes.
- Error message conventions.
- Shell completion or packaging docs when relevant.

## Game Or Interactive App

Prioritize:

- Gameplay loop and input docs.
- Asset pipeline.
- Performance checks.
- Save/load checks.
- Screenshot/video/manual playtest evidence.

## Data Or ML Project

Prioritize:

- Dataset lineage.
- Reproducibility setup.
- Evaluation scripts and metrics definitions.
- Experiment tracking.
- Data validation checks.

## Infrastructure Or DevOps

Prioritize:

- Environment topology.
- IaC validation.
- Deployment and rollback runbooks.
- Secret handling.
- Smoke tests after deployment.
- Policy checks.
