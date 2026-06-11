import * as assert from 'assert'
import * as fs from 'fs'
import * as path from 'path'
import {
  flowToDotGraph,
  generateDot,
  generateFlowDiagram,
  mapRequirementsToComponents,
  generateDependenciesDot
} from '../../flow_diagram'
import { FlowDef } from '../../fm_cli_v2'

describe('Flow Diagram Generation (FR-FM-V2-71)', () => {
  const testFlow: FlowDef = {
    id: 'test_flow',
    name: 'Test Flow',
    start_state: 'idle',
    states: [
      {
        name: 'idle',
        on_enter: [{ log: 'Starting' }],
        transitions: [
          { to: 'processing', when: 'start' }
        ]
      },
      {
        name: 'processing',
        on_exit: [{ log: 'Exiting' }],
        transitions: [
          { to: 'done', when: 'complete' }
        ]
      },
      {
        name: 'done',
        transitions: []
      }
    ]
  }

  describe('FR-FM-V2-71: DOT diagrams for flows', () => {
    it('should generate nodes for each state', () => {
      const graph = flowToDotGraph(testFlow)
      assert.strictEqual(graph.nodes.length, 3)
      assert.ok(graph.nodes.some((n: {id: string}) => n.id === 'idle'))
      assert.ok(graph.nodes.some((n: {id: string}) => n.id === 'processing'))
      assert.ok(graph.nodes.some((n: {id: string}) => n.id === 'done'))
    })

    it('should generate edges for each transition', () => {
      const graph = flowToDotGraph(testFlow)
      assert.strictEqual(graph.edges.length, 2)
      assert.ok(graph.edges.some((e: {from: string, to: string}) => e.from === 'idle' && e.to === 'processing'))
      assert.ok(graph.edges.some((e: {from: string, to: string}) => e.from === 'processing' && e.to === 'done'))
    })

    it('should include transition signals in edge labels', () => {
      const graph = flowToDotGraph(testFlow)
      const idleToProcessing = graph.edges.find((e: {from: string, to: string}) => e.from === 'idle')
      assert.ok(idleToProcessing?.label?.includes('start'))
    })
  })

  describe('FR-FM-V2-72: DOT format generation', () => {
    it('should generate valid DOT syntax', () => {
      const dot = generateFlowDiagram(testFlow)
      assert.ok(dot.startsWith('digraph'))
      assert.ok(dot.includes('{'))
      assert.ok(dot.includes('}'))
      assert.ok(dot.includes('"idle"'))
      assert.ok(dot.includes('"processing"'))
    })

    it('should include node attributes', () => {
      const dot = generateFlowDiagram(testFlow)
      assert.ok(dot.includes('shape='))
      assert.ok(dot.includes('fillcolor='))
    })
  })
})

describe('Requirement Dependencies (FR-FM-V2-73/74)', () => {
  const testRequirements = [
    { id: 'FR-FM-V2-01', description: 'Flow definition', relatedTo: 'state:idle' },
    { id: 'FR-FM-V2-02', description: 'State representation', relatedTo: 'transition:complete' },
    { id: 'FR-FM-V2-03', description: 'Guard evaluation', relatedTo: 'action:log' }
  ]

  describe('FR-FM-V2-73: Map requirements to flow components', () => {
    it('should map requirements to components', () => {
      const mappings = mapRequirementsToComponents(testRequirements)
      assert.strictEqual(mappings.length, 3)
      assert.strictEqual(mappings[0].componentType, 'state')
      assert.strictEqual(mappings[1].componentType, 'transition')
      assert.strictEqual(mappings[2].componentType, 'action')
    })
  })

  describe('FR-FM-V2-74: Generate dependencies DOT', () => {
    it('should generate dependency graph', () => {
      const mappings = mapRequirementsToComponents(testRequirements)
      const dot = generateDependenciesDot(mappings)
      assert.ok(dot.startsWith('digraph dependencies'))
      assert.ok(dot.includes('cluster_requirements'))
      assert.ok(dot.includes('cluster_components'))
    })

    it('should include requirement IDs', () => {
      const mappings = mapRequirementsToComponents(testRequirements)
      const dot = generateDependenciesDot(mappings)
      assert.ok(dot.includes('FR-FM-V2-01'))
      assert.ok(dot.includes('FR-FM-V2-02'))
      assert.ok(dot.includes('FR-FM-V2-03'))
    })
  })
})