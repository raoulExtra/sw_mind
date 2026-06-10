```yaml
title: 'Example Flow: Timer-Based Reminder'
tags:
- flow_mind
- flow
- example
- timer
- reminder
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-10
summary: 'Example flow demonstrating timer signal handling in Flow Mind v3.'
extends: ../v2/010_flow_base
```
See also: [Base Flow Template](../v2/010_flow_base.md)

```yaml
flow:
  id: reminder
  name: "Timer-Based Reminder"
  start_state: waiting
  states:
    - name: waiting
      on_enter:
        - log: "Setting up timer"
        - schedule: 
            signal: timer
            delay: 60
      transitions:
        - to: remind
          when: timer
    - name: remind
      on_enter:
        - log: "Time to send reminder"
        - notify: "Reminder: Complete your task"
      transitions:
        - to: complete
          when: always
    - name: complete
      on_enter:
        - log: "Reminder flow complete"
```