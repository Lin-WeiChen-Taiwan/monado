# Monado Spec Review Checklist

Use this as a self-review reference before implementation. It is not a mandatory format.

# Review Result

- Status: Approved | Issues Found
- Reviewed spec:
- Reviewed by:
- Review date:

## Blocking Issues

Flag only issues that can realistically cause flawed implementation.

- [ ] Approval missing: the spec does not record explicit user approval.
- [ ] Completeness problem: implementation-relevant sections contain placeholders, unfinished notes, or vague requirements.
- [ ] Consistency problem: requirements, constraints, approach, or interfaces conflict with each other.
- [ ] Clarity problem: a requirement could reasonably lead to two different implementations.
- [ ] Scope problem: the work covers multiple independent implementation cycles without a clear first slice.
- [ ] YAGNI problem: the spec includes unrequested behavior or speculative complexity.
- [ ] Slice problem: the checklist cannot support a coherent partial implementation.

## Advisory Notes

Do not block implementation for these unless they affect correctness.

- Wording polish:
- Nice-to-have follow-up ideas:
- Documentation improvements:

## Fixes Applied

- <issue fixed or "None">

## Final Decision

- Approved for implementation: Yes | No
- Reason:
