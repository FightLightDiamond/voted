import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export default class RabbitMQConfig {
  static getConfig(configService: ConfigService) {
    const user = configService.get('RABBITMQ_USER');
    const password = configService.get('RABBITMQ_PASSWORD');
    const host = configService.get('RABBITMQ_HOST');
    const queueName = configService.get('RABBITMQ_QUEUE_NAME');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}`],
        queue: queueName,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
}

export const RabbitMQConfigAsync = {
  provide: 'SUBSCRIBERS_SERVICE',
  // imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    RabbitMQConfig.getConfig(configService),
};
