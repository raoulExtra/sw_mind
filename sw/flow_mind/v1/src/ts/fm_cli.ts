import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

interface WorkflowState {
  workflow_id: string
  current_step: string
  data: Record<string, any>
  history: Array<{step: string, timestamp: string}>
}

interface Transition {
  to: string
  when: string
}

interface StateDef {
  name: string
  on_enter?: string[]
  transitions: Transition[]
}

interface WorkflowDef {
  id: string
  name: string
  start_state: string
  states: StateDef[]
}

function loadWorkflow(filePath: string): WorkflowDef {
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = yaml.load(content) as any
  return parsed.workflow
}

function createState(workflowId: string): WorkflowState {
  return {
    workflow_id: workflowId,
    current_step: 'init',
    data: {},
    history: []
  }
}

function saveState(state: WorkflowState, filePath: string): void {
  fs.writeFileSync(filePath, JSON.stringify(state, null, 2))
}

function main(): void {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.log('Usage: fm_cli <workflow.yaml> <command> [args]')
    process.exit(1)
  }

  const workflowPath = path.resolve(__dirname, '../../res', args[0])
  const command = args[1]
  const statePath = 'state.json'

  const workflow = loadWorkflow(workflowPath)
  
  let state: WorkflowState
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'))
  } else {
    state = createState(workflow.id)
    saveState(state, statePath)
  }

  console.log(`Workflow: ${workflow.name}`)
  console.log(`Current step: ${state.current_step}`)

  switch (command) {
    case 'status':
      console.log(JSON.stringify(state, null, 2))
      break
    case 'next':
      console.log(`Moving from ${state.current_step}`)
      break
    default:
      console.log(`Unknown command: ${command}`)
  }
}

main()