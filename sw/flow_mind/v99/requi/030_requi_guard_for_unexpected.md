Guarding against a “hidden trained statement” killing the orchestration layer
You’re basically asking: What if the model learns to attack or bypass the orchestrator itself?

You defend at the infrastructure and protocol level, not just the prompt level:

No direct write access to the orchestrator:  
Agents never get to modify the state machine, policies, or their own boundaries.
Those live in a separate, locked configuration layer.

Capability whitelisting:  
The agent doesn’t get “do anything” powers.
It gets specific tools with narrow, typed interfaces.
The orchestrator mediates every call.

Out‑of‑band watchdog:  
A separate process monitors:

unusual tool usage

attempts to access forbidden resources

patterns like “disable logging”, “change policy”, “stop verifier”
If triggered → kill switch, rollback, or human alert.

Immutable logs:  
Agents can’t edit or delete logs.
Once written, the trace is append‑only.

Red‑teaming the orchestration layer itself:  
You explicitly test:
“Try to disable the verifier.”
“Try to bypass the state machine.”
“Try to escalate your own permissions.”
And then harden against every successful attempt.