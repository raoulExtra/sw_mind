```yaml
title: 'Learning: grill-me Super AI Design Pattern'
tags:
- sql_mind
- learning
- grill-me
- design
- architecture
persona: kilo
status: completed
version: V00.01.00
updated: 2026-06-09
summary: 'How to use grill-me for systematic design decisions with super-AI reasoning.'
```

# Learning: grill-me Super AI Design Pattern

## Context

The `grill-me` skill enables systematic stress-testing of design decisions through interactive questioning. When combined with super-AI reasoning (evaluating options against deterministic, safe, testable, cross-language criteria), it produces robust design choices.

## Pattern

1. **Present a design question** with 5 options
2. **Evaluate each option** against quality criteria:
   - Deterministic behavior
   - Safety (no race conditions, no data corruption)
   - Testability
   - Cross-language symmetry
   - Non-blocking operation
3. **Select the option** that uniquely satisfies all criteria
4. **Document the rationale** for future reference

## Examples from SQL Mind

### Q1: close() handling for blocked pop()
**Chosen**: Add `close()` to AsyncQueue that wakes blocked `pop()`
**Why unique winner**:
- Deterministic: No timing dependencies
- Safe: No WAL corruption risk
- No pollution: No poison-pill in real queue
- No timeouts: No race conditions

### Q2: process() visibility  
**Chosen**: Keep public but mark `@internal` for testing
**Why unique winner**:
- Preserves testability through queue
- Enforces queue-only writes
- Cross-language symmetric annotation
- No runtime overhead

### Q3: Audit integration
**Chosen**: Dependency injection of AuditLog
**Why unique winner**:
- Deterministic commit flow
- Testable with mocks
- Clean separation of concerns
- Substitutable implementations

### Q4: SQL safety
**Chosen**: Safe SQL builder API
**Why unique winner**:
- Zero string concatenation risk
- Schema-aware construction
- Parameterized by default
- Extensible for migrations

### Q5: drain() zero submissions
**Chosen**: Early return if `submittedCount === 0`
**Why unique winner**:
- Non-blocking
- Consistent with queue semantics
- No extra state tracking
- Cross-language compatible

## Application

This pattern can be applied to any design decision:
1. Frame the question as a trade-off
2. Generate 5 distinct options
3. Evaluate against objective criteria
4. Document the winning rationale

## See Also

- Skill: `grill-me`
- Review: `sw/sql_mind/reviews/010_code_review_chatgpt.md`
- Requirements: `sw/sql_mind/requi/060_requi_robust_commit_agent.md`