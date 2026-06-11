# Harness Audit

Use this reference when inspecting a repository for agent-readiness.

## Audit Method

1. Inspect existing docs, scripts, package manifests, config files, CI files, tests, and agent instruction files.
2. Infer project type and technology stack from repository evidence before asking questions.
3. Preserve existing conventions. A missing Monado-style file is not a gap if the repo already has an equivalent mechanism.
4. Report only gaps that affect agent readability, operability, verification, or user preferences.

## Audit Areas

- Agent entrypoint: `AGENTS.md`, agent map, or equivalent.
- Documentation map: root docs index and progressive disclosure.
- Architecture knowledge: module boundaries, data flow, API boundaries, deployment/runtime shape.
- Verification path: build, run, test, lint, typecheck, smoke test, UI/API/manual checks.
- Policies: coding style, testing expectations, documentation sync, review expectations, user-delegated choices.
- Tools: repo scripts, ecosystem tools, Agent Skills, MCP servers, local CLIs, debuggers, browser automation, database inspectors.
- Executable checks: typecheckers, linters, tests, CI, structural tests, custom scripts.
- Evidence channels: test output, logs, screenshots, traces, generated reports, benchmark output.
- Harness maintainability: stale docs risk, oversized instruction files, duplicated rules.

## Output Format

Prefer a compact table or bullets:

```text
Gap:
Impact:
Recommended fix:
Next action:
```

When the repo is already adequate in an area, say so briefly and move on.

## Manual Setup Gaps

Record items the agent cannot complete alone, such as cloud accounts, secrets, code signing, external service setup, paid tools, private MCP servers, or user-specific policy choices.
