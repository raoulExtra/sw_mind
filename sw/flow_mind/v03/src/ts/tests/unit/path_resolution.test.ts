import * as assert from 'assert'
import * as path from 'path'
import { PathResolver } from '../../PathResolver'

describe('Path Resolution (FR-FM-V3-PATH-01/02)', () => {
  describe('FR-FM-V3-PATH-01: Relative path resolution', () => {
    it('should resolve relative path from sw/flow_mind/res', () => {
      const basePath = 'sw/flow_mind/res'
      const relativePath = '../v2/010_flow_base'
      const result = PathResolver.resolveFlowPath(basePath, relativePath)
      const expected = path.resolve(basePath, relativePath)
      assert.strictEqual(result, expected)
    })

    it('should resolve base template path correctly', () => {
      const basePath = 'sw/flow_mind/res'
      const relativePath = '../v2/010_flow_base.md'
      const result = PathResolver.resolveBasePath(basePath, relativePath)
      assert.ok(result.includes('v2'))
      assert.ok(result.includes('010_flow_base'))
    })
  })

  describe('FR-FM-V3-PATH-02: Absolute path resolution', () => {
    it('should support absolute path as alternative', () => {
      const absolutePath = 'sw/flow_mind/res/v2/010_flow_base.md'
      const relativePath = '../v2/010_flow_base.md'
      const result = PathResolver.resolveBasePath(absolutePath, '')
      assert.ok(result.includes('v2'))
    })
  })
})