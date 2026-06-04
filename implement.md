# Implement Step

## Goal

Implement the approved spec scope and record the work in a traceable implementation document.

## Inputs

- Approved spec document.
- Criteria document and criteria version for the target scope.
- Existing implementation document when continuing work or handling rework.
- Review document when addressing a failed review.

## Preconditions

- The spec has completed self-review.
- The spec records explicit user approval.
- A criteria document exists for the work item.
- The target scope is covered by a criteria version.
- The target scope is either the full spec checklist or a coherent subset.

If spec approval is missing, stop and return to `plan`.

If criteria are missing or do not cover the target scope, stop and return to `criteria`.

## Procedure

1. Read the approved spec and criteria.
   - Use the spec as the requirement source.
   - Use the criteria version as the future review target.
   - Do not invent requirements from project docs or code.

2. Select the implementation scope.
   - Choose the full spec checklist or a coherent subset.
   - Record completed and remaining checklist items when implementing a subset.

3. Inspect the project.
   - Explore project docs, source code, tests, errors, and relevant context.
   - Follow existing project structure, policies, naming, and style.

4. Record the plan before editing code.
   - Write expected changes in the implementation document.
   - Record rationale, spec alignment, tradeoffs, base commit, target checklist items, and criteria version.

5. Change code.
   - Make the smallest coherent change for the selected scope.
   - Keep unrelated refactors out of the attempt.
   - Commit each meaningful change according to the project git policy when one exists.

6. Update project docs when needed.
   - Update docs when code changes affect architecture, public APIs, feature behavior, flows, policies, or project knowledge future work needs.
   - Find the project's existing documentation structure by inspecting the workspace.
   - Follow the project's actual documentation structure and conventions when they exist.
   - If no project documentation structure can be found, read `project-docs.md` as a fallback recommendation.
   - Keep project docs outside `.monado/workflow/`.

7. Record results.
   - Record every produced commit hash.
   - Record changed files and project docs added or updated.
   - Record why no project docs changed when none were needed.
   - Record self-check results.
   - Record continuation notes when work stops before the full spec is complete.

8. Run self-checks.
   - Check coding style when the project provides a way to do so.
   - Run build or compile checks when applicable.
   - Run a basic operation check or focused tests when applicable.

## Implementation Document

Write implementation history to:

```text
.monado/workflow/implementation/active/<work-id>.implementation.md
```

Use `templates/implementation-template.md` as a reference format.

Include:

- Work id.
- Spec reference.
- Criteria reference and version.
- Current implementation status.
- Target spec checklist items.
- Implementation rationale.
- Implementation attempts.
- Project docs changes or no-docs decision.
- Commit log.
- Self-check results.
- Completed and remaining checklist items.
- Continuation notes.

## Attempt Format

Name the first attempt:

```text
Implementation Pass 0
```

After a failed review, append:

```text
Rework Attempt N
```

`Rework Attempt N` addresses `Review Attempt N`.

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
- Project docs added or updated.
- Documentation decision when no project docs changed.
- Self-checks.
- Completed checklist items.
- Remaining checklist items.
- Continuation notes.

Do not create a separate `rework` workflow directory or top-level `rework` step.

## Rework Procedure

When `Review Attempt N` fails:

1. Read the blocking findings and rework requests.
2. Append `Rework Attempt N` to the implementation document.
3. Record why the rework is needed.
4. Record the finding or request being addressed.
5. Explain why the fix is sufficient.
6. Explain how the result still aligns with the approved spec.
7. Limit changes to the failed review findings unless the approved spec requires adjacent fixes.
8. Record new commits, doc updates, self-checks, and remaining work.

## Stop Conditions

Stop and return to `plan` when the approved spec itself must change.

Stop and return to `criteria` when the selected criteria version does not cover the target scope.

Stop before marking ready for review when:

- Commit hashes are not recorded.
- Required self-checks were skipped without explanation.
- Completed and remaining checklist items are unclear.
- Project docs are stale or the no-docs decision is not recorded.

## Outputs

- `.monado/workflow/implementation/active/<work-id>.implementation.md`
- Code changes.
- Project docs updates when needed.
- Git commits.
- Self-check results.
- Completed and remaining spec checklist items.
