---
name: monado
description: Use only when Monado is explicitly invoked.
---

# Monado

Monado is a single-skill harness framework for guiding an AI agent through a traceable software development workflow.

This file is the entry router. Keep it lightweight: identify the requested step, then read the matching step document before acting.

## Invocation

Use Monado only when the user explicitly invokes Monado through the current host application's skill or command syntax.

```text
<monado> {args}
<monado> {step} {args}
```

`<monado>` is a placeholder for the host-specific invocation form. For example, one host may expose Monado as a skill command, while another may expose it as a slash command. The exact prefix is not part of the Monado workflow.

Monado normally runs the full workflow from `plan` through `criteria`, `implement`, and `evaluate`.

`step` is optional. If no step is provided, start from `plan`. Use a step name when the user is resuming an interrupted workflow, handing work across agents or sessions, or intentionally starting a specific phase.

`args` is the remaining user text and should be interpreted by the agent according to the selected step.

Supported steps:

- `plan`
- `criteria`
- `implement`
- `evaluate`

Do not activate Monado for general requests such as "implement this", "review this", or "help me design this" unless the user explicitly invokes Monado using the current host's Monado syntax.

If the step is unknown, stop and show the supported steps instead of guessing.

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

- `criteria` must not start until the spec has passed self-review and records explicit user approval.
- `implement` must not start until the approved spec has a matching criteria document.
- `evaluate` must use the criteria version selected by the implementation document.
- A failed review returns to `implement` as a rework attempt, not to `plan`, unless the approved spec itself changes.

Passing evaluation means the implemented scope is review-complete. Moving workflow files to `completed` is intentionally outside the current core flow.

## Workflow Documents

Use one active document per work item and document type:

```text
.monado/workflow/
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
- `evaluate`: read `evaluate.md`

Step documents contain the detailed instructions. Do not rely on memory of a step's behavior when its document is available.

## Shared Resources

- `templates/`: Reference templates for workflow documents such as plan and spec files.
- `assets/`: Shared guides and static resources used by Monado steps.

## Current Scope

The current core is a single-agent Markdown workflow. Multi-agent execution, subagent role injection, context reset, git worktree isolation, and external integrations are optional future capabilities.
