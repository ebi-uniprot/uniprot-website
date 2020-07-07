export const CHANNEL_NAME = 'sw-channel';

export enum MESSAGE_TYPES {
  UPDATED_DATA = 'UPDATED_DATA',
}

export type SWMessage = {
  type: MESSAGE_TYPES;
  url: string;
  reason: string;
};
