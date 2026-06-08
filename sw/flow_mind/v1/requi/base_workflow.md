```yaml
title: 'Base Flow Template'
tags:
- flow_mind
- flow
- base
- template
- state_machine
persona: developer
status: active
version: V00.01.00
updated: 2026-06-08
summary: 'Base flow template for creating state machine flows.'
```

```yaml
workflow:
  id: base_flow
  name: "Base"
  type: flow
  on_enter:
  - log: "{flow.type} {flow.name} entered state {state.name}"
  start_state: init
  states:
    - name: init
    - name: start
      transitions:
        - to: complete
          when: always
    - name: complete
```