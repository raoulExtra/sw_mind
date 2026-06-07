# Decision: FastAPI for Python API Handlers

## Context
When building API handlers in Python, we need to choose a web framework.

## Decision
Use **FastAPI** as the default framework for all Python API handlers.

## Rationale
- Async support for high-throughput scenarios
- Automatic OpenAPI/Swagger documentation
- Type-safe with Pydantic integration
- Better performance than Flask for I/O-bound workloads
- Aligns with pywa library's recommended integration

## Exceptions
- Use Flask only for simple/migration scenarios
- Use other frameworks only with explicit approval