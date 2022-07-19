import { Command, Console } from 'nestjs-console';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  AddCommand,
  Calculator,
} from '../_common/design-patterns/structural/command/calculator';
import {
  Rectangle,
  Square,
} from '../_common/design-patterns/solid/liskov-substitution/shape';
import {
  Duck,
  FlyBird,
  Penguin,
  SwimBird,
} from '../_common/design-patterns/solid/liskov-substitution/bird';
import {
  Character,
  Turret,
  Wall,
} from '../_common/design-patterns/solid/interface-segregation/game2';
import {
  PaypalPaymentProcessor,
  Store,
  StripePaymentProcessor,
} from '../_common/design-patterns/solid/dependency-inversion/payment';
import {
  swimmingFlyMonsterCreator,
  swimmingMonsterCreator,
} from '../_common/clean-code/composition';
import { zombie } from '../_common/design-patterns/creational/prototype/zombie';
import { reactive } from '../_common/design-patterns/structural/proxy/reactive';
import { range } from '../_common/design-patterns/behavioral/iterator/iterator';

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
  Calculator() {
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

  @Command({ command: 'shape' })
  shape() {
    function increase(rectangle) {
      rectangle.setWidth(rectangle.width + 1);
    }

    const r1 = new Rectangle(10, 2);
    const r2 = new Square(5);
    increase(r1);
    increase(r2);

    console.log(r1.area());
    console.log(r2.area());
  }

  @Command({ command: 'bird' })
  Bird() {
    function makeBirdFly(bird: FlyBird) {
      bird.fly();
    }

    function makeSwimmingBird(bird: SwimBird) {
      bird.swim();
    }

    const duck = new Duck();
    const penguin = new Penguin();

    makeBirdFly(duck);
    makeSwimmingBird(penguin);
  }

  @Command({ command: 'game' })
  game() {
    const t = new Turret('Turret', 5);
    const c = new Character('Character', 3, 100);
    const w = new Wall('Wall', 200);
    t.attack(c);
    c.move();
    c.attack(w);
    w.takeDamage(6);
  }

  @Command({ command: 'payment' })
  payment() {
    const store = new Store(new StripePaymentProcessor('Jon'));
    store.purchaseBike(2);
    store.purchaseHelmet(2);
    const store2 = new Store(new PaypalPaymentProcessor('Ki'));
    store2.purchaseBike(2);
    store2.purchaseHelmet(2);
  }

  @Command({ command: 'composition' })
  composition() {
    const o = swimmingMonsterCreator('Snake');
    o.swim();
    const d = swimmingFlyMonsterCreator('Duck');
    d.swim();
    d.fly();
    d.attack();
    d.walk();
  }

  @Command({ command: 'zombie' })
  zombie() {
    const e = zombie.eatBrains();
    zombie.name = 'B';
    console.log(e);
    const c = Object.create(zombie, { name: { value: 'chad' } });
    console.log(c);
    console.log(c.name);
    console.log(c.__proto__.name);
    console.log(Object.getPrototypeOf(c).name);
  }

  @Command({ command: 'proxy' })
  proxy() {
    console.log(reactive.name);
    reactive.name = 'He';
  }

  @Command({ command: 'iterator' })
  iterator() {
    const ns = range(0, 100, 6);
    console.log({ ns });
    for (const n of range(0, 100, 15)) {
      console.log(n);
    }
  }
}
