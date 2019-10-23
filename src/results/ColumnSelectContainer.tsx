import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import ColumnSelectView from './ColumnSelectView';
import { defaultTableColumns } from './state/resultsInitialState';
import fieldData from '../data/fields.json';
import ColumnId from '../model/types/columnIdTypes';

type ColumnSelectionProps = {
  selectedColumns: ColumnId[];
  fetchFieldsIfNeeded: () => void;
  fieldData: any;
  onChange: () => void;
} & RouteComponentProps;

const entryField = {
  tabId: 'data',
  accordionId: 'Names & Taxonomy',
  itemId: ColumnId.accession,
};

export const removeFieldFromFieldsData = (
  { tabId, accordionId, itemId },
  fieldData
) => ({
  ...fieldData,
  [tabId]: fieldData[tabId].map(group =>
    group.id === accordionId
      ? { ...group, items: group.items.filter(({ id }) => id !== itemId) }
      : group
  ),
});

const ColumnSelection:React.FC<ColumnSelectionProps> = ({
  fetchFieldsIfNeeded,
  fieldData,
  selectedColumns,
  onChange,
}) => (
  <ColumnSelectView
    selectedColumns={selectedColumns.filter(col => col !== entryField.itemId)}
    fieldData={removeFieldFromFieldsData(entryField, fieldData)}
    onChange={cols => onChange([entryField.itemId, ...cols])}
    onReset={() => onChange(defaultTableColumns)}
  />
);

const mapStateToProps = (state: RootState, ownProps: {onChange: () => void;}) => ({
  onChange: ownProps.onChange,
  tableColumns: state.results.tableColumns,
  // fieldData: state.results.fields.data,
  fieldData,
  isFetching: state.results.fields.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      fetchFieldsIfNeeded: () => resultsActions.fetchFieldsIfNeeded(),
    },
    dispatch
  );

const ColumnSelectionContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColumnSelection)
);

export default ColumnSelectionContainer;
