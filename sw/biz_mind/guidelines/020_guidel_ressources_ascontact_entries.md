```yaml
title: 'Guidelines: Resources and Facilities as Contact Entries'
tags:
- biz_mind
- guidelines
- contacts
- resources
- facilities
- housing
persona: kilo_extension
status: active
version: V00.05.00
updated: 2026-06-06
summary: 'Guidelines for treating resources and facilities as contact entries in Biz Mind.'
extends:
- biz_mind/guidelines/010_guidel_handler_for_biz_is_oo_oriented.md
- biz_mind/guidelines/030_guidel_entities_as_yaml.md
```

# Guidelines: Resources and Facilities as Contact Entries

> Version: V00.05.00

## Overview

Guidelines for modeling business resources (equipment, tools, vehicles, etc.) as contact entries within the Biz Mind system. This approach enables unified management of all business entities.

## Resource Types as Contacts

### Physical Resources
- Equipment (machines, tools, devices)
- Vehicles (cars, trucks, machinery)
- Facilities (workspaces, storage areas, houses, flats in houses)
- Inventory items (products, materials)

### Digital Resources
- Software licenses
- Cloud services
- Digital assets
- API connections

## Contact Entry Structure

### Required Fields
- **Name**: Resource identifier
- **Type**: `resource`
- **Category**: Equipment/Machinery/Tools/Facilities/Digital/etc.
- **Status**: Active/Inactive/Maintenance/Reserved

### Recommended Fields
- **Description**: Resource specifications and capabilities
- **Owner**: Responsible person or department
- **Location**: Current physical/digital location
- **Value**: Asset value for financial tracking
- **Acquisition Date**: When resource was obtained
- **Maintenance Schedule**: Service intervals
- **Capacity**: Number of units or occupancy (for facilities/housing)

## Implementation Examples

### CLI Commands
```bash
# Create equipment resource
bm_cli create-contact --type resource --name "Forklift-001" --category Equipment

# Create digital resource
bm_cli create-contact --type resource --name "Cloud-Storage-Pro" --category Digital

# Create facility resource
bm_cli create-contact --type resource --name "Office-Building-A" --category Facilities --capacity 50

# Create housing resource
bm_cli create-contact --type resource --name "Worker-Housing-01" --category Facilities --capacity 20
```

### Mind Map Nodes
- Resources as nodes in business process maps
- Relationships to people, transactions, and workflows
- Visual indicators for resource status

## Best Practices

1. Use consistent naming conventions
2. Assign unique identifiers to each resource
3. Link resources to responsible parties
4. Track resource utilization in workflows
5. Maintain resource history and changes
6. Use `glossaries/030_glos_ot_business_for_worker_accommodation.md` for worker accommodation terms

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.05.00 | 2026-06-06 | ai(kilo laguna) | Updated version and extends alignment |
| V00.04.00 | 2026-06-06 | ai(kilo laguna) | Added extends for OO-oriented inheritance |
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added facilities and housing tags |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added capacity field for facilities/housing |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial guidelines |