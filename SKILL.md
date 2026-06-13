---
name: monado
description: Build harness project structures for new or existing repositories so they become agent-readable, agent-operable, and agent-verifiable.
---

# Monado

Monado helps establish the missing structures, documents, and tools that make the current repository agent-readable, agent-operable, and agent-verifiable.

First principle: inspect the current repo, identify which harness mechanisms are missing for this project type and user need, then create or adjust only those missing pieces.

When Monado activates, prioritize establishing the repository harness before product or feature development. Create application code only when it is needed to establish a runnable project skeleton or verification path.

## Harness Capabilities

Evaluate the repo against these generic harness capabilities, then adapt them to the project type and user preferences:

- Entry: where agents start reading, such as `AGENTS.md` or an existing equivalent.
- Knowledge: where repo-local project knowledge lives, such as `docs/` or an existing docs entrypoint.
- Architecture: how the system is structured, where boundaries are, and which lifecycle/data-flow docs matter.
- Operation: how to build, run, debug, inspect, configure, and set up the environment.
- Verification: how to prove changes work, including build, test, lint, typecheck, smoke, UI, API, and manual checks.
- Policy: which user preferences and engineering rules constrain agent work.
- Enforcement: which rules are backed by executable checks such as linters, tests, CI, structural tests, or custom scripts.
- Tooling: which repo tools, ecosystem tools, Agent Skills, MCP servers, debuggers, inspectors, and external capabilities are available or missing.
- Evidence: what outputs prove correctness, such as test logs, screenshots, traces, reports, captures, benchmarks, or manual verification notes.
- Disclosure: how docs are indexed so agents can progressively explore details without loading everything at once.

## Core Process

1. Identify whether this is a new repo skeleton, existing repo improvement, or focused harness fix.
2. Inspect docs, scripts, manifests, config, CI, tests, and agent instruction files before creating structure.
3. Infer project type and technology stack from repository evidence; ask only for high-impact preferences that cannot be inferred.
4. Preserve existing conventions. A missing Monado-style file is not a gap if the repo already has an equivalent mechanism.
5. Compare the repo against the harness capabilities and identify missing structures, documents, tool references, executable checks, or external capabilities.
6. Create or adjust the missing repo-local pieces needed by the current project. Do not build more structure than the project type and user requirements need.
7. If a required tool, Agent Skill, or MCP server is missing, ask the user to install or enable it and document why it matters.
8. Report changed files, available verification, remaining harness gaps, and manual user actions.

## Progressive Disclosure

Use progressive disclosure for documentation.

- Reference documentation domains by directory path, such as `docs/architecture/`, not by pointing directly at `docs/architecture/index.md`.
- When entering any documentation directory, read its `index.md` first as the directory map.
- `index.md` is a map and short summary for its directory.
- Child files contain detailed guidance, policies, commands, architecture notes, and examples.
- Do not treat `index.md` as the detailed explanation file for that documentation domain.
- Do not put full policies, full architecture descriptions, full command manuals, or long setup guides directly in a top-level `index.md`.
- If an index grows beyond a short navigational summary, create a focused child file and link to it from the index.
- Keep entrypoints short and link to deeper docs.

## Harness Artifacts

Create or update artifacts only when they improve repo usability for future agents.

The artifact structure is not fixed. Choose it according to project type, existing conventions, and user requirements. Common outputs include:

- Agent entrypoint, such as `AGENTS.md` or an existing equivalent.
- Documentation domains, such as `docs/`, `docs/architecture/`, or an existing docs entrypoint.
- Harness goals and known gaps, placed where the repo keeps project guidance.
- Architecture, operation, verification, policy, enforcement, tooling, and evidence docs when the project needs them.
- Local validation scripts, package scripts, or CI references when they improve verification.

Keep entrypoints short. Use index files as maps to deeper documents. Prefer executable checks over written reminders when practical.

## Greenfield Bootstrap

When the user asks to create a new project, establish the project skeleton and harness together:

1. Ask for the minimum project-defining choices not already provided.
2. Scaffold the project skeleton using the chosen stack and normal ecosystem conventions.
3. Add agent entrypoint, progressive docs indexes, policies, verification guide, and tools index.
4. Add or document build/test/lint/typecheck/run commands.
5. Stop at a runnable skeleton unless the user separately asks for product feature implementation.
6. List manual setup gaps such as secrets, accounts, signing certificates, hosted services, or missing external skills/MCP servers.

## Existing Repo Improvement

When working in an existing repo:

1. Discover existing docs, scripts, config, CI, tests, and conventions.
2. Preserve existing structure unless it blocks agent usability.
3. Fill missing harness structures, documents, tool references, or executable checks.
4. Avoid broad rewrites. Make one coherent harness improvement at a time.

## Tool And Capability Gaps

Treat tools broadly:

- Repo-local scripts and CLIs.
- Ecosystem tools such as typecheckers, linters, formatters, test runners, bundlers, browser test tools, API validators, and schema validators.
- Agent Skills such as browser/UI automation, TDD workflow, document processing, architecture analysis, or framework-specific implementation aids.
- MCP servers such as language server, debugger, browser automation, database inspector, API client, observability, filesystem, issue tracker, CI, or repository provider connectors.

Recommend capability types, not specific products, unless the repo already uses a tool or the user asks for a recommendation. Do not pretend unavailable tools were used.

## Output Style

Keep reports short and actionable:

```text
Changed
Evidence / commands
Remaining harness gaps
Manual user actions
```
