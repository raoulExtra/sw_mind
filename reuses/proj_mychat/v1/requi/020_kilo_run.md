```yaml
title: 'Requirements: Kilo Run Function'
tags:
- kilo_client
- kilo_run
- requirements
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-05
summary: 'Requirements for kilo_run function.'
```

# Requirements: kilo_run Function

> Version: V00.01.00

## Functional Requirements

### Command Execution
- [x] **FR-KCRUN-01** Execute `npx kilo run <message>` via subprocess
- [x] **FR-KCRUN-02** Capture stdout and stderr from subprocess

### Flags
- [x] **FR-KCRUN-03** Add `--format=<format>` flag (default: "json")
- [x] **FR-KCRUN-04** Add `--attach=<attach>` flag (default: "http://localhost:4096")
- [x] **FR-KCRUN-05** Add `--model=<model>` flag when model is provided
- [x] **FR-KCRUN-06** Add `--session <session>` and `session` flags when session is provided
- [x] **FR-KCRUN-07** Add `--continue` flag when continue_session is True

### Response Parsing
- [x] **FR-KCRUN-08** Parse newline-delimited JSON from stdout into events list
- [x] **FR-KCRUN-09** Extract text from events where `type == "text"`
- [x] **FR-KCRUN-10** Concatenate text parts into single text string
- [x] **FR-KCRUN-11** Extract sessionID from first event as session_id

### Return Value
- [x] **FR-KCRUN-12** Return dict with `events`, `text`, `session_id` keys

## Test

- [x] **TEST-KCRUN-01** Test default flags present in command
- [x] **TEST-KCRUN-02** Test optional model flag added
- [x] **TEST-KCRUN-03** Test optional session flag added
- [x] **TEST-KCRUN-04** Test continue flag added when True
- [x] **TEST-KCRUN-05** Test response parsing and text extraction
- [x] **TEST-KCRUN-06** Test session_id extraction

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-05 | ai(cline) | Initial requirements |