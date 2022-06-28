import { Location } from '../../app/config/urls';

export enum MessageLevel {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  FAILURE = 'failure',
}

export enum MessageFormat {
  POP_UP = 'POP_UP', // eg pops up at the bottom right of the page
  IN_PAGE = 'IN_PAGE', // eg full width banner at the top of the page
}

export enum MessageTag {
  JOB = 'JOB',
  DOWNTIME = 'DOWNTIME',
  REDIRECT = 'REDIRECT',
}

export type MessageType = {
  id: string;
  content: string | JSX.Element;
  format: MessageFormat;
  level: MessageLevel;
  // Length of time during which this message will be displayed
  // short | medium | long
  displayTime?: 5_000 | 15_000 | 30_000;
  tag?: MessageTag;
  locations?: Location[];
  omitAndDeleteAtLocations?: Location[];
};
