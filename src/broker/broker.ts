import { OnModuleInit } from '@nestjs/common';
import { Consumer } from './consumer';
import { IUser } from './interface/IUser';

/**
 * Broker
 */
export class Broker implements OnModuleInit {
  onModuleInit() {
    // setInterval(() => {
    //   Broker.process();
    // }, 2000);
  }

  /**
   * messages
   * @private
   */
  private static messages: Map<string, IUser[]> = new Map();

  /**
   * roles
   * @private
   */
  private static roles: Map<string, boolean> = new Map();

  /**
   * Push Message
   * @param id
   * @param message
   */
  public static pushMessage(id, message: IUser) {
    const { role } = message;
    const messages = Broker.messages.get(role) ?? [];
    Broker.messages.set(role, [...messages, message]);
  }

  /**
   * Process
   * @private
   */
  private static process() {
    console.log('Broker process');
    this.messages.forEach((ms) => {
      for (const m of ms) {
        // const { role } = m;

        // if (!this.roles.get(role)) {
        Consumer.process(m);
        //   this.roles.set(role, true);
        // }
      }
    });
  }

  /**
   * Remove Roles
   * @param role
   */
  static removeRoles(role: string) {
    Broker.roles.delete(role);
  }
}
