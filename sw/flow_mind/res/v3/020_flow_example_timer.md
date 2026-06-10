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
extends: ../v2/010_flow_base.md
```
See also: [Base Flow Template](../v2/010_flow_base.md)

```yaml
flow:
  id: reminder
  name: "Timer-Based Reminder"
  start_state: waiting
  extends: flow_base_v2
  states:
    - name: waiting
      on_enter:
        - log: "Setting up timer"
        - schedule: 
            signal: timer
            delay: 60
            unit: seconds
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

## Timer Units

| Unit | Description | Example |
|------|-------------|---------|
| `seconds` | Default unit | `delay: 60` or `delay: 60, unit: seconds` |
| `minutes` | Minutes | `delay: 5, unit: minutes` |
| `hours` | Hours | `delay: 2, unit: hours` |
| `days` | Days | `delay: 1, unit: days` |