import { IUser } from './interface/IUser';

/**
 * Consumer
 */
export class Consumer {
  static LIMIT = 10;
  private static count = 0;

  /**
   * roles
   * @private
   */
  private static roles: string[] = [];

  /**
   *
   * @param message
   * @private
   */
  public static process(message: IUser) {
    if (this.count < this.LIMIT) {
      ++this.count;
      setTimeout(() => {
        console.log({ message });
      }, 3000);
    }
  }

  // /**
  //  *
  //  * @param message
  //  * @private
  //  */
  // public static process(message: IUser) {
  //   console.log({ message });
  //
  //   const { role } = message;
  //   this.removeRoles(message.id);
  //   --this.count;
  //   const isEmpty = !!Consumer.messages.get(role).length;
  //   if (isEmpty) {
  //     Broker.removeRoles(role);
  //   }
  // }
}
