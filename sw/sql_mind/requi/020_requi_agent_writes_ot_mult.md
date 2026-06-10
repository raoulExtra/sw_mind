```yaml
title: 'Requirements: Executor Write Queue for Multi-Executor SQLite'
tags:
- sql_mind
- requirements
- agent
- write-queue
- multi-agent
- sqlite
- determinism
- auditability
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-09
summary: 'Centralized serialization mechanism for multiple agents writing to SQLite.'
```

# Requirements: Executor Write Queue for Multi-Executor SQLite

> Version: V00.01.00

## Overview

A write-queue (commit agent) solves the challenges of high write rates, multiple agents, deterministic ordering, explainability, auditability, and avoiding lock contention entirely. This is a centralized serialization mechanism.

## Functional Requirements

### Write Queue

- [ ] **FR-WRITEQ-01** Executors must send write requests to a centralized queue
  - *Acceptance*: In-process AsyncQueue, MessageChannel, Redis stream, or HTTP endpoint
- [ ] **FR-WRITEQ-02** Queue must preserve write order
  - *Acceptance*: FIFO ordering guarantees deterministic commit sequence
- [ ] **FR-WRITEQ-03** Queue must handle backpressure
  - *Acceptance*: Blocking or buffering prevents memory exhaustion

### Write Intent Format

- [ ] **FR-WRITEQ-04** Write intents must include unique identifier
  - *Acceptance*: ULID provides lexicographically sortable, collision-resistant ID
- [ ] **FR-WRITEQ-05** Write intents must include SQL statement
  - *Acceptance*: Parameterized SQL for safe execution
- [ ] **FR-WRITEQ-06** Write intents must include agent identifier
  - *Acceptance*: String identifying the sending agent for traceability
- [ ] **FR-WRITEQ-07** Write intents must include timestamp
  - *Acceptance*: Unix timestamp for audit and ordering

### Commit Executor Loop

- [ ] **FR-WRITEQ-08** Commit agent must process one intent at a time
  - *Acceptance*: Single-threaded processing ensures no lock contention
- [ ] **FR-WRITEQ-09** Each commit must be ACID-compliant
  - *Acceptance*: Wrapped in BEGIN/COMMIT with ROLLBACK on error
- [ ] **FR-WRITEQ-10** Commit agent must log all operations
  - *Acceptance*: Success and failure logged with intent ID and agent ID

### Audit Trail

- [ ] **FR-WRITEQ-11** All write intents must be stored before application
  - *Acceptance*: audit_log table captures every intent
- [ ] **FR-WRITEQ-12** Audit log must be queryable
  - *Acceptance*: SQL queries can replay, debug, and analyze operations

## Non-Functional Requirements

### Determinism

- [ ] **NFR-WRITEQ-01** Write order must be deterministic
  - *Acceptance*: Same sequence of writes produces same database state

### Safety

- [ ] **NFR-WRITEQ-02** Executors must never write directly to SQLite
  - *Acceptance*: Only commit agent touches database

## Test

- [x] **TEST-WRITEQ-01** Unit tests for AsyncQueue push/pop ordering (tests FR-WRITEQ-01, FR-WRITEQ-02, FR-WRITEQ-03)
- [x] **TEST-WRITEQ-02** Unit tests for write intent format validation (tests FR-WRITEQ-04, FR-WRITEQ-05, FR-WRITEQ-06, FR-WRITEQ-07)
- [x] **TEST-WRITEQ-03** Unit tests for commit agent error handling (tests FR-WRITEQ-08, FR-WRITEQ-09, FR-WRITEQ-10)
- [x] **TEST-WRITEQ-04** Unit tests for audit log insertion and retrieval (tests FR-WRITEQ-11, FR-WRITEQ-12)

## See Also

- Flow Mind v2 Requirements: `sw/flow_mind/v2/requi/020_requi_ulid_creation.md`
- SQLite Rationale: `sw/sql_mind/rationales/010_ratio_sqlite.md`
- Better-SQLite3: `030_requi_better_sqlite3.md`

## Architecture

```
Executor A ----\
Executor B -----\ 
Executor C ------>  AsyncQueue  --->  Commit Executor  ---> SQLite (single writer)
Executor D -----/
```

## Code Reference

```typescript
class AsyncQueue<T> {
  private queue: T[] = [];
  private resolvers: ((value: T) => void)[] = [];

  push(item: T) {
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift()!;
      resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  async pop(): Promise<T> {
    if (this.queue.length > 0) {
      return this.queue.shift()!;
    }
    return new Promise(resolve => this.resolvers.push(resolve));
  }
}

interface WriteIntent {
  id: string;
  sql: string;
  params?: any[];
  agentId: string;
  timestamp: number;
}
```

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial write queue requirements |