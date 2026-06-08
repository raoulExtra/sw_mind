# Kilo Automation Server

Simple HTTP server for Firefox extension communication.

## Usage

```bash
node server.js
```

## Endpoints

- `POST /kilo` - Receive data from Firefox extension
- `GET /cmd` - Get command for Firefox extension

## Example Request

```json
{
  "url": "https://example.com",
  "title": "Page Title",
  "text": "Visible text",
  "html": "<html>...</html>",
  "viewport": { "width": 1920, "height": 1080 }
}
```