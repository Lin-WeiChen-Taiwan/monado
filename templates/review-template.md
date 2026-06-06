# Monado Review Template

This is a reference template, not a required format.

# Review: <work-id>

## References

- Spec: `.monado/workflow/spec/active/<work-id>.spec.md`
- Criteria: `.monado/workflow/criteria/active/<work-id>.criteria.md`
- Implementation: `.monado/workflow/implementation/active/<work-id>.implementation.md`

## Review Attempts

Append one fixed-format section per review.

## Review Attempt N

- Status: pass | fail
- Reviewed implementation attempt: Implementation Pass 0 | Rework Attempt N
- Reviewed commit:
- Previous reviewed commit: None | <commit hash>
- Commit range: None | <previous commit>..<reviewed commit>
- Criteria reference: `.monado/workflow/criteria/active/<work-id>.criteria.md`
- Criteria version used: Criteria Version 0 | Criteria Version N
- Spec checklist scope:
  - <item>
- Reviewer:
- Review date:
- Completion decision: not-complete | completed | partial-pass
- Completion commit: None | <commit hash>
- Merge decision: not-asked | approved | declined | not-applicable
- Merge target: None | <base branch>
- Merge commit: None | <commit hash>

## Criteria Used

- <criteria item applied during this review>

## Criteria Application

- <how the implementation satisfies or violates the criteria>

## Documentation Review

- Project docs changed:
  - <path or "None">
- Documentation alignment: pass | fail | not applicable
- Missing documentation:
  - <required doc update or "None">
- Index files updated where needed: yes | no | not applicable

## Findings

### Blocking Findings

- <finding or "None">

### Advisory Notes

- <note or "None">

## Rework Requests

Required when status is `fail`. Use `None` when status is `pass`.

- <request tied to a spec checklist item or implementation defect>

## Residual Risks

- <risk or "None">

## Final Result

- Result: pass | fail
- Reason:

## Completion Notes

- Full scope complete: yes | no
- Workflow files moved to completed: yes | no
- Merge result: not requested | merged | declined | conflict
- Notes:
