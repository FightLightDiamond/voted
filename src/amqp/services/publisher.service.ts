import { Injectable } from '@nestjs/common';
import { AmqpAbstractService } from './amqp.abstract.service';
import { NODE_X, submitQueueName } from './IMTSAmqp';

@Injectable()
export class PublisherService extends AmqpAbstractService {
  async submitPublisher(msg) {
    try {
      const connect = await this.connect();
      const channel = await connect.createChannel();
      // await channel.bindExchange(SUBMIT_EXCHANGE, SUBMIT_EXCHANGE)
      await channel.sendToQueue(
        submitQueueName(NODE_X),
        Buffer.from(JSON.stringify(msg)),
      );
      console.log('Job sent successfully');
    } catch (ex) {
      console.error(ex);
    }
  }

  async confirmPublisher() {
    try {
      const msg = { number: 19 };
      const connection = await this.connect();
      const channel = await connection.createChannel();
      await channel.assertQueue('confirmConsumer');
      await channel.sendToQueue(
        'confirmConsumer',
        Buffer.from(JSON.stringify(msg)),
      );
      console.log('Job sent successfully');
    } catch (ex) {
      console.error(ex);
    }
  }

  async cancelPublisher() {
    try {
      const msg = { number: 19 };
      const connection = await this.connect();
      const channel = await connection.createChannel();
      await channel.assertQueue('cancelConsumer');
      await channel.sendToQueue(
        'cancelConsumer',
        Buffer.from(JSON.stringify(msg)),
      );
      console.log('Job sent successfully');
    } catch (ex) {
      console.error(ex);
    }
  }
}
