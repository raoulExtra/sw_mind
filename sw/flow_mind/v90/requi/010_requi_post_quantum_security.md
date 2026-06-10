```yaml
title: 'Requirements: Post-Quantum Flow Engine Security'
tags:
- flow_mind
- requirements
- post-quantum
- security
- pqc
- v90
persona: security_architect
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'Flow engine as security boundary in post-quantum world.'
```

# Requirements: Post-Quantum Flow Engine Security

> Version: V00.01.00

## Overview

In a post-quantum world, a flow engine stops being "just orchestration" and becomes part of the security boundary.

## 1. Post-Quantum Identity and Signatures

### 1.1 Flow Definition Signing

- [ ] **FR-PQ-01** Flow definitions signed with post-quantum schemes
  - *Acceptance*: Dilithium-class signature on flow.yaml
  - *Test*: Signature verifies against public key

- [ ] **FR-PQ-02** Prove authorship and approval
  - *Acceptance*: Signer identity embedded in signature
  - *Test*: Flow execution logs signer info

### 1.2 Execution Log Signing

- [ ] **FR-PQ-03** Execution logs signed with PQ-safe keys
  - *Acceptance*: Each transition signed
  - *Test*: Log signature verifies against known public key

## 2. Post-Quantum-Safe Channels

- [ ] **FR-PQ-04** Signals transmitted over PQ-safe channels
  - *Acceptance*: Kyber-class KEM for signal encryption
  - *Test*: Traffic analysis reveals no quantum-vulnerable patterns

- [ ] **FR-PQ-05** Internal components use PQ-safe authenticated links
  - *Acceptance*: Executor ↔ Verifier ↔ Flow communicate over PQ channels
  - *Test*: Network capture shows PQ-safe handshakes

## 3. Tamper-Evident Execution History

- [ ] **FR-PQ-06** Append-logged transitions
  - *Acceptance*: Each entry has state_from, state_to, signal, guard_result, hash(prev)
  - *Test*: Missing entry detected via hash chain break

- [ ] **FR-PQ-07** Hash-chained and PQ-signed log entries
  - *Acceptance*: Quantum attacker cannot rewrite history
  - *Test*: Modified entry invalidates all subsequent signatures

## 4. Strong Randomness and Nonces

- [ ] **FR-PQ-08** Quantum-safe CSPRNGs
  - *Acceptance*: All randomness from PQ-safe source
  - *Test*: Entropy source audit

- [ ] **FR-PQ-09** Proper nonces in protocols
  - *Acceptance*: No nonce reuse, each operation unique
  - *Test*: Nonce collision detection

## 5. Zero-Knowledge-Friendly Design

- [ ] **FR-PQ-10** Accept ZK proofs as artifacts
  - *Acceptance*: Transition accepts ZK proof artifact
  - *Test*: ZK proof verifies against public parameters

- [ ] **FR-PQ-11** Guards accept proof verification
  - *Acceptance*: Guard says "proof verifies" not "secret revealed"
  - *Test*: Guard passes with valid ZK proof

## 6. Multi-Party and Threshold Control

- [ ] **FR-PQ-12** Threshold signatures for critical transitions
  - *Acceptance*: 2-of-3 signatures required for money movement
  - *Test*: Single signature rejected

- [ ] **FR-PQ-13** Multi-approver guards
  - *Acceptance*: Guard requires multiple PQ-safe signatures
  - *Test*: Insufficient signatures cause transition rejection

## 7. Explicit Trust Zones

- [ ] **FR-PQ-14** States annotated with trust levels
  - *Acceptance*: "secure_enclave", "user_device", "untrusted_cloud"
  - *Test*: Execution fails when trust zone violated

- [ ] **FR-PQ-15** Guards enforce execution location
  - *Acceptance*: Transition only allowed in specific trust zone
  - *Test*: Cross-zone transition blocked

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial post-quantum security requirements |