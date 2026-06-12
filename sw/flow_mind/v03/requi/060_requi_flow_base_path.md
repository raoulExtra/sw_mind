```yaml
name: requi_flow_base_path
title: 'Requirements: Flow Base Path Resolution'
tags:
- flow_mind
- requirements
- v3
- path
- extends
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Requirements for flow base template resolution with path arguments.'
```

# Requirements: Flow Base Path Resolution

## Overview

When a flow in `sw/flow_mind/res/v3/` extends a base template from `sw/flow_mind/res/v2/`, the path resolution must work correctly when a path argument is provided.

## Functional Requirements

- [ ] **FR-FM-V3-PATH-01** Must resolve relative paths for extended flows
  - *Acceptance*: Flow extending `../v2/010_flow_base` resolves correctly when path argument is `sw/flow_mind/res`
  - *Test*: Load flow with path argument and verify base template is found

- [ ] **FR-FM-V3-PATH-02** Must support absolute path resolution
  - *Acceptance*: Full path `sw/flow_mind/res/v2/010_flow_base` works as alternative

## See Also

- Base Template: `sw/flow_mind/res/v2/010_flow_base.md`
- Flow Example: `sw/flow_mind/res/v3/020_flow_example_timer.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial path resolution requirements |