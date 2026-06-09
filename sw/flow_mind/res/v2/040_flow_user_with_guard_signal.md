```yaml
title: 'Flow with User and Guard'
tags:
- flow_mind
- flow
- user
- guard
- state_machine
- template
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-09
summary: 'Flow template with user input and conditional guards.'
```

```yaml
flow:
  id: flow_with_user_guard_signal
  name: "Flow with User and Guard"
  type: flow
  extends: base_flow_with_user
  signals:
    - name: guard_check
      description: "Guard condition to control flow transitions"
      schema:
        type: object
        properties:
          approved:
            type: boolean
          reason:
            type: string
  states:
    - name: init
      transitions:
        - to: validate_input
          on: user_input
    - name: validate_input
      transitions:
        - to: check_guard
          when: input_valid
        - to: complete
          when: input_invalid
    - name: check_guard
      on_enter:
        - emit: guard_check
      transitions:
        - to: process_approved
          when: guard_approved
        - to: complete
          when: guard_denied
    - name: process_approved
      on_enter:
        - log: "Processing approved flow"
      transitions:
        - to: complete
```