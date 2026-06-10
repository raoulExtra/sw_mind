```yaml
title: 'Summary: Executor Write Queue Architecture'
tags:
- sql_mind
- summary
- architecture
status: active
version: V00.01.00
updated: 2026-06-09
```

# Summary: Executor Write Queue Architecture

## Core Design

**Centralized serialization** via a commit agent that processes write intents from a SQLite queue table.

## Key Decisions

| Aspect | Decision |
|--------|----------|
| Deployment | Single-process Node.js, direct SQLite access |
| Queue | `write_intent_queue` table in same database |
| Schema | 3 tables: queue, audit_log, dead_letter_queue |
| Processing | Per-intent transactions with AUTOINCREMENT ordering |
| Failure | 3-phase: retry (5x) → dead-letter → operator review |
| Replay | Full deterministic replay from audit_log |

## Safety Rules

1. Executors write ONLY to `write_intent_queue` table
2. Only commit agent mutates domain state
3. Each intent processed in its own transaction
4. Graceful shutdown: finish current intent, then exit

## Reference

See `requi/020_requi_agent_writes_ot_mult.md` for full requirements.