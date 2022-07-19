// eslint-disable-next-line import/no-unresolved
import { Options } from 'amqplib/properties';
import { IConfiguration } from '../IConfiguration';

const option: Options.Publish = { persistent: true };

export const ticketCancelOption = {
  ...option,
  headers: {
    replyRoutingKey: `node${IConfiguration.node}.cancel.confirm`,
  },
};

export const ticketCashoutOption = {
  ...option,
  headers: {
    replyRoutingKey: 'node' + IConfiguration.node + '.ticket.cashout',
  },
};

export const ticketOption = {
  ...option,
  headers: {
    replyRoutingKey: 'node' + IConfiguration.node + '.ticket.confirm',
  },
};

export const ticketNonSrSettleOption = {
  ...option,
  headers: {
    replyRoutingKey: 'node' + IConfiguration.node + '.ticket.nonsrsettle',
  },
};
