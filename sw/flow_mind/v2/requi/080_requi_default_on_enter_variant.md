```yaml
title: 'Requirements: Default on_enter Log Variant'
tags:
- flow_mind
- requirements
- v2
- default
- on_enter
- logging
- interpolation
persona: developer
status: draft
version: V00.02.00
updated: 2026-06-11
requi_id: REQUI-FM-V2-035
summary: 'Requirements for default on_enter action that logs flow.id and state.name.'
```

# Requirements: Default on_enter Log Variant

## Overview

Define a standard default action for state entry that logs the flow identifier and state name for debugging and tracing purposes.

## Universal Interpolation Spec

### Placeholder Format

```
{entity.field}
```

### Rules

- A placeholder is `{` + path + `}`
- A path is `identifier.identifier...`
- The first identifier must match a context object (`flow`, `state`, `signal`, `transition`, etc.)
- The rest are fields inside that object
- If a value is missing, leave placeholder unchanged
- Values are converted to strings via the host language

### Supported Context Objects (TypeScript, V2)

Currently only these context objects are supported:

- `flow` - `flow.id`, `flow.name`, `flow.start_state`
- `state` - `state.name`
- `executor` - `executor.name`, `executor.role`

### TypeScript Implementation

```typescript
export function interpolate(template: string, context: Record<string, any>): string {
  return template.replace(/\{([^}]+)\}/g, (_, path) => {
    const parts = path.split(".");
    let value: any = context;

    for (const part of parts) {
      value = value?.[part];
      if (value === undefined) return `{${path}}`;
    }

    return String(value);
  });
}
```

## Functional Requirements

- [ ] **FR-FM-V2-35** Must support default on_enter actions
  - *Acceptance*: Flows can define a `default.on_enter` section
  - *Acceptance*: Default actions apply to all states unless overridden
- [ ] **FR-FM-V2-36** Must interpolate flow.id and state.name in log actions
  - *Acceptance*: `{flow.id}` is replaced with the actual flow identifier
  - *Acceptance*: `{state.name}` is replaced with the actual state name
- [ ] **FR-FM-V2-37** Must allow per-state override of default on_enter
  - *Acceptance*: States can define their own `on_enter` to override default
- [ ] **FR-FM-V2-38** Must allow extended flows to inherit default log definition from parent
  - *Acceptance*: Extended flows can reference parent's default.on_enter via inheritance
  - *Acceptance*: Child flow's default.on_enter overrides parent's default on conflict

## Example

```yaml
flow:
  id: my_flow
  name: "My Flow"
  start_state: init
  default:
    on_enter:
      - log: "{flow.id} {state.name}"
  states:
    - name: init
      transitions:
        - to: processing
```

Would produce log output: `my_flow init`

## See Also

- Flow Base Template: `sw/flow_mind/res/v2/010_flow_base.md`
- Simple Plan Flow: `sw/flow_mind/res/v2/020_flow_example_simple_plan.md`
- Readable Flow State Model: `sw/flow_mind/v2/requi/050_requi_readable_flow_state_model.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.02.00 | 2026-06-11 | ai(kilo laguna) | Added inheritance requirement for extended flows |
| V00.01.00 | 2026-06-11 | ai(kilo laguna) | Initial requirement |