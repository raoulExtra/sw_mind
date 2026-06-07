```yaml
version: V00.02.00
updated: 2026-06-06
platform: cross-platform
```
# Calendar Entry Attributes

Calendar data varies by platform. This document covers common attributes.

<!-- Change History
| Version | Date | Author | Reason |
|---------|------|--------|--------|
| V00.02.00 | 2026-06-06 | ai(kilo laguna) | Add Microsoft Outlook/Exchange support |
| V00.01.00 | 2026-06-06 | ai(kilo laguna) | Initial implementation |
-->

```yaml
coreEventInformation:
  title:
    description: "Event title/summary"
    source: "Android: CalendarContract.Events.TITLE, Apple: EKEvent.title, Microsoft: event.subject"
  eventType:
    description: "Type of event"
    source: "Android: CalendarContract.Events.EVENT_TYPE, Apple: EKEventType"
  status:
    description: "Event status"
    source: "Android: CalendarContract.Events.EVENT_STATUS, Apple: EKEvent.status, Microsoft: event.showAsFreeBusy"

timing:
  startDate:
    description: "Event start time"
    source: "Android: CalendarContract.Events.DTSTART, Apple: EKEvent.startDate, Microsoft: event.start.dateTime"
  endDate:
    description: "Event end time"
    source: "Android: CalendarContract.Events.DTEND, Apple: EKEvent.endDate, Microsoft: event.end.dateTime"
  isAllDay:
    description: "Whether event spans entire day"
    source: "Android: CalendarContract.Events.ALL_DAY, Apple: EKEvent.isAllDay, Microsoft: event.isAllDay"
  timezone:
    description: "Event timezone"
    source: "Android: CalendarContract.Events.EVENT_TIMEZONE, Apple: EKEvent.timeZone, Microsoft: event.start/timeZone"

availability:
  availability:
    description: "Availability during event"
    source: "Android: CalendarContract.Events.AVAILABILITY, Apple: EKEvent.availability, Microsoft: event.showAsFreeBusy"
  visibility:
    description: "Event visibility"
    source: "Android: CalendarContract.Events.VISIBILITY, Apple: EKEvent.visibility, Microsoft: event.isPrivate"

participants:
  attendees:
    description: "List of attendees"
    source: "Android: CalendarContract.Attendees, Apple: EKEvent.attendees, Microsoft: event.attendees"
  organizer:
    description: "Event organizer"
    source: "Android: CalendarContract.Events.ORGANIZER, Apple: EKEvent.organizer, Microsoft: event.organizer"

metadata:
  calendarId:
    description: "Calendar identifier"
    source: "Android: CalendarContract.Events.CALENDAR_ID, Apple: EKEvent.calendarItemExternalIdentifier, Microsoft: event.calendar.id"
  eventId:
    description: "Event identifier"
    source: "Android: CalendarContract.Events._ID, Apple: EKEvent.eventIdentifier, Microsoft: event.id"
  created:
    description: "Creation timestamp"
    source: "Android: CalendarContract.Events.CREATED, Apple: EKEvent.creationDate, Microsoft: event.createdDateTime"
  lastModified:
    description: "Last modified timestamp"
    source: "Android: CalendarContract.Events.LAST_MODIFIED, Apple: EKEvent.modificationDate, Microsoft: event.lastModifiedDateTime"

recurrence:
  rrule:
    description: "Recurrence rule"
    source: "Android: CalendarContract.Events.RRULE, Apple: EKEvent.recurrenceRules, Microsoft: event.recurrence.pattern"
  exemptFromWorkHours:
    description: "Exempt from work hours"
    source: "Apple: EKEvent.exdateComponents"

notes:
  description:
    description: "Event description"
    source: "Android: CalendarContract.Events.DESCRIPTION, Apple: EKEvent.notes, Microsoft: event.body"
  location:
    description: "Event location"
    source: "Android: CalendarContract.Events.EVENT_LOCATION, Apple: EKEvent.location, Microsoft: event.location.displayName"

alarms:
  description: "Event reminders/alerts"
  source: "Android: CalendarContract.Reminders, Apple: EKEvent.alarms, Microsoft: event.reminderMinutesBeforeStart"
```