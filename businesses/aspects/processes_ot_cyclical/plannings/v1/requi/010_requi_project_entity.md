```yaml
title: 'Requirements: Project Entity for OnlineGantt'
tags:
- gantt
- project
- entity
- requirements
persona: kilo_extension
status: implemented
version: V00.01.00
updated: 2026-06-07
summary: 'Project entity specification for OnlineGantt .gantt file format.'
```

# Requirements: Project Entity

> Version: V00.01.00

## Entity: Project

### Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| data | array | Yes | Array of root task entities (can be empty) |
| resources | array | No | Array of resource entities |
| projectStartDate | datetime/null | No | Project start date |
| projectEndDate | datetime/null | No | Project end date |
| advanced | object | No | Advanced settings configuration |

### Allowed Values per Attribute

#### data (ATTR-PRO-001)
- **Type**: array of Task objects
- **Allowed Values**: Array of task entities (root level tasks)
- **Constraints**: Can be empty array for empty projects

#### resources (ATTR-PRO-002)
- **Type**: array of Resource objects
- **Allowed Values**: Array of resource entities
- **Constraints**: Can be empty array

#### projectStartDate (ATTR-PRO-003)
- **Type**: datetime string or null
- **Allowed Values**: ISO 8601 format or null
- **Default**: null

#### projectEndDate (ATTR-PRO-004)
- **Type**: datetime string or null
- **Allowed Values**: ISO 8601 format or null
- **Default**: null

## Entity: Advanced Settings

### Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| columns | array | No | Column configuration for table view |
| zoomLevel | integer | No | Chart zoom level |
| timezone | string | No | Timezone identifier |
| timezoneOffset | integer | No | Timezone offset in minutes |
| dependencyConflict | string | No | Conflict resolution strategy |
| dateFormat | string | No | Date format pattern |
| timeFormat | string | No | Time format pattern |
| firstDayOfWeek | integer | No | First day of week (0=Sunday) |
| workWeek | array | No | Array of work day names |
| workTime | array | No | Work time periods |
| holidays | array | No | Array of holiday dates |

### Allowed Values per Attribute

#### columns (ATTR-PRO-005)
- **Type**: array of column objects
- **Structure**:
  ```json
  {
    "name": "string",
    "width": "string",
    "show": boolean
  }
  ```
- **Common Column Names**: "Task ID", "Task Name", "Start Date", "End Date", "Duration", "Progress %", "Dependency", "Resources", "Color"

#### zoomLevel (ATTR-PRO-006)
- **Type**: integer
- **Allowed Values**: Typically -1 to 5 (implementation specific)

#### timezone (ATTR-PRO-007)
- **Type**: string
- **Allowed Values**: IANA timezone identifiers (e.g., "Europe/Berlin", "UTC", "America/New_York")

#### timezoneOffset (ATTR-PRO-008)
- **Type**: integer
- **Allowed Values**: Minutes offset from UTC (e.g., -120 for UTC+2)

#### dependencyConflict (ATTR-PRO-009)
- **Type**: string
- **Allowed Values**: "Add Offset to Dependency", "Ignore", "Stop"

#### dateFormat (ATTR-PRO-010)
- **Type**: string
- **Allowed Values**: "yyyy-MM-dd", "MM/dd/yyyy", "dd/MM/yyyy", etc.

#### timeFormat (ATTR-PRO-011)
- **Type**: string
- **Allowed Values**: "HH:mm", "h:mm tt", "HH:mm:ss", etc.

#### firstDayOfWeek (ATTR-PRO-012)
- **Type**: integer
- **Allowed Values**: 0 (Sunday) to 6 (Saturday)

#### workWeek (ATTR-PRO-013)
- **Type**: array of strings
- **Allowed Values**: Array of day names: "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"

#### workTime (ATTR-PRO-014)
- **Type**: array of time period objects
- **Structure**:
  ```json
  {
    "from": integer (0-23),
    "to": integer (0-23)
  }
  ```

#### holidays (ATTR-PRO-015)
- **Type**: array
- **Allowed Values**: Array of date strings or holiday objects
- **Default**: []

### Functional Requirements

- [x] **FR-PRO-PRE-01** Support empty projects (data: [])
- [x] **FR-PRO-PRE-02** Support project date range (projectStartDate, projectEndDate)
- [x] **FR-PRO-PRE-03** Support timezone configuration
- [x] **FR-PRO-PRE-04** Support work week and work time settings
- [x] **FR-PRO-PRE-05** Support dependency conflict resolution settings