import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { queueConfigAsync } from '../config/queue.config';
// import { SocketGateway } from './socket.gateway';
// import { AlertGateway } from './alert.gateway';
// import { AlertController } from './alert/alert.controller';
// import { RoomGateway } from './room.gateway';
import { SocketService } from './socket.service';
import { AppGateway } from './app.gateway';
import { SocketListener } from './socket.listener';
import { SocketConsumer } from './socket.consumer';
// import { BroadcastService } from './broadcast.service';
// import { BroadcasterService } from './broadcaster.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    BullModule.forRootAsync(queueConfigAsync),
    BullModule.registerQueue({
      name: 'socket.io',
    }),
  ],
  providers: [
    // SocketGateway,
    // AlertGateway,
    // RoomGateway,
    // BroadcastService,
    // BroadcasterService,

    AppGateway,
    SocketService,
    SocketListener,
    SocketConsumer,
  ],
  exports: [SocketService],
  controllers: [],
})
export class SocketModule {}
