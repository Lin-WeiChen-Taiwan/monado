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

## Criteria Used

- <criteria item applied during this review>

## Criteria Application

- <how the implementation satisfies or violates the criteria>

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
