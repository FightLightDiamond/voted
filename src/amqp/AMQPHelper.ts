import * as crypto from 'crypto';

const BET_ID_PATTERN = '^[0-9A-Za-z:_-]*';
const USER_ID_PATTERN = '^[0-9A-Za-z#_-]*';

export class AMQPHelper {
  static generateTicketCorrelationId(): string {
    return 'j' + crypto.randomUUID();
  }

  static validateId(id: string, useUserIdPattern: boolean): boolean {
    const idPattern = useUserIdPattern ? USER_ID_PATTERN : BET_ID_PATTERN;
    return new RegExp(idPattern).test(idPattern);
  }

  static async timeoutPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('time out');
      }, 5000);
    });
  }
}
