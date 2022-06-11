import { AsyncContext } from './AsyncContext';

export class RequestContext {
  static setIp(ip: string | null) {
    AsyncContext.set('clientIp', ip);
  }

  static ip(): string | null {
    return AsyncContext.get('clientIp');
  }

  static setUser(user) {
    AsyncContext.set('user', user);
  }

  static user() {
    return AsyncContext.get('user');
  }
}
