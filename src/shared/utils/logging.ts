/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as Sentry from '@sentry/react';
import { ScopeContext } from '@sentry/types';

// Expand as we add more events
type CustomCategories = `console.${'log' | 'warn' | 'error'}`;

const isProduction = process.env.NODE_ENV !== 'development';
const isTest = process.env.NODE_ENV === 'test';

export const createGtagEvent = (message: any, data?: Partial<ScopeContext>) => {
  const event: Gtag.CustomParams = {
    event_label: message,
  };
  if (!data) {
    return event;
  }
  if (typeof data === 'object') {
    try {
      // TODO: check if the event key is valid ie registered in google analytics
      for (const [k, v] of Object.entries(data)) {
        event[`event_${k}`] = JSON.stringify(v);
      }
    } catch (error) {
      // Only display if using the development server
      if (LIVE_RELOAD) {
        console.warn('gtag event error', error);
      }
    }
  } else if (['string', 'boolean', 'number'].includes(typeof data)) {
    event.event_data = data;
  } else if (LIVE_RELOAD) {
    console.warn('gtag event data type not handled', data);
  }
  return event;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const gtagFn: Gtag.Gtag = (...args) => {
  // Prevent crashing if not defined (like in dev mode)
  if (typeof globalThis.gtag === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.gtag(...args);
  }
};

/* istanbul ignore next */
export const sendGtagEvent = (
  eventCategory: CustomCategories | Gtag.EventNames | string,
  message?: any,
  data?: Partial<ScopeContext>
) => {
  const event = createGtagEvent(message, data);
  gtag('event', eventCategory, event);
};

type LoggingHelper = (
  message: string | Error,
  context?: Partial<ScopeContext>
) => void;

/* istanbul ignore next */
export const log: LoggingHelper = (message, context) => {
  if (isProduction) {
    sendGtagEvent('console.log', message.toString(), context);
    Sentry.captureMessage(message.toString(), {
      ...(context || {}),
      level: Sentry.Severity.Log,
    });
  } else if (!isTest) {
    console.log(message, context);
  }
};

/* istanbul ignore next */
export const warn: LoggingHelper = (message, context) => {
  if (isProduction) {
    sendGtagEvent('console.warn', message.toString(), context);
    Sentry.captureMessage(message.toString(), {
      ...(context || {}),
      level: Sentry.Severity.Warning,
    });
  } else if (!isTest) {
    console.warn(message, context);
  }
};

/* istanbul ignore next */
export const error: LoggingHelper = (message, context) => {
  if (isProduction) {
    sendGtagEvent('exception', message.toString(), context);
    Sentry.captureException(message, context);
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
