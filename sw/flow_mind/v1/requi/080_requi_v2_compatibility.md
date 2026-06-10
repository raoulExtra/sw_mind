```yaml
title: 'Requirements: Flow Mind v1 v2 Compatibility Layer'
tags:
- flow_mind
- requirements
- v2-compatibility
- interfaces
- v1
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Interface adaptations in v1 to enable v2 reuse and extension.'
```

# Requirements: Flow Mind v1 v2 Compatibility Layer

> Version: V00.01.00
> v1: V00.09.00
> v2: V00.00.00 (initial)

## Overview

Adapt v1 interfaces to enable clean reuse by v2 while maintaining backward compatibility.

## Functional Requirements

### Interface Adaptations

- [x] **FR-FM-V1-20** Action interface with extension point
  ```typescript
  export interface Action {
    log?: string;
    agent?: string;
    http?: { method: string; url: string; body?: any };
    // v2 extension: type?: string
  }
  ```

- [x] **FR-FM-V1-21** Guard interface with extension point
  ```typescript
  export interface Guard {
    condition: string;
    else?: string;
    // v2 extension: compiled?: (ctx) => boolean
  }
  ```

- [x] **FR-FM-V1-22** Transition with signal and optional guard/actions
  ```typescript
  export interface Transition {
    to: string;
    on?: string;          // signal trigger
    when?: string;        // deprecated: use guard instead
    guard?: Guard;
    actions?: Action[];
  }
  ```

- [x] **FR-FM-V1-23** StateDef with optional transitions and exit actions
  ```typescript
  export interface StateDef {
    name: string;
    on_enter?: Action[];
    on_exit?: Action[];
    transitions?: Transition[];
  }
  ```

### Backward Compatibility

- [x] **FR-FM-V1-24** String → Action auto-conversion
  - YAML: `on_enter: ["hello"]` → `[{ log: "hello" }]`

- [x] **FR-FM-V1-25** Guard array handling
  - If `guard: [{ condition: "x" }]` → use first element

- [x] **FR-FM-V1-26** Optional transitions for terminal states
  - `transitions?: Transition[]` allows empty terminal states

- [x] **FR-FM-V1-27** Core persistence in v1
  - `createState`, `saveState`, `loadState` remain in v1
  - v2 duplicates these functions for standalone operation

## Test

- [x] **TEST-FM-V1-20** Unit tests for Action interface
- [x] **TEST-FM-V1-21** Unit tests for Guard interface  
- [x] **TEST-FM-V1-22** Unit tests for Transition with signal/guard
- [x] **TEST-FM-V1-23** Unit tests for StateDef with on_exit
- [x] **TEST-FM-V1-24** String-to-Action auto-conversion tests
- [x] **TEST-FM-V1-25** v2 compiles successfully with v1 interfaces

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial compatibility requirements |