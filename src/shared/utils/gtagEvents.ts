import { Column } from '../config/columns';
import { ViewMode } from '../hooks/useViewMode';

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

type PanelCloseMethod = 'x-button' | 'outside' | 'navigation' | 'escape';
type PanelFormCloseMethod = PanelCloseMethod | 'submit' | 'cancel';

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
  viewMode: ViewMode
) => {
  sendGtagEvent(
    `results_view_${event}`,
    viewMode ? { view_mode: viewMode } : undefined
  );
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

export const sendGtagEventPanelHelpOpen = (helpArticle) => {
  sendGtagEvent('panel_help_open', { help_article: helpArticle });
};

export const sendGtagEventPanelClose = (
  panel: 'help' | 'basket' | 'job_dashboard',
  panelCloseMethod: PanelCloseMethod
) => {
  sendGtagEvent(`panel_${panel}_close`, {
    panel_close_method: panelCloseMethod,
  });
};

export const sendGtagEventPanelCustomiseColumnsClose = (
  panelCloseMethod: PanelFormCloseMethod,
  columns: Column[]
) => {
  sendGtagEvent('panel_customise_columns_close', {
    panel_close_method: panelCloseMethod,
    columns: columns.join(','),
  });
};

export const sendGaEventPanelAdvancedSearchClose = (
  panelCloseMethod: PanelFormCloseMethod,
  query: string
) => {
  sendGtagEvent('panel_advanced_search_close', {
    panel_close_method: panelCloseMethod,
    advanced_query: query,
  });
};

export const sendGaEventPanelResultsDownloadClose = (
  panelCloseMethod: PanelFormCloseMethod,
  downloadMethod: 'url' | 'async'
) => {
  sendGtagEvent('panel_results_download_close', {
    panel_close_method: panelCloseMethod,
    download_method: downloadMethod,
  });
};
