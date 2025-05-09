/* eslint-disable camelcase */
import { SlidingPanel } from 'franklin-sites';
import { ComponentProps } from 'react';

import { JobTypes } from '../../jobs/types/jobTypes';
import { Column } from '../config/columns';
import { ViewMode } from '../hooks/useViewMode';

type GtagEventName =
  | 'api_data_load_fail'
  | 'api_data_load_success'
  | 'cache_update'
  | 'copy_api_url_click'
  | 'copy_fasta_click'
  | 'copy_share_results_url_click'
  | 'feature_data_table_view_click'
  | 'feature_viewer_full_view_click'
  | 'job_submit'
  | 'gocam_viz_shown'
  | 'gocam_viz_tab_opened'
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

/*
| Reason     | User action                |
|------------|----------------------------|
| x-button   | top right close (x) button |
| outside    | clicked outside the panel  |
| navigation | navigated away             |
| escape     | pressed escape key         |
| cancel     | pressed cancel button      |
| submit     | pressed save button        |
*/
export type PanelCloseReason =
  | Parameters<
      Exclude<ComponentProps<typeof SlidingPanel>['onClose'], undefined>
    >[0]
  | 'full-view';
export type PanelFormCloseReason =
  | PanelCloseReason
  | 'submit'
  | 'cancel'
  | 'toggle';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const gtagFn: Gtag.Gtag = (...args) => {
  // Prevent crashing if not defined (like in dev mode)
  if (typeof globalThis.gtag === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    globalThis.gtag(...args);
  }
};

// Note that for any parameters that are sent, if you want to observe
// the values within GA4 explorations, they need to be set up in the
// GA4 UI at Admin > Data display > Custom definitions
/* istanbul ignore next */
const sendGtagEvent = (
  eventName: GtagEventName,
  parameters?: Record<string, string>
) => {
  gtagFn('event', eventName, parameters);
};

export const sendGtagEventApiData = (
  event: 'success' | 'fail',
  url: string
) => {
  sendGtagEvent(`api_data_load_${event}`, { url });
};

export const sendGtagEventViewMode = (
  event: 'render' | 'mode_click' | 'mode_popup_click',
  viewMode: NonNullable<ViewMode>
) => {
  sendGtagEvent(`results_view_${event}`, { view_mode: viewMode });
};

export const sendGtagEventFeatureDataTableViewClick = (
  accession: string,
  dataTableView: 'expanded' | 'collapsed'
) => {
  sendGtagEvent('feature_data_table_view_click', {
    accession,
    data_table_view: dataTableView,
  });
};

export const sendGtagEventFeatureViewerFullViewClick = (accession: string) => {
  sendGtagEvent('feature_viewer_full_view_click', { accession });
};

export const sendGtagEventUrlCopy = (
  urlType: 'api' | 'share_results',
  url: string
) => {
  sendGtagEvent(`copy_${urlType}_url_click`, { url });
};

export const sendGtagEventCopyFastaClick = (fastaAccessionIsoform: string) => {
  sendGtagEvent('copy_fasta_click', {
    fasta_accession_isoform: fastaAccessionIsoform,
  });
};

export const sendGtagEventOutboundLinkClick = (url: string) => {
  sendGtagEvent('outbound_link_click', { url });
};

export const sendGtagEventPanelOpen = (
  panel:
    | 'customise_columns'
    | 'advanced_search'
    | 'results_download'
    | 'basket'
    | 'job_dashboard'
) => {
  sendGtagEvent(`panel_${panel}_open`);
};

export const sendGtagEventPanelHelpOpen = (helpArticle: string) => {
  sendGtagEvent('panel_help_open', { help_article: helpArticle });
};

export const sendGtagEventPanelClose = (
  panel: 'help' | 'basket' | 'job_dashboard',
  panelCloseReason: PanelCloseReason
) => {
  sendGtagEvent(`panel_${panel}_close`, {
    panel_close_reason: panelCloseReason,
  });
};

export const sendGtagEventPanelCustomiseColumnsClose = (
  panelCloseReason: PanelFormCloseReason,
  columns: Column[]
) => {
  sendGtagEvent('panel_customise_columns_close', {
    panel_close_reason: panelCloseReason,
    columns: columns.join(','),
  });
};

export const sendGtagEventPanelAdvancedSearchClose = (
  panelCloseReason: PanelFormCloseReason,
  query?: string | null
) => {
  const parameters: Record<string, string> = {
    panel_close_reason: panelCloseReason,
  };
  if (query) {
    parameters.advanced_query = query;
  }
  sendGtagEvent('panel_advanced_search_close', parameters);
};

export type DownloadPanelFormCloseReason =
  | PanelCloseReason
  | 'download'
  | 'submit'
  | 'cancel'
  | 'copy'
  | 'toggle';

export type DownloadMethod = 'api-url' | 'sync' | 'async' | 'ftp';

export const sendGtagEventPanelResultsDownloadClose = (
  panelCloseReason: DownloadPanelFormCloseReason,
  downloadMethod?: DownloadMethod
) => {
  const parameters: Record<string, string> = {
    panel_close_reason: panelCloseReason,
  };
  if (downloadMethod) {
    parameters.download_method = downloadMethod;
  }
  sendGtagEvent('panel_results_download_close', parameters);
};

export const sendGtagEventCacheUpdate = (
  updatedURL: string,
  cacheName: string
) => {
  sendGtagEvent('cache_update', {
    updated_url: updatedURL,
    cache_name: cacheName,
  });
};

export const sendGtagEventJobSubmit = (
  job: JobTypes,
  parameters?: Record<string, string>
) => {
  sendGtagEvent('job_submit', { job_type: job, ...parameters });
};

export const sendGtagEventGoCamVizTabOpened = (accession: string) => {
  sendGtagEvent('gocam_viz_tab_opened', { accession });
};
export const sendGtagEventGoCamVizShown = (accession: string) => {
  sendGtagEvent('gocam_viz_shown', { accession });
};
