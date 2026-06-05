/* eslint-disable no-console */
import { captureException, captureMessage } from '@sentry/react';
import { type ScopeContext } from '@sentry/types';

const isProduction = process.env.NODE_ENV !== 'development';
const isTest = process.env.NODE_ENV === 'test';

type LoggingHelper = (
  message: string | Error | ErrorEvent,
  context?: Partial<ScopeContext>
) => void;

/* istanbul ignore next */
export const warn: LoggingHelper = (message, context) => {
  if (isProduction) {
    captureMessage(message.toString(), {
      ...(context || {}),
      level: 'warning',
    });
  } else if (!isTest) {
    console.warn('%o', message, context);
  }
};

/* istanbul ignore next */
export const error: LoggingHelper = (message, context) => {
  if (isProduction) {
    captureException(message, context);
  }
  if (!isTest) {
    console.error('%o', message, context);
  }
};

/* istanbul ignore next */
export const debug: LoggingHelper = (message, context) => {
  if (!isProduction && !isTest) {
    console.debug('%o', message, context);
  }
};
