import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import {
  CONFIRM_EXCHANGE,
  confirmQueueName,
  NODE_X,
  SUBMIT_EXCHANGE,
  submitQueueName,
} from './IMTSAmqp';
import { AmqpAbstractService } from './amqp.abstract.service';

@Injectable()
export class ConsumerService
  extends AmqpAbstractService
  implements OnModuleInit
{
  async onModuleInit() {
    // try {
    //   await this.consumers()
    // } catch (ex) {
    //   console.error(ex)
    // }
  }

  /**
   * Main
   */
  async consumers() {
    await this.channel();

    // await Promise.all([
    //   this.submitConsumer(channel),
    //   this.confirmConsumer(channel),
    // ])
  }

  /**
   * submitConsumer
   * @param channel
   */
  async submitConsumer(channel) {
    await channel.bindExchange(SUBMIT_EXCHANGE, SUBMIT_EXCHANGE);
    channel.consume(
      submitQueueName(NODE_X),
      (message) => {
        const routingKey = message.fields.routingKey;
        const messageContent = message.content.toString();
        //do something
        console.log({ message, routingKey, messageContent });
      },
      { noAck: true },
    );
  }

  /**
   * confirmConsumer
   * @param channel
   */
  confirmConsumer(channel) {
    channel.consume(confirmQueueName(NODE_X), (message) => {
      //do something
      console.log({ message });
    });
  }

  /**
   * Submit
   * @param msg
   */
  @RabbitRPC({
    exchange: SUBMIT_EXCHANGE,
    routingKey: submitQueueName(NODE_X),
    queue: submitQueueName(NODE_X),
  })

  /**
   * Confirm
   * @param msg
   */
  @RabbitRPC({
    exchange: CONFIRM_EXCHANGE,
    routingKey: confirmQueueName(NODE_X),
    queue: confirmQueueName(NODE_X),
  })
  public confirm(msg: object) {
    console.log(`CONFIRM_EXCHANGE rpc message: ${JSON.stringify(msg)}`);

    return { message: 'hi' };
  }

  // @RabbitSubscribe({
  //   // exchange: SUBMIT_EXCHANGE,
  //   routingKey: confirmQueueName(NODE_X),
  //   queue: submitQueueName(NODE_X),
  // })
  // public async pubSubHandler(msg: {}, amqpMsg: ConsumeMessage) {
  //   console.log({amqpMsg});
  // }
  //
  // @UseInterceptors(TransformInterceptor)
  // @RabbitRPC({
  //   // routingKey: 'intercepted-rpc-2',
  //   // exchange: 'exchange2',
  //   queue: submitQueueName(NODE_X),
  // })
  // // @UseInterceptors(TransformInterceptor)
  // interceptedRpc() {
  //   console.log('fsfsjk fskfs fskfsk')
  //   return {
  //     message: 42,
  //   };
  // }
}
