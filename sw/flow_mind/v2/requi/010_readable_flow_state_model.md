```yaml
title: 'Readable Flow State Model'
tags:
- flow_mind
- state_model
- readable
- states
- transitions
- guards
- actions
persona: product_manager
status: active
version: V00.01.00
updated: 2026-06-08
summary: 'A clean, human-readable machine model for Flow Mind flows.'
```

# Readable Flow State Model

## Formal Semantics

Statecharts provide formal semantics that humans can understand:

### Deterministic

Given a current state and an event, the next state is uniquely determined. No ambiguity in execution.

### Visualizable

Statecharts can be rendered as diagrams, making complex flows immediately understandable.

### Explainable

Each transition and action can be traced back to specific events and conditions, enabling clear audit trails.

### Predictable

The behavior of the entire system can be predicted by analyzing the state machine definition.

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

- **type**: log, http, agent, verifier, custom
- **payload**: Action-specific data

```yaml
actions:
  - log: "Processing started"
  - agent: generate_plan
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

## Structure

This document serves as an index for the v2 requirements:

| Document | Description |
|----------|-------------|
| `020_requi_ulid_creation.md` | ULID creation specifications for user inputs |