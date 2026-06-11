```yaml
title: 'Flow Mind v3 Engine Design'
tags:
- flow_mind
- design
- v3
- architecture
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Design document for Flow Mind v3 simulation engine.'
```

# Flow Mind v3 Engine Design

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  Flow Mind v3 Engine                      │
├─────────────────────────────────────────────────────────┤
│  Flow Loader     │  Signal Handler   │  State Manager   │
│  - Parse MD      │  - Emit/Handle    │  - Track state   │
│  - Validate      │  - Schema check   │  - Events        │
│  - Inherit       │  - Error signal   │  - Snapshots     │
├─────────────────────────────────────────────────────────┤
│              Execution Engine                              │
│  - Sequential transitions                                │
│  - Conditional guards (when/equals)                       │
│  - Built-in handlers (log, emit, agent, executor)         │
├─────────────────────────────────────────────────────────┤
│              Output & Observability                      │
│  - Structured logs (JSON)                                 │
│  - Debug tracing                                        │
│  - Error signals                                        │
└─────────────────────────────────────────────────────────┘
```

## Key Design Decisions

### Stateless by Default
- Engine maintains no persistent state between runs
- Optional in-memory snapshots for debugging
- Durable storage (v4+): file system or database

### Signal Types
- `user_input` - External user-provided input
- `guard_check` - Conditional transition evaluation
- `timer` - Time-based triggers
- `external_event` - System/integration events
- `error` - Failure notifications

### Inheritance Model
- **Deep merge** semantics
- Child can override individual states/transitions
- Parent states preserved unless explicitly replaced

### Execution Model
- **Sequential only** - no parallel state execution
- Multiple independent flow instances
- Shared-nothing architecture

## Integration with v2

- Reuse v2 parsing rules
- Reuse v2 validation logic
- Reuse v2 schema definitions
- Extend with v3 features

## See Also

- Requirements: `sw/flow_mind/v3/requi/010_requi_flow_loading.md`
- Example Flow: `sw/flow_mind/res/v3/050_flow_example_simple_plan.md`
- Timer Example: `sw/flow_mind/res/v3/020_flow_example_timer.md`
- Webhook Example: `sw/flow_mind/res/v3/030_flow_example_webhook.md`
- Error Example: `sw/flow_mind/res/v3/040_flow_example_error.md`