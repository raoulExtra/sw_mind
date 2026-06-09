2. Ensuring results match real actions
You don’t want “beautiful explanations” that are disconnected from reality. So you separate:

What the agent claims it did (narrative)

What actually happened in the environment (facts)

You can enforce this with:

Execution traces from the environment:  
Logs from APIs, tools, DB writes, file changes, etc.
The state machine doesn’t trust the agent’s story—it trusts side‑channel evidence.

Verifier agents with access to raw logs:  
A second agent (or rule engine) checks:
“Do the logs match the claimed steps and outcomes?”

Signed plans vs. signed effects:

Plan: “Here’s what I intend to do and why.”

Effects: “Here’s what actually happened, with evidence.”
The orchestration layer compares both.

The key: explanations must be grounded in verifiable artifacts, not just text.