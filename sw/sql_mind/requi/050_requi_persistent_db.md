```yaml
title: 'Requirements: Persistent Database Storage'
tags:
- sql_mind
- requirements
- database
- persistence
- configuration
persona: kilo_extension
status: draft
version: V00.01.00
updated: 2026-06-09
summary: 'Database file should be configurable and persisted across sessions.'
```

# Requirements: Persistent Database Storage

> Version: V00.01.00

## Overview

The SQLite database should be configurable via command-line argument and persisted by default, not removed on shutdown.

## Functional Requirements

### Database Configuration

- [x] **REQ-DB-01** Database path must be configurable via command-line argument
  - *Acceptance*: `--db <path>` or `-d <path>` option accepted
- [x] **REQ-DB-02** Default database path is `sw/sql_mind/res/env.db`
  - *Acceptance*: When no argument provided, uses default path
- [x] **REQ-DB-03** Database file must be created if it does not exist
  - *Acceptance*: First write creates the file
- [x] **REQ-DB-04** Existing database file must be preserved on startup
  - *Acceptance*: Application reads existing data, does not truncate
- [x] **REQ-DB-05** Database file must not be deleted on shutdown
  - *Acceptance*: File persists after application exits

### Database Access

- [x] **REQ-DB-06** CommitAgent accepts database path or connection
  - *Acceptance*: Constructor accepts string path or Database instance
- [x] **REQ-DB-07** Database connection is properly managed
  - *Acceptance*: Connection opened on init, closed on shutdown

## Implementation Notes

- Default path: `sw/sql_mind/res/env.db`
- CLI format: `node index.js --db ./custom/path.db`
- Backward compatible with in-memory database for tests

## See Also

- Requirements: `sw/sql_mind/requi/020_requi_agent_writes_ot_mult.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial database persistence requirements |