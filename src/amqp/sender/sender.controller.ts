import { Controller, Get } from '@nestjs/common';

const amqp = require('amqplib');

@Controller('sender')
export class SenderController {
  @Get('/')
  async connect() {
    try {
      const connection = await amqp.connect('amqp://test:test@localhost:5672');
      const channel = await connection.createChannel();
      const queue = 'hello';
      const msg = 'Hello world';
      await channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);
      // await connection.close();
      return 1;
    } catch (er) {
      console.log({ er });
    }
  }

  @Get('/task_queue')
  async task_queue() {
    try {
      const connection = await amqp.connect('amqp://test:test@localhost:5672');
      const channel = await connection.createChannel();
      const queue = 'task_queue';
      const msg = 'Hello world xxx' + new Date();
      await channel.assertQueue(queue, {
        durable: true,
      });
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });
      console.log(' [x] Sent %s', msg);
      // await connection.close();
    } catch (er) {
      console.log({ er });
    }
  }
}
