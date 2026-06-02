# Evaluate Feature

## Purpose

Review the implementation according to the implementation document and related code changes.

## Input

- Implementation document.
- Spec document referenced by the implementation document.
- Git commits recorded in the implementation document.

## Behavior

- Before reviewing the implementation, confirm the spec document records explicit user approval.
- Derive explicit evaluation criteria from the approved spec document.
- Write the evaluation criteria into the review document before the final pass/fail result.
- Review the implementation document content.
- Inspect the recorded code changes and commit hashes.
- Compare the result against the approved spec document and the derived evaluation criteria.
- When implementation intentionally covers only part of the spec checklist, evaluate the implemented subset and verify the implementation document clearly records remaining work.
- Require the generated code to satisfy the evaluation criteria.
- Do not pass an implementation that violates the evaluation criteria.
- Do not pass an implementation that exceeds the approved spec in a behavior-changing way.
- Do not pass an implementation that ignores required checklist items without recording them as remaining work.
- Record review results in a Markdown review document.
- The result is either pass or fail.

## Output

- Evaluation criteria derived from the spec document.
- Review result written into a Markdown review document.
- Pass or fail conclusion.
- If fail, concrete issues and requested changes.
- If pass, residual risks or completion notes.
