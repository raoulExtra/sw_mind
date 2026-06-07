```yaml
title: 'Requirements: Kilo Client Python'
tags:
- kilo_client
- python
- requirements
persona: kilo_extension
status: active
version: V00.04.00
updated: 2026-06-05
summary: 'Requirements derived from kilo_client.py v1/src source.'
```

# Requirements: Kilo Client Python

> Version: V00.04.00

## Overview

Python client library for calling Kilo AI from Python applications and command line.

## Functional Requirements

### Core Capabilities
- [x] **FR-KC-CORE-01** `kilo_run()` function executes Kilo with a message and returns parsed response
- [x] **FR-KC-CORE-02** `kilo_serve()` function starts a Kilo server process
- [x] **FR-KC-CORE-03** `kilo_is_running()` function checks if server is available
- [x] **FR-KC-CORE-04** Command line interface when run as `__main__`
- [x] **FR-KC-CORE-05** Echo test handling for "echo test" message

### kilo_run Parameters
- [x] **FR-KC-RUN-01** `message` parameter (required string)
- [x] **FR-KC-RUN-02** `model` parameter (optional string)
- [x] **FR-KC-RUN-03** `format` parameter (string, default: "json")
- [x] **FR-KC-RUN-04** `session` parameter (optional string)
- [x] **FR-KC-RUN-05** `continue_session` parameter (boolean)
- [x] **FR-KC-RUN-06** `attach` parameter (string, default: "http://localhost:4096")

### kilo_run Response
- [x] **FR-KC-RUN-07** Return dict with `events` (list of parsed JSON objects)
- [x] **FR-KC-RUN-08** Return dict with `text` (concatenated text from text events)
- [x] **FR-KC-RUN-09** Return dict with `session_id` (sessionID from first event or None)

### kilo_serve Parameters
- [x] **FR-KC-SERVE-01** `port` parameter (int, default: 0)
- [x] **FR-KC-SERVE-02** `hostname` parameter (string, default: "127.0.0.1")

### Error Handling
- [x] **FR-KC-ERR-01** Raise RuntimeError with stderr when Kilo exits with non-zero code

## Non-Functional Requirements

- [x] **FR-KC-NF-01** Default values for optional parameters
- [x] **FR-KC-NF-02** JSON parsing of newline-delimited output

## Test

- [x] **TEST-KC-01** Unit test for kilo_run with mock subprocess
- [x] **TEST-KC-02** Unit test for JSON event parsing
- [x] **TEST-KC-03** Unit test for text extraction from events
- [x] **TEST-KC-04** Unit test for kilo_serve process creation
- [x] **TEST-KC-05** Unit test for CLI with echo test
- [x] **TEST-KC-06** Unit test for kilo_is_running
- [x] **TEST-KC-07** Integration test with actual Kilo server (sim mode)
- [x] **TEST-KC-08** Test harness file: `reuses/proj_mychat/v1/requi/harness/010_file_harness.md`

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.04.00 | 2026-06-05 | ai(cline) | Fix kilo_is_running to return True on any HTTP response |
| V00.03.00 | 2026-06-05 | ai(cline) | Add usage documentation |
| V00.02.00 | 2026-06-05 | ai(cline) | Add kilo_is_running function |
| V00.01.00 | 2026-06-05 | ai(cline) | Initial requirements from kilo_client.py |