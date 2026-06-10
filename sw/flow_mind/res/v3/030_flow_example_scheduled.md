```yaml
title: 'Example Flow: Scheduled Task'
tags:
- flow_mind
- flow
- example
- timer
- scheduled
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-10
summary: 'Example flow demonstrating timer signal handling with hours and days units.'
extends: flow_base_v2
```

```yaml
flow:
  id: scheduled_task
  name: "Scheduled Task Runner"
  extends: flow_base_v2
  start_state: waiting
  states:
    - name: waiting
      on_enter:
        - log: "Setting up long-running timer"
        - schedule: 
            signal: timer
            delay: 1
            unit: days
      transitions:
        - to: remind
          when: timer
    - name: remind
      on_enter:
        - log: "Daily task execution"
        - notify: "Running scheduled maintenance"
      transitions:
        - to: complete
          when: always
    - name: complete
      on_enter:
        - log: "Scheduled task complete"
```