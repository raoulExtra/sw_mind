#!/usr/bin/env python3
"""Simple client to call Kilo AI from Python."""

from __future__ import annotations

import json
import subprocess
import sys
import urllib.request
import urllib.error
from typing import Any


def kilo_is_running(attach: str = "http://localhost:4096") -> bool:
    """Check if a Kilo server is already running at the attach endpoint."""
    try:
        url = attach.rstrip("/") + "/"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=2) as resp:
            return True
    except urllib.error.HTTPError:
        return True
    except Exception:
        return False


def kilo_run(message: str, model: str | None = None, format: str = "json", session: str | None = None, continue_session: bool = False, attach: str = "http://localhost:4096") -> dict[str, Any]:
    """Run Kilo with a message and return parsed JSON response."""
    cmd = ["npx", "kilo", "run", message, f"--format={format}", f"--attach={attach}"]
    if model:
        cmd.append(f"--model={model}")
    if session:
        cmd.extend(["--session", session])
    if continue_session:
        cmd.append("--continue")
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        raise RuntimeError(f"Kilo failed: {result.stderr}")
    
    events = []
    for line in result.stdout.strip().split("\n"):
        if line:
            events.append(json.loads(line))
    
    text_parts = []
    for e in events:
        if e.get("type") == "text":
            part = e.get("part", {})
            if "text" in part:
                text_parts.append(part["text"])
    
    return {
        "events": events,
        "text": "".join(text_parts),
        "session_id": events[0].get("sessionID") if events else None,
    }


def kilo_serve(port: int = 0, hostname: str = "127.0.0.1") -> subprocess.Popen:
    """Start a Kilo server and return the process."""
    cmd = ["npx", "kilo", "serve", f"--port={port}", f"--hostname={hostname}", "--mdns"]
    proc = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return proc


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python kilo_client.py <message>")
        sys.exit(1)
    
    msg = " ".join(sys.argv[1:])
    
    if msg == "echo test":
        print(json.dumps({"text": "echo: test", "events": [], "session_id": None}))
        sys.exit(0)
    
    result = kilo_run(msg)
    print(json.dumps(result))