// The strategy interface declares operations common to all
// supported versions of some algorithm. The context uses this
// interface to call the algorithm defined by the concrete
// strategies.
interface Strategy {
  execute(a, b);
}

// Concrete strategies implement the algorithm while following
// the base strategy interface. The interface makes them
// interchangeable in the context.
class ConcreteStrategyAdd implements Strategy {
  execute(a, b) {
    return a + b;
  }
}

class ConcreteStrategySubtract implements Strategy {
  execute(a, b) {
    return a - b;
  }
}

class ConcreteStrategyMultiply implements Strategy {
  execute(a, b) {
    return a * b;
  }
}

// The context defines the interface of interest to clients.
class Context {
  // The context maintains a reference to one of the strategy
  // objects. The context doesn't know the concrete class of a
  // strategy. It should work with all strategies via the
  // strategy interface.
  private strategy: Strategy;

  // Usually the context accepts a strategy through the
  // constructor, and also provides a setter so that the
  // strategy can be switched at runtime.
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  // The context delegates some work to the strategy object
  // instead of implementing multiple versions of the
  // algorithm on its own.
  executeStrategy(a: number, b: number) {
    return this.strategy.execute(a, b);
  }
}

// The client code picks a concrete strategy and passes it to
// the context. The client should be aware of the differences
// between strategies in order to make the right choice.
class ExampleApplication {
  action: string;
  a: number;
  b: number;

  constructor(action, a, b) {
    this.action = action;
    this.a = a;
    this.b = b;
  }

  main() {
    const context = new Context();
    if (this.action == 'addition') {
      context.setStrategy(new ConcreteStrategyAdd());
    }

    if (this.action == 'subtraction') {
      context.setStrategy(new ConcreteStrategySubtract());
    }

    if (this.action == 'multiplication') {
      context.setStrategy(new ConcreteStrategyMultiply());
    }

    return context.executeStrategy(this.a, this.b);
  }
}

/**
 * Thay đổi hành vi của đối tượng tuy theo mục đich
 */
export { ExampleApplication };
