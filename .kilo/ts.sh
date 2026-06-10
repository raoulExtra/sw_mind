#!/bin/bash
TS_FILE="${1:-src/ts/fm_cli.ts}"
cd /mnt/d/_2026/_2026_06/07/sw/flow_mind/v1 && npx ts-node "$TS_FILE" -- "${@:2}"
