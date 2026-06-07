# Brainstorming Guide

## Goal

Help the `plan` step clarify a user request until it is ready to become an implementation-facing spec.

Use this file during `plan` before writing plan/spec documents.

## Hard Gate

Do not create plan/spec documents until the request is clear enough to fill the spec's goal, scope, requirements checklist, constraints, interface or behavior changes, testing direction, and approval fields.

Small requests still need this pass. Keep it brief when the answer is obvious, but do not skip it.

## Procedure

1. Explore context first.
   - Inspect relevant project files, docs, tests, recent commits, and existing workflow files.
   - Do not ask the user questions that the workspace can answer.
   - Note existing patterns, constraints, policies, and related features.

2. Check scope shape.
   - Prefer one feature per plan/spec pair.
   - If the request is large, vague, project-level, contains multiple independent requirements, or implies multiple feature implementations, create or update a pending plan before writing plan/spec.
   - Split implied features into separate pending plan items before detailed planning.
   - If the request fits one coherent implementation cycle, continue the clarification loop.

3. Ask one question at a time.
   - Ask the highest-impact missing question first.
   - Prefer multiple-choice questions when the likely answers are known.
   - Use open-ended questions only when the answer space is genuinely unknown.
   - Explain briefly why the answer matters when the tradeoff is not obvious.

4. Continue until the spec is actionable.
   - Stop asking only when the remaining uncertainty will not change implementation behavior.
   - If an unanswered question can produce different implementations, ask it.
   - If the user intentionally leaves a detail flexible, record the chosen default or assumption.

5. Compare approaches.
   - Present 2-3 viable approaches when the design has real alternatives.
   - Lead with the recommended approach and explain the tradeoff.
   - Remove speculative or unrequested features.

6. Present the design for confirmation.
   - Scale detail to complexity.
   - For larger work, present design in sections and confirm each section.
   - Cover architecture, components, data flow, errors, docs, and tests only where relevant.

7. Run readiness check.
   - Confirm the planned spec has no blockers from the readiness checklist below.
   - Then write plan/spec and record approval according to `plan.md`.

## Required Clarification Coverage

Before writing spec, be able to answer:

- Goal: What concrete outcome should this work produce?
- User or caller: Who uses the behavior, API, command, or UI?
- Scope: What is included in this cycle?
- Feature boundary: What single feature does this plan/spec cover?
- Non-goals: What is explicitly not included?
- Existing context: What existing files, docs, patterns, or constraints matter?
- Main behavior: What should happen in the normal path?
- Inputs and outputs: What data, events, commands, files, or UI actions enter and leave the feature?
- State and persistence: What state changes, if any?
- Errors and edge cases: What should happen when input is missing, invalid, empty, duplicated, too large, unsupported, or fails?
- Interfaces and contracts: What public API, CLI, data format, route, event, config, or component contract changes?
- Compatibility: What existing behavior must remain unchanged?
- Tests and checks: What evidence should show the implementation works?
- Documentation: What project docs may need to be created or updated?
- Slices: Can the work be implemented in a coherent partial slice?
- Split check: Does the request hide additional features that should become pending plan items?

Do not turn every item into a question. Ask only for missing answers that cannot be discovered from the project or safely defaulted.

## Question Patterns

Use precise questions such as:

- "Which user flow should this support first: A, B, or C?"
- "Should this change be limited to X, or should it also affect Y?"
- "What should happen when <edge case> occurs?"
- "Is the public contract allowed to change, or must this stay backward-compatible?"
- "Which result would count as done for the first implementation slice?"

Avoid vague questions such as:

- "Any other requirements?"
- "What do you want?"
- "Should I just implement it?"

## Readiness Checklist

The request is ready for plan/spec when:

- The goal is concrete.
- Scope and non-goals are clear.
- The plan/spec is limited to one feature, or the reason for keeping tightly coupled requirements together is recorded.
- Requirements can be written as checklist items.
- Major edge cases and failure behavior are either specified or explicitly deferred.
- Interfaces and compatibility expectations are clear.
- Testing direction is clear enough for implementation and evaluation.
- Any remaining assumptions are recorded.
- The user has approved the design direction.

If any readiness item is missing and could change the implementation, ask another question before writing plan/spec.

## Visual Support

Use visual support only when the decision is easier to make visually, such as UI layouts, interaction flows, or architecture diagrams.

For text-based scope, API, behavior, or tradeoff decisions, stay in the conversation.
