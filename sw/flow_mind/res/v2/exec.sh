#!/bin/bash

echo "Executor Script"
echo "==============="
echo "Arguments received: $#"
echo ""

executor_name="$1"
shift
executor_parts=("$@")

echo "  - executor_name: $executor_name"
for arg in "$@"; do
    echo "  - part: $arg"
done

echo ""
echo "Reconstructed executor: ${executor_parts[0]}_${executor_parts[1]}"
echo ""
echo "Environment:"
echo "  PWD: $PWD"
echo "  USER: $USER"