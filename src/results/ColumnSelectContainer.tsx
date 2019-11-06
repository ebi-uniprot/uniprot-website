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

type ColumnSelectProps = {
  selectedColumns: Column[];
  fetchFieldsIfNeeded: () => void;
  isFetching: boolean;
  fieldData: FieldData;
  onChange: (columndIds: Column[]) => void;
} & RouteComponentProps;

export const entryField = {
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

const ColumnSelect: React.FC<ColumnSelectProps> = ({
  fetchFieldsIfNeeded,
  isFetching,
  fieldData,
  selectedColumns,
  onChange,
}) => {
  if (
    isFetching ||
    !fieldData ||
    !fieldData[ColumnSelectTab.data] ||
    !fieldData[ColumnSelectTab.data].length ||
    !fieldData[ColumnSelectTab.links] ||
    !fieldData[ColumnSelectTab.links].length
  ) {
    fetchFieldsIfNeeded();
    return <Loader />;
  }

  return (
    <ColumnSelectView
      selectedColumns={selectedColumns.filter(col => col !== entryField.itemId)}
      // remove the entry field from the choices as this MUST ALWAYS BE PRESENT
      // in the url fields parameter when making the search request
      fieldData={removeFieldFromFieldsData(entryField, fieldData)}
      onChange={(cols: Column[]) => onChange([entryField.itemId, ...cols])}
      onReset={() => onChange(defaultTableColumns)}
    />
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: {
    onChange: (columndIds: Column[]) => void;
    selectedColumns: Column[];
  }
) => ({
  onChange: ownProps.onChange,
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

const ColumnSelectContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ColumnSelect)
);

export default ColumnSelectContainer;
