---
name: monado
description: Build harness project structures for new or existing repositories so they become agent-readable, agent-operable, and agent-verifiable.
---

# Monado

Monado turns a repository into a user-shaped harness repo for agentic development.

First principle: help the project gain the harness mechanisms needed for agents to understand it, operate it, verify changes, and preserve the user's working preferences.

## Core Loop

1. Identify whether the user is starting a new repo, improving an existing repo, or asking for a focused harness change.
2. Clarify only high-impact missing preferences before editing, especially project type, tech stack, verification expectations, and user-specific constraints.
3. Inspect the repo before proposing structure. Prefer existing conventions over Monado defaults.
4. Find harness gaps: missing entrypoints, docs indexes, verification paths, policies, executable checks, tool guidance, or external capabilities.
5. Apply the smallest useful repo-local improvement that makes future agent work easier, safer, or more verifiable.
6. Report what changed, what can now be verified, and what still needs user/manual setup.

## Required Harness Questions

Work toward making the repo answer these questions:

- Where should an agent start reading?
- Where are project knowledge and architecture notes?
- How do agents build, run, test, lint, typecheck, debug, and inspect the project?
- Which repo tools, Agent Skills, and MCP servers are available or recommended?
- Which user preferences and engineering policies constrain agent work?
- Which rules are enforced by executable checks?
- What evidence proves a change is correct?
- When agents fail repeatedly, which harness gap should be improved?

## References

Load only the reference needed for the current task:

- `references/audit.md`: when inspecting an existing repo or reporting missing harness capabilities.
- `references/scaffold.md`: when creating or updating repo-local harness files.
- `references/profiles.md`: when selecting harness needs by project type.
- `references/tools.md`: when documenting repo tools, recommending Agent Skills, or recommending MCP servers.

## Harness Artifacts

Create or update artifacts only when they improve repo usability for future agents. Common artifacts:

- `AGENTS.md`
- `docs/index.md`
- `docs/harness/index.md`
- `docs/architecture/index.md`
- `docs/policies/index.md`
- `docs/testing/index.md`
- `docs/operations/index.md`
- `docs/tools/index.md`
- local validation scripts or package scripts

Keep entrypoints short. Use index files as maps to deeper documents. Prefer executable checks over written reminders when practical.

## Greenfield Bootstrap

When the user asks to create a new project, build the project and its harness together:

1. Ask for the minimum project-defining choices not already provided.
2. Scaffold the project using the chosen stack and normal ecosystem conventions.
3. Add agent entrypoint, progressive docs indexes, policies, verification guide, and tools index.
4. Add or document build/test/lint/typecheck/run commands.
5. List manual setup gaps such as secrets, accounts, signing certificates, hosted services, or missing external skills/MCP servers.

## Existing Repo Improvement

When working in an existing repo:

1. Discover existing docs, scripts, config, CI, tests, and conventions.
2. Preserve existing structure unless it blocks agent usability.
3. Fill the highest-impact gap first.
4. Avoid broad rewrites. Make one coherent harness improvement at a time.

## Output Style

Keep reports short and actionable:

```text
Changed
Evidence / commands
Remaining harness gaps
Manual user actions
```
