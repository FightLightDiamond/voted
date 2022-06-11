import { EntityManager } from 'typeorm';

/**
 * Spec Sync balance coin and pont
 *
 * Cases where changes arise:
 1. Coin increase, points increase: Deposit, Swap
 2. Coin decrease, points decrease: Withdraw, Swap
 3. Points increase, coins increase: Won (settle), Refund (Cancel, Void)
 4. Points decrease, coins decrease: Stake
 Compact ==============================================>
 1. Coin increase, points increase: Deposit, Won (settle), Refund (Cancel, Void)
 2. Coin decrease, points decrease: Withdraw, Stake
 Swap =================================================> Handle both: 1 and 2
 */

/**
 * Const types transaction
 */
export const DEPOSIT = 1;
export const WITHDRAW = -1;
export const SWAP = 0;
export const WON = 2;
export const REFUND = -2;
export const STAKE = -3;

/**
 * Interface Swap Data
 */
export interface ISwapData {
  user_id: number;
  amount: number;
}

/**
 * Interface Sync Data
 */
export interface ISyncData extends ISwapData {
  coin_symbol: string;
}

export interface ISwapCurrencies {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}

/**
 * Swap Balance
 *
 * @param transactionalEntityManager
 * @param swapData
 * @param currencies
 */
export const swapBalance = (
  transactionalEntityManager: EntityManager,
  swapData: ISwapData,
  currencies: ISwapCurrencies,
) => {
  // sync from balance
  const { fromCurrency, toCurrency, amount } = currencies;
  const fromData = {
    ...swapData,
    coin_symbol: fromCurrency,
  };
  syncBalance(transactionalEntityManager, fromData, WITHDRAW);

  // sync to balance
  const toData = {
    ...swapData,
    coin_symbol: toCurrency,
    amount: amount * 1.2,
  };
  syncBalance(transactionalEntityManager, toData, DEPOSIT);
};

/**
 * Sync Balance
 *
 * @param transactionalEntityManager
 * @param syncData
 * @param type
 */
export const syncBalance = (
  transactionalEntityManager: EntityManager,
  syncData: ISyncData,
  type: number,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { pointOperator, coinOperator } = getOperators(type);
  /**
   * Type Withdraw: in_withdraw update = 0
   */
  // updateBalance(transactionalEntityManager, syncData, pointOperator, coinOperator);
};

/**
 * Get Operators
 *
 * @param type
 */
const getOperators = (type: number) => {
  let pointOperator = '+';
  let coinOperator = '+';
  switch (type) {
    case WON:
    case REFUND:
    case DEPOSIT:
      break;
    case STAKE:
    case WITHDRAW:
      pointOperator = '-';
      coinOperator = '-';
      break;
  }

  return {
    pointOperator,
    coinOperator,
  };
};

/**
 * Update balance
 *
 * @param transactionalEntityManager
 * @param syncData
 * @param pointOperator
 * @param coinOperator
 */
// const updateBalance = (transactionalEntityManager: EntityManager, syncData: ISyncData, pointOperator: string, coinOperator: string) => {
//   const { user_id, coin_symbol, amount } = syncData;
//   transactionalEntityManager.create(EarnuBalanceLogs, {
//     coin_symbol: coin_symbol,
//     user_id: user_id,
//     current_points: amount,
//   });
//
//   transactionalEntityManager.update(EarnuBalance, { user_id: user_id, coin_symbol: coin_symbol }, {
//     current_points: () => `current_points ${pointOperator} ${amount}`,
//   });
//
//   transactionalEntityManager.update(UserBalance, { user_id: user_id, coin_symbol }, {
//     balance: () => `balance ${coinOperator} ${amount}`,
//   });
// };
