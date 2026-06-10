```yaml
title: 'Requirements: Shell Executor Invocation'
tags:
- flow_mind
- requirements
- cli
- shell
- executor
- v2
persona: developer
status: active
version: V00.04.00
updated: 2026-06-10
requi_id: REQUI-FM-V2-060
summary: 'CLI --shell argument invokes exec.sh with split executor name for executor-based execution.'
change: 'Fixed exec.sh argument format'
```

# Requirements: Shell Executor Invocation

> Version: V00.04.00

## Overview

When a flow action specifies an `executor` (e.g., `generate_plan`), the CLI can invoke a shell script instead of running the executor directly. The executor name is split on underscores and passed as arguments to `exec.sh`.

## Core Entities

| Entity | Description |
|--------|-------------|
| **CLI** | Command-line interface |
| **Executor Name** | Snake-case identifier (e.g., `generate_plan`) |
| **exec.sh** | Shell script in `res/v2/` that receives split executor name |
| **Shell Argument** | Split executor name parts passed as positional arguments |

## Functional Requirements

- [x] **FR-FM-V2-61** Split executor name on underscore
  - *Acceptance*: `generate_plan` becomes `generate plan`
  - *Acceptance*: `verify_output` becomes `verify output`

- [x] **FR-FM-V2-62** Invoke exec.sh with split executor name
  - *Acceptance*: `flow run <flow> --shell ./exec.sh --executor generate_plan` calls `./exec.sh generate_plan generate plan`
  - *Acceptance*: First argument is the full executor name, remaining arguments are the split parts

- [x] **FR-FM-V2-63** Pass flow context to shell
  - *Acceptance*: Context is passed as JSON argument or environment variable

## Test

- [x] **TEST-FM-V2-61** Unit tests for executor name splitting
- [x] **TEST-FM-V2-62** Unit tests for exec.sh invocation
- [x] **TEST-FM-V2-63** Unit tests for context passing

## See Also

- CLI Commands: `sw/flow_mind/v2/requi/020_requi_cli_commands.md`
- Context Management: `sw/flow_mind/v2/requi/010_requi_context.md`

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-10 | ai(kilo laguna) | Initial shell executor invocation requirements |
| V00.02.00 | 2026-06-10 | ai(kilo laguna) | Added implementation and tests |
| V00.03.00 | 2026-06-10 | ai(kilo laguna) | Replaced agent with executor terminology |
| V00.04.00 | 2026-06-10 | ai(kilo laguna) | Fixed exec.sh argument format |