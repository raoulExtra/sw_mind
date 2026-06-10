```yaml
title: 'Requirements: Flow Mind v2 Core Architecture'
tags:
- flow_mind
- requirements
- architecture
- v2
persona: architect
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Core architecture requirements for Flow Mind v2 multi-agent orchestration.'
```

# Requirements: Flow Mind v2 Core Architecture

> Version: V00.01.00
> Related: v1 compatibility in `sw/flow_mind/v1/requi/080_requi_v2_compatibility.md`

## Overview

v2 architecture builds upon v1 interfaces while adding multi-agent orchestration capabilities.

## Design Decisions

### Interface Alignment with v1

v2 interfaces are aligned with v1 to enable potential future reuse:

- `Action`, `Guard`, `Transition`, `StateDef`, `FlowDef` share compatible structures
- v1's `Action[]` on_enter/on_exit aligns with v2's structured actions
- v1's `Guard` interface aligns with v2's declarative guards

### Current Implementation Status

**v2 currently duplicates v1 interfaces and functions.** To enable v2 to import from v1:

1. Publish v1 as `@flow-mind/v1` npm package
2. Add to v2's `dependencies`: `"@flow-mind/v1": "^1.0.0"`
3. Update v2 imports to use v1 exports
4. Configure tsconfig paths if needed

### Future Architecture

```
v1 (@flow-mind/v1)
  └── Core interfaces + persistence functions
       ↑ import
v2 (flow-mind-v2)
  └── Extends v1 interfaces
  └── Adds: FlowContext, evaluateGuard, parseFlowFile, etc.
```