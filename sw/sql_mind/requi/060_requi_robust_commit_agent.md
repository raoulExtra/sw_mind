```yaml
title: 'Requirements: Robust Commit Agent'
tags:
- sql_mind
- requirements
- reliability
- safety
- audit
persona: kilo_extension
status: draft
version: V00.01.00
updated: 2026-06-09
summary: 'CommitAgent must handle shutdown gracefully, validate SQL, and integrate audit logging.'
```

# Requirements: Robust Commit Agent

> Version: V00.01.00

## Overview

CommitAgent needs reliability improvements for production use: graceful shutdown, SQL safety, audit integration, and correct drain behavior.

## Functional Requirements

### Shutdown Handling

- [x] **REQ-SHUTDOWN-01** CommitAgent.close() must wake blocked queue.pop()
  - *Acceptance*: Calling close() on a blocked agent resolves drain() immediately
- [x] **REQ-SHUTDOWN-02** AsyncQueue must support close() that wakes blocked pop()
  - *Acceptance*: close() resolves any waiting pop() with a sentinel value

### SQL Safety

- [x] **REQ-SQL-01** Intent SQL must be validated before execution
  - *Acceptance*: Only SELECT, INSERT, UPDATE, DELETE statements allowed
- [x] **REQ-SQL-02** Intent must use safe SQL builder API
  - *Acceptance*: No raw SQL strings; use parameterized builder methods

### Audit Integration

- [x] **REQ-AUDIT-01** CommitAgent must accept optional AuditLog dependency
  - *Acceptance*: Constructor accepts AuditLog instance
- [x] **REQ-AUDIT-02** Each commit must be logged before execution
  - *Acceptance*: AuditLog.log() called with intent details before processing

### Queue Behavior

- [x] **REQ-QUEUE-01** drain() must resolve immediately when no intents submitted
  - *Acceptance*: drain() returns resolved Promise if submittedCount === 0
- [x] **REQ-QUEUE-02** process() must be marked @internal
  - *Acceptance*: JSDoc indicates internal use; bypasses queue for testing only

### System Integration

- [x] **REQ-SYS-01** End-to-end flow from intent submission to database persistence
  - *Acceptance*: Intent submitted via CLI → written to database → verified via query
- [x] **REQ-SYS-02** Audit log persists across agent restarts
  - *Acceptance*: Audit entries survive CommitAgent.close() and new instance creation
- [x] **REQ-SYS-03** Graceful shutdown preserves pending writes
  - *Acceptance*: Pending intents processed before exit when close() called

## Implementation Notes

- Default path: `sw/sql_mind/res/env.db`
- CLI format: `node index.js --db ./custom/path.db`
- Backward compatible with in-memory database for tests

## See Also

- Code Review: `sw/sql_mind/reviews/010_code_review_chatgpt.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial robust commit agent requirements |