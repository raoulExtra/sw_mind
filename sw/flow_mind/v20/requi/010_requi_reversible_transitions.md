```yaml
title: 'Requirements: Reversible Transitions'
tags:
- flow_mind
- requirements
- reversible
- v20
persona: systems_designer
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Model reversible vs. irreversible transitions with compensating flows.'
```

# Requirements: Reversible Transitions

> Version: V00.01.00

## Overview

"Can we undo this?" as a design-time question, not a post-mortem regret.

## 1. Model Reversibility on Transitions

- [ ] **FR-REV-01** Transitions labeled with reversibility
  - *Acceptance*: `reversibility: reversible | irreversible | compensating`
  - *Test*: All transitions have reversibility label

- [ ] **FR-REV-02** Money, permissions, data deletion require compensating path
  - *Acceptance*: Rule enforced in schema
  - *Test*: Violation fails validation

## 2. Explicit Compensating Flows

- [ ] **FR-REV-03** Forward transition with commit
  ```yaml
  - from: pending_transfer
    to: transfer_committed
    signal: commit
    when: always
  ```
  - *Acceptance*: Forward path defined
  - *Test*: Forward transition executes

- [ ] **FR-REV-04** Compensating transition with reverse
  ```yaml
  - from: transfer_committed
    to: transfer_reversed
    signal: reverse
    when:
      equals:
        field: can_reverse
        value: true
  ```
  - *Acceptance*: Reverse path exists
  - *Test*: Compensating transition fires

## 3. Safe Checkpoints

- [ ] **FR-REV-05** States that are easy to roll back from
  - *Acceptance*: `pending_review`, `awaiting_confirmation`, `staged_changes`
  - *Test*: Checkpoint states in flow

- [ ] **FR-REV-06** No irreversible side-effects before checkpoints
  - *Acceptance*: Side-effect only after checkpoint
  - *Test*: Static analysis validates

## 4. Human Override as First-Class State

- [ ] **FR-REV-07** Explicit human override states
  - *Acceptance*: `awaiting_human_decision`, `manual_intervention_required`
  - *Test*: Override states reachable

- [ ] **FR-REV-08** Transitions to human decision
  - *Acceptance*: From "something went wrong" → human must decide
  - *Test*: Override transition defined

## 5. Log with Reversal in Mind

- [ ] **FR-REV-09** Log entries contain reversal info
  - *Acceptance*: what happened, what can be undone, which compensating applies
  - *Test*: Log schema validated

- [ ] **FR-REV-10** Audit trail ties to repair
  - *Acceptance*: Each entry links to compensating transition
  - *Test*: Reversal traceable from log

## 6. Guard Design: "Can We Undo This?"

- [ ] **FR-REV-11** Guards check reversibility preconditions
  - *Acceptance*: e.g., "funds still in escrow", "window for cancellation still open"
  - *Test*: Guard evaluates correctly

- [ ] **FR-REV-12** Irreversible escalation
  - *Acceptance*: If irreversible, escalate not proceed
  - *Test*: Escalation path triggered

## Benefits

- "Can we undo this?" = design-time question
- Damage surface small
- Audit trail directly tied to repair
- Reversibility baked into graph

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial reversible transitions requirements |