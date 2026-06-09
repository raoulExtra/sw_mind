```yaml
title: 'Flow File Format Requirements'
tags:
- flow_mind
- requirements
- v2
- flow-file-format
- yaml
- markdown
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-09
summary: 'Requirements for v2 flow file format supporting markdown with embedded YAML.'
```

# Flow File Format Requirements

> Version: V00.01.00

## Overview

v2 flow files should support markdown format with frontmatter YAML followed by flow definition.

## Format Specification

### Frontmatter

- YAML block at the beginning of the file
- Delimited by ```yaml / ``` separators
- Contains e.g. metadata: title, tags, persona, status, version, updated, summary

### Flow Definition

- Delimited by ```yaml / ``` separators
- YAML block starting with `flow:` key
- Contains e.g. : id, name, start_state, states, signals
- States contain e.g. : name, on_enter, transitions
- Transitions contain e.g.: to, when, on, guard

## CLI Support

The CLI should:
1. Parse markdown files with embedded YAML
2. Extract frontmatter for display
3. Parse flow YAML block for execution
4. Support both pure YAML and markdown formats

## Test

- [ ] **TEST-FF-01** Unit tests for frontmatter parsing
- [ ] **TEST-FF-02** Unit tests for flow YAML block extraction

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial flow file format requirements |