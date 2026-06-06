# Git Strategy

## Goal

Provide an optional fallback git policy for Monado work.

Use this file only when the target project does not already define a git, branching, commit, or merge policy.

If the target project has a documented git strategy, follow the project strategy instead of Monado's fallback strategy.

Still record which strategy was used in the workflow documents.

## Policy Discovery

Before applying this fallback, inspect the target project for git policy documentation, such as:

- `CONTRIBUTING.md`
- `README.md`
- `docs/`
- architecture or engineering policy documents
- repository automation or release documentation

When a project policy exists:

- Do not create `monado/<work-id>` branches unless the project policy allows or matches that pattern.
- Do not use Monado's fallback commit boundaries when the project defines different boundaries.
- Do not use Monado's fallback merge flow when the project defines another merge process.
- Record the project policy source in the implementation or review document.

## Fallback Branch Policy

When no project git policy exists, use one branch per work item:

```text
monado/<work-id>
```

Before implementation starts, record:

- Base branch.
- Base commit.
- Work branch.
- Git policy source: `Monado fallback`.

## Tracked Files

Monado workflow files are source-controlled artifacts.

Commit workflow files together with the code and project documentation they describe:

- plan/spec creation and approval.
- criteria creation.
- implementation records.
- review attempts.
- completion moves from `active` to `completed`.

Do not put `.monado/workflow/` in gitignore.

## Commit Boundaries

Prefer coherent commits:

- Planning commit: plan/spec and pending plan updates.
- Criteria commit: criteria document updates.
- Implementation commit: code, project docs, and implementation document updates.
- Review commit: review document updates.
- Completion commit: moving workflow files to `completed`.

When the target project already has a different commit policy, follow it and record the reason in the workflow documents.

## Completion Merge

Use this fallback merge flow only when Monado's fallback branch policy was used.

After a full-scope passing review and completion commit:

1. Ask the user whether to merge `monado/<work-id>` into the recorded base branch.
2. Merge only after explicit user approval.
3. If approved, checkout the base branch and merge the work branch.
4. Record the merge commit hash when merge succeeds.
5. If merge conflicts occur, stop and report the conflict.

Do not resolve merge conflicts automatically.

If the user declines merge, keep the work branch and report that it can be merged later.

When a project git policy exists, follow that policy's completion or merge process instead. If the policy requires user or maintainer action outside Monado, report that requirement rather than using the fallback helper.

Use the workflow helper after user approval:

```text
node scripts/monado-workflow.js merge <work-id>
```

Use an explicit target only when the recorded base branch is missing or intentionally overridden:

```text
node scripts/monado-workflow.js merge <work-id> --target <branch>
```
