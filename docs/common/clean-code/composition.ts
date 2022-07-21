export function swimmer({ name: name }) {
  console.log(name);
  return {
    swim: () => console.log(`${name} swim`),
  };
}

export function flyer({ name: name }) {
  return {
    fly: () => console.log(`${name} fly`),
  };
}

export function walker({ name: name }) {
  return {
    walk: () => console.log(`${name} walk`),
  };
}

export function attacker({ name: name }) {
  return {
    attack: () => console.log(`${name} attack`),
  };
}

export function swimmingMonsterCreator(name) {
  const monster = { name: name };
  return {
    ...monster,
    ...swimmer(monster),
  };
}

export function attackWalkMonsterCreator(name) {
  const monster = { name: name };
  return {
    ...monster,
    ...attacker(monster),
    ...walker(monster),
  };
}

export function swimmingFlyMonsterCreator(name) {
  const monster = { name: name };
  return {
    ...monster,
    ...attackWalkMonsterCreator(name),
    ...swimmingMonsterCreator(name),
    ...flyer(monster),
  };
}
