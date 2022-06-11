import { Kafka } from 'kafkajs';

export const KAFKA_CONFIG = {
  brokers: process.env.KAFKA_BROKERS || '',
};

export const kafka = new Kafka({
  clientId: 'KafkaClientEnum.VOTED',
  brokers: KAFKA_CONFIG.brokers.split(','),
});
