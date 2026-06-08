```yaml
title: 'Requirements: Task Entity for OnlineGantt'
tags:
- gantt
- task
- entity
- requirements
persona: kilo_extension
status: implemented
version: V00.01.00
updated: 2026-06-07
summary: 'Task entity specification for OnlineGantt .gantt file format.'
```

# Requirements: Task Entity

> Version: V00.01.00

## Entity: Task

### Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| TaskID | integer | Yes | Unique identifier for the task |
| TaskName | string | Yes | Name/title of the task |
| StartDate | datetime | Yes | Task start date/time (ISO 8601 format) |
| EndDate | datetime | Yes | Task end date/time (ISO 8601 format) |
| Duration | integer | Yes | Duration in specified units |
| Predecessor | string/null | No | Predecessor task ID(s) with relation type (e.g., "2FS", "3FS+1 day") |
| resources | array | No | Array of resource assignments |
| Progress | integer | No | Completion percentage (0-100) |
| color | string | No | Color code for task (e.g., "121", "211", "301") |
| info | string | No | HTML content for task info |
| DurationUnit | string | No | Unit of duration: "day", "hour", "week", "month" |
| subtasks | array | No | Array of child task entities |

### Allowed Values per Attribute

#### TaskID (ATTR-TSK-001)
- **Type**: integer
- **Allowed Values**: Positive integers starting from 1
- **Constraints**: Must be unique within the project

#### TaskName (ATTR-TSK-002)
- **Type**: string
- **Allowed Values**: Any non-empty string up to 255 characters
- **Constraints**: None

#### StartDate (ATTR-TSK-003)
- **Type**: datetime string
- **Allowed Values**: ISO 8601 format (e.g., "2026-06-01T06:00:00.000Z")
- **Constraints**: Must be a valid datetime

#### EndDate (ATTR-TSK-004)
- **Type**: datetime string
- **Allowed Values**: ISO 8601 format (e.g., "2026-06-22T15:00:00.000Z")
- **Constraints**: Must be >= StartDate

#### Duration (ATTR-TSK-005)
- **Type**: integer
- **Allowed Values**: Non-negative integers (>= 0)
- **Constraints**: 0 for milestones

#### Predecessor (ATTR-TSK-006)
- **Type**: string or null
- **Allowed Values**: 
  - null or "" (no predecessor)
  - TaskID alone (e.g., "2")
  - TaskID with relation type: "2FS", "3SS", "4SF", "5FF"
  - With offset: "3FS+1 day", "2FS+2 hours"
- **Relation Types**: FS (Finish to Start), SS (Start to Start), SF (Start to Finish), FF (Finish to Finish)

#### resources (ATTR-TSK-007)
- **Type**: array of objects
- **Allowed Values**: Array of resource assignment objects
- **Structure**:
  ```json
  {
    "resourceId": "string",
    "resourceName": "string", 
    "unit": integer (1-100)
  }
  ```

#### Progress (ATTR-TSK-008)
- **Type**: integer
- **Allowed Values**: 0-100
- **Constraints**: None

#### color (ATTR-TSK-009)
- **Type**: string
- **Allowed Values**: 
  - "" (empty, default)
  - Color codes like "121", "211", "301"
  - Hex colors: "#FF5733"
  - Named colors: "red", "blue", etc.

#### info (ATTR-TSK-010)
- **Type**: string
- **Allowed Values**: HTML content or empty string
- **Constraints**: Must be valid HTML

#### DurationUnit (ATTR-TSK-011)
- **Type**: string
- **Allowed Values**: "day", "hour", "week", "month"
- **Default**: "day"

#### subtasks (ATTR-TSK-012)
- **Type**: array of Task objects
- **Allowed Values**: Array of nested task entities
- **Constraints**: Recursive structure; can be empty array or omitted

### Functional Requirements

- [x] **FR-TSK-PRE-01** Support task creation with TaskID and TaskName
- [x] **FR-TSK-PRE-02** Support task scheduling (dates, duration, duration unit)
- [x] **FR-TSK-PRE-03** Support task dependencies (FS, SS, SF, FF relations)
- [x] **FR-TSK-PRE-04** Support resource assignment with allocation unit
- [x] **FR-TSK-PRE-05** Support task progress tracking (0-100%)
- [x] **FR-TSK-PRE-06** Support task nesting with subtasks
- [x] **FR-TSK-PRE-07** Support milestone tasks (Duration: 0)
- [x] **FR-TSK-PRE-08** Support task coloring