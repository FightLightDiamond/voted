import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

type BetGameType = {
  id: number;
  type: 'MULTI' | 'SINGLE';
  odds: number;
  stake: number;
  payout: string;
  status: string;
  userId: number;
};

@Injectable()
export class BroadcastService {
  constructor(@InjectQueue('socket.io') private readonly queue: Queue) {}

  async emitBetGame(data: BetGameType) {
    await this.queue.add('emitBetGame', data);
    if (data.status !== 'UPCOMING') {
      await this.queue.add('emitPlaceBetEvent', {
        betId: data.id,
        isUpcoming: false,
      });
    }
  }

  async emitOddsChangeEvent(brFixtureId: string) {
    await this.queue.add('emitOddsChange', brFixtureId);
    await this.queue.add('emitDetailOddsChange', brFixtureId);
  }

  async emitOddsChangeForCart(data) {
    await this.queue.add('emitOddsChangeForCart', data);
  }
}
