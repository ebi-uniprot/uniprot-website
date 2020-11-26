import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import fetchData from '../../shared/utils/fetchData';
import { RootState } from '../../app/state/rootInitialState';
import apiUrls from '../../shared/config/apiUrls';
import { UniProtKBColumn } from '../types/columnTypes';
import {
  ColumnSelectTab,
  FieldDatum,
  ReceivedFieldData,
  ReceivedField,
} from '../types/resultsTypes';
import { Namespace } from '../../shared/types/namespaces';

export const UPDATE_COLUMN_SORT = 'UPDATE_COLUMN_SORT';
export const SWITCH_VIEW_MODE = 'SWITCH_VIEW_MODE';
export const RECEIVE_FIELDS = 'RECEIVE_FIELDS';
export const REQUEST_FIELDS = 'REQUEST_FIELDS';
export const UPDATE_TABLE_COLUMNS = 'UPDATE_TABLE_COLUMNS';

export const requestFields = () => action(REQUEST_FIELDS);

export const prepareFields = (fields: ReceivedField[]) =>
  fields.map(({ label, name }) => ({ id: name as UniProtKBColumn, label }));

export const prepareFieldData = (fieldData: ReceivedFieldData) => {
  const dataTab: FieldDatum[] = [];
  const linksTab: FieldDatum[] = [];
  const linksAdded: Record<string, boolean> = {};
  fieldData.forEach(({ groupName, fields, isDatabaseGroup, id }) => {
    const group = {
      id,
      title: groupName,
      items: prepareFields(fields),
    };
    if (isDatabaseGroup) {
      if (!linksAdded[groupName]) {
        linksTab.push(group);
        linksAdded[groupName] = true;
      }
    } else {
      dataTab.push(group);
    }
  });
  return {
    [ColumnSelectTab.data]: dataTab,
    [ColumnSelectTab.links]: linksTab,
  };
};
export const receiveFields = (data: ReceivedFieldData) =>
  action(RECEIVE_FIELDS, {
    data: prepareFieldData(data),
    receivedAt: Date.now(),
  });

export const fetchFields = () => async (dispatch: Dispatch) => {
  dispatch(requestFields());
  return fetchData<ReceivedFieldData>(apiUrls.resultsFields).then((response) =>
    dispatch(receiveFields(response.data))
  );
};

export const shouldFetchFields = (state: RootState) => {
  const { fields } = state.results;
  return (
    !fields.isFetching &&
    (!fields.data.data.length || !fields.data.links.length)
  );
};

export const fetchFieldsIfNeeded = () => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (shouldFetchFields(getState())) {
    dispatch(fetchFields());
  }
};

export const updateTableColumns = (
  namespace: Namespace,
  tableColumns: UniProtKBColumn[]
) =>
  action(UPDATE_TABLE_COLUMNS, {
    namespace,
    tableColumns,
  });
