```yaml
title: 'Flow Base Template'
tags:
- flow_mind
- flow
- base
- template
persona: developer
status: active
version: V00.01.00
updated: 2026-06-08
summary: 'Base template for flow definitions in Flow Mind v1.'
```

# Flow Base Template

This template defines the structure for flow definitions in Flow Mind v1.

## Structure

A flow consists of:
- `id`: Unique identifier
- `name`: Human-readable name
- `start_state`: Initial state name
- `states`: List of state definitions

## State Definition

Each state has:
- `name`: State identifier
- `on_enter`: Actions to execute on entry
- `transitions`: Possible state transitions