# Monado

Monado is a Codex skill for building harness project structures.

Its purpose is to help a new or existing repository become:

- agent-readable
- agent-operable
- agent-verifiable

Monado focuses on creating the missing structures, documents, and tool references that let agents understand, operate, and verify a project. It does not primarily implement product features.

## What Monado Checks

Monado evaluates a repository through generic harness capabilities:

- Entry
- Knowledge
- Architecture
- Operation
- Verification
- Policy
- Enforcement
- Tooling
- Evidence
- Disclosure

These capabilities are adapted to the project type, existing repository conventions, and user requirements.

## Documentation Principle

Monado uses progressive disclosure for documentation.

Reference documentation domains by directory path, such as `docs/architecture/`. When entering a documentation directory, read its `index.md` first as the map. The `index.md` file should stay short and point to child files that contain detailed guidance.

## Repository Shape

This repository intentionally keeps the skill small:

```text
monado/
└── SKILL.md
```

The single `SKILL.md` file contains the active skill instructions.
