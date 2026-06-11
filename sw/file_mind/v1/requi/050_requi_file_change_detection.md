```yaml
title: 'Requirements: File Change Detection'
tags:
- file_mind
- requirements
- v1
- monitoring
- detection
- changes
- removal
- update
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-11
requi_id: REQUI-FM-V1-005
summary: 'Detect and report file removals and updates in observed folders.'
```

# Requirements: File Change Detection

> Version: V00.01.00

## Overview

Immediate detection of file changes in observed folders, including file removals and updates (size changes).

## Functional Requirements

### File Removal Detection

- [ ] **REQ-CHANGE-01** Detect file removal in observed folders
  - *Acceptance*: Compare current files with file.db entries
  - *Acceptance*: Report files in DB but not on disk
- [ ] **REQ-CHANGE-02** Report removed file paths
  - *Acceptance*: Output: `<folder_path>/<filename>` for each removed file

### File Update Detection

- [ ] **REQ-CHANGE-03** Detect file size changes
  - *Acceptance*: Compare current size with stored size in file.db
  - *Acceptance*: Report files with different size
- [ ] **REQ-CHANGE-04** Report updated file paths
  - *Acceptance*: Output: `<folder_path>/<filename> (old_size -> new_size)`

### Change Reporting

- [ ] **REQ-CHANGE-05** Report changes via CLI
  - *Acceptance*: `fi_cli check_changes` command
  - *Acceptance*: Exit code 0 if no changes, 1 if changes detected
- [ ] **REQ-CHANGE-06** Display changes in human-readable format
  - *Acceptance*: Removed: `<path>`
  - *Acceptance*: Updated: `<path> (<old> -> <new>)`

## Implementation Notes

- Trigger: Manual via `fi_cli check_changes`
- Compare: file.db entries vs actual filesystem
- Output: stdout, one change per line
- Performance: Full rescan of observed folders

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-11 | ai(kilo laguna) | Initial requirement |