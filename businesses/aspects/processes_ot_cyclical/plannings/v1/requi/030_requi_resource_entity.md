```yaml
title: 'Requirements: Resource Entity for OnlineGantt'
tags:
- gantt
- resource
- entity
- requirements
persona: kilo_extension
status: implemented
version: V00.01.00
updated: 2026-06-07
summary: 'Resource entity specification for OnlineGantt .gantt file format.'
```

# Requirements: Resource Entity

> Version: V00.01.00

## Entity: Resource

### Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| resourceId | string | Yes | Unique identifier for the resource |
| resourceName | string | Yes | Display name of the resource |

### Allowed Values per Attribute

#### resourceId (ATTR-RSC-001)
- **Type**: string
- **Allowed Values**: Any non-empty string
- **Constraints**: Must be unique within the resources array
- **Examples**: "Team Member 1", "John Doe", "Machine A"

#### resourceName (ATTR-RSC-002)
- **Type**: string
- **Allowed Values**: Any non-empty string
- **Constraints**: None
- **Examples**: "Team Member 1", "John Doe", "Machine A"

### Resource Assignment Structure (in Task.resources)

```json
{
  "resourceId": "string",
  "resourceName": "string",
  "unit": integer
}
```

#### unit (in task resources) (ATTR-RSC-003)
- **Type**: integer
- **Allowed Values**: 1-100
- **Default**: 100
- **Description**: Percentage of resource allocation (100 = full allocation)

### Functional Requirements

- [x] **FR-CLI-PRE-01** Support resource tags (equipment, vehicle, facility, housing)

### Resource Tags Attribute

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| tags | array | No | Array of resource tag strings |

#### tags (ATTR-RSC-004)
- **Type**: array of strings
- **Allowed Values**: "equipment", "vehicle", "facility", "housing"
- **Constraints**: 
  - Each tag must be from the allowed set
  - Case-insensitive (normalize to lowercase)
  - No duplicates within a resource
  - Can be empty array or omitted