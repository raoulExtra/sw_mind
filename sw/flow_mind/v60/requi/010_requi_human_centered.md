```yaml
title: 'Requirements: Human-Centered Flow Engine'
tags:
- flow_mind
- requirements
- human-centered
- ethics
- v60
persona: ethicist
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Human intent, error philosophy, trust model, legibility, and reversibility.'
```

# Requirements: Human-Centered Flow Engine

> Version: V00.01.00

## Overview

Beneath all machinery is a simple question: What are we actually trying to do—and why? Everything above—PQ crypto, logs, determinism, schemas—is just machinery to protect and express that.

## 1. Human Intent as the True Root

- [ ] **FR-HUMAN-01** Flows tied to clear, human-readable objectives
  - *Acceptance*: Each flow has explicit goal statement
  - *Test*: Non-technical stakeholder can state the goal

- [ ] **FR-HUMAN-02** Value constraints encoded in flow
  - *Acceptance*: Safety, consent, fairness, reversibility constraints
  - *Test*: Constraint violation blocks execution

- [ ] **FR-HUMAN-03** Priority ordering for conflicting goals
  - *Acceptance*: Goal priority documented and enforced
  - *Test*: Conflict resolution follows documented priority

## 2. Error Philosophy, Not Just Handling

- [ ] **FR-HUMAN-04** Explicit error classes
  - *Acceptance*: Harmful, costly, annoying, tolerable categories
  - *Test*: Error classification function

- [ ] **FR-HUMAN-05** Flows designed around failure
  - *Acceptance*: Failure paths as first-class transitions
  - *Test*: All failure modes have defined handling

- [ ] **FR-HUMAN-06** Rollback and graceful degradation
  - *Acceptance*: Compensating actions for critical steps
  - *Test*: Rollback produces prior state

## 3. Trust Model as First-Class Concept

- [ ] **FR-HUMAN-07** Explicit trust graph
  - *Acceptance*: Users, operators, models, tools, verifiers listed
  - *Test*: Trust graph serialized and validated

- [ ] **FR-HUMAN-08** Flows encode trust boundaries
  - *Acceptance*: "this step must be human-approved", "this step must be local"
  - *Test*: Boundary violation blocked

- [ ] **FR-HUMAN-09** Assumption transparency
  - *Acceptance*: Assumptions documented in flow metadata
  - *Test*: Assumption violation logged

## 4. Cognitive Load and Legibility

- [ ] **FR-HUMAN-10** Flows readable as stories
  - *Acceptance*: Non-technical can follow flow narrative
  - *Test*: 10-minute explanation session succeeds

- [ ] **FR-HUMAN-11** Naming discipline
  - *Acceptance*: Names describe meaning, not mechanics
  - *Test*: Naming review passes

- [ ] **FR-HUMAN-12** Explanations baked in
  - *Acceptance*: "why this transition fired" in output
  - *Test*: Explanation available with state

## 5. Ethics and Reversibility

- [ ] **FR-HUMAN-13** Reversibility encoded in flows
  - *Acceptance*: Every critical action has compensating action
  - *Test*: Reversal path exists

- [ ] **FR-HUMAN-14** Human override states
  - *Acceptance*: Explicit "stop and ask person" nodes
  - *Test*: Override path reachable

- [ ] **FR-HUMAN-15** Auditability as moral requirement
  - *Acceptance*: Every action attributable and reviewable
  - *Test*: Audit log complete

## Benefits

- Fewer "technically correct but wrong for humans" outcomes
- Systems that fail in ways we can live with
- Fewer surprises when something breaks or is attacked
- You can sleep at night when this thing runs in production

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial human-centered requirements |