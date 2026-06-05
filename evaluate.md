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
- Do not archive or move files to `completed` as part of this step.

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
- Residual risks or completion notes when status is `pass`.
