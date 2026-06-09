```yaml
title: 'Requirements: CLI Program Standards'
tags:
- cli
- requirements
- standards
- help
- version
persona: developer
status: draft
version: V00.01.00
updated: 2026-06-09
summary: 'All CLI programs must support --help and --version arguments.'
```

# Requirements: CLI Program Standards

> Version: V00.01.00

## Overview

All CLI programs in this ecosystem must provide standard help and version information through command-line arguments.

## Functional Requirements

### Help Support

- [ ] **REQ-CLI-01** All CLI programs must support `--help` argument
  - *Acceptance*: Displays usage information and exits with code 0
- [ ] **REQ-CLI-02** All CLI programs must support `-h` as alias for `--help`
  - *Acceptance*: Same behavior as `--help`
- [ ] **REQ-CLI-03** All CLI programs must support `--examples` argument
  - *Acceptance*: Displays usage examples and exits with code 0

### Version Support

- [ ] **REQ-CLI-03** All CLI programs must support `--version` argument
  - *Acceptance*: Displays version string and exits with code 0
- [ ] **REQ-CLI-04** All CLI programs must support `-v` as alias for `--version`
  - *Acceptance*: Same behavior as `--version`

### Version Information

- [x] **REQ-CLI-05** Version output must include program name and version number
  - *Acceptance*: Format: `<program-name> <version>`
- [x] **REQ-CLI-06** Version must be hardcoded in source code (Python/TypeScript)
  - *Acceptance*: Single source of truth for version in `__version__` constant

## Implementation Notes

- Default program name: derived from filename or configurable
- Version source: hardcoded `__version__` constant in source
- Exit codes: 0 for help/version, non-zero for errors
- `--help` shows basic usage with all options
- `--examples` shows detailed usage examples
- Help text format: plain text
- Help text generation: auto-generated from code docstrings/annotations

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-09 | ai(kilo laguna) | Initial CLI standards requirements |
| V00.01.01 | 2026-06-09 | ai(kilo laguna) | Added --examples argument for detailed usage |
| V00.01.02 | 2026-06-09 | ai(kilo laguna) | Version hardcoded in source, help as plain text |