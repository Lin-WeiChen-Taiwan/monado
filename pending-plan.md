# Pending Plan

## Goal

Temporarily hold ordered candidate plan items for a large, vague, project-level, or multi-requirement request before those items become concrete plan/spec work items.

## When to Use

Create a pending plan when the user request is too broad for one coherent plan/spec pair, or when multiple plan/spec pairs are likely.

Write pending plans directly under:

```text
.monado/workflow/pending-plan/<slug>.pending-plan.md
```

Do not use `active` or `completed` status folders for pending plans.

## Rules

- A pending plan is a temporary planning queue, not a formal workflow item.
- A pending plan is not a spec and must not be used by `criteria`, `implement`, or `evaluate`.
- A pending plan item is not a work item.
- Pending plan items do not receive sequenced work ids when they are created.
- Use local item numbers such as `Item 1`, `Item 2`, and `Item 3`.
- Preserve item order unless the user explicitly changes it.
- Land pending items into plan/spec files in order.
- Only assign a work id when a pending item is ready to become a real plan/spec pair.
- Remove a pending item from the item list after it lands as approved plan/spec.
- Remove a pending item from the item list when the user cancels it.
- Keep only a short activity log entry for landed or cancelled items.
- Delete the pending plan file when no pending items remain.
- Do not create new independent plan/spec documents while any pending plan file exists.

## Item Lifecycle

Use these item statuses:

- `pending`: identified but not yet discussed in detail.
- `discussing`: currently being clarified with the user.

Completed and cancelled items do not stay in the item list.

## Landing an Item

When a pending item is ready to become workflow work:

1. Confirm the item with the user.
2. Run the full `plan` procedure for that item.
3. Generate a work id:
   ```text
   node scripts/monado-sequence.js next <slug>
   ```
4. Create the plan/spec pair for that work id.
5. Complete spec self-review and record user approval.
6. Add an activity log entry with the generated work id.
7. Remove the item from the pending item list.
8. If no pending items remain, delete the pending plan file.

Do not skip earlier pending items unless the user explicitly cancels or reorders them.

## Cancelling an Item

When the user cancels a pending item:

1. Add an activity log entry with the cancellation reason.
2. Remove the item from the pending item list.
3. If no pending items remain, delete the pending plan file.

## Multiple Pending Plans

When multiple pending plan files exist, process them by filename order.

Do not create a new independent plan/spec until all pending plan files are deleted.

## Output

Use `templates/pending-plan-template.md` as a reference format.
