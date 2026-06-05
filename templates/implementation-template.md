# Monado Implementation Template

This is a reference template, not a required format.

# Implementation: <work-id>

## References

- Spec: `.monado/workflow/spec/active/<work-id>.spec.md`
- Criteria: `.monado/workflow/criteria/active/<work-id>.criteria.md`
- Review: `.monado/workflow/review/active/<work-id>.review.md`

## Status

- Current status: in-progress | ready-for-review | rework-needed | passed
- Current attempt: Implementation Pass 0 | Rework Attempt N
- Target scope: full spec | partial spec slice
- Criteria version: Criteria Version 0 | Criteria Version N
- Sequence check: ok | warning - <message>
- Project docs status: not-needed | updated | missing

## Sequence Check

- Work id: <work-id>
- Sequence: <NNN>
- Check command: `node scripts/monado-sequence.js check-order <work-id>`
- Result: ok | warning
- Warning message:

## Target Spec Checklist Items

- [ ] <spec checklist item id or text>
- [ ] <spec checklist item id or text>

## Implementation Rationale

- Why this implementation is needed:
- Why this approach matches the approved spec:
- Important tradeoffs:

## Implementation Pass 0

- Related review attempt: None
- Criteria version used:
- Sequence check result:
- Rationale:
- Spec alignment:
- Tradeoffs:
- Base commit:
- Produced commits:
  - <commit hash> - <summary>
- Changed files summary:
  - <path>: <summary>
- Project docs changes:
  - <path or "None">: <reason, related implementation change, nearest index.md update>
- Completed checklist items:
  - <item>
- Remaining checklist items:
  - <item or "None">
- Self-checks:
  - Coding style: not run | passed | failed - <notes>
  - Build or compile: not run | passed | failed - <notes>
  - Basic operation: not run | passed | failed - <notes>
- Continuation notes:
  - <next step or "None">

## Rework Attempts

Append one section per failed review.

## Rework Attempt N

- Addresses review attempt: Review Attempt N
- Criteria version used:
- Sequence check result:
- Rationale:
- Review finding addressed:
- Why this fix is sufficient:
- Spec alignment after rework:
- Base commit:
- Produced commits:
  - <commit hash> - <summary>
- Rework requests addressed:
  - <request from Review Attempt N>
- Changed files summary:
  - <path>: <summary>
- Project docs changes:
  - <path or "None">: <reason, related implementation change, nearest index.md update>
- Completed checklist items:
  - <item>
- Remaining checklist items:
  - <item or "None">
- Self-checks:
  - Coding style: not run | passed | failed - <notes>
  - Build or compile: not run | passed | failed - <notes>
  - Basic operation: not run | passed | failed - <notes>
- Continuation notes:
  - <next step or "None">

## Commit Log

| Attempt | Commit | Summary |
| --- | --- | --- |
| Implementation Pass 0 | <hash> | <summary> |
| Rework Attempt N | <hash> | <summary> |

## Project Docs Log

| Attempt | Document | Reason | Index Updated |
| --- | --- | --- | --- |
| Implementation Pass 0 | <path or "None"> | <reason> | yes/no/not needed |
| Rework Attempt N | <path or "None"> | <reason> | yes/no/not needed |
