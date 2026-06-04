# Plan Step

## Purpose

Discuss requirements with the user, record the planning conversation, and gradually refine the implementation-facing spec.

## Input

- User requirement text from the host-specific Monado `plan` invocation.
- Existing plan and spec documents when continuing prior planning.

## Behavior

Execute planning as an ordered protocol:

1. Context pass
   - Inspect existing project files, documentation, and recent changes when the current workspace is available.
   - Follow existing project patterns when the work touches an established codebase.
   - Do not ask detailed questions that can be answered by reading the workspace.

2. Scope gate
   - Decide whether the request is small enough for one plan/spec pair.
   - If the request contains multiple independent subsystems, identify the first coherent implementation slice before refining details.
   - If the user provides multiple requirements in one request, keep them in the same plan and spec unless splitting is necessary for a coherent implementation cycle or the user explicitly asks to split.

3. Clarification loop
   - Ask one focused question at a time when the requirement is still ambiguous.
   - Prefer multiple-choice questions when they reduce effort for the user.
   - Focus questions on purpose, constraints, success criteria, scope, non-goals, and important tradeoffs.

4. Approach comparison
   - Propose 2-3 viable approaches with tradeoffs before committing to a direction.
   - Lead with the recommended approach and explain why it best fits the current goal.
   - Remove unrequested features and speculative complexity.

5. Design presentation
   - Present the design in sections scaled to complexity.
   - For each meaningful section, confirm that it matches the user's intent before treating it as settled.
   - Cover architecture, components, data flow, important behavior, error handling, and testing when those topics are relevant.

6. Plan and spec writing
   - Maintain one plan document and one spec document.
   - The plan document records conversation, options, assumptions, constraints, decisions, open questions, and approval history.
   - The spec document records what should be implemented.
   - Use `templates/plan-template.md` and `templates/spec-template.md` as optional references.

7. Spec self-review
   - Review the spec before implementation.
   - Use `assets/spec-review-checklist.md` as an optional self-review guide.
   - Fix concrete issues before asking for final approval.

8. User approval gate
   - Ask the user to review the final plan/spec.
   - Record explicit approval in both the plan and spec documents.
   - Do not move to implementation until approval is recorded.

Small requests still need this protocol, but each step can be brief.

## Output

- One Markdown plan document.
- One Markdown spec document.
- Explicit user approval recorded in both documents.

## Relationship

- The plan document records how the requirement became clear.
- The spec document records what should be implemented.
- The implementation step reads the spec document as its primary instruction source.

## Spec Checklist

The spec document should contain a checklist-like structure so implementation can proceed in slices.

Use checklist items for:

- Individual requirements.
- Subtasks within a large requirement.
- Optional or deferred parts.
- Dependencies between work items.
- Items that can be implemented in a later pass.

Implementation may stop after completing a coherent subset of checklist items, as long as the implementation document records what was completed and what remains.

## Spec Readiness Review

Before moving from `plan` to `implement`, review the spec with fresh eyes.

`assets/spec-review-checklist.md` is a guide for the agent's self-review. It is not copied into workflow output by default; the review result should be written into the spec document.

Check for:

- Placeholders such as TBD, TODO, or unfinished sections.
- Contradictions between requirements, constraints, and chosen approach.
- Ambiguous requirements that could lead to different implementations.
- Scope that is too large for a coherent implementation pass.
- Unrequested features or speculative complexity.

Fix concrete issues in the spec before implementation. If the remaining uncertainty changes the product direction, ask the user one focused question instead of guessing.

Blocking issues:

- Missing user approval.
- Placeholder text in implementation-relevant sections.
- Conflicting requirements or constraints.
- Requirements ambiguous enough to cause different implementations.
- Scope too broad for one coherent implementation cycle.
- Unrequested features that would change project behavior or cost.

Advisory notes:

- Wording polish.
- Minor section imbalance.
- Ideas that may be useful later but are not required now.

## Visual Questions

When the planning topic involves UI, diagrams, flows, or spatial relationships, decide whether a visual artifact would help the user answer better than text.

Use visuals for:

- UI layout or component comparisons.
- Architecture or data-flow diagrams.
- State machines, process flows, and relationship maps.

Use text for:

- Requirements and scope choices.
- Tradeoff lists.
- Conceptual or technical decisions.

Visual support is optional. Do not make it part of the core Monado flow.
