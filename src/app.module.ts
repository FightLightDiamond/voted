import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathService } from './math/math.service';
import { queueConfigAsync } from './config/queue.config';
import { AppGateway } from './app.gateway';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SocketModule } from './socket/socket.module';
// import { AmqpController } from './amqp/amqp.controller';
// import { SenderController } from './amqp/sender/sender.controller';
// import { ConsumerService } from './amqp/services/consumer.service';
// import { PublisherService } from './amqp/services/publisher.service';
// import { ReceiveService } from './amqp/services/receive/receive.service';
import { typeormConfigAsync } from './config/typeorm.config';
import { RolesGuard } from './auth/guards/roles.guard';
import { ThrottlerConfig } from './config/throttler.config';
import { IpMiddleware } from './_common/middlewares/ip.middleware';
import { Producer } from './broker/producer';
import { Broker } from './broker/broker';
import { Consumer } from './broker/consumer';
// import { HeroProviders } from "./heroes/hero.providers";

@Module({
  imports: [
    ThrottlerModule.forRootAsync(ThrottlerConfig),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        AWS_PRIVATE_BUCKET_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    // Graph QL
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: true,
    //   playground: true,
    //   installSubscriptionHandlers: true,
    //   autoSchemaFile: 'schema.gql',
    //   context: ({ req, res }) => ({
    //     req,
    //     res,
    //     pollOptionLoader: pollOptionLoader(),
    //   }),
    // }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // Mysql
    TypeOrmModule.forRootAsync(typeormConfigAsync),
    MailerModule.forRoot({
      transport:
        'smtps://phamminhcuong1704bnfrv@gmail.com:vincent1704BN@smtp.gmail.com',
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    //Queue
    BullModule.forRootAsync(queueConfigAsync),
    //AMQP
    // RabbitMQModule.forRoot(RabbitMQModule, {
    //   exchanges: [
    //     {
    //       name: 'username-Submit',
    //       type: 'fanout',
    //     },
    //     {
    //       name: 'username-Control',
    //       type: 'topic',
    //     },
    //     {
    //       name: 'username-Confirm',
    //       type: 'topic',
    //     },
    //     {
    //       name: 'username-Reply',
    //       type: 'topic',
    //     },
    //     {
    //       name: 'username-Ack',
    //       type: 'topic',
    //     },
    //   ],
    //   // channels: {
    //   //   'channel-1': {
    //   //     prefetchCount: 15,
    //   //     default: true,
    //   //   },
    //   //   'channel-2': {
    //   //     prefetchCount: 2,
    //   //   },
    //   // },
    //   uri: 'amqp://test:test@localhost:5672',
    //   connectionInitOptions: { wait: false },
    //   enableControllerDiscovery: true,
    // }),
    UserModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [
    AppController,
    // AmqpController, SenderController
  ],
  providers: [
    AppService,
    MathService,
    AppGateway,
    // ConsumerService, PublisherService, ReceiveService
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    Producer,
    Broker,
    Consumer,
    // ...HeroProviders,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware).forRoutes(AppController);
  }
}
