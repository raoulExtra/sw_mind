```yaml
title: 'Requirements: Context Management'
tags:
- flow_mind
- requirements
- context
- v2
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-10
requi_id: REQUI-FM-V2-011
summary: 'Specifications for context management across flow states.'
```

# Requirements: Context Management

> Version: V00.01.00

## Overview

Context is the data that persists across states.

- **State** = "where the flow is"
- **Context** = "what the flow knows so far"

The strongest conceptual link is: **State ↔ Context**

## Core Entities

| Entity | Description |
|--------|-------------|
| **Context** | Data that persists across states |
| **Transition** | Reads or updates Context |
| **Guard** | May check Context for eligibility |
| **Signal** | May carry payloads that update Context |

## Functional Requirements

- [x] **FR-FM-V2-11** Context storage for cross-state data
  - *Acceptance*: Context stores key-value pairs accessible from all states
  - *Acceptance*: Context is JSON-serializable
- [x] **FR-FM-V2-12** Transition-based Context read/write
  - *Acceptance*: Transitions can read from and write to Context
- [x] **FR-FM-V2-13** Guard-based Context evaluation
  - *Acceptance*: Guards can evaluate Context values for transition eligibility
- [x] **FR-FM-V2-14** Signal payload Context integration
  - *Acceptance*: Signal payloads can update Context on arrival

## Test

- [x] **TEST-FM-V2-11** Unit tests for Context storage and retrieval
- [x] **TEST-FM-V2-12** Unit tests for Transition Context operations
- [x] **TEST-FM-V2-13** Unit tests for Guard Context evaluation
- [x] **TEST-FM-V2-14** Unit tests for Signal payload Context integration

## See Also

- User Input Handling: `sw/flow_mind/v2/requi/030_requi_user_input.md`
- Readable Flow State Model: `sw/flow_mind/v2/requi/050_readable_flow_state_model.md`
- Shell Executor Invocation: `sw/flow_mind/v2/requi/060_requi_shell_executor_invocation.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial context requirements |
| V00.02.00 | 2026-06-10 | ai(kilo laguna) | Implemented all requirements and tests |
| V00.03.00 | 2026-06-10 | ai(kilo laguna) | Refined context management definition and syntax |
| V00.04.00 | 2026-06-10 | ai(kilo laguna) | Added shell agent invocation reference |