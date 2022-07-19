import { Channel, Connection } from 'amqplib';
import { AMQPConnect } from './AMQPConnect';
import { AMQPHelper } from './AMQPHelper';
import { IAmqpConsumerConfig } from './IAmqpConsumerConfig';

export class AmqpConsumer {
  private static channels: Map<string, Channel> = new Map();

  /**
   * Amqp Consumer
   * @param config
   * @constructor
   */
  public static async connect(config: IAmqpConsumerConfig) {
    const {
      instanceName,
      exchangeName,
      exchangeType,
      queueName,
      durable,
      routingKey,
    } = config;
    try {
      const connect: Connection | null = await AMQPConnect.connect();

      if (!connect) {
        throw Error('Connect AMQP fail');
      }

      if (!AmqpConsumer.channels.get(instanceName)) {
        console.log(
          'AmqpConsumer new channel begin____________: ',
          instanceName,
        );
        const channel: Channel = await connect.createChannel();
        await channel.assertExchange(exchangeName, exchangeType, {
          durable: durable,
        });
        // binding queue
        await channel.assertQueue(queueName, {
          durable: durable,
        });
        // binding queue
        await channel.bindQueue(queueName, exchangeName, routingKey);

        //Save channel
        AmqpConsumer.channels.set(instanceName, channel);
        console.log('AmqpConsumer new channel end____________: ', instanceName);
      }
    } catch (error) {
      console.log('AMQP Consumer Exception: ' + instanceName, error);
      throw error;
    }

    console.log('AmqpConsumer Success: ', instanceName);
    return AmqpConsumer.channels.get(instanceName);
  }

  /**
   * Reconnect
   */
  public static async reconnect(config: IAmqpConsumerConfig) {
    await AMQPHelper.timeoutPromise();
    if (AMQPConnect.isConnecting()) {
      await AMQPHelper.timeoutPromise();
      await this.reconnect(config);
      return;
    }
    this.disconnect(config.instanceName);
    await AmqpConsumer.connect(config);
  }

  /**
   * Disconnect
   */
  public static disconnect(instanceName: string) {
    AmqpConsumer.channels.delete(instanceName);
  }

  public static getChannels() {
    return this.channels;
  }
}
