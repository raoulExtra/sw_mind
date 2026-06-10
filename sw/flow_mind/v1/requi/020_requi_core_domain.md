```yaml
title: 'Requirements: Flow Mind v1 Core Domain Model'
tags:
- flow_mind
- requirements
- oo
- core-domain
- v1
persona: kilo_extension
status: active
version: V00.06.00
updated: 2026-06-08
summary: 'Core domain model specifications for Flow Mind v1 flow engine.'
```

# Requirements: Flow Mind v1 Core Domain Model

> Version: V00.02.00

## Overview

Core domain model specifications for Flow Mind v1 components. These can be simulated via text-based flows.

## Core Entities

| Entity | Description |
|--------|-------------|
| **Flow** | Top-level orchestrated behavior |
| **State** | Stable point in the flow |
| **Transition** | Directed edge between states with optional Guard |
| **Signal** | External or internal event that triggers transitions |
| **Payload** | Data carried by a signal |
| **Guard** | Condition that must be true for transition to fire (part of Transition) |
| **Context** | Flow's internal state (optional for v1) |

**Design Decision**: Guard is inseparable from Transition. A transition answers: "When this signal arrives in this state, should we move to that next state?" The guard answers the sub-question: "Under what conditions is this transition allowed?"

## Functional Requirements

### CLI Requirements

- [ ] **FR-FM-OO-06** CLI must support `--help` and `--version` arguments
  - *Acceptance*: Derived from [CLI Standards](sw/cli_base/v1/requi/010_requi_cli_standards.md#requirements-cli-standards)
  - *Acceptance*: `--help` displays usage, `--version` shows program version
- [ ] **FR-FM-OO-07** CLI must support `--examples` argument
  - *Acceptance*: Derived from [CLI Standards](sw/cli_base/v1/requi/010_requi_cli_standards.md#requirements-cli-standards)
  - *Acceptance*: Displays usage examples and exits with code 0

### Core Domain Model
- [ ] **FR-FM-OO-01** Flow definition with states, transitions, and permissions
  - *Acceptance*: YAML file defines flow with at least 3 states and 2 transitions
- [ ] **FR-FM-OO-02** Executor capability specification with ambiguity handling
  - *Acceptance*: Executor config specifies max ambiguity threshold (0.0-1.0)
- [ ] **FR-FM-OO-03** Verifier rule definitions with validation criteria
  - *Acceptance*: Each verifier rule has named criteria and expected result type
- [ ] **FR-FM-OO-04** State representation with encapsulated data and transitions
  - *Acceptance*: State includes data fields and list of valid next states
- [ ] **FR-FM-OO-05** Artifact classes for plans, outputs, and verification results
  - *Acceptance*: Each artifact type has defined schema with required fields

## Test

- [ ] **TEST-FM-OO-01** Unit tests for flow definition parsing and validation
- [ ] **TEST-FM-OO-02** Unit tests for executor capability specification validation
- [ ] **TEST-FM-OO-03** Unit tests for verifier rule definitions
- [ ] **TEST-FM-OO-04** Unit tests for state representation and transitions
- [ ] **TEST-FM-OO-05** Unit tests for artifact class schemas
- [ ] **TEST-FM-OO-06** CLI tests for `--help` and `--version` arguments
- [ ] **TEST-FM-OO-07** CLI tests for `--examples` argument

## See Also

- Flow Base: `sw/flow_mind/res/v1/010_flow_base.md`
- Flow with User: `sw/flow_mind/res/v1/020_flow_base_with_user.md`
- Flow with Guard: `sw/flow_mind/res/v1/030_flow_with_guard_value.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-08 | ai(kilo laguna) | Initial core domain model requirements |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Added acceptance criteria |
| V00.03.00 | 2026-06-08 | ai(kilo laguna) | Added Test chapter per convention |
| V00.04.00 | 2026-06-09 | ai(kilo laguna) | Added core entities table |
| V00.05.00 | 2026-06-09 | ai(kilo laguna) | Guard is inseparable from Transition |
| V00.06.00 | 2026-06-09 | ai(kilo laguna) | Added See Also with clickable links to v1 flows |
| V00.07.00 | 2026-06-09 | ai(kilo laguna) | Added CLI requirements derived from cli_base standards |