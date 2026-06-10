```yaml
title: 'Requirements: Cryptographic Hygiene for Flow Engine'
tags:
- flow_mind
- requirements
- crypto-hygiene
- security
- v80
persona: security_architect
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Cryptographic hygiene: signed flows, hash-chained logs, artifact integrity.'
```

# Requirements: Cryptographic Hygiene for Flow Engine

> Version: V00.01.00

## Overview

Cryptographic hygiene even with "normal" crypto provides better auditability, easier debugging, and future-proofs for PQ-safe primitives.

## 1. Sign Flow Definitions

- [ ] **FR-CRYPTO-01** Flow definitions signed with Ed25519
  - *Acceptance*: Flow YAML has signature attached
  - *Test*: Signature verifies against known public key

## 2. Hash-Chained Execution Logs

- [ ] **FR-CRYPTO-02** Every transition appends verifiable step
  - *Acceptance*: Log entry includes hash of previous entry
  - *Test*: Tampering detected via hash chain break

- [ ] **FR-CRYPTO-03** Log entries contain: from_state, to_state, signal, guard_result, payload_hash
  - *Acceptance*: All fields present in each log entry
  - *Test*: Log schema validation

## 3. Artifact Integrity

- [ ] **FR-CRYPTO-04** Artifact integrity via content hashes
  - *Acceptance*: Hash stored alongside reference
  - *Test*: Modified artifact fails hash check

## 4. Pluggable Crypto Layer

- [ ] **FR-CRYPTO-05** Flow engine calls crypto service interface
  - *Acceptance*: No hard-coded RSA/ECC in flow logic
  - *Test*: Mock crypto service works

- [ ] **FR-CRYPTO-06** All signing/hashing through pluggable interface
  - *Acceptance*: Key management separate from flow engine
  - *Test*: Crypto module can be swapped

## 5. ZK-Friendly Design

- [ ] **FR-CRYPTO-07** Artifacts can be proofs, not raw data
  - *Acceptance*: Artifact.type includes 'proof'
  - *Test*: Proof artifact created and verified

- [ ] **FR-CRYPTO-08** Guards accept proof verification
  - *Acceptance*: Guard can check proof validity
  - *Test*: Guard passes with valid proof

## 6. Multi-Party Approval

- [ ] **FR-CRYPTO-09** Guards require N of M approvals
  - *Acceptance*: Threshold signature config
  - *Test*: Below threshold rejected

- [ ] **FR-CRYPTO-10** Verifiers as first-class entities
  - *Acceptance*: VerifierDef in flow definition
  - *Test*: Verifier configured and executed

## 7. Trust-Zone Annotations

- [ ] **FR-CRYPTO-11** States/transitions marked with trust zones
  - *Acceptance*: secure_enclave, user_device, cloud_untrusted
  - *Test*: Zone validation

- [ ] **FR-CRYPTO-12** Guards enforce zone requirements
  - *Acceptance*: Transition blocked in wrong zone
  - *Test*: Cross-zone transition blocked

## Benefits

- Better auditability and debugging
- Future-proof for PQ-safe primitives
- Stronger governance and safety

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial cryptographic hygiene requirements |