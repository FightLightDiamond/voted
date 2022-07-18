export class Monster {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  attack() {
    console.log(`${this.name} attacked`);
  }

  walk() {
    console.log(`${this.name} walk`);
  }
}

export class FlyingMonster extends Monster {
  fly() {
    console.log(`${this.name} fly`);
  }
}

export class SwimmingMonster extends Monster {
  swim() {
    console.log(`${this.name} swim`);
  }
}

/**
 * Nếu nhiều đối tương lai tạp thì rất khó thừa kế
 */
export class FlyingSwimmingMonster extends FlyingMonster {
  swim() {
    console.log(`${this.name} swim`);
  }
}

const b = new Monster('Bear');
b.walk();
const d = new FlyingMonster('Duck');
d.fly();
const f = new SwimmingMonster('Fish');
f.swim();
