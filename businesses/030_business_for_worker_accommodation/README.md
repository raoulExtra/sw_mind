```yaml
id: business.worker_accommodation
type: business_domain
created: 2026-06-07
updated: 2026-06-07
data:
  title: Worker Accommodation Business
  description: Property management for worker accommodation
  context: property_management
```

# Worker Accommodation Business

## Context

This business domain operates within the **property management** context, focusing on rental accommodation for workers.

## Relationship to Property Management

Worker accommodation business is a specialization within property management that:

- Manages rental properties specifically for worker tenants
- Handles check-in/check-out procedures for temporary accommodations
- Coordinates with landlords for property maintenance
- Integrates with existing property management systems

## Key Processes

- Tenant screening and placement
- Move-in/move-out coordination
- Regular property inspections
- Maintenance request handling
- Utility management

## Integration Points

- `biz_mind/v1/res/places/` - Property and unit data
- `biz_mind/v1/res/persons/` - Tenant and staff records
- `biz_mind/v1/res/processes_ot_cyclical/` - Check-in/out procedures