export class Stripe {
  user: any;

  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(`${this.user} make payment of ${amountInCents}`);
  }
}

export class Paypal {
  makePayment(user, amountInCents) {
    console.log(`${user} make payment of ${amountInCents}`);
  }
}

export class PaymentProcessor {
  user: any;

  constructor(user) {
    this.user = user;
  }

  pay(amountInCents) {
    console.log(`${this.user} make payment of ${amountInCents}`);
  }
}

export class StripePaymentProcessor {
  stripe: Stripe;

  constructor(user) {
    this.stripe = new Stripe(user);
  }

  pay(amountInCents) {
    this.stripe.makePayment(amountInCents);
  }
}

export class PaypalPaymentProcessor {
  user: any;
  paypal: Paypal;

  constructor(user) {
    this.user = user;
    this.paypal = new Paypal();
  }

  pay(amountInCents) {
    this.paypal.makePayment(this.user, amountInCents);
  }
}

export class Store {
  paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  purchaseBike(quantity) {
    this.paymentProcessor.pay(200 * quantity);
  }

  purchaseHelmet(quantity) {
    this.paymentProcessor.pay(25 * quantity);
  }
}
