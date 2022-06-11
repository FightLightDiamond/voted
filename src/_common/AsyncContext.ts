import { AsyncLocalStorage } from 'async_hooks';

export class AsyncContext {
  private static storage = new AsyncLocalStorage<Map<string, any>>();

  static create(next: (...args: any[]) => void) {
    this.storage.run(new Map(), next);
  }

  static getStore() {
    const store = this.storage.getStore();
    if (!store) {
      throw new Error('AsyncContext was not registered');
    }
    return store;
  }

  static set(key: string, value) {
    this.getStore().set(key, value);
  }

  static get(key: string) {
    return this.getStore().get(key);
  }
}
