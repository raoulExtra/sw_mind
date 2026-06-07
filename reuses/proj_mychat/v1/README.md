# Kilo Client Python v1
> Version: V00.04.00

Python client library for calling Kilo AI from Python applications. Provides functions to run Kilo with messages, start Kilo servers, and check server availability.

Uses subprocess to execute `npx kilo run/serve` commands with configurable parameters. Parses JSON event streams from stdout and extracts text content for easy consumption.

Built with Python 3.9+ using standard library only (subprocess, urllib, json).

## Content Info

conventions: requirements have `### Test` chapters per `reuses/conventions/30_conv_testing_requirements.md`, versioning per `reuses/conventions/10_conv_versions.md`, and README follows `reuses/conventions/40_conv_readme_content.md`.

## Structure

```
v1/
├── src/
│   └── kilo_client.py    # Main client implementation
├── requi/                 # Requirements documents
│   ├── 010_requirements.md
│   ├── 020_kilo_run.md
│   ├── 030_kilo_serve.md
│   ├── 040_cli.md
│   ├── 050_kilo_is_running.md
│   └── 990_comparison.md
└── requi/harness/        # Test harness files
    ├── 010_file_harness.md
    ├── test_queries.txt     # Test file with sample queries
    └── run_harness.py       # File harness script
```

## Usage

### kilo_run()

```python
from kilo_client import kilo_run

result = kilo_run(
    message="Hello Kilo",
    model="gpt-4",              # optional
    format="json",              # default: "json"
    session="sess-123",         # optional
    continue_session=False,     # default: False
    attach="http://localhost:4096"  # default
)
# Returns: {"events": [...], "text": "...", "session_id": "..."}
```

### kilo_serve()

```python
from kilo_client import kilo_serve

proc = kilo_serve(
    port=0,           # default: 0 (ephemeral)
    hostname="127.0.0.1"  # default
)
```

### kilo_is_running()

```python
from kilo_client import kilo_is_running

running = kilo_is_running("http://localhost:4096")
# Returns: True if server responds (even with 401), False on connection error
```

### Command Line

```bash
python kilo_client.py "your message"
# Special: python kilo_client.py "echo test" -> prints "echo: test"
```

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.04.00 | 2026-06-05 | ai(cline) | Fix kilo_is_running to return True on any HTTP response |
| V00.03.00 | 2026-06-05 | ai(cline) | Add usage documentation |
| V00.02.00 | 2026-06-05 | ai(cline) | Add kilo_is_running function |
| V00.01.00 | 2026-06-05 | ai(cline) | Initial README for v1 |