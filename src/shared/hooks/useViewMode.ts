import qs from 'query-string';
import { Dispatch, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import { InvalidParamValue } from '../../uniprotkb/utils/resultsUtils';
import { defaultViewMode, ViewMode } from '../components/results/ResultsData';
import useColumnNames from './useColumnNames';
import useLocalStorage from './useLocalStorage';

const viewModes: Set<ViewMode> = new Set(['card', 'table']);

const useViewMode = (): [
  ViewMode,
  Dispatch<SetStateAction<ViewMode>>,
  InvalidParamValue | undefined
] => {
  const [, , columnNamesAreFromUrl] = useColumnNames();
  const [viewModeFromStorage, setViewModeFromStorage] =
    useLocalStorage<ViewMode>('view-mode', defaultViewMode);

  let viewMode: ViewMode = viewModeFromStorage;
  let error: InvalidParamValue | undefined;

  const { view: viewModeFromUrl } = qs.parse(useLocation().search);

  if (viewModeFromUrl) {
    if (
      typeof viewModeFromUrl === 'string' &&
      viewModes.has(viewModeFromUrl as ViewMode)
    ) {
      viewMode = viewModeFromUrl as ViewMode;
    } else {
      error = { parameter: 'view', value: viewModeFromUrl };
    }
  } else if (columnNamesAreFromUrl) {
    viewMode = 'table';
  }

  return [viewMode, setViewModeFromStorage, error];
};

export default useViewMode;
