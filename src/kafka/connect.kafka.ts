import { Consumer, Producer } from 'kafkajs';
import { kafka } from '../config/kafka';

const AUTO_CONNECT_TIME = 2000;
/**
 * Connect Kafka
 */
export class ConnectKafka {
  /**
   * Producer
   * @private
   */
  private static producer: Producer | null = null;
  private static producerError = false;

  /**
   * Consumer
   * @private
   */
  private static consumer: Consumer | null = null;

  /**
   * Consumers
   * @private
   */
  private static consumers: Map<string, Consumer> = new Map();

  /**
   * Not new class
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Get Producer
   */
  public static async getProducer() {
    if (ConnectKafka.producer == null) {
      const producer = kafka.producer();
      await producer
        .connect()
        .then(() => {
          console.log('Producer Kafka Connect Successfully');
        })
        .catch((err) => {
          ConnectKafka.reConnectProducer(err);
        });
      ConnectKafka.producer = producer;
    }
    return ConnectKafka.producer;
  }

  /**
   * Re Connect Producer
   * @param err
   * @private
   */
  private static reConnectProducer(err) {
    if (!ConnectKafka.producerError) {
      console.log('Producer Kafka Connect Error: ', err);
      const id = setInterval(() => {
        ConnectKafka.handleReconnectProducer(id);
      }, AUTO_CONNECT_TIME);
    }
  }

  /**
   * handle Reconnect Producer
   * @param id
   * @private
   */
  private static handleReconnectProducer(id) {
    void ConnectKafka.getProducer().then(() => {
      if (ConnectKafka.producer) {
        clearInterval(id);
        ConnectKafka.producerError = false;
      }
    });
    ConnectKafka.producerError = true;
  }

  /**
   * Get Consumer
   */
  public static async getConsumer() {
    if (ConnectKafka.consumer == null) {
      const producer = kafka.consumer({
        groupId: 'KafkaGroupEnum.VOTED_CONSUMER',
      });
      await producer
        .connect()
        .then(() => {
          console.log('Consumer Kafka Connect Successfully');
        })
        .catch((err) => {
          console.log('Consumer Kafka Connect Error: ', err);
          const id = setInterval(() => {
            void ConnectKafka.getConsumer().then(() => {
              if (ConnectKafka.consumer) {
                clearInterval(id);
              }
            });
          }, AUTO_CONNECT_TIME);
        });
      ConnectKafka.consumer = producer;
    }
    return ConnectKafka.producer;
  }

  /**
   * Get Consumer By Group Id
   * @param groupId
   */
  public static async getConsumerByGroupId(groupId: string) {
    if (ConnectKafka.consumers.get(groupId) == null) {
      const consumer: Consumer = kafka.consumer({
        groupId: groupId,
      });
      await consumer
        .connect()
        .then(() => {
          console.log('ConsumerByGroupId Kafka Connect Successfully');
        })
        .catch((err) => {
          console.log('ConsumerByGroupId Kafka Connect Error: ', err);
          const id = setInterval(() => {
            void ConnectKafka.getConsumerByGroupId(groupId).then(() => {
              if (ConnectKafka.consumers.get(groupId)) {
                clearInterval(id);
              }
            });
          }, AUTO_CONNECT_TIME);
        });
      ConnectKafka.consumers.set(groupId, consumer);
    }
    return ConnectKafka.consumers.get(groupId);
  }
}
