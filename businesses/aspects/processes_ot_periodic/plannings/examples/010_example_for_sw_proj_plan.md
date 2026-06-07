{
  "project": {
    "id": "proj-001",
    "name": "Website Relaunch",
    "description": "Relaunch der Firmenwebsite mit neuem Design und CMS.",
    "owner": "barbara",
    "status": "in_planning",
    "startDate": "2026-06-10",
    "endDate": "2026-09-30",
    "budget": {
      "currency": "EUR",
      "amount": 15000
    }
  },
  "team": [
    {
      "id": "u-01",
      "name": "Barbara",
      "role": "Project Manager"
    },
    {
      "id": "u-02",
      "name": "Alex",
      "role": "Developer"
    },
    {
      "id": "u-03",
      "name": "Mia",
      "role": "Designer"
    }
  ],
  "milestones": [
    {
      "id": "m-01",
      "name": "Kickoff",
      "dueDate": "2026-06-15",
      "status": "open"
    },
    {
      "id": "m-02",
      "name": "Design freigegeben",
      "dueDate": "2026-07-10",
      "status": "open"
    },
    {
      "id": "m-03",
      "name": "Go-Live",
      "dueDate": "2026-09-30",
      "status": "open"
    }
  ],
  "tasks": [
    {
      "id": "t-01",
      "title": "Anforderungen sammeln",
      "assigneeId": "u-01",
      "status": "in_progress",
      "priority": "high",
      "startDate": "2026-06-10",
      "dueDate": "2026-06-20",
      "estimatedHours": 16,
      "dependencies": [],
      "tags": ["workshop", "stakeholder"]
    },
    {
      "id": "t-02",
      "title": "Wireframes erstellen",
      "assigneeId": "u-03",
      "status": "open",
      "priority": "medium",
      "startDate": "2026-06-21",
      "dueDate": "2026-07-01",
      "estimatedHours": 24,
      "dependencies": ["t-01"],
      "tags": ["design"]
    },
    {
      "id": "t-03",
      "title": "Frontend implementieren",
      "assigneeId": "u-02",
      "status": "open",
      "priority": "high",
      "startDate": "2026-07-05",
      "dueDate": "2026-08-15",
      "estimatedHours": 80,
      "dependencies": ["t-02"],
      "tags": ["development"]
    }
  ],
  "risks": [
    {
      "id": "r-01",
      "title": "Verzögerte Freigaben",
      "impact": "high",
      "probability": "medium",
      "mitigation": "Klare Deadlines mit Stakeholdern vereinbaren."
    }
  ],
  "settings": {
    "defaultView": "gantt",
    "workingDays": ["Mon", "Tue", "Wed", "Thu", "Fri"],
    "timezone": "Europe/Berlin"
  }
}
