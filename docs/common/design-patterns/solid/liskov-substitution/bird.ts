export class FlyBird {
  fly() {
    console.log('I can fly');
  }
}
export class SwimBird {
  swim() {
    console.log('I can swim');
  }
}

export class Duck extends FlyBird {
  quack() {
    console.log('I can quack');
  }
}

export class Penguin extends SwimBird {}
