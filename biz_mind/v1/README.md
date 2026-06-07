# Biz Mind v1
> Version: V00.04.00

Business intelligence application for mind mapping and concept organization.

## Content Info

Conventions: requirements follow `reuses/conventions/30_conv_testing_requirements.md` and versioning per `reuses/conventions/10_conv_versions.md`.

## Structure

```
v1/
├── requi/                   # Requirements documents
│   ├── 010_requi_cli_for_sim.md  # CLI for simulation requirements
│   └── guidelines/            # Guidelines for implementation
│       ├── 010_guidel_handler_for_biz_is_oo_oriented.md
│       └── 020_guidel_ressources_ascontact_entries.md
```

## Requirements

- TypeScript compiler for type-safe development
- ESLint and Prettier for code quality
- Jest/Vitest for unit testing
- `bm_cli` for package management and business operations

## Purpose

Version 1 provides `bm_cli` requirements for simulation system. It focuses on preparing the ground for business simulation with text-based output. Full AI-driven business handling and programming capabilities are implemented in v2.

See `glossaries/010_glos_ot_business_ot_general.md` and `glossaries/030_glos_ot_business_for_worker_accommodation.md` for Biz Mind terms.

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.04.00 | 2026-06-06 | ai(kilo laguna) | Changed to entity-based CLI syntax (`-e` flag) |
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added tags argument support |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added guidelines and updated structure |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial README for v1 |