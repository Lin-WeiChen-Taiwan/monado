# Pending Plan

## Goal

Record ordered planning items for a large, vague, project-level, or multi-requirement request before those items become concrete plan/spec work items.

## When to Use

Create a pending plan when the user request is too broad for one coherent plan/spec pair, or when multiple plan/spec pairs are likely.

Write pending plans to:

```text
.monado/workflow/pending-plan/active/<slug>.pending-plan.md
```

## Rules

- A pending plan is not a spec.
- A pending plan item is not a work item.
- Pending plan items do not receive sequenced work ids when they are created.
- Use local item numbers such as `Item 1`, `Item 2`, and `Item 3`.
- Preserve item order unless the user explicitly changes it.
- Land pending items into plan/spec files in order.
- Only assign a work id when a pending item is ready to become a real plan/spec pair.
- Record the generated work id back in the pending plan after the item lands.

## Item Lifecycle

Use these item statuses:

- `pending`: identified but not yet discussed in detail.
- `discussing`: currently being clarified with the user.
- `landed`: converted into a sequenced plan/spec pair.
- `cancelled`: intentionally not converted into plan/spec.

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
6. Update the pending plan item status to `landed`.
7. Record the generated work id in the pending plan item.

Do not skip earlier pending items unless the user explicitly cancels or reorders them.

## Output

Use `templates/pending-plan-template.md` as a reference format.
