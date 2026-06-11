# Harness Scaffold

Use this reference when creating or updating repo-local harness artifacts.

## General Rules

- Follow existing project conventions first.
- Create the smallest structure that answers the required harness questions.
- Keep entrypoint files short and link to deeper docs.
- Do not duplicate the same rule in many files. Put the rule in one place and link to it.
- Prefer executable checks or command references over prose-only instructions.

## Fallback Structure

Use this only when the repo lacks a useful documentation structure:

```text
AGENTS.md
docs/
├── index.md
├── harness/
│   └── index.md
├── architecture/
│   └── index.md
├── policies/
│   └── index.md
├── testing/
│   └── index.md
├── operations/
│   └── index.md
└── tools/
    └── index.md
```

## Artifact Purposes

- `AGENTS.md`: short agent entrypoint; point to docs, verification, and important policies.
- `docs/index.md`: project documentation map.
- `docs/harness/index.md`: user harness goals, agent working preferences, known gaps.
- `docs/architecture/index.md`: architecture map and where deeper design docs live.
- `docs/policies/index.md`: coding, testing, documentation, review, and user decision policies.
- `docs/testing/index.md`: build/test/lint/typecheck/run commands and evidence expectations.
- `docs/operations/index.md`: dev server, environment setup, debugging, deployment, runtime operations.
- `docs/tools/index.md`: repo tools, ecosystem tools, Agent Skills, MCP servers, and missing external capabilities.

## AGENTS.md Shape

Keep `AGENTS.md` short:

```md
# Agent Entry

## Start Here
- Project docs: docs/index.md
- Verification: docs/testing/index.md
- Harness goals: docs/harness/index.md

## Before Editing
- Read relevant docs indexes.
- Follow docs/policies/index.md.

## Before Reporting Done
- Run the verification commands relevant to the change.
- Report evidence and remaining gaps.
```

## Existing Repo Updates

When a repo already has docs, add missing index links or sections instead of moving everything. When a repo already has `CONTRIBUTING.md`, `README.md`, or framework docs, link them from the harness map.
