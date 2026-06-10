```yaml
title: 'Requirements: Better-SQLite3 for In-Memory Executor Exchange'
tags:
- sql_mind
- requirements
- better-sqlite3
- in-memory
- audit
- persistence
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-09
summary: 'Use better-sqlite3 for in-memory agent exchange with file-based audit trail.'
```

# Requirements: Better-SQLite3 for In-Memory Executor Exchange

> Version: V00.01.00

## Overview

Use better-sqlite3 to enable agents to exchange data via in-memory databases while maintaining auditability through file-based persistence of critical operations.

## Functional Requirements

### In-Memory Exchange

- [ ] **FR-BSQL-01** Executors must use in-memory SQLite for fast data exchange
  - *Acceptance*: Database created with `:memory:` or `file::memory:?cache=shared`
- [ ] **FR-BSQL-02** In-memory databases must support concurrent access
  - *Acceptance*: Shared cache mode allows multiple connections
- [ ] **FR-BSQL-03** In-memory operations must be synchronous
  - *Acceptance*: better-sqlite3 synchronous API for deterministic ordering

### Audit Persistence

- [ ] **FR-BSQL-04** Critical operations must be audited to file
  - *Acceptance*: Write intents persisted to file-based audit_log table
- [ ] **FR-BSQL-05** Audit trail must be replayable
  - *Acceptance*: File can be used to reconstruct state history
- [ ] **FR-BSQL-06** Audit must not block in-memory operations
  - *Acceptance*: Async write to file with guaranteed durability

### Data Flow

- [ ] **FR-BSQL-07** Executors read/write to in-memory database
  - *Acceptance*: Zero I/O latency for inter-agent communication
- [ ] **FR-BSQL-08** Audit sink writes to file database
  - *Acceptance*: Separate connection to file-based database

## Non-Functional Requirements

### Performance

- [ ] **NFR-BSQL-01** In-memory operations must be sub-millisecond
  - *Acceptance*: P99 < 1ms for read/write operations
- [ ] **NFR-BSQL-02** Audit writes must be batched
  - *Acceptance*: Batch size configurable, flushed every N operations or T seconds

### Reliability

- [ ] **NFR-BSQL-03** In-memory data must survive process restart via audit
  - *Acceptance*: File-based audit enables state reconstruction
- [ ] **NFR-BSQL-04** File audit must be ACID-compliant
  - *Acceptance*: SQLite WAL mode for concurrent reads

## Test

- [ ] **TEST-BSQL-01** Unit tests for in-memory database operations
- [ ] **TEST-BSQL-02** Unit tests for shared cache concurrency
- [ ] **TEST-BSQL-03** Unit tests for audit file persistence
- [ ] **TEST-BSQL-04** Integration tests for in-memory/file synchronization

## See Also

- Executor Write Queue: `020_requi_agent_writes_ot_mult.md`
- SQLite Rationale: `sw/sql_mind/rationales/010_ratio_sqlite.md`
- Hidden Simulations: `sw/flow_mind/v99/requi/010_requi_hidden_simulations.md`

## Architecture

```
Executor 1 ──┐
Executor 2 ──┼──> In-Memory DB (fast exchange)
Executor N ──┘
                    │
                    ▼
              Audit Sink ──> File DB (persistent audit)
```

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial better-sqlite3 requirements |