import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'chatToClient', data: text };
  }

  handleMessageEmit(client: Socket, text: string): void {
    client.broadcast.emit('chatToClient', text);
  }

  afterInit(server: Server): any {
    this.logger.log('Initialized!', server);
  }

  handleConnection(client: Socket): any {
    this.logger.log('Connected!', client.id);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log('Disconnected!', client.id);
  }

  @SubscribeMessage('chatToServer')
  handleMessageEmitServer(client: Socket, text: string): void {
    console.log({ text });
    this.wss.emit('chatToClient', text);
  }
}
