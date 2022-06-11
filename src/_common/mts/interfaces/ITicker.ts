import { ISender } from './ISender';
import { ISelection } from './ISelection';
import { IBet } from './IBet';

export interface ITicker {
  version: string;
  ticketId: string;
  sender: ISender;
  selections: ISelection[]; //  {eventId: 1, id: string: 6.3, odds?: number}
  bets: IBet[];
  oddsChange?: string;
  totalCombinations?: string;
  lastMatchEndTime?: number;
}

// kết quả trận oddin (cashout)
