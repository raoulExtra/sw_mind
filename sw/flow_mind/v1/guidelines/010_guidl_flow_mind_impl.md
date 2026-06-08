```yaml
title: 'Guideline: Flow Mind Implementation'
tags:
- flow_mind
- guidelines
- implementation
- oo
- mvc
persona: kilo_extension
status: active
version: V00.05.00
updated: 2026-06-08
summary: 'Implementation guidelines for Flow Mind hybrid workflow engine with OO patterns and MVC.'
```

# Guideline: Flow Mind Implementation

> Version: V00.05.00

## Content Info

Conventions: README follows `reuses/conventions/40_conv_readme_content.md`, versioning per `reuses/conventions/10_conv_versions.md`, simplicity principle per `reuses/conventions/50_conv_straightforward.md`, and OO patterns per `reuses/conventions/50_conv_straightforward.md`.

## Architecture Guidelines

### Component Separation
- Workflow engine handles state transitions and permissions
- Agent manages ambiguity, planning, and decision-making
- Verifier performs independent artifact validation
- Use artifact classes for plans, outputs, and verification results

### Model View Controller
- **Model**: Workflow state and data management classes
- **View**: CLI output formatting and display handlers
- **Controller**: Command routing and workflow execution

### Object-Oriented Design
- Composition over inheritance for component integration
- Factory pattern for workflow and agent instantiation
- Observer pattern for state change notifications
- Strategy pattern for verification algorithms
- See `sw/flow_mind/v1/requi/` for detailed requirements:
  - `010_requi_oo_aspects.md` - Index document
  - `020_requi_core_domain.md` - Core domain model
  - `030_requi_mvc_specs.md` - MVC specifications
  - `040_requi_patterns.md` - Design patterns
  - `050_requi_interfaces.md` - Interface contracts

### State Persistence
- File-based storage with YAML format for human readability
- Atomic write operations with rollback on failure
- State history for audit and debugging
- Store every step, transition, and state in audit trail

### CLI Design
- Follow consistent command patterns (`fm_cli <action> <target>`)
- Provide clear error messages for verification failures
- Support batch operations with configuration files

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-08 | ai(kilo laguna) | Initial guidelines |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Added MVC and OO patterns |
| V00.03.00 | 2026-06-08 | ai(kilo laguna) | Added audit trail requirement |
| V00.04.00 | 2026-06-08 | ai(kilo laguna) | Added YAML format specification |
| V00.05.00 | 2026-06-08 | ai(kilo laguna) | Added cross-reference to v1 requirements |