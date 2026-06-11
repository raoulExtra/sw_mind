```yaml
title: 'Requirements: Observed Folders Tracking'
tags:
- file_mind
- requirements
- v1
- database
- folders
- observation
persona: developer
status: draft
version: V00.02.00
updated: 2026-06-11
requi_id: REQUI-FM-V1-004
summary: 'Track folders under observation in file.db for file monitoring.'
```

# Requirements: Observed Folders Tracking

> Version: V00.02.00

## Overview

A separate table or mechanism to store folders which are under observation, enabling selective file tracking and monitoring.

## Functional Requirements

### Observed Folders Table

- [ ] **REQ-OBS-01** Store observed folders in file.db
  - *Acceptance*: Table named `observed_folders`
  - *Acceptance*: Column: `folder_path` (string)
- [ ] **REQ-OBS-02** Support multiple observed folders
  - *Acceptance*: Each folder as separate row
  - *Acceptance*: Allow duplicates prevention
- [ ] **REQ-OBS-03** Track folder addition timestamp
  - *Acceptance*: Column: `added_date` (datetime)
- [ ] **REQ-OBS-04** Support adding folders via CLI
  - *Acceptance*: `--observe` flag with folder path
  - *Acceptance*: Default folders if none specified

### Default Observed Folders

- [ ] **REQ-OBS-05** Default observed folder is current path
  - *Acceptance*: `sw/file_mind/res` by default
  - *Acceptance*: Resolved relative to path argument

## Implementation Notes

- Table: `observed_folders(folder_path, added_date)`
- CLI: `--observe <folder>` to add
- Default: `sw/file_mind/res` when no folders specified
- Relationship: Files tracked in `files` table belong to observed folders

### CLI Commands (fi_cli)

- [ ] **REQ-OBS-06** List observed folders via fi_cli
  - *Acceptance*: `fi_cli list_obs_folders` command
  - *Acceptance*: Output: one folder per line
- [ ] **REQ-OBS-07** Delete observed folders via fi_cli
  - *Acceptance*: `fi_cli delete_obs_folder <folder>` command
  - *Acceptance*: Removes folder from observed_folders table
- [ ] **REQ-OBS-08** Add observed folders via fi_cli
  - *Acceptance*: `fi_cli add_obs_folder <folder>` command
  - *Acceptance*: Adds folder to observed_folders table

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.02.00 | 2026-06-11 | ai(kilo laguna) | Added CLI commands for list/delete/add observed folders |
| V00.01.00 | 2026-06-11 | ai(kilo laguna) | Initial requirement |