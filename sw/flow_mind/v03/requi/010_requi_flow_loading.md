```yaml
title: 'Requirements: Flow Loading'
tags:
- flow_mind
- requirements
- v3
- flow_loading
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
requi_id: REQUI-FM-V3-FLOW-001
summary: 'Requirements for loading and validating flow definitions.'
see_also:
- sw/flow_mind/res/v3/
```

# Flow Loading Requirements

## Overview

Requirements for loading and validating flow definitions from markdown files with inheritance support.

## Functional Requirements

- [ ] **FR-FM-V3-FLOW-01** Must load flow definitions from `sw/flow_mind/res/*.md` files
  - *Acceptance*: Parse YAML frontmatter and flow definition from markdown files
- [ ] **FR-FM-V3-FLOW-02** Must support flow inheritance via `extends` property
  - *Acceptance*: Child flow inherits states and transitions from parent flow using deep merge
- [ ] **FR-FM-V3-FLOW-03** Must validate flow structure on load
  - *Acceptance*: Required fields present (`id`, `name`, `type`, `states`)
- [ ] **FR-FM-V3-FLOW-04** Must reuse v2 flow file format parsing rules and validation logic
  - *Acceptance*: Shared parsing, schema, and validation behavior are adopted from Flow Mind v2 when compatible