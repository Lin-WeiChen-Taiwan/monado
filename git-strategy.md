# Git Strategy

## Goal

Provide an optional fallback git policy for Monado work.

Use this file only when the target project does not already define a git, commit, or completion policy.

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

- Do not use Monado's fallback commit boundaries when the project defines different boundaries.
- Do not use Monado's fallback completion process when the project defines another process.
- Record the project policy source in the implementation or review document.

## Fallback Working Policy

When no project git policy exists, work on the current branch.

Before implementation starts, record:

- Current branch.
- Starting commit.
- Git policy source: `Monado fallback`.

Do not create a Monado-specific branch by default.

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

## Completion

Use this fallback completion flow only when no project git policy exists.

After a full-scope passing review and completion commit:

1. Keep working on the current branch.
2. Move workflow files from `active` to `completed`.
3. Commit the completion move on the current branch.
4. Record the completion commit hash.

When a project git policy exists, follow that policy's completion process instead. If the policy requires user or maintainer action outside Monado, report that requirement.
