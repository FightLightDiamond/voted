export interface IEntity {
  name: string;
}

export class Entity implements IEntity {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const mover = {
  move() {
    console.log(`${this.name} moved`);
  },
};

const attacker = {
  attack(targetEntity) {
    console.log(`${this.name} attacked ${targetEntity.name}`);
  },
};

const hasHealth = {
  takeDamage(amount: number) {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  },
};
class Character extends Entity {
  protected damage: number;
  protected health: number;
  move: () => void;
  attack: (targetEntity) => void;

  constructor(name, damage, health) {
    super(name);
    this.damage = damage;
    this.health = health;
  }
}

class Wall extends Entity {
  protected health: number;
  constructor(name: string, health: number) {
    super(name);
    this.health = health;
  }

  takeDamage: (amount: number) => void;
}

class Turret extends Entity {
  protected damage: number;
  constructor(name: string, damage: number) {
    super(name);
    this.damage = damage;
  }

  attack: (targetEntity) => void;
}

Object.assign(Character.prototype, mover);
Object.assign(Character.prototype, attacker);
Object.assign(Character.prototype, hasHealth);
Object.assign(Wall.prototype, hasHealth);
Object.assign(Turret.prototype, attacker);

export { Character, Wall, Turret };
