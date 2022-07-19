import amqp, { Connection, Options } from 'amqplib';
import { AmqpProducer } from './AmqpProducer';
import { AmqpConsumer } from './AmqpConsumer';
import { AMQPHelper } from './AMQPHelper';
import Connect = Options.Connect;

const consumerConfigs = [];
const producerConfigs = [];

/**
 * Connection Config
 */
const connectionConfig: Connect = {
  protocol: 'amqps',
  hostname: 'IConfiguration.host',
  username: 'IConfiguration.username',
  password: 'IConfiguration.password',
  vhost: 'IConfiguration.vhost',
  port: 3000,
};

/**
 * AMQP Kafka
 */
export class AMQPConnect {
  /**
   * connection
   * @private
   */
  private static connection: Connection | null = null;
  private static connecting = false;

  /**
   * Get Instance
   */
  public static async connect() {
    console.log('AMQP connect...');
    this.connecting = true;

    try {
      if (AMQPConnect.connection == null) {
        console.log('AMQP begin connect...');
        AMQPConnect.connection = await AMQPConnect.connectAMQP();
        console.log('AMQP end connect...');
        AMQPConnect.connection.on('error', (error) => {
          console.log('AMQP Connection error', error);
          void AMQPConnect.reconnect();
        });

        AMQPConnect.connection.on('close', () => {
          console.log('Connection closing');
          void AMQPConnect.reconnect();
        });
        await AMQPConnect.whenConnected();
        this.connecting = false;
      }
    } catch (err) {
      console.log('Connect Error', err);
      await AMQPConnect.reconnect();
    }
    this.connecting = false;
    return AMQPConnect.connection;
  }

  /**
   * Setup Channel after connect
   */
  static async whenConnected() {
    await this.setupPublisher();
    await this.setupConsumer();
  }

  /**
   * Setup Publisher
   */
  static async setupPublisher() {
    for (const config of producerConfigs) {
      await AmqpProducer.connect(config);
    }
  }

  /**
   * Setup Consumer
   */
  static async setupConsumer() {
    for (const config of consumerConfigs) {
      await AmqpConsumer.connect(config);
    }
  }

  /**
   * Reconnect
   */
  public static async reconnect() {
    console.log('Reconnect AMQP');
    await AMQPHelper.timeoutPromise();
    this.disconnect();
    await AMQPConnect.connect();
  }

  /**
   * Disconnect
   */
  public static disconnect() {
    console.log('Disconnect AMQP');
    AMQPConnect.connection = null;
  }

  /**
   * Connect AMQP
   * @private
   */
  private static connectAMQP() {
    return amqp.connect(connectionConfig, {
      ssl: true,
      verify_peer: false,
      verify_peer_name: false,
      allow_self_signed: true,
    });
  }

  /**
   * isConnecting
   */
  public static isConnecting() {
    return this.connecting;
  }
}
