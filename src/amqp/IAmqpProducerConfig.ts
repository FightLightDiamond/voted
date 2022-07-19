export interface IAmqpProducerConfig {
  instanceName: string;
  exchangeName: string;
  exchangeType: string;
  routingKey: string;
  queueName: string;
  durable: boolean | true;
  exclusiveQueue: boolean | false;
  autoDelete: boolean | false;
  autoMessageAcknowledgmentEnabled: boolean | true;
  maxRetryCount: number;
  maxBufferSize: number;
  concurrencyLevel: number;
}
