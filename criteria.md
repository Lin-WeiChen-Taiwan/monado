# Criteria Feature

## Purpose

Read the approved spec and define review criteria before implementation begins.

## Input

- Approved spec document.
- Target spec checklist scope.
- Existing criteria document when criteria already exist for the work item.

## Preconditions

- The spec document has completed self-review.
- The spec document records explicit user approval.
- The target implementation scope is clear.

If any precondition is missing, stop criteria generation and return to `plan`.

## Behavior

- Read the approved spec document.
- Do not read implementation documents.
- Do not inspect code diffs or implementation commits.
- Do not derive criteria from an existing implementation.
- Derive review criteria from the spec checklist, non-goals, constraints, interfaces, contracts, and testing direction.
- Record what is in scope for review and what is explicitly not a review criterion.
- Record the evidence required for evaluation.
- Record failure conditions that should cause `evaluate` to fail.
- Write the criteria before implementation begins.

## Criteria Document

Use one criteria document per work item:

```text
.monado/workflow/criteria/active/<work-id>.criteria.md
```

Use `templates/criteria-template.md` as a reference format. The template is guidance, not a required format.

The criteria document should include:

- Work id.
- Spec reference.
- Criteria versions.
- Source spec checklist scope.
- Review criteria checklist.
- Non-criteria.
- Required evidence.
- Failure conditions.
- Version notes.

## Version Format

The first criteria version is always:

```text
Criteria Version 0
```

Use `Criteria Version 0` for the initial implementation unless the approved spec or target scope changes.

If the approved spec or implementation scope changes, append:

```text
Criteria Version N
```

Rework does not automatically require a new criteria version. If rework only fixes implementation defects, continue using the same criteria version.

## Output

- Markdown criteria document.
- Criteria version that covers the target implementation scope.
- Review criteria that `evaluate` will apply.
