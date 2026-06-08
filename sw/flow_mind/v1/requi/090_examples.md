```yaml
title: 'Examples: Flow Mind v1 Workflows'
tags:
- flow_mind
- examples
- workflows
- v1
persona: kilo_extension
status: active
version: V00.02.00
updated: 2026-06-08
summary: 'Example YAML workflows for Flow Mind v1 simulation.'
```

# Examples: Flow Mind v1 Workflows

> Version: V00.02.00

## Example Workflow: Simple Plan Execution

### Workflow Definition (YAML)

```yaml
workflow:
  id: simple_plan
  name: "Simple Plan Execution"
  start_state: init
  states:
    - name: init
      on_enter:
        - log: "Starting workflow"
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
        - log: "Workflow complete"
```

### State Snapshot Example

```yaml
state:
  workflow_id: simple_plan
  current_step: verify
  data:
    plan:
      steps:
        - "Analyze requirements"
        - "Generate implementation"
        - "Verify output"
  history:
    - step: init
      timestamp: "2026-06-08T15:00:00Z"
    - step: plan
      timestamp: "2026-06-08T15:01:00Z"
```

### CLI Output Example

```yaml
workflow: simple_plan
status: running
current_step: verify
step_status: pending
progress:
  - step: init
    status: completed
    timestamp: "2026-06-08T15:00:00Z"
  - step: plan
    status: completed
    timestamp: "2026-06-08T15:01:00Z"
  - step: verify
    status: in_progress
```

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-08 | ai(kilo laguna) | Initial workflow examples |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Converted to YAML in MD format |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Added Test chapter per convention |