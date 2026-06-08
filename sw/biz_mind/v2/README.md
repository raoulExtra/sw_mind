# Biz Mind v2
> Version: V00.04.00

AI-driven business handling application with strong programming and code management capabilities for efficient business operations.

## Content Info

Conventions: requirements follow `reuses/conventions/30_conv_testing_requirements.md` and versioning per `reuses/conventions/10_conv_versions.md`.

## Structure

```
v2/
├── requi/                   # Requirements documents
│   ├── 010_requi_ot_tech_ts.md  # TypeScript technology requirements
│   ├── 020_requi_core.md        # Core AI-driven business requirements
│   └── 030_requi_mindmap_for_business.md  # Biz Mind mindmap requirements
```

## Requirements

- TypeScript compiler for type-safe development
- ESLint and Prettier for code quality
- Jest/Vitest for unit testing
- `bm_cli` for package management

See `glossaries/010_glos_ot_business_ot_general.md` and `glossaries/030_glos_ot_business_for_worker_accommodation.md` for Biz Mind terms.

## Supported Business Types

- Worker Accommodation (landlord/tenant management)
- Service Businesses (cleaning, consulting, maintenance, tax consultancy)
- Financial/Tax Cycles (periodic business processes)

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.04.00 | 2026-06-06 | ai(kilo laguna) | Added entity management and tag support |
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added programming & code management requirements |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added business types and processes |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial README for v2 |