```yaml
title: 'Example Flow: External Event Handler'
tags:
- flow_mind
- flow
- example
- external_event
- webhook
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-10
summary: 'Example flow demonstrating external_event signal handling in Flow Mind v3.'
extends: ../v2/010_flow_base
```
See also: [Base Flow Template](../v2/010_flow_base.md)

```yaml
flow:
  id: webhook_handler
  name: "External Event Handler"
  start_state: listening
  states:
    - name: listening
      on_enter:
        - log: "Listening for webhook events"
        - subscribe:
            event: webhook_received
      transitions:
        - to: process
          when: external_event
    - name: process
      on_enter:
        - log: "Processing webhook data"
        - transform: 
            input: webhook_data
      transitions:
        - to: complete
          when: success
        - to: error_state
          when: failure
    - name: error_state
      on_enter:
        - log: "Error processing webhook"
        - emit:
            signal: error
            message: "Webhook processing failed"
      transitions:
        - to: complete
          when: always
    - name: complete
      on_enter:
        - log: "Webhook handler complete"
```