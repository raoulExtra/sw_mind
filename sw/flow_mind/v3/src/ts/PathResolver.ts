import * as path from 'path'

export class PathResolver {
  static resolveBasePath(basePath: string, relativePath: string): string {
    return path.resolve(basePath, relativePath)
  }

  static resolveFlowPath(flowDir: string, baseTemplate: string): string {
    return path.resolve(flowDir, baseTemplate)
  }
}