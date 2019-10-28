import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Loader } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import ColumnSelectView from './ColumnSelectView';
import { defaultTableColumns } from './state/resultsInitialState';
import { Column } from '../model/types/ColumnTypes';
import { ColumnSelectTab, FieldData } from './types/resultsTypes';

type ColumnSelectionProps = {
  selectedColumns: Column[];
  fetchFieldsIfNeeded: () => void;
  isFetching: boolean;
  fieldData: FieldData;
  onChange: (columndIds: Column[]) => void;
} & RouteComponentProps;

const entryField = {
  tabId: ColumnSelectTab.data,
  accordionId: 'Names & Taxonomy',
  itemId: Column.accession,
};

export const removeFieldFromFieldsData = (
  {
    tabId,
    accordionId,
    itemId,
  }: { tabId: ColumnSelectTab; accordionId: string; itemId: Column },
  fieldData: FieldData
) => ({
  ...fieldData,
  [tabId]: fieldData[tabId].map(group =>
    group.id === accordionId
      ? { ...group, items: group.items.filter(({ id }) => id !== itemId) }
      : group
  ),
});

const ColumnSelection: React.FC<ColumnSelectionProps> = ({
  fetchFieldsIfNeeded,
  isFetching,
  fieldData,
  selectedColumns,
  onChange,
}) => {
  if (
    isFetching ||
    !fieldData[ColumnSelectTab.data].length ||
    !fieldData[ColumnSelectTab.links].length
  ) {
    fetchFieldsIfNeeded();
    return <Loader />;
  }

  return (
    <ColumnSelectView
      selectedColumns={selectedColumns.filter(col => col !== entryField.itemId)}
      fieldData={removeFieldFromFieldsData(entryField, fieldData)}
      onChange={(cols: Column[]) => onChange([entryField.itemId, ...cols])}
      onReset={() => onChange(defaultTableColumns)}
    />
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: { onChange: (columndIds: Column[]) => void }
) => ({
  onChange: ownProps.onChange,
  tableColumns: state.results.tableColumns,
  fieldData: state.results.fields.data,
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
