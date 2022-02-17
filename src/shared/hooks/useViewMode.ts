import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';

import useColumnNames from './useColumnNames';
import useLocalStorage from './useLocalStorage';

import { Namespace } from '../types/namespaces';
import { InvalidParamValue } from '../../uniprotkb/utils/resultsUtils';

const viewModes: Set<ViewMode> = new Set(['card', 'table']);
export type ViewMode = 'table' | 'card';
export const defaultViewMode: ViewMode = 'card';

// TODO: eventually remove it
// This is just to convert for people currently using the website as they
// might have a viewMode of 0 or 1 because of the previous way it was stored
const normalize = (viewMode: ViewMode) => {
  if (viewMode !== 'card' && viewMode !== 'table') {
    if (viewMode === 0) {
      return 'table';
    }
    return 'card';
  }
  return viewMode;
};

const useViewMode = (
  namespaceOverride: Namespace | undefined,
  disableCardToggle = false
): {
  viewMode: ViewMode;
  setViewMode: (vm: ViewMode) => void;
  invalidUrlViewMode: InvalidParamValue | undefined;
} => {
  const { fromUrl: columnNamesAreFromUrl } = useColumnNames(namespaceOverride);
  const [viewModeFromStorage, setViewModeFromStorage] =
    useLocalStorage<ViewMode>('view-mode', defaultViewMode);
  const history = useHistory();
  const locationSearch = useLocation().search;

  let viewMode: ViewMode = normalize(viewModeFromStorage);
  let invalidUrlViewMode: InvalidParamValue | undefined;
  let fromUrl = false;

  const { view: viewModeFromUrl, ...urlParams } = qs.parse(locationSearch);

  if (disableCardToggle) {
    viewMode = 'table';
  } else if (viewModeFromUrl) {
    if (
      typeof viewModeFromUrl === 'string' &&
      viewModes.has(viewModeFromUrl as ViewMode)
    ) {
      viewMode = viewModeFromUrl as ViewMode;
      fromUrl = true;
    } else {
      invalidUrlViewMode = { parameter: 'view', value: viewModeFromUrl };
    }
  } else if (columnNamesAreFromUrl) {
    viewMode = 'table';
  }

  const setViewMode = useCallback(
    (vm: ViewMode) => {
      if (fromUrl) {
        history.push(
          // eslint-disable-next-line uniprot-website/use-config-location
          {
            pathname: history.location.pathname,
            search: qs.stringify({ ...urlParams, view: vm }),
          }
        );
      } else {
        setViewModeFromStorage(vm);
      }
    },
    [fromUrl, history, setViewModeFromStorage, urlParams]
  );

  return { viewMode, setViewMode, invalidUrlViewMode };
};

export default useViewMode;
