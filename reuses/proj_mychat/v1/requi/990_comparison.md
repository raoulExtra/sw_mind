```yaml
title: 'Requirements: Kilo Client Python - Comparison'
tags:
- kilo_client
- comparison
- requirements
persona: kilo_extension
status: active
version: V00.02.00
updated: 2026-06-05
summary: 'Comparison of kilo_client.py requirements to v1/requi.'
```

# Requirements: Kilo Client Python - Comparison

> Version: V00.02.00

## Overview

Requirements derived from `reuses/proj_mychat/v1/src/kilo_client.py` and comparable to `v1/requi` format.

## Files Created

| File | Purpose |
|------|---------|
| `010_requirements.md` | Main requirements document |
| `020_kilo_run.md` | kilo_run function requirements |
| `030_kilo_serve.md` | kilo_serve function requirements |
| `040_cli.md` | CLI interface requirements |
| `050_kilo_is_running.md` | kilo_is_running function requirements |

## Comparison to v1/requi Format

### Similarities
- YAML frontmatter with title, tags, persona, status, version, updated, summary
- Version header after title
- Functional Requirements sections with checkboxed items
- Test sections with TEST-<ID> format
- Change History table at end

### Differences
- v1/requi uses simpler format without YAML frontmatter
- v1/requi has more hierarchical structure (Core Capabilities, Communication, etc.)
- This derivation uses more granular FR-KC-* IDs

## Coverage

All functionality from `kilo_client.py` has been captured:
- `kilo_run()` function: lines 12-43
- `kilo_serve()` function: lines 46-50
- CLI handling: lines 53-66

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.02.00 | 2026-06-05 | ai(cline) | Add kilo_is_running function |
| V00.01.00 | 2026-06-05 | ai(cline) | Initial comparison document |