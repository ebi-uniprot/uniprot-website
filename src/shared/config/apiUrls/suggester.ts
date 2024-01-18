import joinUrl from 'url-join';

import { apiPrefix } from './apiPrefix';

export const taxonomy = 'suggester?dict=taxonomy&query=?';

export const organism = 'suggester?dict=organism&query=?';

const RE_QUERY = /\?$/;

export const search = (url: string, value: string) =>
  joinUrl(apiPrefix, url.replace(RE_QUERY, value));
