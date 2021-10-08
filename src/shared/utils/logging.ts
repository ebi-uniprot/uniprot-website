/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { JsonValue } from 'type-fest';

type EventCategory = 'console';
type EventLabel = 'log' | 'warn' | 'error' | 'debug';

export const sendGtagEvent = (
  eventCategory: EventCategory,
  eventLabel: EventLabel,
  data?: JsonValue
) => {
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
  if (typeof gtag === 'function') {
    gtag('event', eventCategory, event);
  }
};

export const log = (message: any) => {
  console.log(message);
  sendGtagEvent('console', 'log', message);
};

export const warn = (message: any) => {
  console.warn(message);
  sendGtagEvent('console', 'warn', message);
};

export const error = (message: any) => {
  console.error(message);
  sendGtagEvent('console', 'error', message);
};

export const debug = (message: any) => {
  console.debug(message);
  sendGtagEvent('console', 'debug', message);
};
