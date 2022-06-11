import { Injectable, OnModuleInit } from '@nestjs/common';

const amqp = require('amqplib');

@Injectable()
export class ReceiveService implements OnModuleInit {
  async onModuleInit() {
    await this.c();
    await this.taskQueue();
  }

  async c() {
    try {
      const con = await amqp.connect('amqp://test:test@localhost:5672');
      const channel = await con.createChannel();
      const queue = 'hello';

      await channel.assertQueue(queue, {
        durable: true,
      });

      await channel.consume(
        queue,
        function (msg) {
          console.log(' [x] Received %s', msg.content.toString());
        },
        {
          noAck: true,
        },
      );
    } catch (er) {
      console.log({ er });
    }
  }

  async taskQueue() {
    const con = await amqp.connect('amqp://test:test@localhost:5672');
    const channel = await con.createChannel();

    const queue = 'task_queue';

    // This makes sure the queue is declared before attempting to consume from it
    await channel.assertQueue(queue, {
      durable: true,
    });

    await channel.prefetch(1);

    await channel.consume(
      queue,
      function (msg) {
        const secs = msg.content.toString().split('.').length - 1;

        console.log(' [x] Received xxx %s', msg.content.toString());

        setTimeout(function () {
          console.log(' [x] Done');
        }, secs * 1000);
      },
      {
        // automatic acknowledgment mode,
        // see ../confirms.html for details
        noAck: true,
      },
    );
  }
}
