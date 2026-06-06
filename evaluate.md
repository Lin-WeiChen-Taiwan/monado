# Evaluate Step

## Goal

Review the implementation against the approved spec, selected criteria version, implementation record, and recorded commits.

## Inputs

- Implementation document.
- Approved spec document referenced by the implementation document.
- Criteria document and criteria version referenced by the implementation document.
- Git commits recorded in the implementation document.
- Existing review document when appending another review attempt.

## Preconditions

- The spec records explicit user approval.
- The implementation document exists.
- The implementation document records the reviewed commit or commits.
- The criteria version covers the implementation scope under review.

Before evaluating, read `workflow-gates.md` and check the `evaluate` gate for the target work item:

```text
node scripts/monado-workflow.js check evaluate <work-id>
```

If criteria are missing or do not cover the implementation scope, stop and report the prerequisite failure. Do not write a pass/fail review attempt.

## Procedure

1. Read review inputs.
   - Read the approved spec.
   - Read the selected criteria version.
   - Read the implementation document.
   - Inspect the recorded commits and code changes.

2. Confirm traceability.
   - Confirm the implementation attempt under review is named.
   - Confirm commit hashes are recorded.
   - Confirm target checklist items are recorded.
   - Confirm completed and remaining checklist items are clear for partial implementation.

3. Apply criteria.
   - Compare the implementation against the selected criteria version.
   - Compare behavior against the approved spec.
   - Treat results as `pass` or `fail` only.

4. Review project docs.
   - Review project docs changed by the implementation according to the target project's actual documentation structure.
   - Confirm docs align with code, spec, and criteria.
   - Fail when public APIs, module responsibilities, flows, architecture relationships, policies, or feature behavior changed but relevant project docs were left stale or missing.

5. Write the review attempt.
   - Append one fixed-format `Review Attempt N` block to the review document.
   - Record blocking findings and rework requests when status is `fail`.
   - Record covered scope and residual risks when status is `pass`.

6. Complete full-scope passing work.
   - If the review status is `pass` and the implementation records no remaining spec checklist items, read `git-strategy.md`.
   - Move the work item's active workflow files to `completed`:
     ```text
     node scripts/monado-workflow.js complete <work-id>
     ```
   - Commit the completion move according to the active project git policy.
   - If Monado's fallback branch policy was used, ask the user whether to merge the work branch back to the recorded base branch.
   - If the user approves that fallback merge, merge according to `git-strategy.md`:
     ```text
     node scripts/monado-workflow.js merge <work-id>
     ```
   - If a project git policy exists, follow that policy's completion or merge process instead of Monado's fallback merge.
   - If the user declines a fallback merge, keep the branch and report that merge can happen later.
   - If merge conflicts occur, stop and report the conflict. Do not resolve conflicts automatically.
   - If the review status is `pass` but remaining checklist items exist, keep workflow files in `active`.

## Review Document

Write review history to:

```text
.monado/workflow/review/active/<work-id>.review.md
```

Use `templates/review-template.md` as a reference format.

Use one review document per work item. Do not create one review file per attempt.

## Attempt Format

Append each review as:

```text
Review Attempt N
```

The first review is `Review Attempt 0` and usually reviews `Implementation Pass 0`.

Every review attempt must record:

- Status: `pass` or `fail`.
- Reviewed implementation attempt.
- Reviewed commit.
- Previous reviewed commit.
- Commit range.
- Criteria reference.
- Criteria version used.
- Spec checklist scope.
- Criteria application.
- Documentation review.
- Findings.
- Rework requests.
- Residual risks.
- Completion decision.
- Merge decision when completion is performed.

For `Review Attempt 0`, `Previous reviewed commit` may be `None`.

For later attempts, `Previous reviewed commit` should be the reviewed commit from the previous review attempt. `Commit range` should describe the diff from the previous reviewed commit to the current reviewed commit.

## Rework Routing

If `Review Attempt N` is `fail`:

- Record blocking findings.
- Record concrete rework requests.
- Tie each request to a spec checklist item or implementation defect.
- Expect the next implementation update to append `Rework Attempt N`.
- Expect the next evaluation to append `Review Attempt N+1`.

If `Review Attempt N` is `pass`:

- Record the covered checklist scope.
- Record residual risks, if any.
- Do not require a new rework attempt.
- If no spec checklist items remain, complete the workflow files.
- If spec checklist items remain, keep workflow files active for the next implementation slice.

## Completion and Merge

Complete a work item only when all are true:

- The latest review attempt is `pass`.
- The implementation document records full spec scope, or records `Remaining checklist items: None`.
- The completed scope matches the approved spec and selected criteria.

When completion applies:

1. Run `node scripts/monado-workflow.js complete <work-id>`.
2. Commit the workflow file move according to the active project git policy.
3. If Monado's fallback branch policy was used, ask the user whether to merge the work branch into the recorded base branch.
4. Merge only after explicit user approval.
5. Run `node scripts/monado-workflow.js merge <work-id>` only for approved fallback branch merges.
6. If a project git policy exists, follow that policy instead of Monado's fallback merge helper.
7. Record the completion commit and merge commit when available.

Do not merge automatically. Do not resolve merge conflicts automatically.

## Prerequisite Failures

Stop without writing a pass/fail review attempt when criteria are missing or do not cover the implementation scope.

## Fail Conditions

Write a failed review attempt when:

- The implementation violates criteria.
- The implementation changes behavior beyond the approved spec.
- Required checklist items are ignored without being recorded as remaining work.
- Reviewed commit hashes are missing or cannot be inspected.
- Project docs are stale or missing for changes that future work needs to understand.

## Outputs

- `.monado/workflow/review/active/<work-id>.review.md`
- Pass or fail conclusion.
- Criteria application based on the selected criteria version.
- Documentation review result.
- Concrete issues and requested changes when status is `fail`.
- Residual risks, completion notes, and merge result when status is `pass`.
