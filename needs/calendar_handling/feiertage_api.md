```yaml
id: feiertage_api
type: api_reference
created: 2026-06-07
updated: 2026-06-07
data:
  title: Feiertage API
  description: Official German public holidays API by Bundesland
```

# Feiertage API

## Overview

The Feiertage API provides official public holiday information for all German federal states (Bundesländer), including Bavaria (Bayern).

- **Source**: BundesAPI / feiertage-api
- **Repository**: https://github.com/bundesAPI/feiertage-api
- **Type**: Open-source, JSON API

## Features

- Official public holiday data for all 16 German Bundesländer
- Includes Bayern (BY)
- Open-source and community maintained
- Structured JSON responses
- OpenAPI specification available

## Endpoints

### Get all holidays for a year

```
GET https://feiertage-api.de/api/?jahr=2026
```

### Filter by Bundesland

```
GET https://feiertage-api.de/api/?jahr=2026&nur_land=BY
```

## Example Response

```json
[
  {
    "name": "Neues Jahr",
    "local_holiday": false,
    "date": "2026-01-01"
  },
  {
    "name": "Karfreitag",
    "local_holiday": false,
    "date": "2026-04-03"
  }
]
```

## Use Cases

- Plan project deadlines around holidays
- Calculate business days for contracts
- Schedule meetings avoiding public holidays
- Generate holiday calendars for payroll systems