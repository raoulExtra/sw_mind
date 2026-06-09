export class AsyncQueue<T> {
  private queue: T[] = [];
  private resolvers: ((value: T | undefined) => void)[] = [];
  private closed = false;

  push(item: T): void {
    if (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift()!;
      resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  async pop(): Promise<T | undefined> {
    if (this.closed && this.resolvers.length > 0) {
      const resolve = this.resolvers.shift()!;
      resolve(undefined);
      return this.pop();
    }
    if (this.queue.length > 0) {
      return this.queue.shift()!;
    }
    if (this.closed) {
      return undefined;
    }
    return new Promise(resolve => this.resolvers.push(resolve));
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  close(): void {
    this.closed = true;
    while (this.resolvers.length > 0) {
      const resolve = this.resolvers.shift()!;
      resolve(undefined);
    }
  }
}