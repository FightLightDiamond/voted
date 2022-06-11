import { IEndCustomer } from './IEndCustomer';

export interface ISender {
  currency: string;
  terminalId?: string;
  channel: string;
  shopId?: string;
  bookmakerId: number;
  limitId: number;
  endCustomer?: IEndCustomer;
}
