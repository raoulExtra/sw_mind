```yaml
title: 'Requirements: Kilo Client Test Harness'
tags:
- kilo_client
- test_harness
- requirements
persona: kilo_extension
status: active
version: V00.06.00
updated: 2026-06-05
summary: 'Requirements for test harness file processing.'
```

# Requirements: Kilo Client Test Harness

> Version: V00.06.00

## Functional Requirements

### File Processing
- [x] **FR-HARN-01** A file given as argument should be processed line by line
- [x] **FR-HARN-02** Each line should be passed to `python kilo_client.py <line>`
- [x] **FR-HARN-03** Output from each line execution should be stored in a separate file with an incremental counter

### Test File Format
- [x] **FR-HARN-04** Test file should contain one query per line
- [x] **FR-HARN-05** Lines may be empty or start with `#` for comments

### Test Execution
- [x] **FR-HARN-06** TDD workflow: write test first, implement, refactor
- [x] **FR-HARN-07** Test coverage should be verified against requirements
- [x] **FR-HARN-08** Each model answer should be stored in a separate file named `answer_<counter>.txt`
- [x] **FR-HARN-09** Pure text answer should be stored in `answer_pure_<counter>.txt`

## Test

- [x] **TEST-HARN-01** Test line-by-line file processing
- [x] **TEST-HARN-02** Test comment handling
- [x] **TEST-HARN-03** Test empty line handling
- [x] **TEST-HARN-04** used testfile is documented in reuses/proj_mychat/v1/README.md
- [x] **TEST-HARN-05** Test harness script exists and is executable
- [x] **TEST-HARN-06** Test test queries file exists
- [x] **TEST-HARN-07** Test each answer stored in separate file with incremental counter
- [x] **TEST-HARN-08** Test pure text answer stored in answer_pure_<counter>.txt
---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-05 | kilo laguna | Initial requirements |
| V00.03.00 | 2026-06-05 | kilo laguna | Add test file and harness script |
| V00.04.00 | 2026-06-05 | kilo laguna | Add additional tests for harness script and test file |
| V00.05.00 | 2026-06-05 | kilo laguna | Each model answer in separate file with incremental counter |
| V00.06.00 | 2026-06-05 | kilo laguna | Add pure text answer files (answer_pure_<counter>.txt) |