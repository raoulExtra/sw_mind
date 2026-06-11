```yaml
title: 'Requirements: Flow Mind v2 Readable Flow State Model'
tags:
- flow_mind
- requirements
- state_model
- readable
- states
- transitions
- guards
- actions
- v2
persona: product_manager
status: active
version: V00.03.00
updated: 2026-06-10
requi_id: REQUI-FM-V2-050
summary: 'A clean, human-readable machine model for Flow Mind flows.'
change: 'Replaced executor with executor'
```

# Readable Flow State Model

> Version: V00.01.00

## Overview

Statecharts provide formal semantics that humans can understand.

## Core Entities

| Entity | Description |
|--------|-------------|
| **Flow** | Top-level orchestrated behavior |
| **State** | Condition of the system at a given point in time |
| **Transition** | Directed edge between states with optional Guard |
| **Signal** | External or internal event that triggers transitions |
| **Guard** | Condition that must be true for transition to fire |
| **Action** | Unit of work executed during state lifecycle |

## Formal Semantics

### Deterministic

Given a current state and an event, the next state is uniquely determined. No ambiguity in execution.

### Visualizable

Statecharts can be rendered as diagrams, making complex flows immediately understandable.

### Explainable

Each transition and action can be traced back to specific events and conditions, enabling clear audit trails.

### Predictable

The behavior of the entire system can be predicted by analyzing the state machine definition.

## Flow Schema

```yaml
flow:
  id: string
  name: string
  start_state: string
  states:
    - name: string
      on_enter: [action]
      on_exit: [action]
      transitions:
        - to: string
          when: string
          guard: {condition: expr, else: string}
          actions: [action]
```

## States

States represent the condition of the system at a given point in time. Each state has:

- **name**: Unique identifier
- **on_enter**: Actions executed when entering the state
- **on_exit**: Actions executed when leaving the state

```yaml
flow:
  states:
    - name: idle
      on_enter:
        - log: "Entering idle state"
      on_exit:
        - log: "Exiting idle state"
```

## Transitions

Transitions define how the system moves from one state to another.

- **from**: Source state (optional, defaults to current state)
- **to**: Target state
- **when**: Event that triggers the transition
- **actions**: Actions to execute during transition

```yaml
transitions:
  - from: idle
    to: processing
    when: start
    actions:
      - log: "Starting processing"
```

## Guards

Guards are conditions that determine whether a transition is allowed.

- **condition**: Boolean expression
- **else**: Target state if condition is false

```yaml
transitions:
  - to: approved
    when: review_complete
    guard:
      condition: score >= 80
      else: rejected
```

## Actions

Actions are units of work executed during state lifecycle.

- **type**: log, http, agent, custom
- **payload**: Action-specific data

```yaml
actions:
  - log: "Processing started"
  - executor: generate_plan
  - http:
      method: POST
      url: /api/process
```

## Nested Logic

States can contain nested sub-states for hierarchical modeling.

```yaml
states:
  - name: processing
    substates:
      - name: validating
      - name: transforming
      - name: saving
```

## Parallel Logic

Multiple states can execute in parallel.

```yaml
states:
  - name: processing
    parallel:
      - name: validate_input
      - name: fetch_data
      - name: prepare_output
```

## Functional Requirements

- [x] **FR-FM-V2-21** Flow definition with states, transitions, and guards
  - *Acceptance*: YAML file defines flow with at least 3 states and 2 transitions
- [x] **FR-FM-V2-22** State representation with encapsulated data and transitions
  - *Acceptance*: State includes data fields and list of valid next states
- [x] **FR-FM-V2-23** Guard condition evaluation
  - *Acceptance*: Guards evaluate boolean expressions against context

## Test

- [x] **TEST-FM-V2-21** Unit tests for flow definition parsing
- [x] **TEST-FM-V2-22** Unit tests for state representation
- [x] **TEST-FM-V2-23** Unit tests for guard evaluation

## See Also

- Flow Mind v2 Requirements Index: `sw/flow_mind/v2/requi/index.md`
- Context Management: `sw/flow_mind/v2/requi/010_requi_context.md`
- User Input: `sw/flow_mind/v2/requi/030_requi_user_input.md`
- CLI Commands: `sw/flow_mind/v2/requi/020_requi_cli_commands.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial readable flow state model requirements |
| V00.02.00 | 2026-06-10 | ai(kilo laguna) | Implemented all requirements and tests |
| V00.03.00 | 2026-06-10 | ai(kilo laguna) | Replaced executor with executor