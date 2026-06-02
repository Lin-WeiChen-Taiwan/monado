---
name: monado
description: Use only when Monado is explicitly invoked.
---

# Monado

Monado is a single-skill harness framework for guiding an AI agent through a traceable software development workflow.

This file is the entry router. Keep it lightweight: identify the requested step, then read the matching step document before acting.

## Invocation

Use Monado only when the user explicitly invokes:

```text
$monado {args}
$monado {step} {args}
```

Monado normally runs the full workflow from `plan` through `criteria`, `implement`, and `evaluate`.

`step` is optional. If no step is provided, start from `plan`. Use a step name when the user is resuming an interrupted workflow, handing work across agents or sessions, or intentionally starting a specific phase.

`args` is the remaining user text and should be interpreted by the agent according to the selected step.

Supported steps:

- `plan`
- `criteria`
- `implement`
- `evaluate`

Do not activate Monado for general requests such as "implement this", "review this", or "help me design this" unless the user explicitly uses the `$monado` prefix.

If the step is unknown, stop and show the supported steps instead of guessing.

## Workflow

The MVP workflow is:

```text
plan -> criteria -> implement -> evaluate
```

The workflow is document-based:

- `plan` discusses requirements with the user and creates or updates one Markdown plan document plus one Markdown spec document.
- `criteria` derives review criteria from the approved spec before implementation.
- `implement` creates or updates a Markdown implementation document while developing code.
- `evaluate` creates or updates a Markdown review document.

Global gate: `implement` must not start until the spec has passed self-review, records explicit user approval, and has a matching criteria document.

## Step Routing

If no step is provided, route to `plan`.

Before executing a step, read the matching step document:

- `plan`: read `plan.md`
- `criteria`: read `criteria.md`
- `implement`: read `implement.md`
- `evaluate`: read `evaluate.md`

Step documents contain the detailed instructions. Do not rely on memory of a step's behavior when its document is available.

## Shared Directories

- `templates/`: Reference templates for workflow documents such as plan and spec files.
- `assets/`: Shared guides and static resources used by Monado steps.

## Current Scope

The current core is a single-agent Markdown workflow. Multi-agent execution, subagent role injection, context reset, git worktree isolation, and external integrations are optional future capabilities.
