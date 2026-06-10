import * as assert from 'assert'
import { parseFlowFile, loadFlow, FlowFile } from '../../fm_cli_v2'

describe('Flow File Format Parsing (FR-FM-V2-01/02/03)', () => {
  const markdownFlow = `---
title: 'My Flow'
tags:
- my_flow
persona: developer
status: active
version: V00.01.00
updated: 2026-06-10
summary: 'A sample flow'
---
flow:
  id: my_flow
  name: My Flow
  start_state: init
  states:
    - name: init
      transitions:
        - to: complete
          when: start
`

  const pureYamlFlow = `flow:
  id: pure_flow
  name: Pure YAML Flow
  start_state: idle
  states:
    - name: idle
      transitions:
        - to: done
          when: go
`

  describe('FR-FM-V2-01: Parse YAML frontmatter from flow files', () => {
    it('should extract frontmatter between --- delimiters', () => {
      const result = parseFlowFile(markdownFlow)
      assert.strictEqual(result.frontmatter.title, 'My Flow')
      assert.deepStrictEqual(result.frontmatter.tags, ['my_flow'])
      assert.strictEqual(result.frontmatter.persona, 'developer')
      assert.strictEqual(result.frontmatter.status, 'active')
    })
  })

  describe('FR-FM-V2-02: Parse flow definition from YAML content', () => {
    it('should parse flow definition from markdown with frontmatter', () => {
      const result = parseFlowFile(markdownFlow)
      assert.strictEqual(result.flow.id, 'my_flow')
      assert.strictEqual(result.flow.name, 'My Flow')
      assert.strictEqual(result.flow.start_state, 'init')
      assert.strictEqual(result.flow.states.length, 1)
      assert.strictEqual(result.flow.states[0].name, 'init')
    })

    it('should parse flow definition from pure YAML', () => {
      const result = parseFlowFile(pureYamlFlow)
      assert.strictEqual(result.flow.id, 'pure_flow')
      assert.strictEqual(result.flow.name, 'Pure YAML Flow')
      assert.strictEqual(result.flow.start_state, 'idle')
    })
  })

  describe('FR-FM-V2-03: Support both pure YAML and markdown formats', () => {
    it('should handle markdown format with frontmatter', () => {
      const result = parseFlowFile(markdownFlow)
      assert.ok(result.frontmatter.title)
      assert.ok(result.flow)
    })

    it('should handle pure YAML without frontmatter', () => {
      const result = parseFlowFile(pureYamlFlow)
      assert.deepStrictEqual(result.frontmatter, {})
      assert.ok(result.flow)
    })
  })
})