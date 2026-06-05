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
   - If the request is large, vague, project-level, or contains multiple requirements, propose a plan list in the conversation before writing workflow documents.
   - Keep the plan list in the conversation. Do not create a separate plan-list workflow document.
   - Discuss plan-list items with the user in order.
   - For each confirmed plan-list item, run the full `plan` procedure for that item before moving to the next item.
   - Each confirmed plan-list item must produce its own sequenced plan/spec pair.
   - Each spec must complete self-review and record user approval independently.

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
   - For each user-confirmed work item, get a sequenced work id before creating files:
     ```text
     node scripts/monado-sequence.js next <slug>
     ```
   - Maintain one plan document and one spec document for each confirmed work item.
   - Write the plan as the record of conversation, options, assumptions, constraints, decisions, open questions, and approval history.
   - Write the spec as the instruction source for implementation.
   - Use the same sequenced work id for the plan and spec filenames.
   - When creating multiple plan/spec pairs, assign sequence numbers in creation order.
   - Do not renumber existing work items. If an item is cancelled, keep its workflow files or mark them cancelled so the sequence is not reused.
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

## Sequenced Work Items

Use sequenced work ids for all new plan/spec pairs:

```text
001-some-feature
002-next-feature
```

The numeric prefix is the execution order. Later workflow steps should process lower sequence numbers before higher sequence numbers.

Use `scripts/monado-sequence.js` to create the next work id. Do not choose sequence numbers manually when the script is available.

When the user presents a large, vague, project-level, or multi-requirement request:

1. Propose a plan list in the conversation.
2. Order the list by expected execution order.
3. Discuss the first item through the full `plan` procedure.
4. Create its sequenced plan/spec pair.
5. Complete spec self-review and record user approval for that item.
6. Continue with the next list item only after the current item has its own approved plan/spec pair.

The plan list itself is not a workflow file.

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
