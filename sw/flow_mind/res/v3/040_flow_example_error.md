```yaml
title: 'Example Flow: Error Recovery'
tags:
- flow_mind
- flow
- example
- error
- recovery
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-10
summary: 'Example flow demonstrating error signal handling and recovery in Flow Mind v3.'
extends: ../v2/010_flow_base
```
See also: [Base Flow Template](../v2/010_flow_base.md)

```yaml
flow:
  id: error_recovery
  name: "Error Recovery Flow"
  extends: flow_base_v2
  start_state: start
  states:
    - name: start
      on_enter:
        - log: "Starting error recovery demo"
      transitions:
        - to: risky_operation
          when: always
    - name: risky_operation
      on_enter:
        - attempt: 
            operation: "risky_task"
            max_retries: 3
      transitions:
        - to: success
          when: success
        - to: error_state
          when: error
    - name: error_state
      on_enter:
        - log: "Operation failed, emitting error"
        - emit:
            signal: error
            details:
              message: "Operation failed after retries"
              attempt: 3
      transitions:
        - to: handle_error
          when: error
    - name: handle_error
      on_enter:
        - log: "Handling error gracefully"
        - notify:
            type: "error_alert"
            message: "Operation failed, recovery initiated"
      transitions:
        - to: complete
          when: always
    - name: success
      on_enter:
        - log: "Operation succeeded"
      transitions:
        - to: complete
          when: always
    - name: complete
      on_enter:
        - log: "Error recovery flow complete"
```