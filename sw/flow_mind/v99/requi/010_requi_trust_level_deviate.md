1. Trust levels: when deviation is allowed
Define trust tiers for agents, and bind them to the state machine:

Low‑trust agents:  
No deviation from the state machine without human approval.
Any attempt to deviate → hard stop + human review.

Medium‑trust agents:  
Can deviate within a narrow, predefined envelope (e.g., extra checks, retries, harmless queries).
All deviations must be logged + auto‑verified by another agent or rule.

High‑trust agents:  
Can deviate more freely, but must produce a full reasoning + action trace and are subject to post‑hoc audits.

Trust isn’t static—it’s earned via consistent behavior under observation.