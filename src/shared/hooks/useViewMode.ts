import qs from 'query-string';
import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getLocationObjForParams,
  InvalidParamValue,
} from '../../uniprotkb/utils/resultsUtils';
import { defaultViewMode, ViewMode } from '../components/results/ResultsData';
import useColumnNames from './useColumnNames';
import useLocalStorage from './useLocalStorage';

const viewModes: Set<ViewMode> = new Set(['card', 'table']);

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

const useViewMode = (): [
  ViewMode,
  (vm: ViewMode) => void,
  InvalidParamValue | undefined
] => {
  const [, , columnNamesAreFromUrl] = useColumnNames();
  const [viewModeFromStorage, setViewModeFromStorage] =
    useLocalStorage<ViewMode>('view-mode', defaultViewMode);
  const history = useHistory();
  const locationSearch = useLocation().search;
  let viewMode: ViewMode = normalize(viewModeFromStorage);
  let error: InvalidParamValue | undefined;
  let fromUrl = false;

  const { view: viewModeFromUrl, ...urlParams } = qs.parse(locationSearch);

  if (viewModeFromUrl) {
    if (
      typeof viewModeFromUrl === 'string' &&
      viewModes.has(viewModeFromUrl as ViewMode)
    ) {
      viewMode = viewModeFromUrl as ViewMode;
      fromUrl = true;
    } else {
      error = { parameter: 'view', value: viewModeFromUrl };
    }
  } else if (columnNamesAreFromUrl) {
    viewMode = 'table';
  }

  const setViewMode = useCallback(
    (vm: ViewMode) => {
      if (fromUrl) {
        console.log({
          pathname: history.location.pathname,
          state: qs.stringify({ ...urlParams, view: vm }),
        });
        // TODO: this changes the URL from encoded to decoded which is different to the faucet behavior
        history.push(
          // eslint-disable-next-line uniprot-website/use-config-location
          {
            pathname: history.location.pathname,
            state: qs.stringify({ ...urlParams, view: vm }),
          }
        );
      } else {
        setViewModeFromStorage(vm);
      }
    },
    [fromUrl, history, setViewModeFromStorage, urlParams]
  );

  return [viewMode, setViewMode, error];
};

export default useViewMode;
