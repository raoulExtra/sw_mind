```yaml
title: 'Requirements: Flow Mind v2 CLI Commands'
tags:
- flow_mind
- requirements
- cli
- v2
- commands
persona: developer
status: draft
version: V00.02.00
updated: 2026-06-09
summary: 'CLI commands for Flow Mind v2 flow evaluation, simulation, and state management.'
```

# Requirements: Flow Mind v2 CLI Commands

> Version: V00.01.00

## Overview

CLI commands for Flow Mind v2 that support guard evaluation, flow execution, state simulation, and transition computation.

## Functional Requirements

### Flow Loading

- [ ] **REQ-CLI-01** Load flow definition from file or path
  - *Acceptance*: `flow load <path>` loads and validates flow YAML

### Guard Evaluation

- [ ] **REQ-CLI-02** Evaluate guards against context
  - *Acceptance*: `flow eval-guard <flow> <guard>` returns true/false
  - *Example*: `flow eval-guard my_flow "x > 5"`

### Flow Execution

- [ ] **REQ-CLI-03** Run flow with signal input
  - *Acceptance*: `flow run <flow> --signal <name> --payload <json>` executes flow
  - *Example*: `flow run my_flow --signal user_input --payload '{"value": "start"}'`

### State Management

- [ ] **REQ-CLI-04** Show next state given current state and signal
  - *Acceptance*: `flow next-state <flow> <state> --signal <name>` shows next state
  - *Example*: `flow next-state my_flow init --signal user_input`

### Transition Simulation

- [ ] **REQ-CLI-05** Simulate transition execution
  - *Acceptance*: `flow simulate <flow> <transition>` shows simulation result
  - *Example*: `flow simulate my_flow transition_1`

## CLI Syntax

```
flow <command> [options]

Commands:
  load <path>           Load flow from file
  eval-guard <flow> <guard>   Evaluate guard condition
  run <flow>            Run flow with signal
  next-state <flow> <state>  Show next state
  simulate <flow> <transition>  Simulate transition
```

## Examples

### Evaluate a guard
```bash
flow eval-guard my_flow "input.value == 'start'"
# Output: true
```

### Run a flow with signal
```bash
flow run my_flow --signal user_input --payload '{"value": "start"}'
# Output: Flow completed, next state: processing
```

### Show next state
```bash
flow next-state my_flow init --signal user_input
# Output: next_state: processing
```

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial CLI command requirements |
| V00.02.00 | 2026-06-09 | ai(kilo laguna) | Renamed from 010 to 040 per convention |