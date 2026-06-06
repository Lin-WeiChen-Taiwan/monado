# Workflow Gates

## Goal

Prevent a later Monado step from running when the previous workflow document is missing or incomplete.

Use this guide before starting `criteria`, `implement`, or `evaluate`.

## Script Check

When possible, run:

```text
node scripts/monado-workflow.js check <step> <work-id>
```

The script is a guardrail. If the script passes but the documents are visibly incomplete, stop and report the prerequisite failure.

## Criteria Gate

Before `criteria`, require:

- `.monado/workflow/spec/active/<work-id>.spec.md` exists.
- The spec self-review records passed readiness.
- The spec user approval records `Approved`.

If the gate fails, stop. Do not generate criteria.

## Implement Gate

Before `implement`, require:

- The criteria gate passes.
- `.monado/workflow/criteria/active/<work-id>.criteria.md` exists.
- The criteria document records a criteria version.
- The criteria document records `Criteria status: ready-for-implementation`.

If the gate fails, stop. Do not implement.

## Evaluate Gate

Before `evaluate`, require:

- The implement gate passes.
- `.monado/workflow/implementation/active/<work-id>.implementation.md` exists.
- The implementation document records `Current status: ready-for-review`.
- The implementation document records produced commit hashes or commit list entries.
- The implementation document records completed and remaining checklist items.

If the gate fails, stop. Do not write a pass/fail review attempt.

## Completion Gate

Complete a work item only when:

- The latest review attempt is `pass`.
- The implementation document records full spec scope, or records `Remaining checklist items: None`.
- The review document records no blocking findings for the latest attempt.

If any checklist items remain, keep workflow documents in `active`.

## Active and Completed Files

Active workflow files live under:

```text
.monado/workflow/<type>/active/
```

Completed workflow files live under:

```text
.monado/workflow/<type>/completed/
```

Completion moves only the landed work item files:

- plan
- spec
- criteria
- implementation
- review

Do not move pending plan files during work item completion.
