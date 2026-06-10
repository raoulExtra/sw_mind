```yaml
title: 'README: Flow Mind v2 - Context and Guards'
tags:
- flow_mind
- v2
- context
- guards
- signals
persona: developer
status: active
version: V00.08.00
updated: 2026-06-10
summary: 'Context management and guard evaluation for flow execution.'
change: 'Replaced agent with executor terminology; fixed exec.sh argument format'
```

# Flow Mind v2

## Overview

Flow Mind v2 extends v1 with context management, signal handling, and guard evaluation.

## Context Management

**Context** = persistent data across states. It is a JSON-serializable key-value store accessible from all states.

### Context Entity
- `FlowContext`: `{ [key: string]: any }` - stores cross-state data

### Operations
| Function | Purpose |
|----------|---------|
| `createEmptyContext()` | Create empty context object |
| `getContext(ctx, key)` | Read value by key |
| `setContext(ctx, key, value)` | Set single key (immutable) |
| `updateContext(ctx, updates)` | Merge multiple key-values (immutable) |

### Guard Evaluation Syntax
Guards evaluate conditions against context:

```typescript
evaluateGuardWithContext(context, 'score >= 80')  // returns boolean
```

Supported operators: `==`, `!=`, `>`, `<`, `>=`, `<=`

### Signal Payload Integration
Signals carry payloads that update context on arrival:

```yaml
signals:
  - name: guard_check
    schema:
      type: object
      properties:
        approved:
          type: boolean
        reason:
          type: string
```

### Core Link
**State ↔ Context**: States transition based on context values evaluated through guards.

### Shell Executor Invocation
When an action specifies an `executor` (e.g., `generate_plan`), use `--shell` to invoke `exec.sh` with the split name:

```bash
flow run my_flow --shell ./exec.sh --executor generate_plan
# Calls: ./exec.sh generate_plan generate plan
```

See also: `sw/flow_mind/v2/requi/060_requi_shell_executor_invocation.md`

## Related

- v1: Core flow engine (`sw/flow_mind/v1/`)
- v3: Flow simulation (`sw/flow_mind/v3/`)
