```yaml
title: 'Requirements: File Database Tracking'
tags:
- file_mind
- requirements
- v1
- database
- file
- tracking
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-11
requi_id: REQUI-FM-V1-003
summary: 'File database must track file information including path, filename, size, and changed date.'
```

# Requirements: File Database Tracking

> Version: V00.01.00

## Overview

A file.db must be maintained in the path folder to track file information including path, filename, size, and changed date.

## Functional Requirements

### File Database

- [ ] **REQ-DB-01** File database must exist in path folder
  - *Acceptance*: File named `file.db` in the path folder
  - *Acceptance*: Format: SQLite or JSON Lines
- [ ] **REQ-DB-02** Track file path
  - *Acceptance*: Full relative path from path folder root
  - *Acceptance*: Type: string
- [ ] **REQ-DB-03** Track filename
  - *Acceptance*: Base filename without directory
  - *Acceptance*: Type: string
- [ ] **REQ-DB-04** Track file size
  - *Acceptance*: Size in bytes
  - *Acceptance*: Type: integer
- [ ] **REQ-DB-05** Track changed date
  - *Acceptance*: Last modification timestamp
  - *Acceptance*: Type: ISO 8601 datetime string

### Database Operations

- [ ] **REQ-DB-06** Must create database on first run
  - *Acceptance*: Creates `file.db` if not exists
- [ ] **REQ-DB-07** Must update entries on file changes
  - *Acceptance*: Detect file modifications and update timestamp
  - *Acceptance*: Update size when file size changes
- [ ] **REQ-DB-08** Must scan directory recursively
  - *Acceptance*: Include all files in subdirectories
  - *Acceptance*: Exclude `file.db` from tracking

## Implementation Notes

- Database format: SQLite recommended
- Scan trigger: CLI invocation
- Update strategy: Full rescan or incremental
- Exclusion: `file.db` itself

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-11 | ai(kilo laguna) | Initial requirement |