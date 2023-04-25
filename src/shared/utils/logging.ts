/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { captureException, captureMessage } from '@sentry/react';
import { ScopeContext } from '@sentry/types';

export type GaEventName =
  | 'api_data_load_fail'
  | 'api_data_load_success'
  | 'cache_update'
  | 'copy_api_url_click'
  | 'copy_fasta_click'
  | 'copy_share_results_url_click'
  | 'feature_data_table_view_click'
  | 'feature_viewer_full_view_click'
  | 'outbound_link_click'
  | 'panel_advanced_search_close'
  | 'panel_advanced_search_open'
  | 'panel_basket_close'
  | 'panel_basket_open'
  | 'panel_customise_columns_close'
  | 'panel_customise_columns_open'
  | 'panel_help_close'
  | 'panel_help_open'
  | 'panel_job_dashboard_close'
  | 'panel_job_dashboard_open'
  | 'panel_results_download_close'
  | 'panel_results_download_open'
  | 'results_view_mode_click'
  | 'results_view_mode_popup_click'
  | 'results_view_render';

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
  eventName: GaEventName,
  parameters: Record<string, string>
) => {
  gtagFn('event', eventName, parameters);
};

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
