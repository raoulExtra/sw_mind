# Flow Mind v2

> Version: V00.11.00

Hybrid flow engine for managing agents with verifiable state machines. The system combines flow orchestration, agent-based planning, and independent verification in a CLI tool. It uses file-based state persistence for flow execution and state machine management.

## Content Info

Conventions: requirements follow `reuses/conventions/30_conv_testing_requirements.md`, README follows `reuses/conventions/40_conv_readme_content.md`, versioning per `reuses/conventions/10_conv_versions.md`, and simplicity principle per `reuses/conventions/50_conv_straightforward.md`.

## Structure

```
v2/
├── README.md
├── requi/
│   ├── 010_requi_core_architecture.md    # Core architecture requirements
│   ├── 010_requi_oo_architecture.md      # OO architecture details
│   ├── 020_requi_state_management.md     # State management requirements
│   ├── 020_requi_typescript.md           # TypeScript implementation
│   ├── 030_requi_cli_interface.md        # CLI interface requirements
│   ├── 040_requi_verification.md         # Verification requirements
│   ├── 050_requi_non_functional.md       # Non-functional requirements
│   └── 070_requi_oo_implementation.md    # OO implementation requirements
└── guidelines/
```

## Requirements

- Workflow engine for permissions and state control
- Agent for ambiguity handling and planning
- Verifier for independent output checking
- CLI interface with file-based state persistence

## Purpose

Version 2 provides the code-level implementation of the hybrid flow engine with abstract base classes, TypeScript interfaces, and concrete implementations.

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-08 | ai(kilo laguna) | Initial README for v1 |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Split requirements into separate files |
| V00.03.00 | 2026-06-08 | ai(kilo laguna) | Added OO aspects requirements |
| V00.04.00 | 2026-06-08 | ai(kilo laguna) | Added artifacts and MVC to OO aspects |
| V00.05.00 | 2026-06-08 | ai(kilo laguna) | Updated guidelines with MVC and OO patterns |
| V00.06.00 | 2026-06-08 | ai(kilo laguna) | Added straightforwardness convention |
| V00.07.00 | 2026-06-08 | ai(kilo laguna) | Added audit trail to state management |
| V00.08.00 | 2026-06-08 | ai(kilo laguna) | Fixed title to v2 |
| V00.09.00 | 2026-06-08 | ai(kilo laguna) | Added OO implementation requirements structure |
| V00.10.00 | 2026-06-08 | ai(kilo laguna) | Restructured: split v1 OO specs, added v2 implementation |
| V00.11.00 | 2026-06-08 | ai(kilo laguna) | Added v1 testing requirements |