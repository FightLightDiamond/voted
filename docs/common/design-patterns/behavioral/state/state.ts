class HumanNoState {
  think(mood: string) {
    switch (mood) {
      case 'happy':
        return 'I am happy';
      case 'sad':
        return 'I am sad';
      default:
        return 'I am neutral';
    }
  }
}

interface State {
  think(): string;
}

class HappyState implements State {
  think(): string {
    return 'I am happy';
  }
}

class SadState implements State {
  think(): string {
    return 'I am sad';
  }
}

class NeutralState implements State {
  think(): string {
    return 'I am neutral';
  }
}

class HumanState {
  state: State;
  constructor() {
    this.state = new HappyState();
  }

  think() {
    return this.state.think();
  }

  changeState(state: State) {
    this.state = state;
  }
}

export { HumanNoState, HumanState, HappyState, SadState, NeutralState };
