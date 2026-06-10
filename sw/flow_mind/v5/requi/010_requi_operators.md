---
title: 'Requirements: Flow Mind v4 Guard Operator Grammar'
tags:
- flow_mind
- requirements
- v4
- guards
- operators
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-10
summary: 'Formal operator grammar and semantics for Flow Mind v4 guard evaluation.'
---

# Requirements: Guard Operator Grammar

> Version: V00.01.00

## Overview

Flow Mind v4 guard evaluation uses a structured operator grammar to express boolean conditions, compound logic, and optional negation. This file defines the supported grammar, normalization rules, and validation behavior for guard expressions.

## Core Entities

| Entity | Description |
|--------|-------------|
| **Guard** | A boolean expression used to control transition eligibility |
| **Operator** | A comparison or logical operator in a guard expression |
| **Payload** | Input data evaluated by the guard |
| **Context** | Persistent flow state available during guard evaluation |

## Functional Requirements

- [ ] **FR-FM-V4-01** Guard operator grammar definition
  - *Acceptance*: Grammar supports comparison, membership, regex, and logical operators
  - *Acceptance*: Grammar supports both key-value and operator-as-key forms
- [ ] **FR-FM-V4-02** Guard normalization
  - *Acceptance*: `op:` form normalizes to operator-as-key form before evaluation
- [ ] **FR-FM-V4-03** Compound guard logic
  - *Acceptance*: `and`, `or`, and `not` are evaluable with standard boolean semantics
- [ ] **FR-FM-V4-04** Missing field handling
  - *Acceptance*: Missing field values evaluate to `null`/`undefined` and do not crash the guard interpreter
- [ ] **FR-FM-V4-05** Invalid operator validation
  - *Acceptance*: Unknown operator names fail validation with a clear error message

## Operator Grammar

A valid guard expression may take any of the following forms:

```yaml
Guard :=
  { op: <operator>, field: <string>, value: <literal> }
  | { <operator>: { field: <string>, value: <literal> } }
  | { and: [Guard, ...] }
  | { or: [Guard, ...] }
  | { not: Guard }
```

Supported operators include:

- `equals`
- `not_equals`
- `contains`
- `regex`
- `greater_than`
- `less_than`
- `in`
- `not_in`

### Normalization Example

```yaml
# operator-as-key form
{ equals: { field: status, value: approved } }

# op-based form
{ op: equals, field: status, value: approved }
```

The guard interpreter must normalize both forms to a common internal representation.

## Evaluation Semantics

- `and` and `or` must short-circuit when possible.
- `not` must negate the evaluated boolean result of its nested guard.
- `contains` should work for strings and collections.
- `regex` should support standard regular expressions.
- Missing field data should be treated as `null`/`undefined` and evaluated safely.

## Validation Rules

- Unknown operators are invalid.
- Guards with missing `field` or `value` are invalid.
- Compound guards must contain at least one nested guard.
- `not` must contain exactly one nested guard.

## Test

- [ ] **TEST-FM-V4-01** Unit tests for operator grammar parsing
- [ ] **TEST-FM-V4-02** Unit tests for normalization of guard forms
- [ ] **TEST-FM-V4-03** Unit tests for compound guard evaluation
- [ ] **TEST-FM-V4-04** Unit tests for missing field handling
- [ ] **TEST-FM-V4-05** Unit tests for invalid operator validation