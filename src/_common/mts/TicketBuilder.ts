import { ITicker } from './interfaces/ITicker';

export class TicketBuilder {
  ticket = {};

  SetTicketId(ticketId) {
    this.ticket = { ...this.ticket, ticketId };
    return this;
  }

  SetSender(sender) {
    this.ticket = { ...this.ticket, sender };
    return this;
  }

  SetOddsChange(oddsChange) {
    this.ticket = { ...this.ticket, oddsChange };
    return this;
  }

  AddBet(bets) {
    this.ticket = { ...this.ticket, bets };
    return this;
  }

  build(): ITicker {
    return <ITicker>this.ticket;
  }
}
