/**
 * ===============================================
 * Exchanges
 *
 * Producer -> (routing key)-> exchange -> (bindings)-> queue -> Consumer
 *
 * - Fan out: not routing key - broadcast
 * - Topic: routing key and pattern
 * - Direct: routing key
 * - Header: Header - not routing key
 * ===============================================
 */

/**
 * sending the ticket
 */
export const SUBMIT_EXCHANGE = 'username-Submit';
/**
 * sending:
 *-ticket cancellations cashouts
 *-non-SR content messages
 */

export const CONTROL_EXCHANGE = 'username-Control';
/**
 * accept/reject recommendation
 */

export const CONFIRM_EXCHANGE = 'username-Confirm';
/**
 * accept/reject: cancellation request cashouts
 */

export const REPLY_EXCHANGE = 'username-Reply';
/**
 * Customer feedback to MTS’ ticket acceptance/rejection
 * recommendation (in case of explicit acks needed for national state lotteries)
 * customers’ final decisions on ticket cancellations
 */
export const ACK_EXCHANGE = 'username-Ack';

/***
 * ===============================================
 * Type of Exchanges
 * ===============================================
 */
export const FAN_OUT_TYPE = 'fanout';
export const TOPIC_TYPE = 'topic';

export const AMQP_EXCHANGES = [
  {
    exchange: ACK_EXCHANGE,
    type: TOPIC_TYPE,
  },
  {
    exchange: CONFIRM_EXCHANGE,
    type: TOPIC_TYPE,
  },
  {
    exchange: CONTROL_EXCHANGE,
    type: TOPIC_TYPE,
  },
  {
    exchange: REPLY_EXCHANGE,
    type: TOPIC_TYPE,
  },
  {
    exchange: SUBMIT_EXCHANGE,
    type: FAN_OUT_TYPE,
  },
];

/***
 * ===============================================
 * Queues name
 * ===============================================
 */
export const SUBMIT_QUEUE_NAME = 'username-Submit';
export const CONFIRM_QUEUE_NAME = 'username-Confirm';
export const ACK_QUEUE_NAME = 'username-Ack';
export const CONTROL_QUEUE_NAME = 'username-Control';
export const REPLY_QUEUE_NAME = 'username-Reply';
export const REPLY_CASH_OUT_QUEUE_NAME = 'username-Reply-cashout';
export const REPLY_NON_SR_SETTLE_QUEUE_NAME = 'username-Reply-nonsrsettle';

export const NODE_X = 'NODE_X';

export const getQueueNames = () => {
  const nodeX = NODE_X;

  return [
    submitQueueName(nodeX),
    confirmQueueName(nodeX),
    ackQueueName(nodeX),
    replyQueueName(nodeX),
    replyCashOutQueueName(nodeX),
    replyNonSrSettleQueueName(nodeX),
  ];
};

/**
 * Interface IMTSAmqp
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IMTSAmqp {
  submitQueueName(nodeX);
  confirmQueueName(nodeX);
  ackQueueName(nodeX);
  replyQueueName(nodeX);
  replyCashOutQueueName(nodeX);
  replyNonSrSettleQueueName(nodeX);
}

export const confirmQueueName = (nodeX) => {
  return `${CONFIRM_QUEUE_NAME}-${nodeX}`;
};

export const submitQueueName = (nodeX) => {
  return `${SUBMIT_QUEUE_NAME}-${nodeX}`;
};

export const ackQueueName = (nodeX) => {
  return `${ACK_QUEUE_NAME}-${nodeX}`;
};

export const replyQueueName = (nodeX) => {
  return `${REPLY_QUEUE_NAME}-${nodeX}`;
};

export const replyCashOutQueueName = (nodeX) => {
  return `${REPLY_CASH_OUT_QUEUE_NAME}-${nodeX}`;
};

export const replyNonSrSettleQueueName = (nodeX) => {
  return `${SUBMIT_QUEUE_NAME}-${nodeX}`;
};
