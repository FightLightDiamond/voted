class Airplane {
  name: '';
  land() {}
}

class Runway {
  clear: boolean;
}

/**
 * Điều hướng, middleware
 */
class Tower {
  clearForLanding(runway: Runway, plane: Airplane) {
    if (runway.clear) {
      console.log(`Plane ${plane.name} is clear for landing`);
    }
  }
}

// const r1 = new Runway();
// const r2 = new Runway();
// const r3 = new Runway();
//
// const a1 = new Airplane();
// const a2 = new Airplane();
// const a3 = new Airplane();
//
// new Tower().clearForLanding(r1, a1);
// new Tower().clearForLanding(r2, a2);
// new Tower().clearForLanding(r3, a3);

export { Tower };
