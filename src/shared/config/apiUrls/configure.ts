import joinUrl from 'url-join';

import { apiPrefix } from './apiPrefix';

import { Namespace } from '../../types/namespaces';

// All result fields except supporting data reference fields
export const resultsFields = (namespace: Namespace, isEntry?: boolean) =>
  joinUrl(
    apiPrefix,
    'configure',
    namespace,
    `${isEntry ? 'entry-' : ''}result-fields`
  );

export const queryBuilderTerms = (namespace: Namespace) =>
  joinUrl(apiPrefix, 'configure', namespace, 'search-fields');

export const idMappingFields = joinUrl(apiPrefix, 'configure/idmapping/fields');

// Database cross references used
export const allDatabases = (namespace: Namespace) =>
  joinUrl(apiPrefix, 'configure', namespace, 'allDatabases');
