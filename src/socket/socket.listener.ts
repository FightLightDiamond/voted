import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { SocketService } from './socket.service';

@Injectable()
export class SocketListener {
  constructor(private readonly socketService: SocketService) {}

  @OnEvent('socket.io:emitSportBook')
  emitSportBook(data) {
    this.socketService.server.emit('sport-book', data);
  }
}
