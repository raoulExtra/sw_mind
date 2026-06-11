```yaml
title: 'Requirements: Flow Mind v2 Flow Diagrams and Dependencies'
tags:
- flow_mind
- requirements
- diagrams
- visualization
- dependencies
- v2
persona: product_manager
status: active
version: V00.01.00
updated: 2026-06-11
requi_id: REQUI-FM-V2-070
summary: 'Visual diagrams describing flow structures and requirement dependencies.'
```

# Flow Diagrams and Dependencies

> Version: V00.01.00

## Overview

Create visual representations of flow structures and requirement dependencies to improve understanding and communication.

## Functional Requirements

### Flow Diagrams

- [ ] **FR-FM-V2-71** Generate DOT diagrams for flows
  - *Acceptance*: Each flow definition can be rendered as a DOT graph
  - *Acceptance*: States are nodes, transitions are directed edges
  - *Acceptance*: Actions and guards are annotated on edges

- [ ] **FR-FM-V2-72** Export diagrams as PNG images
  - *Acceptance*: DOT diagrams can be converted to PNG format
  - *Acceptance*: Images are stored in `res/diagrams/` directory
  - *Acceptance*: Naming follows `{flow_id}.png` convention

### Requirement Dependencies

- [ ] **FR-FM-V2-73** Map requirements to flow components
  - *Acceptance*: Each requirement links to specific states/transitions
  - *Acceptance*: Dependency graph shows FR→State/Transition mappings
  - *Acceptance*: Visualized as layered diagram (requirements above flows)

- [ ] **FR-FM-V2-74** Generate dependency DOT files
  - *Acceptance*: `requi/dependencies.dot` shows FR→component relationships
  - *Acceptance*: Color-coded by requirement category
  - *Acceptance*: Can be rendered to `res/diagrams/dependencies.png`

## Test

- [ ] **TEST-FM-V2-71** Unit tests for DOT diagram generation
- [ ] **TEST-FM-V2-72** Unit tests for PNG export

## See Also

- Readable Flow State Model: `sw/flow_mind/v2/requi/010_readable_flow_state_model.md`
- CLI Commands: `sw/flow_mind/v2/requi/040_requi_cli_commands.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-11 | ai(kilo laguna) | Initial flow diagrams requirements |