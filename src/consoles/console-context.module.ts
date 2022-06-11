import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { queueConfigAsync } from '../config/queue.config';
import { TestConsole } from './test-console';

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
  providers: [TestConsole],
  exports: [],
})
export class ConsoleContextModule {}
