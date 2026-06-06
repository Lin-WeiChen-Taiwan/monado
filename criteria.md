# Criteria Step

## Goal

Define review criteria from the approved spec before implementation begins.

## Inputs

- Approved spec document.
- Target spec checklist scope.
- Existing criteria document when continuing criteria work.

## Preconditions

- The spec has completed self-review.
- The spec records explicit user approval.
- The target implementation scope is clear.

Before generating criteria, read `workflow-gates.md` and check the `criteria` gate for the target work item:

```text
node scripts/monado-workflow.js check criteria <work-id>
```

If any precondition is missing, stop and report the prerequisite failure. Do not generate criteria.

## Procedure

1. Read the approved spec.
   - Use the spec checklist, non-goals, constraints, interfaces, contracts, and testing direction.
   - Treat the spec as complete for the current development cycle.

2. Avoid implementation influence.
   - Do not read implementation documents.
   - Do not inspect code diffs.
   - Do not inspect implementation commits.
   - Do not derive criteria from existing implementation work.

3. Define review criteria.
   - Record what is in scope for review.
   - Record what is explicitly not a review criterion.
   - Record required evidence for evaluation.
   - Record failure conditions that should cause `evaluate` to fail.

4. Write or update the criteria document.
   - Use one criteria document per work item.
   - Use `templates/criteria-template.md` as a reference format.
   - Append a new criteria version only when the approved spec or target implementation scope changes.
   - Record `Criteria status: ready-for-implementation` when the criteria version covers the target implementation scope.

## Criteria Document

Write criteria to:

```text
.monado/workflow/criteria/active/<work-id>.criteria.md
```

Include:

- Work id.
- Spec reference.
- Criteria versions.
- Source spec checklist scope.
- Review criteria checklist.
- Non-criteria.
- Required evidence.
- Failure conditions.
- Version notes.

## Versioning

Use this initial version name:

```text
Criteria Version 0
```

Continue using the same criteria version for rework when rework only fixes implementation defects.

Append `Criteria Version N` only when:

- The approved spec changes.
- The target implementation scope changes.
- The existing criteria version no longer covers the work under review.

## Prerequisite Failures

Stop without generating criteria when:

- The spec is not approved.
- The spec has unresolved self-review issues.
- The target implementation scope is unclear.

Stop and keep the existing criteria version when rework does not change spec or scope.

## Outputs

- `.monado/workflow/criteria/active/<work-id>.criteria.md`
- Criteria version that covers the target implementation scope.
- Review criteria that `evaluate` will apply.
