```yaml
title: 'Contract: Requirements Check for Requis'
tags:
- contract
- requirements
- completeness
- consistency
persona: gatekeeper
status: active
version: V00.01.00
updated: 2026-06-08
summary: 'Plan for checking completeness and consistency of requirements'
```

# Contract: Requirements Check for Requis

## Preconditions

- Requirements to check with unique ids

## 1. Completeness Check

### 1.1 Coverage Analysis
- Verify all requirements in `*/requi/` have corresponding `*/tests/{testphase}` implementation per level
- Cross-reference requirement IDs with test cases per level
- Ensure no orphaned requirements exist per level

### 1.2 Dependency Mapping
- Map each requirement to affected components per level
- Identify missing prerequisite requirements per level
- Validate requirement hierarchy (parent-child relationships) per level

### 1.3 Traceability Matrix
- Create matrix: Requirement → Specification → Implementation → Test per level
- Flag requirements without traceability links per level

## 2. Consistency Check

### 2.1 Cross-Document Validation
- Check for conflicting requirements across files per level
- Validate terminology consistency using glossary per level
- Ensure no duplicate requirements exist per level

### 2.2 Structural Consistency
- Verify all requirement documents follow standard format per level
- Validate YAML frontmatter compliance per level
- Check section structure alignment per level

### 2.3 Version Consistency
- Ensure requirement versions align with implementation per level
- Validate change history entries per level

## 3. Execution Workflow

```yaml
flow:
  id: requirements_check
  name: "Requirements Check"
  type: flow
  extends: 010_flow_base
  states:
    - name: init
      transitions:
        - to: check_completeness
    - name: check_completeness
      transitions:
        - to: check_consistency
    - name: check_consistency
      transitions:
        - to: generate_report
    - name: generate_report
      transitions:
        - to: complete
    - name: complete
```

## 4. Acceptance Criteria

- [ ] All requirements traced to implementation per level
- [ ] No conflicting requirements found per level
- [ ] All documents follow standard format per level
- [ ] Glossary terms used consistently per level

## 5. Tools & Methods

| Tool | Purpose |
|------|---------|
| `grep` | Find requirement references |
| `diff` | Compare requirement versions |
| YAML validator | Check document structure |
| Custom script | Generate traceability matrix |

## 6. Cadence

- Run on every release
- Run after major requirement changes
- Quarterly baseline check