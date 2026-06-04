# Plan Step

## Goal

Turn a user request into an approved implementation-facing spec.

## Inputs

- User request text from the host-specific Monado `plan` invocation.
- Existing plan and spec documents when continuing prior planning.
- Project files, docs, and recent changes when the workspace is available.

## Preconditions

No approved spec is required to start `plan`.

If continuing existing planning, locate the matching plan/spec pair before writing new workflow documents.

## Procedure

1. Inspect project context.
   - Read relevant project files, docs, tests, and recent changes before asking detailed questions.
   - Follow existing project patterns when the work touches an established codebase.
   - Do not ask questions that can be answered by inspecting the workspace.

2. Bound the work.
   - Decide whether the request can fit one plan/spec pair.
   - Keep related requirements in one plan/spec when they belong to one coherent implementation cycle.
   - If the request is too broad, identify the first coherent implementation slice and keep later slices explicit.

3. Clarify intent.
   - Ask one focused question at a time.
   - Prefer multiple-choice questions when they reduce user effort.
   - Ask about goals, constraints, success criteria, scope, non-goals, and meaningful tradeoffs.

4. Compare approaches.
   - Present 2-3 viable approaches when the design has real alternatives.
   - Lead with a recommendation and explain the tradeoff.
   - Remove unrequested features and speculative complexity.

5. Present the design.
   - Scale detail to the size of the request.
   - Cover architecture, components, data flow, behavior, errors, and testing only when relevant.
   - Confirm important decisions with the user before treating them as settled.

6. Write workflow documents.
   - Maintain one plan document and one spec document for the work item.
   - Write the plan as the record of conversation, options, assumptions, constraints, decisions, open questions, and approval history.
   - Write the spec as the instruction source for implementation.
   - Use `templates/plan-template.md` and `templates/spec-template.md` as reference formats.

7. Review the spec.
   - Use `assets/spec-review-checklist.md` as an optional self-review guide.
   - Record the self-review result inside the spec document.
   - Fix concrete readiness issues before asking for approval.

8. Get user approval.
   - Ask the user to review the final plan/spec.
   - Record explicit approval in both documents.
   - Do not move to `criteria` until approval is recorded.

Small requests still follow this procedure, but keep each action brief.

## Spec Checklist

Write the spec checklist so implementation can proceed in coherent slices.

Use checklist items for:

- Individual requirements.
- Subtasks within a large requirement.
- Optional or deferred parts.
- Dependencies between work items.
- Items that may be implemented in a later pass.

## Stop Conditions

Stop planning and ask the user when:

- A requirement can reasonably produce different implementations.
- The scope is too broad for one coherent implementation cycle.
- A product direction decision cannot be inferred from the workspace.
- User approval is missing.

Do not stop for wording polish or minor formatting issues.

## Outputs

- `.monado/workflow/plan/active/<work-id>.plan.md`
- `.monado/workflow/spec/active/<work-id>.spec.md`
- Approved spec checklist, or explicit open questions blocking approval.

## Notes

- The implementation step reads the spec as its primary instruction source.
- The plan records how the requirement became clear.
- The spec records what should be implemented.
- Visual support is optional. Use it only when UI, diagrams, flows, or spatial relationships would be easier to discuss visually.
