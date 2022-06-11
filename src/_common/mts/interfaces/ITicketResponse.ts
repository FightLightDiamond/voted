import { ITicketResponseResult } from './ITicketResponseResult';

export interface ITicketResponse {
  version: string;
  signature: string;
  result: ITicketResponseResult;
  autoAcceptedOdds?: object;
  exchangeRate: number;
}
