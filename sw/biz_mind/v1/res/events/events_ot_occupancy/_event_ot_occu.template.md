```yaml
id: event.occupancy.{participant_name}_{year}_{month}_{participant_name}_{Location}
type: event
created: 2026-06-07
updated: 2026-06-07
data:
  title: {Participant Name} Occupancy Event - {Month} {Year}
  description: {Duration} occupancy event for {Participant Name} in {Location}
  start_date: {Start Date}
  end_date: {End Date}
  duration_days: {Duration Days}
  participant: person.{role}.{participant_name}
  location: {Location}
  services: {Services}
  status: {Status}
  event_type: occupancy
```
# Template for Occupancy Event