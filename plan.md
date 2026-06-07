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

1. Resolve pending plans.
   - Check for pending plan files before creating any new plan/spec:
     ```text
     .monado/workflow/pending-plan/*.pending-plan.md
     ```
   - If one or more pending plan files exist, sort them by filename and process the first file.
   - If the user provided a new request while pending plans exist, stop new plan/spec creation and tell the user the pending plans must be processed or cancelled first.
   - If no arguments were provided and pending plans exist, process the next item from the first pending plan file.
   - If no arguments were provided and no pending plan exists, inspect the project and propose one candidate plan direction to the user. Do not create plan/spec until the user confirms.

2. Inspect project context.
   - Read relevant project files, docs, tests, and recent changes before asking detailed questions.
   - Follow existing project patterns when the work touches an established codebase.
   - Do not ask questions that can be answered by inspecting the workspace.

3. Bound the work.
   - Keep each plan/spec pair limited to one feature whenever possible.
   - Decide whether the request can fit one feature-focused plan/spec pair.
   - Keep related requirements in one plan/spec only when they are necessary parts of the same feature and belong to one coherent implementation cycle.
   - If the request is large, vague, project-level, contains multiple requirements, or implies multiple feature implementations, create or update a pending plan file before creating plan/spec documents.
   - When a request implies multiple features, split those features into separate pending plan items before detailed plan/spec work.
   - Discuss pending plan items with the user in the order recorded in the pending plan file.
   - For each confirmed pending item, run the full `plan` procedure for that item before moving to the next item.
   - Each confirmed pending item must produce its own sequenced plan/spec pair.
   - Each spec must complete self-review and record user approval independently.

4. Clarify intent and decisions.
   - Read `brainstorming.md` and follow it before creating plan/spec documents.
   - Be active during brainstorming.
   - Separate discovered facts from decisions.
   - Record workspace-derived facts without asking the user to restate them.
   - Ask the user about every implementation-impacting decision that cannot be discovered from the workspace.
   - Ask one focused decision question at a time.
   - Prefer 2-3 options with a recommendation when choices are known.
   - Ask about goals, users, scope, non-goals, behavior, edge cases, interfaces, compatibility, tests, documentation impact, implementation slices, and meaningful tradeoffs.
   - Do not stop while an open decision could lead to different implementations.
   - Only record an assumption or default when the user explicitly delegates that decision to the agent.

5. Compare approaches.
   - Present 2-3 viable approaches when the design has real alternatives.
   - Lead with a recommendation and explain the tradeoff.
   - Remove unrequested features and speculative complexity.
   - Treat the final approach selection as a user decision.

6. Present the design.
   - Scale detail to the size of the request.
   - Cover architecture, components, data flow, behavior, errors, and testing only when relevant.
   - Confirm implementation-impacting decisions with the user before treating them as settled.

7. Write workflow documents.
   - For each user-confirmed work item, get a sequenced work id only when creating its plan/spec files:
     ```text
     node scripts/monado-sequence.js next <slug>
     ```
   - Maintain one plan document and one spec document for each confirmed work item.
   - Write the plan as the record of conversation, options, assumptions, constraints, decisions, open questions, and approval history.
   - Write the spec as the instruction source for implementation.
   - Use `brainstorming.md` to confirm the spec is actionable before writing final approval fields.
   - Use the same sequenced work id for the plan and spec filenames.
   - When creating multiple plan/spec pairs, assign sequence numbers in creation order.
   - Do not renumber existing work items. If an item is cancelled, keep its workflow files or mark them cancelled so the sequence is not reused.
   - Use `templates/plan-template.md` and `templates/spec-template.md` as reference formats.

8. Review the spec.
   - Use `assets/spec-review-checklist.md` as an optional self-review guide.
   - Record the self-review result inside the spec document.
   - Fix concrete readiness issues before asking for approval.
   - Confirm there are no open implementation-impacting decisions before asking for approval.

9. Get user approval.
   - Ask the user to review the final plan/spec.
   - Record explicit approval in both documents.
   - Do not move to `criteria` until approval is recorded.
   - Do not ask for approval while any implementation-impacting decision is still open.

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

1. Create or update a pending plan file:
   ```text
   .monado/workflow/pending-plan/<slug>.pending-plan.md
   ```
2. Use `pending-plan.md` and `templates/pending-plan-template.md` as reference formats.
3. Order pending items by expected execution order.
4. Keep each pending item focused on one feature whenever possible.
5. Do not assign work ids to pending items.
6. Discuss the first pending item through the full `plan` procedure.
7. When the item is ready to become real workflow work, create its sequenced plan/spec pair.
8. Complete spec self-review and record user approval for that item.
9. Add a short activity log entry to the pending plan with the generated work id.
10. Remove the item from the pending item list.
11. If the pending plan has no remaining items, delete the pending plan file.
12. Continue with the next pending item only after the current item has its own approved plan/spec pair.

Pending plan item numbers are local to the pending plan file. They are not work ids and must not be used for `criteria`, `implement`, or `evaluate`.

Pending plan files block new independent plan/spec creation until all pending items are landed or cancelled.

## Stop Conditions

Stop planning and ask the user when:

- A requirement can reasonably produce different implementations.
- The scope is too broad for one coherent implementation cycle.
- A product direction decision cannot be inferred from the workspace.
- Any implementation-impacting decision is still open and has not been delegated by the user.
- User approval is missing.

Do not stop for wording polish or minor formatting issues.

## Outputs

- `.monado/workflow/plan/active/<work-id>.plan.md`
- `.monado/workflow/spec/active/<work-id>.spec.md`
- `.monado/workflow/pending-plan/<slug>.pending-plan.md` when the request needs multiple ordered plan items.
- Approved spec checklist, or explicit open questions blocking approval.

## Notes

- The implementation step reads the spec as its primary instruction source.
- The plan records how the requirement became clear.
- The spec records what should be implemented.
- Visual support is optional. Use it only when UI, diagrams, flows, or spatial relationships would be easier to discuss visually.
