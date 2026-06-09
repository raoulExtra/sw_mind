import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

export interface FlowState {
  flow_id: string;
  current_step: string;
  data: Record<string, any>;
  history: Array<{step: string, timestamp: string}>;
}

export interface Transition {
  to: string;
  when?: string;
  on?: string;
  guard?: GuardCondition[];
}

export interface GuardCondition {
  op: string;
  field?: string;
  value?: any;
}

export interface StateDef {
  name: string;
  on_enter?: string[];
  transitions: Transition[];
}

export interface SignalDef {
  name: string;
  description?: string;
  schema?: any;
}

export interface FlowDef {
  id: string;
  name: string;
  type: string;
  start_state: string;
  states: StateDef[];
  signals?: SignalDef[];
  extends?: string;
}

export function loadFlow(filePath: string): FlowDef {
  const content = fs.readFileSync(filePath, 'utf-8')
  const parsed = yaml.load(content) as any
  return parsed.flow || parsed
}

export function createState(flowId: string): FlowState {
  return {
    flow_id: flowId,
    current_step: 'init',
    data: {},
    history: []
  }
}

export function saveState(state: FlowState, filePath: string): void {
  fs.writeFileSync(filePath, JSON.stringify(state, null, 2))
}

export function loadState(filePath: string): FlowState | null {
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function getNextTransition(flow: FlowDef, state: FlowState): Transition | null {
  const currentStateDef = flow.states.find(s => s.name === state.current_step)
  if (!currentStateDef || currentStateDef.transitions.length === 0) {
    return null
  }
  return currentStateDef.transitions[0]
}

export function executeNext(flow: FlowDef, state: FlowState): FlowState | null {
  const transition = getNextTransition(flow, state)
  if (!transition) {
    return null
  }
  const newState: FlowState = {
    ...state,
    current_step: transition.to,
    history: [...state.history, { step: state.current_step, timestamp: new Date().toISOString() }]
  }
  return newState
}

function main(): void {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.log('Usage: fm_cli <flow.yaml> <command> [args]')
    process.exit(1)
  }

  const flowPath = path.resolve(__dirname, '../../res/v1', args[0])
  const command = args[1]
  const statePath = 'state.json'

  const flow = loadFlow(flowPath)
  
  let state: FlowState
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'))
  } else {
    state = createState(flow.id)
    saveState(state, statePath)
  }

  console.log(`Flow: ${flow.name}`)
  console.log(`Current step: ${state.current_step}`)

  switch (command) {
    case 'status':
      console.log(JSON.stringify(state, null, 2))
      break
    case 'next':
      const newState = executeNext(flow, state)
      if (newState) {
        console.log(`Moving from ${state.current_step} to ${newState.current_step}`)
        state = newState
        saveState(state, statePath)
      } else {
        console.log(`No valid transition from ${state.current_step}`)
      }
      break
    default:
      console.log(`Unknown command: ${command}`)
  }
}

if (require.main === module) {
  main()
}