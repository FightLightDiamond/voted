import { IStake } from './IStake';
import { IBonus } from './IBonus';
import { IEntireStake } from './IEntireStake';
import { ISelectionRef } from './ISelectionRef';

export interface IBet {
  id: string; //
  selectedSystems: number[]; // Số lượng bet trong 1 bet, khai detcon trong multi
  selectionRefs?: ISelectionRef[];
  stake: IStake;
  Bonus: IBonus;
  customBet?: boolean;
  calculationOdds?: number;
  entireStake?: IEntireStake;
}
