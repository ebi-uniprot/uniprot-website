export const CHANNEL_NAME = 'sw-channel';

export enum MessageTypes {
  UPDATED_DATA = 'UPDATED_DATA',
}

export enum Reasons {
  HEADER_CHECK = 'header check',
  LENGTH_CHECK = 'length check',
  BYTE_CHECK = 'byte check',
}

export type SWMessage = {
  type: MessageTypes;
  url: string;
  reason: Reasons;
};
