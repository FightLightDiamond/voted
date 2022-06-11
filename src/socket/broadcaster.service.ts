import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BroadcasterService {
  constructor(@InjectQueue('socket.io-v3') private readonly queue: Queue) {}

  async broadcastTicketChangedEvent(ticket) {
    await this.queue.add('emitPlaceBetEvent-v3', {
      id: ticket.id,
      type: ticket.type,
      isUpcoming: false,
    });
  }
}
