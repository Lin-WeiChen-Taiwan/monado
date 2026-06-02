# Implement Feature

## Purpose

Read the spec document, perform code development, and record the implementation process.

## Input

- Spec document.
- Existing implementation document when continuing work.

## Preconditions

- The spec document has completed self-review.
- The spec document records explicit user approval.
- A criteria document exists for the work item.
- The implementation target is covered by a criteria version.
- The implementation target is either the full spec checklist or a coherent subset of it.

If the spec preconditions are missing, stop implementation and return to `plan`.

If the criteria document or matching criteria version is missing, stop implementation and return to `criteria`.

## Behavior

- Read the spec document.
- Confirm the spec is approved before making changes.
- Explore project documents, source code, tests, errors, and relevant context to locate the required changes.
- Before changing code, write the expected changes and reasons into the implementation document.
- Select a coherent subset of spec checklist items when the whole spec is too large for one implementation pass.
- Perform the actual code changes.
- Commit each meaningful change to git.
- Record every commit hash in the implementation document.
- Run basic self-checks when appropriate.
- If implementation stops before the full spec is complete, record completed checklist items, remaining checklist items, the stopping point, and the next recommended continuation.

## Implementation Document

Use one implementation document per work item:

```text
.monado/workflow/implementation/active/<work-id>.implementation.md
```

Use `templates/implementation-template.md` as a reference format. The template is guidance, not a required format.

The implementation document should include:

- Work id.
- Spec reference.
- Criteria reference.
- Criteria version used for the target scope.
- Current implementation status.
- Target spec checklist items.
- Implementation rationale.
- Implementation attempts.
- Commit log.
- Self-check results.
- Completed and remaining checklist items.
- Continuation notes.

## Attempt Format

The first implementation attempt is always:

```text
Implementation Pass 0
```

After a failed review, append a rework attempt to the same implementation document:

```text
Rework Attempt N
```

`Rework Attempt N` must address `Review Attempt N` from the review document.

Every implementation or rework attempt must record:

- Attempt name and number.
- Related review attempt, or `None` for `Implementation Pass 0`.
- Criteria version used.
- Target spec checklist items.
- Rationale.
- Spec alignment.
- Tradeoffs.
- Base commit.
- Produced commit or commit list.
- Changed files summary.
- Self-checks.
- Completed checklist items.
- Remaining checklist items.
- Continuation notes.

Do not create a separate `rework` workflow directory or top-level `rework` step.

## Review to Rework

When `Review Attempt N` fails:

- Read the blocking findings and rework requests from the review document.
- Append `Rework Attempt N` to the implementation document.
- Record why the rework is needed.
- Record the review finding or rework request being addressed.
- Explain why the fix is sufficient for that finding.
- Explain how the result still aligns with the approved spec.
- Limit the rework to the failed review findings unless the approved spec requires adjacent fixes.
- Record the new commit or commits produced by the rework.
- Run the normal self-checks again.
- Leave remaining work explicit if the full spec is still incomplete.

## Output

- Markdown implementation document.
- Code changes.
- Git commits.
- Completed and remaining spec checklist items.

## Self Checks

- Coding style check.
- Build or compile check.
- Basic operation check.
