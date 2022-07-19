class PlumbingSystem {
  set(v: number) {
    console.log(v);
  }

  turnOn() {}
  turnOff() {}
}

class ElectricalSystem {
  set(v: number) {
    console.log(v);
  }

  turnOn() {}
  turnOff() {}
}

class House {
  private p = new PlumbingSystem();
  private e = new ElectricalSystem();

  /**
   * Gom nhóm thực hiện
   */
  public turnOn() {
    this.p.set(10);
    this.p.turnOn();
    this.e.set(101);
    this.e.turnOn();
  }

  public shutDown() {
    this.p.turnOff();
    this.e.turnOff();
  }
}

const client = new House();
client.turnOn();

export { House };
