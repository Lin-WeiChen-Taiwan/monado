# Evaluate Feature

## Purpose

Review the implementation according to the implementation document and related code changes.

## Input

- Implementation document.
- Spec document referenced by the implementation document.
- Criteria document referenced by the implementation document.
- Git commits recorded in the implementation document.

## Behavior

- Before reviewing the implementation, confirm the spec document records explicit user approval.
- Read the criteria document.
- Confirm the criteria version covers the implementation scope under review.
- If criteria are missing or do not cover the implementation scope, stop evaluation and return to `criteria`.
- Review the implementation document content.
- Inspect the recorded code changes and commit hashes.
- Compare the result against the approved spec document and the selected criteria version.
- Review project docs changed by the implementation according to the target project's actual documentation structure, and confirm they align with the code, spec, and criteria.
- When implementation intentionally covers only part of the spec checklist, evaluate the implemented subset and verify the implementation document clearly records remaining work.
- Require the generated code to satisfy the evaluation criteria.
- Do not pass an implementation that violates the evaluation criteria.
- Do not pass an implementation that exceeds the approved spec in a behavior-changing way.
- Do not pass an implementation that ignores required checklist items without recording them as remaining work.
- Do not pass an implementation that changes public APIs, module responsibilities, flows, architecture relationships, policies, or feature behavior without updating the relevant project docs when those docs exist or are needed for future work.
- Record review results in a Markdown review document.
- The result is either pass or fail.

## Review Document

Use one review document per work item:

```text
.monado/workflow/review/active/<work-id>.review.md
```

Use `templates/review-template.md` as a reference format. The template is guidance, not a required format.

Do not create one review file per attempt. Append each review to the same review document as a fixed-format attempt block.

## Review Attempt Format

Each review increment must be a fixed-format block:

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

For later review attempts, `Previous reviewed commit` should be the reviewed commit from the previous review attempt. `Commit range` should describe the diff from the previous reviewed commit to the current reviewed commit.

## Review to Rework

If `Review Attempt N` is `fail`:

- Record blocking findings.
- Record concrete rework requests.
- Tie each rework request to either a spec checklist item or an implementation defect.
- The next implementation update should append `Rework Attempt N` to the implementation document.
- The next evaluation should append `Review Attempt N+1`.

If `Review Attempt N` is `pass`:

- Record the covered checklist scope.
- Record residual risks, if any.
- Do not require a new rework attempt.
- Do not archive or move files to `completed` as part of this step.

## Output

- Criteria application based on the selected criteria version.
- Review result written into a Markdown review document.
- Pass or fail conclusion.
- If fail, concrete issues and requested changes.
- If pass, residual risks or completion notes.
