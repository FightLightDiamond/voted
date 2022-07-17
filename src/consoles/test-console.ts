import { Command, Console } from 'nestjs-console';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  AddCommand,
  Calculator,
} from '../_common/design-patterns/command/calculator';

@Console()
export class TestConsole {
  constructor(@InjectQueue('socket.io') private readonly queue: Queue) {}

  @Command({ command: 'code' })
  async test() {
    console.log('Testing ...');
    const content = 'A12345';
    const res = await this.queue.add({
      sender: 'odds_change',
      room: 'sr:match:32690467',
      message: content,
    });
    console.log('0k', res);
  }

  @Command({ command: 'calculator' })
  async Calculator() {
    const addCommand = new AddCommand(10);
    // let currentValue: number = addCommand.execute(10);
    // console.log({ currentValue });
    // currentValue = addCommand.undo(currentValue);
    // console.log({ currentValue });
    const c = new Calculator();
    // c.add(10);
    // console.log(c.value);
    // c.divide(2);
    // console.log(c.value);
    // c.multiply(3);
    // console.log(c.value);
    c.execute(addCommand);
    console.log(c.currentValue);
    c.undo();
    console.log(c.currentValue);

    const c1 = new Calculator();
    c1.execute(addCommand);
    console.log(c1.currentValue);
    c1.undo();
    console.log(c1.currentValue);
  }
}
