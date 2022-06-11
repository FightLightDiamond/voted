import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@WebSocketGateway({
  path: '/fld',
  serveClient: true,
  cors: {
    origin: '*',
  },
  namespace: '/alert',
})
export class AlertGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AlertGateway');

  // @SubscribeMessage('alertToServer')
  @Cron('0 * * * * *')
  sendToAll() {
    this.wss.emit('alertToClient', { type: 'Alert', message: 123 });
  }

  afterInit(server: Server): any {
    this.logger.log('alert Initialized!', server);
  }

  handleConnection(client: Socket): any {
    this.logger.log('alert Connected!', client.id);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log('alert Disconnected!', client.id);
  }
}
