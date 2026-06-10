#!/bin/bash

search_workflow() {
    local folder="${1:-.}"
    local pattern="agent"
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Searching for 'agent' in: $folder"
    echo "=================================================="
    grep -rn --color=always -E "$pattern" "$folder" | grep -v "node_modules\|\.git\|\.next\|\.nuxt\|\.swp\|\.swo\|\.tmp\|search_workflow.sh\|replace_workflow.sh"
}

if [ $# -eq 0 ]; then
    search_workflow "."
else
    search_workflow "$1"
fi