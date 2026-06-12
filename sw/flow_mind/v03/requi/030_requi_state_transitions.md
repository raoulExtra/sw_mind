```yaml
title: 'Requirements: State Transitions'
tags:
- flow_mind
- requirements
- v3
- state_transitions
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
requi_id: REQUI-FM-V3-STATE-001
summary: 'Requirements for state transition evaluation and management.'
see_also:
- sw/flow_mind/res/v3/
```

# State Transitions Requirements

## Overview

Requirements for state transition evaluation and management in flow simulation.

## Functional Requirements

- [ ] **FR-FM-V3-STATE-01** Must evaluate conditional transitions with `when` clauses
  - *Acceptance*: `equals` guard condition works correctly
- [ ] **FR-FM-V3-STATE-02** Must support default transitions without conditions
  - *Acceptance*: Transition fires when no conditional matches
- [ ] **FR-FM-V3-STATE-03** Must track current state and emit state change events
  - *Acceptance*: `on_enter`, `on_to` hooks are invoked