/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import * as Sentry from '@sentry/react';
import { JsonValue } from 'type-fest';

// Expand as we add more events
type EventCategory = 'console';
type EventLabel = 'log' | 'warn' | 'error' | 'debug';

export const createGtagEvent = (eventLabel: EventLabel, data?: JsonValue) => {
  // TODO: check if the event key is valid ie registered in google analytics
  const event: Gtag.CustomParams = {
    event_label: eventLabel,
  };
  if (data && typeof data === 'object') {
    try {
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

export const sendGtagEvent = (
  eventCategory: EventCategory,
  eventLabel: EventLabel,
  data?: JsonValue
) => {
  const event = createGtagEvent(eventLabel, data);
  if (typeof gtag === 'function') {
    gtag('event', eventCategory, event);
  }
};

export const log = (...args: any[]) => {
  console.log(...args);
  sendGtagEvent('console', 'log', ...args);
  Sentry.captureMessage(args[0], { extra: args[1] });
};

export const warn = (...args: any[]) => {
  console.warn(...args);
  sendGtagEvent('console', 'warn', ...args);
  Sentry.captureMessage(args[0], {
    extra: args[1],
    level: Sentry.Severity.Warning,
  });
};

export const error = (...args: any[]) => {
  console.error(...args);
  sendGtagEvent('console', 'error', ...args);
  Sentry.captureException(args[0], { extra: args[1] });
};

export const debug = (...args: any[]) => {
  console.debug(...args);
  sendGtagEvent('console', 'debug', ...args);
};
