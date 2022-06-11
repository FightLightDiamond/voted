import { Injectable } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CONFIRM_EXCHANGE, confirmQueueName } from './services/IMTSAmqp';

@Injectable()
export class AmqpService {
  // nodeX: string
  // constructor(nodeX) {
  //   this.nodeX = nodeX
  // }

  @RabbitRPC({
    routingKey: 'intercepted-rpc-2',
    exchange: CONFIRM_EXCHANGE,
    queue: confirmQueueName(1),
  })
  // @UseInterceptorsΩptors(TransformInterceptor)
  interceptedRpc() {
    return {
      message: 42,
    };
  }

  // /**
  //  * Receiving Messages
  //  * @param msg
  //  */
  // @RabbitRPC({
  //   exchange: 'exchange1',
  //   routingKey: 'rpc-route',
  //   queue: 'rpc-queue',
  // })
  // public async rpcHandler(msg: {}) {
  //     return new Nack();
  // }

  // @RabbitSubscribe({
  //   exchange: 'exchange1',
  //   routingKey: 'subscribe-route',
  //   queue: 'subscribe-queue',
  // })
  // public async pubSubHandler(msg: {}) {
  //   console.log(`Received message: ${JSON.stringify(msg)}`);
  // }

  // @RabbitSubscribe({
  //   exchange: 'exchange1',
  //   routingKey: 'subscribe-route',
  //   queue: 'subscribe-queue',
  // })
  // public async pubSubHandler2(msg: {}, amqpMsg: ConsumeMessage) {
  //   console.log({amqpMsg});
  // }
}
