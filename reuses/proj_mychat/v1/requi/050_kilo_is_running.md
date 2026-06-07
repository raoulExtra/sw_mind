```yaml
title: 'Requirements: Kilo Is Running Function'
tags:
- kilo_client
- kilo_is_running
- requirements
persona: kilo_extension
status: active
version: V00.01.00
updated: 2026-06-05
summary: 'Requirements for kilo_is_running function.'
```

# Requirements: kilo_is_running Function

> Version: V00.01.00

## Functional Requirements

### Endpoint Check
- [x] **FR-KCCHECK-01** Check if Kilo server is running at attach endpoint
- [x] **FR-KCCHECK-02** Return `True` for any HTTP response (including 401)
- [x] **FR-KCCHECK-03** Return `False` on connection error or timeout

### Parameters
- [x] **FR-KCCHECK-04** `attach` parameter (string, default: "http://localhost:4096")

### Implementation
- [x] **FR-KCCHECK-05** Use `/api/status` endpoint for health check
- [x] **FR-KCCHECK-06** Set timeout of 2 seconds
- [x] **FR-KCCHECK-07** Catch all exceptions and return False

## Test

- [x] **TEST-KCCHECK-01** Test returns True when server running
- [x] **TEST-KCCHECK-02** Test returns False when server not running
- [x] **TEST-KCCHECK-03** Test timeout handling
- [x] **TEST-KCCHECK-04** Test harness file: `reuses/proj_mychat/v1/requi/harness/010_file_harness.md`

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-05 | ai(cline) | Initial requirements |