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

Before implementing, read `workflow-gates.md` and check the `implement` gate for the target work item:

```text
node scripts/monado-workflow.js check implement <work-id>
```

If spec approval is missing, stop and report the prerequisite failure. Do not implement.

If criteria are missing or do not cover the target scope, stop and report the prerequisite failure. Do not implement.

## Procedure

1. Read the approved spec and criteria.
   - Use the spec as the requirement source.
   - Use the criteria version as the future review target.
   - Do not invent requirements from project docs or code.

2. Resolve git policy.
   - Read `git-strategy.md`.
   - Inspect the target project's docs and repository conventions for an existing git policy.
   - Follow the target project's existing git policy when one exists.
   - Use Monado's fallback current-branch policy only when no project git policy exists.
   - Record the policy source, current branch, starting commit, and any policy-specific notes in the implementation document.

3. Check sequence order.
   - Extract the work id from the workflow filename.
   - If the work id has a numeric sequence prefix, run:
     ```text
     node scripts/monado-sequence.js check-order <work-id>
     ```
   - If the script reports an out-of-order warning, show the warning to the user and record it in the implementation document.
   - Do not automatically switch work items.
   - Do not treat out-of-order execution as a prerequisite failure.

4. Select the implementation scope.
   - Choose the full spec checklist or a coherent subset.
   - Record completed and remaining checklist items when implementing a subset.

5. Inspect the project.
   - Explore project docs, source code, tests, errors, and relevant context.
   - Follow existing project structure, policies, naming, and style.

6. Record the plan before editing code.
   - Write expected changes in the implementation document.
   - Record rationale, spec alignment, tradeoffs, git policy source, current branch, starting commit, target checklist items, criteria version, and sequence check result.

7. Change code.
   - Make the smallest coherent change for the selected scope.
   - Keep unrelated refactors out of the attempt.
   - Commit each meaningful change according to the project git policy.
   - Include workflow files in commits with code and project documentation changes.

8. Run a project docs sync pass.
   - Do this after code changes and before marking the implementation ready for review.
   - Identify whether the implementation changed facts future work needs: architecture, module responsibility, public APIs, commands, data formats, configuration, compatibility contracts, feature behavior, control flow, data flow, operational flows, policies, decisions, or project knowledge.
   - Inspect the target project's existing documentation structure and conventions.
   - Search existing project docs for pages that describe the changed behavior or would become stale.
   - Update the closest relevant project docs when changed code affects documented behavior.
   - Update folder-level `index.md`, `README.md`, or the project's equivalent index when adding, moving, renaming, or removing documentation files or folders.
   - Follow the project's actual documentation structure and conventions when they exist.
   - If no project documentation structure can be found, read `project-docs.md` as a fallback recommendation.
   - Keep project docs outside `.monado/workflow/`.
   - Do not mark the implementation ready for review until docs are updated or a clear no-docs decision is recorded.

9. Record results.
   - Record every produced commit hash.
   - Record changed files and project docs added or updated.
   - Record docs inspected, docs updated, and stale-doc checks performed.
   - Record why no project docs changed when none were needed, including the changed facts considered.
   - Record self-check results.
   - Record continuation notes when work stops before the full spec is complete.

10. Run self-checks.
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
- Git context.
- Git policy source.
- Sequence check result or out-of-order warning.
- Target spec checklist items.
- Implementation rationale.
- Implementation attempts.
- Project docs changes or no-docs decision.
- Project docs sync notes.
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
- Sequence check result.
- Target spec checklist items.
- Rationale.
- Spec alignment.
- Tradeoffs.
- Current branch.
- Starting commit.
- Produced commit or commit list.
- Changed files summary.
- Project docs added or updated.
- Documentation decision when no project docs changed.
- Documentation locations inspected.
- Stale documentation checks.
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

## Prerequisite Failures

Stop without implementing when the approved spec itself must change.

Stop without implementing when the selected criteria version does not cover the target scope.

Do not mark the implementation ready for review when:

- Commit hashes are not recorded.
- Required self-checks were skipped without explanation.
- Completed and remaining checklist items are unclear.
- Project docs are stale or the no-docs decision is not recorded.
- Documentation impact was not checked after code changes.

## Outputs

- `.monado/workflow/implementation/active/<work-id>.implementation.md`
- Code changes.
- Project docs updates when needed.
- Git commits.
- Self-check results.
- Completed and remaining spec checklist items.
