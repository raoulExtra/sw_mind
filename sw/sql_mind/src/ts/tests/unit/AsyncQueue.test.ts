import { AsyncQueue } from '../../AsyncQueue';

describe('AsyncQueue', () => {
  describe('FR-WRITEQ-01: Executors must send write requests to a centralized queue', () => {
    it('should push and pop items in FIFO order', async () => {
      const queue = new AsyncQueue<number>();
      
      queue.push(1);
      queue.push(2);
      queue.push(3);
      
      expect(await queue.pop()).toBe(1);
      expect(await queue.pop()).toBe(2);
      expect(await queue.pop()).toBe(3);
    });

    it('should handle async consumers waiting for items', async () => {
      const queue = new AsyncQueue<string>();
      
      const popPromise = queue.pop();
      
      setTimeout(() => {
        queue.push('first');
        queue.push('second');
      }, 10);
      
      expect(await popPromise).toBe('first');
      expect(await queue.pop()).toBe('second');
    });
  });

  describe('FR-WRITEQ-02: Queue must preserve write order', () => {
    it('should maintain FIFO ordering for multiple concurrent pushes', async () => {
      const queue = new AsyncQueue<number>();
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      
      items.forEach(item => queue.push(item));
      
      for (const expected of items) {
        expect(await queue.pop()).toBe(expected);
      }
    });

    it('should resolve promises in push order', async () => {
      const queue = new AsyncQueue<number>();
      const results: (number | undefined)[] = [];
      
      queue.push(1);
      queue.push(2);
      queue.push(3);
      
      results.push(await queue.pop());
      results.push(await queue.pop());
      results.push(await queue.pop());
      
      expect(results).toEqual([1, 2, 3]);
    });
  });

  describe('FR-WRITEQ-03: Queue must handle backpressure', () => {
    it('should buffer items when no consumers are waiting', async () => {
      const queue = new AsyncQueue<number>();
      
      for (let i = 0; i < 100; i++) {
        queue.push(i);
      }
      
      for (let i = 0; i < 100; i++) {
        expect(await queue.pop()).toBe(i);
      }
    });

    it('should handle multiple producers and consumers', async () => {
      const queue = new AsyncQueue<number>();
      const producerResults: number[] = [];
      
      for (let i = 0; i < 5; i++) {
        queue.push(i);
        producerResults.push(i);
      }
      
      const consumerResults: (number | undefined)[] = [];
      for (let i = 0; i < 5; i++) {
        consumerResults.push(await queue.pop());
      }
      
      expect(consumerResults).toEqual(producerResults);
    });
  });

  describe('REQ-SHUTDOWN-02: AsyncQueue.close() wakes blocked pop()', () => {
    it('should resolve blocked pop() when close() is called', async () => {
      const queue = new AsyncQueue<number>();
      
      const popPromise = queue.pop();
      
      queue.close();
      
      const result = await popPromise;
      expect(result).toBeUndefined();
    });

    it('should resolve all blocked pop() calls when close() is called', async () => {
      const queue = new AsyncQueue<number>();
      
      const popPromise1 = queue.pop();
      const popPromise2 = queue.pop();
      
      queue.close();
      
      const results = await Promise.all([popPromise1, popPromise2]);
      expect(results).toEqual([undefined, undefined]);
    });

    it('should return undefined when pop() called after close() with no items', async () => {
      const queue = new AsyncQueue<number>();
      queue.close();
      
      const result = await queue.pop();
      expect(result).toBeUndefined();
    });

    it('should process remaining items then close', async () => {
      const queue = new AsyncQueue<number>();
      queue.push(1);
      queue.push(2);
      
      queue.close();
      
      expect(await queue.pop()).toBe(1);
      expect(await queue.pop()).toBe(2);
      expect(await queue.pop()).toBeUndefined();
    });

    it('should handle recursive pop after close with waiting resolvers', async () => {
      const queue = new AsyncQueue<number>();
      
      queue.push(1);
      const popPromise = queue.pop();
      queue.close();
      
      const result = await popPromise;
      expect(result).toBe(1);
    });
  });

  describe('AsyncQueue.isEmpty', () => {
    it('should return true for empty queue', async () => {
      const queue = new AsyncQueue<number>();
      expect(queue.isEmpty()).toBe(true);
    });

    it('should return false for non-empty queue', async () => {
      const queue = new AsyncQueue<number>();
      queue.push(1);
      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe('AsyncQueue edge cases', () => {
    it('should handle multiple pop calls with close in between', async () => {
      const queue = new AsyncQueue<number>();
      
      queue.push(1);
      queue.close();
      
      const results = [await queue.pop(), await queue.pop(), await queue.pop()];
      expect(results).toEqual([1, undefined, undefined]);
    });

    it('should handle recursive pop when closed with waiting resolvers', async () => {
      const queue = new AsyncQueue<number>();
      
      const popPromise = queue.pop();
      queue.close();
      
      await expect(popPromise).resolves.toBeUndefined();
    });

    it('should handle recursive pop after close with existing item', async () => {
      const queue = new AsyncQueue<number>();
      queue.push(1);
      
      queue.close();
      
      expect(await queue.pop()).toBe(1);
      expect(await queue.pop()).toBeUndefined();
    });

    it('should handle closed queue with waiting resolver and items pushed before close', async () => {
      const queue = new AsyncQueue<number>();
      queue.push(1);
      
      const popPromise = queue.pop();
      queue.push(2);
      queue.close();
      
      const first = await popPromise;
      expect(first).toBe(1);
      expect(await queue.pop()).toBe(2);
      expect(await queue.pop()).toBeUndefined();
    });

    it('should handle recursive pop with close() called while resolver exists', async () => {
      const queue = new AsyncQueue<number>();
      
      const resolver = jest.fn();
      const queue2 = new AsyncQueue<number>();
      (queue2 as any).resolvers.push(resolver);
      (queue2 as any).closed = true;
      
      await (queue2 as any).pop();
      
      expect(resolver).toHaveBeenCalledWith(undefined);
    });
  });
});