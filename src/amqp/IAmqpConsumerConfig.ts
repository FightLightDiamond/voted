export interface IAmqpConsumerConfig {
  exchangeName: string;
  instanceName: string;
  exchangeType: string;
  routingKey: string;
  queueName: string;
  durable: boolean | true;
  exclusiveQueue: boolean | false;
  autoDelete: boolean | false;
  autoMessageAcknowledgmentEnabled: boolean | true;
  maxRetryCount: 1;
  maxBufferSize: 64;
  concurrencyLevel: 1;
}
