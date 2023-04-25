/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { captureException, captureMessage } from '@sentry/react';
import { ScopeContext } from '@sentry/types';

const isProduction = process.env.NODE_ENV !== 'development';
const isTest = process.env.NODE_ENV === 'test';

type LoggingHelper = (
  message: string | Error,
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
    console.warn(message, context);
  }
};

/* istanbul ignore next */
export const error: LoggingHelper = (message, context) => {
  if (isProduction) {
    captureException(message, context);
  }
  if (!isTest) {
    console.error(message, context);
  }
};

/* istanbul ignore next */
export const debug: LoggingHelper = (message, context) => {
  if (!isProduction && !isTest) {
    console.debug(message, context);
  }
};
