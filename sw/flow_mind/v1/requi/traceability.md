---
title: "Traceability: Flow Mind v1"
version: V00.01.00
updated: 2026-06-10
---

# Traceability Matrix — Flow Mind v1

This file maps requirements to tests and suggested implementation targets.

- **FR-FM-OO-01** Flow definition with states, transitions, and permissions
  - Test: **TEST-FM-OO-01**
  - Example: `sw/flow_mind/res/v1/example_flow.yaml`
  - Implementation target: `src/ts/fm_cli.ts` -> `loadFlow()` / `Flow` model

- **FR-FM-OO-02** Executor capability specification with ambiguity handling
  - Test: **TEST-FM-OO-02**
  - Example: add `requi/executor_capabilities.yaml`
  - Implementation target: `src/ts/agent/*` (IExecutor)

- **FR-FM-OO-03** Verifier rule definitions with validation criteria
  - Test: **TEST-FM-OO-03**
  - Implementation target: `src/ts/verifier/*` (IVerifier)

- **FR-FM-OO-04** State representation with encapsulated data and transitions
  - Test: **TEST-FM-OO-04**
  - Example: state snapshot in `requi/090_examples.md`
  - Implementation target: persistent `FlowState` model and audit trail (`state.json` / DB)

- **FR-FM-OO-05** Artifact classes for plans, outputs, and verification results
  - Test: **TEST-FM-OO-05**
  - Implementation target: `src/ts/artifacts/*` and schema files under `requi/schemas/`

- **FR-FM-OO-06** CLI must support `--help` and `--version`
  - Test: **TEST-FM-OO-06**
  - Implementation target: `src/ts/fm_cli.ts` CLI argument handling

- **FR-FM-OO-07** CLI must support `--examples`
  - Test: **TEST-FM-OO-07**
  - Implementation target: `src/ts/fm_cli.ts` display examples

- **FR-FM-OO-08** Guard for a transition can be null
  - Test: add unit test for null guard behavior (e.g., allow unconditional transition)
  - Implementation target: transition evaluation logic in `src/ts/engine/*`

Notes:
- Keep requirement IDs unique and update this matrix when requirements change.
- Add file/line references to the Implementation target when stubs are created.
