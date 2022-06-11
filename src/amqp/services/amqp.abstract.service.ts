import { AMQP_EXCHANGES, getQueueNames, SUBMIT_EXCHANGE } from './IMTSAmqp';

const amqp = require('amqplib');

export class AmqpAbstractService {
  /**
   * Connect AMQP MTS
   */
  connect() {
    try {
      return amqp.connect('amqp://test:test@localhost:5672');
    } catch (ex) {
      console.error(ex);
    }
  }

  /**
   * Channel
   */
  async channel() {
    try {
      const conn = await this.connect();
      const channel = await conn.createChannel();

      await Promise.all([
        AMQP_EXCHANGES.map((amqp_exchange) => {
          const { exchange, type } = amqp_exchange;
          channel.assertExchange(exchange, type, { durable: true });
        }),
      ]);

      await Promise.all([
        getQueueNames().map((name: string) => {
          channel.assertQueue(name);
          channel.bindQueue(name, SUBMIT_EXCHANGE);
        }),
      ]);

      return channel;
    } catch (ex) {
      console.error(ex);
    }
  }
}
