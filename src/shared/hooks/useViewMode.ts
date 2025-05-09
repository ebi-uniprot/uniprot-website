import { useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { InvalidParamValue } from '../../uniprotkb/utils/resultsUtils';
import { Namespace } from '../types/namespaces';
import { sendGtagEventViewMode } from '../utils/gtagEvents';
import { stringifyQuery } from '../utils/url';
import useColumnNames from './useColumnNames';
import useLocalStorage from './useLocalStorage';

const viewModes: Set<ViewMode> = new Set(['cards', 'table', null]);
export type ViewMode = 'table' | 'cards' | null;
const defaultViewMode: ViewMode = null;

// TODO: eventually remove it
// This is just to convert for people currently using the website as they
// might have a viewMode of 0 or 1 because of the previous way it was stored
const normalize = (viewMode: ViewMode) => {
  if (viewMode !== 'cards' && viewMode !== 'table') {
    if (viewMode === 0) {
      return 'table';
    }
    if (viewMode === 'cards') {
      return 'cards';
    }
    return null;
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
  fromUrl: boolean;
} => {
  const { fromUrl: columnNamesAreFromUrl } = useColumnNames({
    namespaceOverride,
  });
  const [viewModeFromStorage, setViewModeFromStorage] =
    useLocalStorage<ViewMode>('view-mode', defaultViewMode);
  const history = useHistory();
  const locationSearch = useLocation().search;

  let viewMode: ViewMode = normalize(viewModeFromStorage);
  let invalidUrlViewMode: InvalidParamValue | undefined;
  let fromUrl = false;

  const { view: viewModeFromUrl, ...urlParams } = Object.fromEntries(
    new URLSearchParams(locationSearch)
  );

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

  useEffect(() => {
    if (viewMode) {
      sendGtagEventViewMode('render', viewMode);
    }
  }, [viewMode]);

  const setViewMode = useCallback(
    (vm: ViewMode) => {
      if (fromUrl) {
        history.push({
          pathname: history.location.pathname,
          search: stringifyQuery({ ...urlParams, view: vm }),
        });
      } else {
        setViewModeFromStorage(vm);
      }
    },
    [fromUrl, history, setViewModeFromStorage, urlParams]
  );

  return { viewMode, setViewMode, invalidUrlViewMode, fromUrl };
};

export default useViewMode;
