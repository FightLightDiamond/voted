import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { queueConfigAsync } from '../config/queue.config';
import { TestConsole } from './test-console';
import { AfkConsole } from './afk-console';

@Module({
  imports: [
    ConsoleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BullModule.forRootAsync(queueConfigAsync),
    BullModule.registerQueue({
      name: 'socket.io',
    }),
  ],
  providers: [TestConsole, AfkConsole],
  exports: [],
})
export class ConsoleContextModule {}
