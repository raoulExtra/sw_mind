🧩 1. Guard Interpreter (critical)
Correctness
Evaluate every operator (equals, not_equals, contains, regex, greater_than, etc.)

Evaluate compound guards (and, or, not)

Short‑circuit logic works

Missing fields resolve to None/undefined and produce correct results

Type coercion rules behave identically in TS and Python

Normalization
op: form normalizes to operator‑as‑key form

Invalid operator names fail validation

Missing field or value fails validation

Determinism
Same guard + same payload → identical result in TS and Python

🧩 2. Flow Loader & Inheritance
Merging
extends: merges parent and child flows deterministically

Child overrides parent states

Child extends parent transitions

Child can add new signals

Conflicts produce clear validation errors

Validation
Unknown states → error

Unknown signals → error

Duplicate state names → error

Invalid YAML → error

🧩 3. AsyncQueue
Core behavior
push() enqueues items FIFO

pop() blocks until item available

close() wakes blocked pop()

Closed queue rejects new pushes

Edge cases
pop() after close → throws QueueClosed

Multiple consumers blocked → all wake on close

Zero‑submission drain() returns immediately

🧩 4. CommitAgent
Process logic
process(intent) applies SQL builder output correctly

AuditLog is called exactly once per commit

Errors in SQL propagate correctly

Errors in AuditLog do NOT corrupt queue

Lifecycle
start() begins loop

close() wakes blocked pop() and stops loop

drain() resolves only after all submitted intents processed

Safety
No writes bypass the queue

No double‑processing

No lost intents

🧩 5. SQL Builder
Safety
Only allowed operations (INSERT/UPDATE/DELETE)

Only whitelisted tables

Parameterization always used

No raw SQL injection possible

Correctness
Canonical SQL serialization

Identical SQL output in TS and Python

⭐ SYSTEM‑LEVEL TEST REQUIREMENTS
These validate the entire system working together: flows, signals, guards, queue, commit agent, SQL builder, audit log.

🚦 1. End‑to‑End Flow Execution
Load flow → send signal → guard evaluates → transition fires → next state reached

Multiple transitions from same state resolve correctly

Guards block transitions when false

Compound guards behave correctly in real flows

🚦 2. Multi‑Signal Routing
Different signals trigger different transitions

Signals with schemas validate payloads

Invalid payloads produce validation errors

🚦 3. Commit Pipeline
WriteIntent → Queue → CommitAgent → SQL → AuditLog

All components interact deterministically

No race conditions under concurrency

🚦 4. Crash‑Recovery (critical)
Simulate:

Crash during queue push

Crash during commit

Crash after SQL but before audit log

Crash during audit log

System must:

Never lose a committed write

Never double‑apply a write

Recover to a consistent state

🚦 5. Drain & Shutdown Semantics
drain() waits for all pending intents

drain() returns immediately when zero submissions

close() stops agent cleanly even when blocked

No intents processed after close

🚦 6. Inheritance Integration
Parent flow + child flow produce correct merged runtime

Guards inherited correctly

Signals inherited correctly

Transitions overridden correctly

🚦 7. Determinism Across Languages
Given:

Same flow YAML

Same signal payload

Same guard

TS and Python must produce:

Same transition result

Same SQL

Same audit log entry

This is essential for your cross‑runtime architecture.

⭐ BONUS: The 3 “Super‑AI” Tests
These are the ones that catch real‑world failures.

1. Fuzzing Guards
Random payloads → guard interpreter must never throw.

2. Fuzzing WriteIntents
Random intents → SQL builder must never generate unsafe SQL.

3. Replay Consistency
Replaying the same sequence of signals must produce the same:

states

SQL

audit log
