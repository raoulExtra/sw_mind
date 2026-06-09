```yaml
title: 'Example Flow: Simple Plan Execution'
tags:
- flow_mind
- flow
- example
- state_machine
- simple_plan
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-08
summary: 'Example flow demonstrating basic state machine with plan, verify, and complete states.'
extends: 010_flow_base
```

See also: [Base Flow Template](./010_flow_base.md)

```yaml
flow:
  id: simple_plan
  name: "Simple Plan Execution"
  start_state: init
  states:
    - name: init
      on_enter:
        - log: "Starting flow"
      transitions:
        - to: plan
          when: always
    - name: plan
      on_enter:
        - agent: generate_plan
      transitions:
        - to: verify
          when: plan_ready
    - name: verify
      on_enter:
        - verifier: validate_plan
      transitions:
        - to: complete
          when: plan_valid
        - to: plan
          when: plan_invalid
    - name: complete
      on_enter:
        - log: "Flow complete"
```