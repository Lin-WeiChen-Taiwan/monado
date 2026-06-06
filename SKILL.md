---
name: monado
description: Use only when Monado is explicitly invoked.
---

# Monado

Monado is a single-skill harness framework for guiding an AI agent through a traceable software development workflow.

This file is the entry router. Keep it lightweight: identify the requested step, then read the matching step document before acting.

## Invocation

```text
<monado> {args}
<monado> {step} {args}
```

Monado normally runs the full workflow from `plan` through `criteria`, `implement`, and `evaluate`.

`step` is optional. If no step is provided, start from `plan`. Use a step name when the user is resuming an interrupted workflow, handing work across agents or sessions, or intentionally starting a specific phase.

`args` is the remaining user text and should be interpreted by the agent according to the selected step.

Supported steps:

- `plan`
- `criteria`
- `implement`
- `evaluate` (alias: `review`)

## Available Features

Optional features are available only when the user explicitly invokes Monado with a feature name:

```text
<monado> {feature} {args}
```

Available features:

- `docs`: read `docs.md` to create or complete a project documentation structure.

Features are separate from workflow steps. Running a feature does not start the core workflow.

When the first argument matches an available feature, route to that feature before applying workflow step routing.

When the first argument matches a step alias, route to the canonical step.

If the first argument matches neither a supported step nor an available feature, stop and show the supported steps and available features instead of guessing.

## Workflow

The MVP workflow is:

```text
plan -> criteria -> implement -> evaluate
```

If evaluation fails, the workflow loops through implementation and evaluation:

```text
plan -> criteria -> implement -> evaluate
                           ^          |
                           |          |
                           +-- fail --+
```

The workflow is document-based:

- `plan` discusses requirements with the user and creates or updates one Markdown plan document plus one Markdown spec document.
- `criteria` derives review criteria from the approved spec before implementation.
- `implement` creates or updates a Markdown implementation document while developing code.
- `evaluate` creates or updates a Markdown review document.

Global gates:

- Read `workflow-gates.md` before starting `criteria`, `implement`, or `evaluate`.
- `criteria` must not start until the spec has passed self-review and records explicit user approval.
- `implement` must not start until the approved spec has a matching criteria document.
- `evaluate` must not start until the implementation is ready for review.
- `evaluate` must use the criteria version selected by the implementation document.
- Steps do not automatically route backward. When prerequisites are missing, stop and report the prerequisite failure.
- A failed review returns to `implement` as a rework attempt, not to `plan`, unless the approved spec itself changes.

Passing evaluation means the implemented scope is review-complete. When the full spec scope is complete, `evaluate` performs completion according to `workflow-gates.md` and `git-strategy.md`.

## Workflow Documents

Use one active document per work item and document type:

```text
.monado/workflow/
├── pending-plan/active/<slug>.pending-plan.md
├── plan/active/<work-id>.plan.md
├── spec/active/<work-id>.spec.md
├── criteria/active/<work-id>.criteria.md
├── implementation/active/<work-id>.implementation.md
└── review/active/<work-id>.review.md
```

All documents for the same work item share the same `<work-id>` filename stem.

## Step Routing

If no step is provided, route to `plan`.

Before executing a step, read the matching step document:

- `plan`: read `plan.md`
- `criteria`: read `criteria.md`
- `implement`: read `implement.md`
- `evaluate` or `review`: read `evaluate.md`

Step documents contain the detailed instructions. Do not rely on memory of a step's behavior when its document is available.
