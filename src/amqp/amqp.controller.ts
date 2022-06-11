import { Controller, Get } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PublisherService } from './services/publisher.service';
import { confirmQueueName, NODE_X, submitQueueName } from './services/IMTSAmqp';

@Controller('amqp')
export class AmqpController {
  constructor(
    private readonly publisherService: PublisherService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @Get('/submit')
  async ticketSubmit() {
    const msg = {
      timestampUtc: 1515426276464,
      bets: [
        {
          stake: {
            value: 10000,
            type: 'total',
          },
          id: 'B-636510266764642431',
          selectedSystems: [3],
          sumOfWins: 0,
        },
      ],
      ticketId: 'Example5-636510266764642431',
      selections: [
        {
          eventId: '11050343',
          id: 'lcoo:42/1/*/1',
          odds: 28700,
        },
        {
          eventId: '10784408',
          id: 'lcoo:53/1/-0.25/2',
          odds: 14800,
        },
        {
          eventId: '11046885',
          id: 'lcoo:20/5/*/2',
          odds: 11299,
        },
        {
          eventId: '11029671',
          id: 'lcoo:339/5/1.5/1',
          odds: 23500,
        },
      ],
      sender: {
        currency: 'EUR',
        channel: 'internet',
        bookmakerId: 7669,
        endCustomer: {
          ip: '1.2.3.4',
          languageId: 'EN',
          deviceId: 'deviceId-123',
          id: 'Customer-36',
          confidence: 10000,
        },
        limitId: 424,
      },
      version: '2.0',
      testSource: false,
      oddsChange: 'any',
    };
    const res = await this.publisherService.submitPublisher(msg);
    console.log({ res });
  }

  @Get('/test')
  test() {
    try {
      const channel = this.amqpConnection.channel;
      // console.log({channel})
      channel.sendToQueue(
        submitQueueName(NODE_X),
        Buffer.from(JSON.stringify({ msg: 13498 })),
      );
      // await this.amqpConnection.publish(SUBMIT_EXCHANGE, submitQueueName(NODE_X), { msg: 'hello world' })
    } catch (ex) {
      console.log({ ex });
    }
  }

  @Get('/confirm')
  confirm() {
    try {
      const channel = this.amqpConnection.channel;
      // console.log({channel})
      channel.sendToQueue(
        confirmQueueName(NODE_X),
        Buffer.from(JSON.stringify({ msg: 13498 })),
      );
    } catch (ex) {
      console.log({ ex });
    }
  }
}
