```yaml
title: 'Requirements: ULID Creation for User Inputs'
tags:
- flow_mind
- requirements
- ulid
- identifiers
- user-inputs
- v2
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-10
requi_id: REQUI-FM-V2-040
summary: 'Specifications for generating ULIDs for user input artifacts.'
```

# Requirements: ULID Creation for User Inputs

> Version: V00.01.00

## Overview

User inputs must be assigned unique, lexicographically sortable identifiers that are collision-resistant and time-ordered. ULIDs provide these properties while remaining URL-safe and database-friendly.

## Core Entities

| Entity | Description |
|--------|-------------|
| **ULID** | Unique, lexicographically sortable identifier |
| **User Input** | Artifact requiring unique identifier |

## Functional Requirements

- [x] **FR-FM-V2-51** Generate ULID for each user input artifact
  - *Acceptance*: ULID is 26 characters, Crockford's Base32 encoded, lexicographically sortable
- [x] **FR-FM-V2-52** ULID must encode creation timestamp
  - *Acceptance*: First 10 characters represent Unix timestamp in milliseconds
- [x] **FR-FM-V2-53** ULID must be collision-resistant
  - *Acceptance*: 80-bit randomness component ensures uniqueness across distributed generation
- [x] **FR-FM-V2-54** ULID must be URL-safe and case-insensitive
  - *Acceptance*: Uses 0-9 and A-Z characters, no special characters requiring encoding

## Non-Functional Requirements

### Uniqueness

- [x] **NFR-FM-V2-51** ULID generation must be highly unique
  - *Acceptance*: 80-bit randomness provides practical uniqueness
- [x] **NFR-FM-V2-52** ULID collision probability must be negligible
  - *Acceptance*: < 1 in 10^18 chance of collision in practical usage

### Performance

- [x] **NFR-FM-V2-53** ULID generation must be O(1) operation
  - *Acceptance*: Generation time < 1 microsecond on standard hardware
- [x] **NFR-FM-V2-54** ULID string operations must be efficient
  - *Acceptance*: Encoding/decoding uses native string operations

## Test

- [x] **TEST-FM-V2-51** Unit tests for ULID generation correctness
- [x] **TEST-FM-V2-52** Unit tests for ULID lexicographic ordering
- [x] **TEST-FM-V2-53** Unit tests for collision resistance validation
- [x] **TEST-FM-V2-54** Unit tests for timestamp encoding verification

## See Also

- Flow Mind v2 Requirements Index: `sw/flow_mind/v2/requi/index.md`
- ULID Specification: https://github.com/ulid/spec

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial ULID creation requirements |
| V00.02.00 | 2026-06-10 | ai(kilo laguna) | Unified FR/TEST IDs, fixed NFR for uniqueness |
| V00.03.00 | 2026-06-10 | ai(kilo laguna) | Implemented all requirements and tests |