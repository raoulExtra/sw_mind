#!/bin/bash

replace_workflow_to_flow() {
    local folder="${1:-.}"
    local count=0
    local modified_files=""
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Replacing 'Workflow' with 'Flow' in: $folder"
    echo "=================================================="
    
    while IFS= read -r -d '' file; do
        local matches=$(grep -oE "Workflow|workflow" "$file" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            sed -i 's/Workflow/Flow/g; s/workflow/flow/g' "$file"
            modified_files="$modified_files$file\n"
            count=$((count + matches))
            echo "  $file: $matches replacement(s)"
        fi
    done < <(find "$folder" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.nuxt/*" -print0)
    
    echo "=================================================="
    echo "Total: $count replacement(s) in $(echo -e "$modified_files" | grep -c .) file(s)"
}

replace_verifier_to_executor() {
    local folder="${1:-.}"
    local count=0
    local modified_files=""
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Replacing 'verifier' with 'executor' in: $folder"
    echo "=================================================="
    
    while IFS= read -r -d '' file; do
        local matches=$(grep -oE "verifier" "$file" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            sed -i 's/verifier/executor/g' "$file"
            modified_files="$modified_files$file\n"
            count=$((count + matches))
            echo "  $file: $matches replacement(s)"
        fi
    done < <(find "$folder" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.nuxt/*" -print0)
    
    echo "=================================================="
    echo "Total: $count replacement(s) in $(echo -e "$modified_files" | grep -c .) file(s)"
}

replace_agent_to_executor() {
    local folder="${1:-.}"
    local count=0
    local modified_files=""
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Replacing 'agent' with 'executor' in: $folder"
    echo "=================================================="
    
    while IFS= read -r -d '' file; do
        local matches=$(grep -oE "agent:" "$file" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            sed -i 's/agent:/executor:/g' "$file"
            modified_files="$modified_files$file\n"
            count=$((count + matches))
            echo "  $file: $matches replacement(s)"
        fi
    done < <(find "$folder" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.nuxt/*" -print0)
    
    echo "=================================================="
    echo "Total: $count replacement(s) in $(echo -e "$modified_files" | grep -c .) file(s)"
}

replace_Agent_to_Executor() {
    local folder="${1:-.}"
    local count=0
    local modified_files=""
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Replacing 'Agent' with 'Executor' in: $folder"
    echo "=================================================="
    
    while IFS= read -r -d '' file; do
        local matches=$(grep -oE "Agent" "$file" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            sed -i 's/Agent/Executor/g' "$file"
            modified_files="$modified_files$file\n"
            count=$((count + matches))
            echo "  $file: $matches replacement(s)"
        fi
    done < <(find "$folder" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.nuxt/*" -print0)
    
    echo "=================================================="
    echo "Total: $count replacement(s) in $(echo -e "$modified_files" | grep -c .) file(s)"
}

replace_CommitAgent_to_CommitExecutor() {
    local folder="${1:-.}"
    local count=0
    local modified_files=""
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Replacing 'CommitAgent' with 'CommitExecutor' in: $folder"
    echo "=================================================="
    
    while IFS= read -r -d '' file; do
        local matches=$(grep -oE "CommitAgent" "$file" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            sed -i 's/CommitAgent/CommitExecutor/g' "$file"
            modified_files="$modified_files$file\n"
            count=$((count + matches))
            echo "  $file: $matches replacement(s)"
        fi
    done < <(find "$folder" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.nuxt/*" -print0)
    
    echo "=================================================="
    echo "Total: $count replacement(s) in $(echo -e "$modified_files" | grep -c .) file(s)"
}

replace_commitagent_to_commitexecutor() {
    local folder="${1:-.}"
    local count=0
    local modified_files=""
    
    if [ ! -d "$folder" ]; then
        echo "Error: Directory '$folder' not found"
        exit 1
    fi
    
    echo "Replacing 'commitagent' with 'commitexecutor' in: $folder"
    echo "=================================================="
    
    while IFS= read -r -d '' file; do
        local matches=$(grep -oE "commitagent" "$file" 2>/dev/null | wc -l)
        if [ "$matches" -gt 0 ]; then
            sed -i 's/commitagent/commitexecutor/g' "$file"
            modified_files="$modified_files$file\n"
            count=$((count + matches))
            echo "  $file: $matches replacement(s)"
        fi
    done < <(find "$folder" -type f \( -name "*.md" -o -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.yaml" -o -name "*.yml" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/.next/*" -not -path "*/.nuxt/*" -print0)
    
    echo "=================================================="
    echo "Total: $count replacement(s) in $(echo -e "$modified_files" | grep -c .) file(s)"
}

if [ $# -eq 0 ]; then
    replace_workflow_to_flow "."
else
    case "$1" in
        workflow)
            replace_workflow_to_flow "${2:-.}"
            ;;
        verifier)
            replace_verifier_to_executor "${2:-.}"
            ;;
        agent)
            replace_agent_to_executor "${2:-.}"
            ;;
        Agent)
            replace_Agent_to_Executor "${2:-.}"
            ;;
        CommitAgent)
            replace_CommitAgent_to_CommitExecutor "${2:-.}"
            ;;
        commitagent)
            replace_commitagent_to_commitexecutor "${2:-.}"
            ;;
        *)
            echo "Usage: $0 [workflow|verifier|agent|Agent|CommitAgent|commitagent] [folder]"
            echo "  $0 workflow .        - Replace Workflow->Flow"
            echo "  $0 verifier .         - Replace verifier->executor"
            echo "  $0 agent .            - Replace agent->executor"
            echo "  $0 Agent .             - Replace Agent->Executor"
            echo "  $0 CommitAgent .       - Replace CommitAgent->CommitExecutor"
            echo "  $0 commitagent .       - Replace commitagent->commitexecutor"
            echo ""
            echo "Command format: <script> <executor_name> <split_part1> <split_part2> ..."
            ;;
    esac
fi