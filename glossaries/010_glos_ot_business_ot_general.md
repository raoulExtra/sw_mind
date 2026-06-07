```yaml
title: 'Glossary: Business General Terms'
tags:
- biz_mind
- glossary
- business
- general
persona: kilo_extension
status: active
version: V00.03.00
updated: 2026-06-06
summary: 'General business terminology for Biz Mind application. Includes tags argument support.'
extends:
- glossaries/005_glos_ot_general.md
```

# Glossary: Business General Terms

> Version: V00.03.00

## Overview

General business terms and concepts for Biz Mind application. For worker accommodation specific roles and terms, see `030_glos_ot_business_for_worker_accommodation.md`.

## Roles and Parties

| Term | Description |
|------|-------------|
| Client | Business that purchases services (synonym: customer) |
| Customer | Primary entity that receives services - used universally even when services are bought |
| Service Partner | Business that provides services |
| Contractor | Individual or business contracted for specific work |
| Consultant | Advisor providing expert advice |
| Vendor | Supplier of goods or services |

## Business Entity Types

| Term | Description |
|------|-------------|
| Contact | A person or organization interacting with the business |
| Resource | A physical or digital asset used by the business |
| Facility | A building or location used for business operations |
| Handler | An object-oriented class managing a specific business type |

## CLI Reference

```bash
# Create a contact with tags
bm_cli create -e contact --name "John Doe" --role customer --tags "worker,housing"

# Create a resource with tags
bm_cli create -e resource --name "Equipment-01" --category Equipment --tags "maintenance,active"

# List contacts by tags
bm_cli list -e contact --tags "housing"
```

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added extends for OO-oriented inheritance |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added tags argument to CLI examples |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial business general glossary |