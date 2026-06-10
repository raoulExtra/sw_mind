```yaml
title: 'Glossary: Flow Mind v1'
tags:
- flow_mind
- glossary
- v1
persona: kilo_extension
status: active
version: V00.04.00
updated: 2026-06-10
summary: 'Glossary of terms for Flow Mind v1 flow engine.'
change: 'Replaced Executor with Executor terminology'
```

# Glossary: Flow Mind v1

> Version: V00.04.00

## Terms

| Term | Definition |
|------|------------|
| **Executor** | optional: Component that handles ambiguity and planning operations |
| **Artifact** | A produced result (plan, output, or verification data) that can be referenced by payloads but not embedded directly if size bigger |
| **Payload** |  The data carried by a signal at the moment it is emitted. It can reference artifacts.  |
| **State** | Representation of the flow’s execution status at a given moment. |
| **Transition** | Directed movement from one state to another, triggered by a signal. |
| **Verifier** | optional: Component that independently validates artifacts |
| **Flow** | Defined sequence of states and transitions |
| **Signal** | Event that triggers transitions and carries a payload |
| **Guard** | optional: A condition attached to a Transition that determines whether the Transition is allowed to fire. |
---

## Test

- [x] **TEST-FM-V1-01** Unit tests for glossary term validation
- [x] **TEST-FM-V1-02** For each glossary term: check if there is at least a minimal implementation
- [x] **TEST-FM-V1-03** Non optional terms are mandatory and cannot be null

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-08 | ai(kilo laguna) | Initial glossary |
| V00.02.00 | 2026-06-08 | ai(kilo laguna) | Added Test chapter per convention |
| V00.04.00 | 2026-06-10 | ai(kilo laguna) | Replaced Executor with Executor terminology |