import { ISender } from './interfaces/ISender';

export class SenderBuilder {
  channels = [
    'internet',
    'retail',
    'terminal',
    'mobile',
    'sms',
    'callCentre',
    'agent',
    'tvApp',
  ];

  sender = {};

  setCurrency(currency: string) {
    this.sender = { ...this.sender, currency };
    return this;
  }

  setTerminalId(terminalId: string) {
    this.sender = { ...this.sender, terminalId };
    return this;
  }

  setChannel(channel: string) {
    this.sender = { ...this.sender, channel };
    return this;
  }

  setShopId(shopId: string) {
    this.sender = { ...this.sender, shopId };
    return this;
  }

  setBookmakerId(bookmakerId: number) {
    this.sender = { ...this.sender, bookmakerId };
    return this;
  }

  setLimitId(limitId: number) {
    this.sender = { ...this.sender, limitId };
    return this;
  }

  setEndCustomer(endCustomer: number) {
    this.sender = { ...this.sender, endCustomer };
    return this;
  }

  build(): ISender {
    return <ISender>this.sender;
  }
}
