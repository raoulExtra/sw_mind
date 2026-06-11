import * as fs from 'fs'
import * as path from 'path'
import { FlowDef, StateDef, Transition, Action } from './fm_cli_v2'

export interface DotNode {
  id: string
  label: string
  shape?: string
  style?: string
  color?: string
}

export interface DotEdge {
  from: string
  to: string
  label?: string
  color?: string
}

export interface DotGraph {
  nodes: DotNode[]
  edges: DotEdge[]
}

export function stateToDotNode(state: StateDef): DotNode {
  return {
    id: state.name,
    label: state.name,
    shape: 'ellipse',
    style: 'filled',
    color: 'lightblue'
  }
}

export function transitionToDotEdge(transition: Transition, fromState: string): DotEdge {
  const labelParts: string[] = []
  if (transition.when) labelParts.push(`signal: ${transition.when}`)
  if (transition.guard?.condition) labelParts.push(`guard: ${transition.guard.condition}`)
  if (transition.actions?.length) {
    const actionLabels = transition.actions.map((a: Action) => {
      if (a.executor) return a.executor
      if (a.log) return `log`
      if (a.http) return `http`
      return 'action'
    }).join(', ')
    labelParts.push(`actions: ${actionLabels}`)
  }
  
  return {
    from: fromState,
    to: transition.to,
    label: labelParts.join('\\n')
  }
}

export function flowToDotGraph(flow: FlowDef): DotGraph {
  const nodes: DotNode[] = []
  const edges: DotEdge[] = []
  
  for (const state of flow.states) {
    nodes.push(stateToDotNode(state))
    
    if (state.transitions) {
      for (const transition of state.transitions) {
        edges.push(transitionToDotEdge(transition, state.name))
      }
    }
  }
  
  return { nodes, edges }
}

export function generateDot(graph: DotGraph): string {
  const lines: string[] = ['digraph flow {']
  lines.push('  rankdir=LR;')
  lines.push('  node [shape=ellipse, style=filled, fillcolor=lightblue];')
  lines.push('')
  
  for (const node of graph.nodes) {
    const attrs = [
      `label="${node.label}"`,
      node.shape ? `shape=${node.shape}` : '',
      node.style ? `style=${node.style}` : '',
      node.color ? `fillcolor=${node.color}` : ''
    ].filter(a => a).join(', ')
    lines.push(`  "${node.id}" [${attrs}];`)
  }
  
  lines.push('')
  
  for (const edge of graph.edges) {
    const labelAttr = edge.label ? `label="${edge.label.replace(/"/g, '\\"')}"` : ''
    const colorAttr = edge.color ? `color=${edge.color}` : ''
    const attrs = [labelAttr, colorAttr].filter(a => a).join(', ')
    lines.push(`  "${edge.from}" -> "${edge.to}"${attrs ? ' [' + attrs + ']' : ''};`)
  }
  
  lines.push('}')
  return lines.join('\n')
}

export function generateFlowDiagram(flow: FlowDef): string {
  const graph = flowToDotGraph(flow)
  return generateDot(graph)
}

export function saveDotFile(flow: FlowDef, outputPath: string): void {
  const dot = generateFlowDiagram(flow)
  fs.writeFileSync(outputPath, dot)
}

export function savePngFile(flow: FlowDef, outputPath: string): boolean {
  const dotPath = outputPath.replace('.png', '.dot')
  saveDotFile(flow, dotPath)
  
  try {
    const { execSync } = require('child_process')
    execSync(`dot -Tpng "${dotPath}" -o "${outputPath}"`, { stdio: 'pipe' })
    return true
  } catch (e) {
    return false
  }
}

export interface RequirementMapping {
  requirementId: string
  componentType: 'state' | 'transition' | 'action'
  componentId: string
  description: string
}

export function mapRequirementsToComponents(
  requirements: Array<{id: string, description: string, relatedTo?: string}>
): RequirementMapping[] {
  const mappings: RequirementMapping[] = []
  
  for (const req of requirements) {
    if (req.relatedTo) {
      const parts = req.relatedTo.split(':')
      const componentType = parts[0] as 'state' | 'transition' | 'action'
      const componentId = parts[1] || ''
      
      mappings.push({
        requirementId: req.id,
        componentType,
        componentId,
        description: req.description
      })
    }
  }
  
  return mappings
}

export function generateDependenciesDot(mappings: RequirementMapping[]): string {
  const lines: string[] = ['digraph dependencies {']
  lines.push('  rankdir=LR;')
  lines.push('  node [shape=box];')
  lines.push('')
  lines.push('  subgraph cluster_requirements {')
  lines.push('    label="Requirements";')
  lines.push('    style=filled;')
  lines.push('    fillcolor=lightyellow;')
  
  const reqIds = [...new Set(mappings.map(m => m.requirementId))]
  for (const reqId of reqIds) {
    lines.push(`    "${reqId}" [shape=box, fillcolor=yellow];`)
  }
  lines.push('  }')
  lines.push('')
  lines.push('  subgraph cluster_components {')
  lines.push('    label="Flow Components";')
  lines.push('    style=filled;')
  lines.push('    fillcolor=lightblue;')
  
  const compIds = [...new Set(mappings.map(m => `${m.componentType}:${m.componentId}`))]
  for (const compId of compIds) {
    lines.push(`    "${compId}" [shape=ellipse, fillcolor=lightblue];`)
  }
  lines.push('  }')
  lines.push('')
  
  for (const mapping of mappings) {
    lines.push(`  "${mapping.requirementId}" -> "${mapping.componentType}:${mapping.componentId}";`)
  }
  
  lines.push('}')
  return lines.join('\n')
}

export function saveDependenciesDot(mappings: RequirementMapping[], outputPath: string): void {
  const dot = generateDependenciesDot(mappings)
  fs.writeFileSync(outputPath, dot)
}