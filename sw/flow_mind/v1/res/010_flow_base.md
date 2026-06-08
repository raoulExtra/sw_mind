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
  default:
    - on_enter:
      - log: "{flow.type} {flow.name} entered state {state.name}"
    - on_to:
      - when: always
  start_state: init
  states:
    - name: trigger
      transitions:
        - to: start
    - name: start
      transitions:
        - to: complete          
    - name: complete
```