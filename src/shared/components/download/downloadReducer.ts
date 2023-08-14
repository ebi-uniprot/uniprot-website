import { ActionType } from 'typesafe-actions';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import * as downloadActions from './downloadActions';
import { DownloadProps } from './Download';
import { Column } from '../../config/columns';

export type DownloadAction = ActionType<typeof downloadActions>;

type DownloadState<T extends JobTypes> = {
  props: DownloadProps<T>;
  selectedColumns: Column[];
};

export function getDownloadInitialState<T extends JobTypes>({
  props,
  selectedColumns,
}: DownloadState<T>) {
  return {
    props,
    selectedColumns,
  };
}

export function downloadReducer<T extends JobTypes>(
  state: DownloadState<T>,
  action: DownloadAction
): DownloadState<T> {
  switch (action.type) {
    case downloadActions.UPDATE_SELECTED_COLUMNS:
      return {
        ...state,
        selectedColumns: action.payload.columns,
      };

    default:
      return state;
  }
}
