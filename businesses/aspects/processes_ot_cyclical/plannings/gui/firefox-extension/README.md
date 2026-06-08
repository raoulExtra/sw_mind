# Kilo Automation Bridge - Firefox Extension

Firefox Manifest V3 extension for automating web interactions with Kilo server.

## Features

- Extract visible page content (URL, title, text, HTML)
- Click elements by CSS selector
- Screenshot capture
- Send data to local Kilo server via HTTP POST

## Installation

1. Open Firefox
2. Go to `about:debugging`
3. Click "This Firefox" (or "Load Temporary Add-on" for temporary)
4. Select `manifest.json` from this folder

## Usage

The extension automatically:
1. Extracts page content when navigation completes
2. Sends data to `http://localhost:8000/kilo`
3. Listens for click commands from the server

## API

### Server → Extension Commands

```json
{ "cmd": "click", "selector": "#element-id" }
{ "cmd": "screenshot" }
```

### Extension → Server Payload

```json
{
  "url": "https://example.com",
  "title": "Page Title",
  "text": "Visible text content",
  "html": "<html>...</html>",
  "viewport": { "width": 1920, "height": 1080 }
}
```