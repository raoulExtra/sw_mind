```yaml
title: 'Guidelines: Entities as YAML'
tags:
- biz_mind
- guidelines
- entities
- yaml
- storage
- relations
persona: kilo_extension
status: active
version: V00.08.00
updated: 2026-06-06
summary: 'Guidelines for storing business entities as YAML files with relations.'
extends:
- biz_mind/guidelines/010_guidel_handler_for_biz_is_oo_oriented.md
```

# Guidelines: Entities as YAML

> Version: V00.08.00

## Overview

Store business entities as YAML files for human-readable, version-controllable persistence.

## YAML Structure

### Entity Format
```yaml
id: entity_id
type: entity_type
created: 2026-06-06
updated: 2026-06-06
data:
  name: "Entity Name"
  description: "Entity description"
  attributes:
    key: value
    nested:
      field: value
```

### Entity Format with Inheritance
```yaml
id: person.worker_001
type: person
created: 2026-06-06
updated: 2026-06-06
data:
  name: "Worker 001"
  role: "cleaning"
extends:
- biz_mind/entities/person/base_person_ot_base.yaml
```

### File Naming
- Use kebab-case: `entity_type.entity_id.yaml`
- For nested services: `service/subtype/id.yaml`
- Examples: `tenant.pers_john_doe.yaml`, `person.worker_001.yaml`, `person.contractor_vendor_xy.yaml`, `service/cleaning/pers_jon_doe.yaml`

### Directory Structure
```
entities/
├── tenant/
│   ├── pers_john_doe.yaml
│   └── pers_jane_smith.yaml
├── service/
│   ├── cleaning/
│   │   └── pers_jon_doe.yaml
│   └── consulting/
│       └── project_001.yaml
└── person/
    ├── worker_001.yaml
    └── contractor_vendor_xy.yaml
```

## Benefits

- Human-readable and editable
- Git-friendly with clear diffs
- Version-controlled history
- Language-agnostic format

## Implementation

Use YAML library for parsing/serialization:
```typescript
import * as yaml from 'js-yaml'

const entity = yaml.load(fileContent) as Entity
const fileContent = yaml.dump(entity)

// Example: loading a person entity
const person = yaml.load(fs.readFileSync('entities/person/worker_001.yaml', 'utf8')) as Person
```

## Validation

- Validate against JSON Schema before saving
- Ensure required fields are present
- Check for valid YAML syntax

## Entity Relations

### Relation Format
```yaml
relations:
  - type: owns
    target: tenant.pers_john_doe
    inverse: tenant_of
  - type: employs
    target: person.worker_001
    inverse: employed_by
```

### Relation Types
- `owns` - ownership relationship
- `employs` - employment relationship
- `belongs_to` - membership relationship
- `references` - reference/link relationship
- `depends_on` - dependency relationship

### Inverse Relations
Always define inverse relations for bidirectional navigation:
- `owns` ↔ `owned_by`
- `employs` ↔ `employed_by`
- `belongs_to` ↔ `member_of`

### Relation Validation
- Target must exist before creating relation
- Prevent circular references
- Maintain referential integrity

## OO-Oriented Design with Extends

### Inheritance Pattern
Use `extends` to inherit properties and behaviors from parent entities:
```yaml
id: person.worker_001
type: person
created: 2026-06-06
updated: 2026-06-06
data:
  name: "Worker 001"
  role: "cleaning"
extends:
- biz_mind/entities/person/base_person_ot_base.yaml
```

### Composition Pattern
Combine multiple entity types:
```yaml
id: service.cleaning.john_doe
type: service
created: 2026-06-06
data:
  name: "John Doe Cleaning Service"
  provider: person.worker_001
extends:
- biz_mind/entities/service/base_service_ot_base.yaml
- biz_mind/entities/person/base_person_ot_base.yaml
```

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.08.00 | 2026-06-06 | ai(kilo laguna) | Updated entity paths to use _ot_base suffix |
| V00.07.00 | 2026-06-06 | ai(kilo laguna) | Added OO-oriented design with extends pattern |
| V00.06.00 | 2026-06-06 | ai(kilo laguna) | Added entity relations guidelines |
| V00.05.00 | 2026-06-06 | ai(kilo laguna) | Updated contractor example to contractor_vendor_xy |
| V00.04.00 | 2026-06-06 | ai(kilo laguna) | Updated file naming with pers_ prefix |
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added nested service directory structure |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added person entity examples and updated directory structure |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial YAML entities guideline |