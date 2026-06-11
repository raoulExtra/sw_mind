```yaml
title: 'Requirements: File CLI Path Argument'
tags:
- file_mind
- requirements
- v1
- cli
- path
- argument
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-11
requi_id: REQUI-FM-V1-002
summary: 'All file CLI programs must support a path argument defaulting to sw/file_mind/res.'
```

# Requirements: File CLI Path Argument

> Version: V00.01.00

## Overview

All file CLI programs must support a path argument that defaults to `sw/file_mind/res`.

## Functional Requirements

### Path Argument

- [ ] **REQ-PATH-01** CLI programs must accept a path argument
  - *Acceptance*: Positional or `--path` flag support
  - *Acceptance*: Type: string (file system path)
- [ ] **REQ-PATH-02** Default path must be `sw/file_mind/res`
  - *Acceptance*: When no path provided, uses `sw/file_mind/res`
- [ ] **REQ-PATH-03** Path must be validated as existing directory
  - *Acceptance*: Error if path does not exist
  - *Acceptance*: Error if path is not a directory
- [ ] **REQ-PATH-04** Path must support relative and absolute paths
  - *Acceptance*: Relative paths resolved from current working directory
  - *Acceptance*: Absolute paths used as-is

## Implementation Notes

- Default: `sw/file_mind/res`
- Resolution: `process.cwd()` based for relative paths
- Validation: exists and is directory
- Error handling: non-zero exit code with descriptive message

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-11 | ai(kilo laguna) | Initial requirement |