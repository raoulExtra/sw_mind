```yaml
title: 'README: Flow Mind'
tags:
- flow
- flow_mind
- workflow
- agent
- state_machine
persona: kilo_extension
status: active
version: V00.15.00
updated: 2026-06-08
summary: 'Hybrid workflow engine for managing agents with verifiable state machines.'
```
# Flow Mind

This project provides a hybrid (work)flow engine for managing agents with verifiable state machines. The system combines flow orchestration with model-based planning and independent verification. It is designed for CLI execution with file-based state persistence.

## Content Info

conventions: README follows `reuses/conventions/40_conv_readme_content.md` and `reuses/conventions/50_conv_straightforward.md`

## Structure

```text
sw/flow_mind/
├── README.md
├── guidelines/
├── v1/                      # Core workflow engine (specifications + implementation)
│   ├── README.md
│   ├── requi/
│   │   ├── 010_requi_oo_aspects.md      # Index for OO specifications
│   │   ├── 010_learn_flow_mind.md       # Learning guide
│   │   ├── 020_requi_core_domain.md      # Core domain model
│   │   ├── 030_requi_mvc_specs.md        # MVC specifications
│   │   ├── 040_requi_patterns.md         # Design patterns
│   │   ├── 050_requi_interfaces.md       # Interface contracts
│   │   ├── 060_requi_tests.md            # Testing requirements
│   │   ├── 080_glossary.md               # Glossary of terms
│   │   └── 090_examples.md               # YAML workflow examples
│   ├── res/
│   │   └── example_workflow.yaml         # Example workflow
│   ├── src/
│   │   └── ts/
│   │       ├── fm_cli.ts                 # CLI implementation
│   │       └── tests/
│   │           └── unit/workflow.test.ts # Unit tests
│   └── guidelines/
│       └── 010_guidl_flow_mind_impl.md
└── v2/                      # Code-level implementation
    ├── README.md
    ├── requi/
    │   ├── 010_requi_core_architecture.md
    │   ├── 010_requi_oo_architecture.md
    │   ├── 020_requi_state_management.md
    │   ├── 020_requi_typescript.md
    │   ├── 030_requi_cli_interface.md
    │   ├── 040_requi_verification.md
    │   ├── 050_requi_non_functional.md
    │   └── 070_requi_oo_implementation.md
    └── guidelines/
```

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-07 | ai(kilo laguna) | Initial README creation |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Added v1 requirements split into separate files |
| V00.03.00 | 2026-06-08 | ai(kilo laguna) | Added OO aspects requirements |
| V00.04.00 | 2026-06-08 | ai(kilo laguna) | Added artifacts and MVC to OO aspects |
| V00.05.00 | 2026-06-08 | ai(kilo laguna) | Updated guidelines with MVC and OO patterns |
| V00.06.00 | 2026-06-08 | ai(kilo laguna) | Added straightforwardness convention |
| V00.07.00 | 2026-06-08 | ai(kilo laguna) | Added audit trail to state management |
| V00.08.00 | 2026-06-08 | ai(kilo laguna) | Added YAML format specification |
| V00.09.00 | 2026-06-08 | ai(kilo laguna) | Restructured: split v1 OO specs, added v2 implementation |
| V00.10.00 | 2026-06-08 | ai(kilo laguna) | Added v1 testing requirements |
| V00.11.00 | 2026-06-08 | ai(kilo laguna) | Added acceptance criteria, glossary, and workflow examples |
| V00.12.00 | 2026-06-08 | ai(kilo laguna) | Added learning guide for requirements |
| V00.13.00 | 2026-06-08 | ai(kilo laguna) | Added Test chapters per convention |
| V00.14.00 | 2026-06-08 | ai(kilo laguna) | Final version bump |
| V00.15.00 | 2026-06-08 | ai(kilo laguna) | Added fm_cli.ts implementation in v1 |