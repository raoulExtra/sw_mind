```yaml
title: 'Guidelines: Handler for Biz is OO Oriented'
tags:
- biz_mind
- guidelines
- oo-oriented
- handler
- business
persona: kilo_extension
status: active
version: V00.04.00
updated: 2026-06-06
summary: 'Guidelines for object-oriented handler design to separate business types.'
extends:
- biz_mind/guidelines/030_guidel_entities_as_yaml.md
```

# Guidelines: Handler for Biz is OO Oriented

> Version: V00.04.00

## Overview

Guidelines for implementing object-oriented handlers to clearly separate different business types in Biz Mind. Each business type should have its own handler class with distinct responsibilities.

## Business Handler Structure

### Base Handler Interface
```typescript
interface BusinessHandler {
  create(entity: BusinessEntity): Promise<Entity>
  read(id: string): Promise<Entity>
  update(id: string, data: Partial<Entity>): Promise<Entity>
  delete(id: string): Promise<void>
  list(filters?: Filter): Promise<Entity[]>
}
```

### Business-Specific Handlers

#### Worker Accommodation Handler
- `business_for_worker_accommodation`
- Manages landlord/tenant relationships
- Handles legal compliance
- Tracks rent calculations

#### API Handler
- `business_for_handlers_ot_api`
- Handles external API connections
- Manages authentication and rate limiting
- Processes API requests/responses

#### Service Handlers
- `services_for_cleanings`
- `services_for_consultings`
- `services_for_customers`
- `services_for_maintenances`
- `services_for_tax_consultancy`

## Separation Principles

### 1. Single Responsibility
Each handler manages one business type only.

### 2. Interface Segregation
Handlers expose only relevant methods for their business type.

### 3. Dependency Injection
Inject handlers into business logic, not the other way around.

### 4. Factory Pattern
Use handler factory to instantiate correct handler:
```typescript
const handler = BusinessHandlerFactory.create('worker_accommodation')
```

## Implementation Examples

### CLI Integration
```bash
# Use handler for specific business
bm_cli --business=worker_accommodation create-tenant --name "John Doe"
bm_cli --business=handlers_ot_api connect --endpoint "https://api.example.com"
```

### Mind Map Visualization
- Each handler represents a node in mind maps
- Relationships between handlers show business connections
- Handler methods become sub-nodes

## Testing Guidelines

- Test each handler independently
- Mock dependencies for unit tests
- Integration test handler combinations

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.04.00 | 2026-06-06 | ai(kilo laguna) | Version bump for alignment with 030 |
| V00.03.00 | 2026-06-06 | ai(kilo laguna) | Added extends for OO-oriented inheritance |
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Added business handler examples |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial OO handler guidelines |