#!/usr/bin/env python3
"""File harness: Process a file line by line, running kilo_client.py for each line."""

import subprocess
import sys
import os
import json

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENT_SCRIPT = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "..", "src", "kilo_client.py"))


def run_harness(filepath: str) -> None:
    """Process file line by line, executing kilo_client.py for each non-empty, non-comment line."""
    counter = 1
    with open(filepath, "r") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            result = subprocess.run(
                [sys.executable, CLIENT_SCRIPT, line],
                capture_output=True,
                text=True
            )
            print(f"Query: {line}")
            print(f"Output: {result.stdout.strip()}")
            if result.returncode != 0:
                print(f"Error: {result.stderr.strip()}")
            answer_file = os.path.join(SCRIPT_DIR, f"answer_{counter}.txt")
            with open(answer_file, "w") as af:
                af.write(result.stdout.strip())
            try:
                output_data = json.loads(result.stdout.strip())
                pure_text = output_data.get("text", "")
                pure_file = os.path.join(SCRIPT_DIR, f"answer_pure_{counter}.txt")
                with open(pure_file, "w") as pf:
                    pf.write(pure_text)
            except json.JSONDecodeError:
                pass
            counter += 1


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python run_harness.py <file>")
        sys.exit(1)
    run_harness(sys.argv[1])