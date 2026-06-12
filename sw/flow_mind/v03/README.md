```yaml
title: 'Flow Mind v3 Overview'
tags:
- flow_mind
- overview
- v3
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Flow Mind v3 - Deterministic flow simulation engine.'
```

# Flow Mind v3

## Purpose

Flow Mind v3 is a **deterministic flow simulation engine** that executes flow definitions from `sw/flow_mind/res/` directory.

## Features

- Flow loading and validation
- Flow inheritance (extends)
- Signal handling (user_input, guard_check, timer, external_event, error)
- Conditional transitions with guards
- Sequential execution
- Structured logging and tracing
- Optional in-memory snapshots for debugging

## Key Differences from v2

| Feature | v2 | v3 |
|---------|-----|-----|
| State | Persistent per instance | Stateless (snapshots optional) |
| Concurrency | Single flow | Multiple independent flows |
| Parallel states | Yes | No |
| Signal types | user_input, guard_check | + timer, external_event, error |
| Versioning | N/A | File system |

## Directory Structure

```
sw/flow_mind/v3/
├── docs/           # Design documentation
│   └── 010_design_engine.md
├── requi/          # Requirements
│   ├── 010_requi_flow_loading.md
│   ├── 020_requi_signal_handling.md
│   ├── 030_requi_state_transitions.md
│   ├── 040_requi_simulation_execution.md
│   └── 050_requi_logging_observability.md
└── res/            # Flow definitions (extend v2 base)
    ├── 020_flow_example_timer.md
    ├── 030_flow_example_webhook.md
    ├── 040_flow_example_error.md
    └── 050_flow_example_simple_plan.md
```

## Resources

Flow definitions are in `sw/flow_mind/res/v3/` - see examples in that directory.

## Requirements

| Area | File | Description |
|------|------|-------------|
| Flow Loading | [requi/010_requi_flow_loading.md](requi/010_requi_flow_loading.md) | Load and validate flow definitions |
| Signal Handling | [requi/020_requi_signal_handling.md](requi/020_requi_signal_handling.md) | Signal emission and handling |
| State Transitions | [requi/030_requi_state_transitions.md](requi/030_requi_state_transitions.md) | Transition evaluation |
| Simulation Execution | [requi/040_requi_simulation_execution.md](requi/040_requi_simulation_execution.md) | Execution engine |
| Logging & Observability | [requi/050_requi_logging_observability.md](requi/050_requi_logging_observability.md) | Structured logging |

## Examples

Flow definitions in `sw/flow_mind/res/v3/` extend v2 base template:

| File | Description |
|------|-------------|
| [020_flow_example_timer.md](res/v3/020_flow_example_timer.md) | Timer signal handling |
| [030_flow_example_webhook.md](res/v3/030_flow_example_webhook.md) | External event handling |
| [040_flow_example_error.md](res/v3/040_flow_example_error.md) | Error recovery patterns |
| [050_flow_example_simple_plan.md](res/v3/050_flow_example_simple_plan.md) | Simple plan execution |

## See Also

- [Design Document](docs/010_design_engine.md)