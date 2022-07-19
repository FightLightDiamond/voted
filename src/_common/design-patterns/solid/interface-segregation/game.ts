export interface IMove {
  move();
}

export interface IWall {
  health: number;
  name: string;

  takeDamage(amount: number);
}

export interface IEntity extends IMove, IWall {
  damage: number;

  attack(targetEntity);
}

export class Entity implements IEntity {
  damage: number;
  health: number;
  name: string;

  constructor(name: string, damage: number, health: number) {
    this.name = name;
    this.damage = damage;
    this.health = health;
  }

  move() {
    console.log(`${this.name} moved`);
  }

  attack(targetEntity) {
    console.log(`${this.name} attacked ${targetEntity.name}`);
  }

  takeDamage(amount: number) {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }

  hasHealth() {
    return this.health;
  }
}

export class Character extends Entity {}

export class Wall implements IWall {
  constructor(name: any, health: any) {
    this.name = name;
    this.name = health;
  }

  health: number;
  name: string;

  takeDamage(amount: number) {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

export class Turret extends Entity {
  constructor(name, dame) {
    super(name, dame, -1);
  }
}
