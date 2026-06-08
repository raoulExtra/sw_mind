```yaml
title: 'Requirements: Gantt File Format Compliance'
tags:
- gantt
- planning
- requirements
- file-format
- compliance
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-07
summary: 'Gantt file format requirements for planning examples. Ensures compatibility with Online Gantt format.'
```

# Requirements: Gantt File Format Compliance

> Version: V00.01.00

## Overview

Requirements for Gantt file format compliance in planning examples. Ensures generated `.gantt` files match the structure and format of Online Gantt files.

## Functional Requirements

### File Structure
- [x] **FR-GANTT-01** Support minified JSON format (single line)
- [x] **FR-GANTT-02** Include `data` array with task objects
- [x] **FR-GANTT-03** Include `resources` array
- [x] **FR-GANTT-04** Include `projectStartDate` and `projectEndDate` fields
- [x] **FR-GANTT-05** Include `advanced` configuration object

### Task Requirements
- [x] **FR-GANTT-06** Include `TaskID` (number)
- [x] **FR-GANTT-07** Include `TaskName` (string)
- [x] **FR-GANTT-08** Include `StartDate` (ISO date string)
- [x] **FR-GANTT-09** Include `EndDate` (ISO date string)
- [x] **FR-GANTT-10** Include `Duration` (number)
- [x] **FR-GANTT-11** Include `resources` array with `resourceId` and `resourceName`
- [x] **FR-GANTT-12** Include `Progress` (number 0-100)
- [x] **FR-GANTT-13** Include optional `subtasks` array
- [x] **FR-GANTT-14** Include `unit` field in task resources
- [x] **FR-GANTT-15** Include `Predecessor`, `DurationUnit`, `info` optional fields

### Advanced Configuration
- [x] **FR-GANTT-16** Include column definitions in `advanced.columns`
- [x] **FR-GANTT-17** Include `zoomLevel` in advanced settings
- [x] **FR-GANTT-18** Include `timezone` and `timezoneOffset`
- [x] **FR-GANTT-19** Include `workWeek` array
- [x] **FR-GANTT-20** Include `workTime` array with `from`/`to` hours

### Format Requirements
- [x] **FR-GANTT-21** Use UTF-8 encoding
- [x] **FR-GANTT-22** No trailing newline
- [x] **FR-GANTT-23** Consistent key ordering

## Non-Functional Requirements

- [x] **FR-GANTT-NF-01** Files must be valid JSON
- [x] **FR-GANTT-NF-02** Compatible with Online Gantt parser
- [x] **FR-GANTT-NF-03** Human-readable when formatted (pretty-printed)

## Example

### Problematic: bad_Gantt 20260607.gantt (missing fields)
```json
{"data":[{"TaskID":1,"TaskName":"Example Task","StartDate":"2026-06-01T06:00:00.000Z","EndDate":"2026-06-05T15:00:00.000Z","Duration":5,"resources":[{"resourceId":"Team Member 1","resourceName":"Team Member 1"}],"Progress":50,"subtasks":[{"TaskID":2,"TaskName":"Subtask 1","StartDate":"2026-06-01T06:00:00.000Z","EndDate":"2026-06-03T15:00:00.000Z","Duration":3,"resources":[{"resourceId":"Team Member 1","resourceName":"Team Member 1"}],"Progress":80}]}],"resources":[{"resourceId":"Team Member 1","resourceName":"Team Member 1"}],"projectStartDate":null,"projectEndDate":null,"advanced":{"columns":[{"name":"Task ID","width":"70","show":true},{"name":"Task Name","width":"350","show":true},{"name":"Start Date","width":"130","show":false},{"name":"End Date","width":"130","show":false},{"name":"Duration","width":"130","show":false},{"name":"Progress %","width":"100","show":true}]}}
```

**Missing:**
- `unit` in task resources
- `Predecessor`, `DurationUnit`, `info` fields
- `Color` column in advanced.columns
- Extended advanced settings (zoomLevel, timezone, workTime, etc.)

### Reference: Online Gantt 20260607.gantt (complete)
```json
{"data":[{"TaskID":1,"TaskName":"Example Task","StartDate":"2026-06-01T06:00:00.000Z","EndDate":"2026-06-05T15:00:00.000Z","Duration":3,"resources":[{"resourceId":"Team Member 1","resourceName":"Team Member 1","unit":100}],"Progress":80,"subtasks":[{"TaskID":2,"TaskName":"Subtask 1","StartDate":"2026-06-01T06:00:00.000Z","EndDate":"2026-06-03T15:00:00.000Z","Duration":3,"resources":[{"resourceId":"Team Member 1","resourceName":"Team Member 1","unit":100}],"Progress":80,"DurationUnit":"day","info":null}],"Predecessor":null,"DurationUnit":"day","info":null}],"resources":[{"resourceId":"Team Member 1","resourceName":"Team Member 1"}],"projectStartDate":null,"projectEndDate":null,"advanced":{"columns":[{"name":"Task ID","width":"70","show":true},{"name":"Task Name","width":"350","show":true},{"name":"Start Date","width":"130","show":false},{"name":"End Date","width":"130","show":false},{"name":"Duration","width":"130","show":false},{"name":"Progress %","width":"100","show":true},{"name":"Color","width":"100","show":false}],"zoomLevel":0,"timezone":"Europe/Berlin","timezoneOffset":-120,"dependencyConflict":"Add Offset to Dependency","dateFormat":"yyyy-MM-dd","timeFormat":"HH:mm","firstDayOfWeek":0,"workWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"workTime":[{"from":8,"to":12},{"from":13,"to":17}],"holidays":[]}}
```

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-07 | ai(kilo laguna) | Initial requirements for Gantt format compliance |
| V00.01.01 | 2026-06-07 | ai(kilo laguna) | Identified missing fields in bad_Gantt vs Online Gantt |