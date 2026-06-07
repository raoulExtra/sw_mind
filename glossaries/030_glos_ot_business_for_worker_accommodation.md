```yaml
title: 'Glossary: Business for Worker Accommodation'
tags:
- biz_mind
- glossary
- worker_accommodation
- housing
- landlord
- tenant
persona: kilo_extension
status: active
version: V00.03.00
updated: 2026-06-06
summary: 'Glossary for worker accommodation business from businesses/030_business_for_worker_accommodation. See 010_glos for general terms.'
extends:
- glossaries/005_glos_ot_general.md
- biz_mind/guidelines/030_guidel_entities_as_yaml.md
```

# Glossary: Business for Worker Accommodation

> Version: V00.03.00

## Overview

Glossary for the `business_for_worker_accommodation` business type, derived from `businesses/030_business_for_worker_accommodation` structure. See `010_glos_ot_business_ot_general.md` for general business terms.

## Roles and Parties

| Role | Description |
|------|-------------|
| business_owner | Owner of worker accommodation property |
| customer | Tenant renting accommodation (primary term) |
| landlord | Property owner managing accommodation |
| tenant | Occupant of rented accommodation |

## Business Structure

```
business_for_worker_accommodation
├── role_ot_legal
│   └── business_owner
│       └── landlord
└── customer
    └── tenant
```

## Key Terms

- **Worker Accommodation**: Housing provided to workers as part of employment
- **Landlord**: Entity that owns and manages rental properties
- **Tenant**: Individual renting accommodation from landlord
- **Rent**: Periodic payment for accommodation use

## CLI Commands

### Housing Resource
```bash
bm_cli create -e resource --category Facilities --name "Worker-Housing-01" --capacity 20
```

### Tenant Management
```bash
bm_cli create -e contact --role tenant --name "John Doe"
```

### Listing with Entity Type
```bash
bm_cli list -e resource --tags "housing"
```

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added extends for OO-oriented inheritance |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added reference to general glossary |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial glossary from business structure |