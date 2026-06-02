# Implement Feature

## Purpose

Read the spec document, perform code development, and record the implementation process.

## Input

- Spec document.
- Existing implementation document when continuing work.

## Preconditions

- The spec document has completed self-review.
- The spec document records explicit user approval.
- The implementation target is either the full spec checklist or a coherent subset of it.

If any precondition is missing, stop implementation and return to `plan`.

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

## Output

- Markdown implementation document.
- Code changes.
- Git commits.
- Completed and remaining spec checklist items.

## Self Checks

- Coding style check.
- Build or compile check.
- Basic operation check.
