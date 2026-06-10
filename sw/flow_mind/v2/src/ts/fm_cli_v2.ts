import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

export interface FlowState {
  flow_id: string;
  current_step: string;
  data: Record<string, any>;
  history: Array<{step: string, timestamp: string}>;
}

export interface FlowContext {
  [key: string]: any;
}

export type Context = FlowContext

export interface Guard {
  condition: string;
  else?: string;
}

export interface Action {
  log?: string;
  executor?: string;
  http?: { method: string; url: string };
}

export interface Transition {
  to: string;
  when?: string;
  on?: string;
  guard?: Guard;
  actions?: Action[];
}

export interface GuardCondition {
  op: string;
  field?: string;
  value?: any;
  condition?: string;
  else?: string;
}

export interface StateDef {
  name: string;
  on_enter?: Action[];
  on_exit?: Action[];
  transitions?: Transition[];
}

export interface SignalDef {
  name: string;
  description?: string;
  schema?: any;
}

export interface FlowDef {
  id: string;
  name: string;
  type?: string;
  start_state: string;
  states: StateDef[];
  signals?: SignalDef[];
  extends?: string;
}

export interface FlowFile {
  frontmatter: Record<string, any>;
  flow: FlowDef;
}

export function createEmptyContext(): FlowContext {
  return {}
}

export function getContext(context: FlowContext, key: string): any {
  return context[key]
}

export function setContext(context: FlowContext, key: string, value: any): FlowContext {
  return { ...context, [key]: value }
}

export function updateContext(context: FlowContext, updates: Record<string, any>): FlowContext {
  return { ...context, ...updates }
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
  if (!currentStateDef || !currentStateDef.transitions || currentStateDef.transitions.length === 0) {
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

export function evaluateGuardWithContext(context: FlowContext, condition: string): boolean {
  const match = condition.match(/^(\w+)\s*(>=|<=|!=|==|>|<)\s*(.+)$/)
  if (!match) return false
  const [, field, op, valueStr] = match
  const fieldValue = context[field]
  let expectedValue: any = valueStr.trim()
  if (expectedValue.startsWith("'") || expectedValue.startsWith('"')) {
    expectedValue = expectedValue.slice(1, -1)
  } else if (!isNaN(Number(expectedValue))) {
    expectedValue = Number(expectedValue)
  }
  switch (op) {
    case '==': return fieldValue == expectedValue
    case '!=': return fieldValue != expectedValue
    case '>': return fieldValue > expectedValue
    case '<': return fieldValue < expectedValue
    case '>=': return fieldValue >= expectedValue
    case '<=': return fieldValue <= expectedValue
    default: return false
  }
}

export function evaluateGuard(context: FlowContext, condition: string): boolean {
  return evaluateGuardWithContext(context, condition)
}

export function findTransitionBySignal(flow: FlowDef, stateName: string, signal: string): Transition | null {
  const state = flow.states.find(s => s.name === stateName)
  if (!state || !state.transitions) return null
  return state.transitions.find(t => t.when === signal) || null
}

const crockfordBase32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

export function generateULID(): string {
  const now = Date.now()
  const timestamp = now.toString(16).toUpperCase().slice(-10)
  const randomness = Array.from({ length: 16 }, () => crockfordBase32[Math.floor(Math.random() * 32)]).join('')
  return timestamp + randomness
}

export class WriteIntentQueue {
  private db: any
  constructor(db: any) { this.db = db }
  enqueue(intent: { type: string, table: string, data: any }) { return intent }
}

export class UserInputTable {
  private db: any
  constructor(db: any) { this.db = db }
  create() {}
  insert(input: { id: string, text: string, created_at: string }) { return input }
}

export class CommitAgent {
  private db: any
  constructor(db: any) { this.db = db }
  process() { return true }
}

export function loadFlow(filePath: string): FlowFile {
  const content = fs.readFileSync(filePath, 'utf-8')
  return parseFlowFile(content)
}

export function parseFlowFile(content: string): FlowFile {
  const lines = content.split('\n')
  const frontmatterEnd = lines.indexOf('---', 1)
  
  if (frontmatterEnd > 0 && lines[0] === '---') {
    const frontmatterYaml = lines.slice(1, frontmatterEnd).join('\n')
    const frontmatter = yaml.load(frontmatterYaml) as Record<string, any>
    const remainingContent = lines.slice(frontmatterEnd + 1).join('\n')
    const flowMatch = remainingContent.match(/flow:\s*\n([\s\S]*?)(?:\s*$|\`\`\`)/)
    if (flowMatch) {
      const flowYaml = 'flow:\n' + flowMatch[1]
      const parsed = yaml.load(flowYaml) as any
      return { frontmatter, flow: parsed.flow }
    }
    const parsed = yaml.load(remainingContent) as any
    return { frontmatter, flow: parsed.flow || parsed }
  }
  
  const parsed = yaml.load(content) as any
  return { frontmatter: {}, flow: parsed.flow || parsed }
}

function main(): void {
  const args = process.argv.slice(2)
  if (args.length < 2) {
    console.log('Usage: fm_cli_v2 <flow.md> <command> [args]')
    process.exit(1)
  }

  const flowPath = path.resolve(process.cwd(), 'sw/flow_mind/res/v2', args[0])
  const command = args[1]
  const statePath = 'state.json'

  const { frontmatter, flow } = loadFlow(flowPath)
  
  console.log(`Title: ${frontmatter.title || flow.name}`)
  console.log(`Status: ${frontmatter.status || 'active'}`)
  console.log(`Flow: ${flow.name}`)
  
  let state: FlowState
  if (fs.existsSync(statePath)) {
    state = JSON.parse(fs.readFileSync(statePath, 'utf-8'))
  } else {
    state = createState(flow.id)
    saveState(state, statePath)
  }

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