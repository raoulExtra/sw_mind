export type TimerUnit = 'seconds' | 'minutes' | 'hours' | 'days'

export interface TimerConfig {
  delay: number
  unit?: TimerUnit
}

export class TimerSignal {
  private config: TimerConfig
  private startTime: bigint

  constructor(config: TimerConfig) {
    this.config = { ...config, unit: config.unit || 'seconds' }
    this.startTime = process.hrtime.bigint()
  }

  getDelayMs(): number {
    const { delay, unit } = this.config
    switch (unit) {
      case 'seconds': return delay * 1000
      case 'minutes': return delay * 60 * 1000
      case 'hours': return delay * 60 * 60 * 1000
      case 'days': return delay * 24 * 60 * 60 * 1000
      default: return delay * 1000
    }
  }

  hasElapsed(): boolean {
    const elapsed = Number(process.hrtime.bigint() - this.startTime) / 1_000_000
    return elapsed >= this.getDelayMs()
  }
}