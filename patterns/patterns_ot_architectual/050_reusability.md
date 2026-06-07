```yaml
version: V00.01.00
updated: 2026-06-06
platform: architectural
```
# Reusability Patterns for Existing Components

Patterns to maximize reuse of existing implementations, types, and components.

## Core Principles

### 1. Identify Reusable Units
- Extract common logic into discrete components
- Document interfaces and capabilities clearly
- Version components independently

### 2. Composition Over Inheritance
- Build systems by combining existing components
- Prefer configuration over extension
- Use adapter patterns for incompatible interfaces

### 3. Contract Stability
- Maintain backward-compatible interfaces
- Deprecate gradually with migration paths
- Use semantic versioning

## Reuse Strategies

### Pattern: Component Registry
```yaml
componentRegistry:
  id: "registry.component.identifier"
  components:
    - id: "contact.source.android"
      version: "1.0.0"
      capabilities: ["contacts.read", "contacts.write"]
    - id: "calendar.source.apple"
      version: "1.0.0"
      capabilities: ["events.read", "events.write"]
```

### Pattern: Adapter Layer
```yaml
adapters:
  - name: "CalendarAdapter"
    purpose: "Unified interface for platform calendars"
    source: "AndroidCalendar|AppleCalendar|ExchangeCalendar"
    target: "CalendarInterface"
```

### Pattern: Capability-Based Selection
```yaml
selection:
  requiredCapabilities:
    - "contacts.read"
  preferredSources:
    - "android.contacts"
    - "apple.contacts"
  fallback: "mock.contacts"
```

## Reuse Checklist

- [ ] Component has defined interface (inputs/outputs)
- [ ] Component has declared capabilities
- [ ] Component has declared dependencies
- [ ] Component has version metadata
- [ ] Component has documentation
- [ ] Component has tests
- [ ] Component follows project conventions

## Anti-Patterns

### Duplication
Avoid copying code instead of importing/reusing.

### Tight Coupling
Components should not depend on implementation details of other components.

### Hidden Dependencies
All dependencies should be declared explicitly.

## Implementation Hints

1. **Library Patterns**: Create shared libraries for cross-cutting concerns
2. **Type Reuse**: Share type definitions across components
3. **Configuration Reuse**: Use common configuration schemas
4. **Test Utilities**: Share test helpers and mocks

---

## Change History

| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial implementation |