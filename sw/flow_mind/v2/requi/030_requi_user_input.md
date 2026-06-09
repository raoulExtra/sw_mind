the better-sqlite3 db is in res/env.db

1. A ULID generator (or UUID, but ULID is better)
You need a globally unique, sortable ID for each user input.

In TS:

ts
import { ulid } from "ulid";

const id = ulid();
This ID becomes:

the primary key for the user input

the intent_id in write_intent_queue

the reference in audit_log

the reference in domain tables

This is the only unique ID you need.

⭐ 2. A SQLite client that can INSERT into write_intent_queue
Your agent never writes directly to domain tables.

It only writes write intents.

Example:

ts
await db.run(
  `INSERT INTO write_intent_queue (id, agent_id, payload_json, state)
   VALUES (?, ?, ?, 'pending')`,
  [ulid(), "user-input-agent", JSON.stringify({ text: userInput })]
);
That’s it.

The commit agent will:

pick it up

validate

apply the write

log it

mark it committed

Your agent stays simple.

⭐ 3. A schema entry for user input in your domain tables
You need a domain table where the commit agent will write the actual data.

Example:

sql
CREATE TABLE user_inputs (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
The commit agent will insert into this table when processing the write intent.

The agent_for_commit is described in sw/sql_mind/requi.

⭐ Putting it together (the minimal requirements)
✔ A ULID generator
To create unique IDs.

✔ A SQLite connection to env.db
To insert write intents.

✔ A domain table for user inputs
Where the commit agent writes the final data.

✔ A commit‑agent handler for “user_input” intents
So it knows how to apply them.

That’s all you need.
