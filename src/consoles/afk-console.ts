import { Command, Console } from 'nestjs-console';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Hero, War } from '../heroes/interfaces/hero.interface';

@Console()
export class AfkConsole {
  constructor(@InjectQueue('socket.io') private readonly queue: Queue) {}

  @Command({ command: 'war' })
  async war() {
    const a = new Hero();
    const b = new Hero();
    const w = new War(a, b);
    await w.execute();
  }
}
