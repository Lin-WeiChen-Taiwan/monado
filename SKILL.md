---
name: monado
description: Monado workflow controller. Use only when the user explicitly invokes Monado with `$monado {step} {args}`.
---

# Monado

Monado is a single-skill harness framework for guiding an AI agent through a traceable software development workflow.

This skill is the only public entry point. It routes explicit `$monado` requests into internal step documents, workflow documents, and shared assets.

Monado's planning style is collaborative and gated: explore context first, clarify intent through focused questions, compare alternatives, then turn the approved direction into a reviewed spec checklist.

## Invocation

Use Monado only when the user explicitly invokes:

```text
$monado {step} {args}
```

`step` is the requested workflow step. `args` is the remaining user text and should be interpreted by the agent according to the selected step.

Supported steps:

- `plan`
- `implement`
- `evaluate`

Do not activate Monado for general requests such as "implement this", "review this", or "help me design this" unless the user explicitly uses the `$monado` prefix.

If the step is unknown, stop and show the supported steps instead of guessing.

## Workflow

The MVP workflow is:

```text
plan -> implement -> evaluate
```

The workflow is document-based:

- `plan` discusses requirements with the user and creates or updates one Markdown plan document plus one Markdown spec document.
- `implement` creates or updates a Markdown implementation document while developing code.
- `evaluate` creates or updates a Markdown review document.

Implementation must not start until the plan step has produced a spec that has passed self-review and records explicit user approval. For small requests, the plan and spec can be brief; they still need an explicit approval checkpoint.

## Internal Steps

Monado uses internal step documents rather than multiple externally-triggered skills.

- `plan.md`: Discuss requirements, record planning context, and grow the spec checklist.
- `implement.md`: Implement according to the spec document and record commits.
- `evaluate.md`: Review implementation results and write a review document.

Before executing a step, read the matching step document.

Step documents do not need to follow the host tool's formal skill file format.

## Planning Discipline

During `plan`, follow these principles:

- Inspect project context before asking detailed questions when a workspace is available.
- Treat `plan` as the hard gate before implementation.
- Ask one focused question at a time.
- Prefer multiple-choice questions when that makes answering easier.
- Identify oversized requests early and help split them into coherent implementation slices.
- Propose 2-3 approaches with tradeoffs before settling on a direction.
- Lead with a recommended approach and explain why.
- Keep the spec focused; remove unnecessary features and avoid speculative expansion.
- Review the written spec for placeholders, contradictions, ambiguity, excessive scope, and speculative features before implementation.
- Record user approval in the plan and spec before `implement`.

## Shared Directories

- `templates/`: Reference templates for workflow documents such as plan and spec files.
- `assets/`: Shared guides and static resources used by Monado steps.

## MVP Boundary

The MVP focuses on a single-agent workflow. Multi-agent execution, subagent role injection, context reset, git worktree isolation, and external integrations are optional future capabilities.
