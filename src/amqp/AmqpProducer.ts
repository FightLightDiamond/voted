import { Channel, Connection } from 'amqplib';
import { IAmqpProducerConfig } from './IAmqpProducerConfig';
import { AMQPConnect } from './AMQPConnect';
import { AMQPHelper } from './AMQPHelper';

/**
 * Amqp Producer
 */
export class AmqpProducer {
  private static channels: Map<string, Channel> = new Map();

  /**
   * Timeout Promise
   * @private
   */

  /**
   * connect
   * @param config
   */
  public static async connect(config: IAmqpProducerConfig) {
    const { exchangeName, exchangeType, durable, instanceName } = config;
    try {
      const connect: Connection | null = await AMQPConnect.connect();
      if (connect === null) {
        throw Error('Connect AMQP fail');
      }

      if (!AmqpProducer.channels.get(instanceName)) {
        console.log(
          'AmqpProducer new channel begin____________: ',
          instanceName,
        );
        const channel: Channel = await connect.createChannel();
        await channel.assertExchange(exchangeName, exchangeType, {
          durable: durable,
        });

        AmqpProducer.channels.set(instanceName, channel);
        console.log('AmqpProducer new channel end____________: ', instanceName);
      }
      console.log('AmqpProducer Success: ', instanceName);
      return AmqpProducer.channels.get(instanceName);
    } catch (error) {
      console.log('AMQP Producer Exception: ' + instanceName, error);
      throw error;
    }
  }

  /**
   * Reconnect
   * @param config
   */
  public static async reconnect(config: IAmqpProducerConfig) {
    console.log('Reconnect producer');
    await AMQPHelper.timeoutPromise();
    if (AMQPConnect.isConnecting()) {
      await AMQPHelper.timeoutPromise();
      await this.reconnect(config);
      return;
    }
    this.disconnect(config.instanceName);
    await AmqpProducer.connect(config);
  }

  /**
   * Disconnect
   * @param instanceName
   */
  public static disconnect(instanceName: string) {
    console.log('Reconnect disconnect');
    AmqpProducer.channels.delete(instanceName);
  }

  public static getChannels() {
    return this.channels;
  }
}
