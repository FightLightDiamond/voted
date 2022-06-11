import { IBet } from './interfaces/IBet';

export class BetBuilder {
  bet: object;

  SetSelectedSystems(betId) {
    this.bet = { ...this.bet, betId };
  }

  SetSelectionRefs(StakeType) {
    this.bet = { ...this.bet, StakeType };
  }

  setStake(betId) {
    this.bet = { ...this.bet, betId };
  }

  setBonus(betId) {
    this.bet = { ...this.bet, betId };
  }

  setCustomBet(betId) {
    this.bet = { ...this.bet, betId };
  }

  setCalculationOdds(betId) {
    this.bet = { ...this.bet, betId };
  }

  setEntireStake(betId) {
    this.bet = { ...this.bet, betId };
  }

  build(): IBet {
    return <IBet>this.bet;
  }
}
