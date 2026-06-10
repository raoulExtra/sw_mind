```yaml
title: 'Requirements: Flow Mind v2 CLI Commands'
tags:
- flow_mind
- requirements
- cli
- v2
- commands
persona: developer
status: active
version: V00.06.00
updated: 2026-06-10
summary: 'CLI commands for Flow Mind v2 flow evaluation, simulation, state management, shell script execution, and shell executor invocation.'
change: 'Replaced agent with executor terminology'
```
# Requirements: Flow Mind v2 CLI Commands

> Version: V00.04.00

## Overview

CLI commands for Flow Mind v2 that support guard evaluation, flow execution, state simulation, transition computation, and shell script execution.

## Core Entities

| Entity | Description |
|--------|-------------|
| **CLI** | Command-line interface for flow operations |
| **Flow** | State machine definition |
| **Guard** | Condition for transition |
| **Signal** | Event that triggers transition |
| **Shell** | External script executed instead of agent |

## Functional Requirements

### Flow Loading

- [x] **FR-FM-V2-31** Load flow definition from file or path
  - *Acceptance*: `flow load <path>` loads and validates flow YAML
  - *Acceptance*: Returns error for invalid YAML or missing file

### Guard Evaluation

- [x] **FR-FM-V2-32** Evaluate guards against context
  - *Acceptance*: `flow eval-guard <flow> <guard>` returns true/false
  - *Acceptance*: Supports comparison operators: ==, !=, >, <, >=, <=
  - *Example*: `flow eval-guard my_flow "x > 5"`

### Flow Execution

- [x] **FR-FM-V2-33** Run flow with signal input
  - *Acceptance*: `flow run <flow> --signal <name> --payload <json>` executes flow
  - *Acceptance*: Returns error for invalid signal or payload
  - *Example*: `flow run my_flow --signal user_input --payload '{"value": "start"}'`

### State Management

- [x] **FR-FM-V2-34** Show next state given current state and signal
  - *Acceptance*: `flow next-state <flow> <state> --signal <name>` shows next state
  - *Acceptance*: Returns error for invalid state or signal
  - *Example*: `flow next-state my_flow init --signal user_input`

### Transition Simulation

- [x] **FR-FM-V2-35** Simulate transition execution
  - *Acceptance*: `flow simulate <flow> <transition>` shows simulation result
  - *Acceptance*: Returns error for invalid transition

### Shell Execution

- [x] **FR-FM-V2-36** Run flow with shell script instead of agent
  - *Acceptance*: `flow run <flow> --shell <path>` executes shell script
  - *Acceptance*: Shell script receives flow state as JSON input
  - *Acceptance*: Returns error for invalid shell script path
  - *Example*: `flow run my_flow --shell ./my_script.sh`

- [x] **FR-FM-V2-61** Split executor name on underscore
  - *Acceptance*: `generate_plan` becomes `generate plan`
  - *Acceptance*: `verify_output` becomes `verify output`

- [x] **FR-FM-V2-62** Invoke exec.sh with split executor name
  - *Acceptance*: `flow run <flow> --shell ./exec.sh --executor generate_plan` calls `./exec.sh generate plan`
  - *Acceptance*: Shell script receives split name as positional arguments

- [x] **FR-FM-V2-63** Pass flow context to shell
  - *Acceptance*: Context is passed as JSON argument or environment variable

## Test

- [x] **TEST-FM-V2-31** Unit tests for flow loading
- [x] **TEST-FM-V2-32** Unit tests for guard evaluation
- [x] **TEST-FM-V2-33** Unit tests for flow execution
- [x] **TEST-FM-V2-34** Unit tests for state management
- [x] **TEST-FM-V2-35** Unit tests for transition simulation
- [x] **TEST-FM-V2-36** Unit tests for shell execution
- [x] **TEST-FM-V2-61** Unit tests for agent name splitting
- [x] **TEST-FM-V2-62** Unit tests for exec.sh invocation

## See Also

- Readable Flow State Model: `sw/flow_mind/v2/requi/050_readable_flow_state_model.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial CLI command requirements |
| V00.02.00 | 2026-06-10 | ai(kilo laguna) | Unified FR/TEST IDs to FR-FM-V2-XX scheme |
| V00.03.00 | 2026-06-10 | ai(kilo laguna) | Implemented all requirements and tests |
| V00.04.00 | 2026-06-10 | ai(kilo laguna) | Added --shell CLI argument for shell script execution |
| V00.05.00 | 2026-06-10 | ai(kilo laguna) | Added shell agent invocation requirements (FR-FM-V2-61/62/63) |
| V00.06.00 | 2026-06-10 | ai(kilo laguna) | Replaced agent with executor terminology |