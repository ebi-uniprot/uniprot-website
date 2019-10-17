import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import ColumnSelectView from './ColumnSelectView';
import defaultTableColumns from './state/resultsInitialState';
import fieldsData from '../data/fields.json';
import ColumnId from '../model/types/columnIdTypes';

type CustomiseTableProps = {
  tableColumns: ColumnId[];
  // fetchFieldsIfNeeded: () => void;
  // fieldsData: ;
  dispatchFetchBatchOfResultsIfNeeded: (url: string | undefined) => void;
  dispatchReset: () => void;
  dispatchClearResults: () => void;
  dispatchSwitchViewMode: () => void;
  dispatchUpdateSummaryAccession: (accession: string) => void;
  clauses?: Clause[];
  tableColumns: string[];
  cardColumns: string[];
  results: UniProtkbAPIModel[];
  facets: Facet[];
  isFetching: boolean;
  nextUrl: string;
  totalNumberResults: number;
  viewMode: ViewMode;
  summaryAccession: string | null;
} & RouteComponentProps;

const entryField = {
  tabId: 'data',
  accordionId: 'Names & Taxonomy',
  itemId: ColumnId.accession,
};

export const removeFieldFromFieldsData = (
  { tabId, accordionId, itemId },
  fieldsData
) => ({
  ...fieldsData,
  [tabId]: fieldsData[tabId].map(group =>
    group.id === accordionId
      ? { ...group, items: group.items.filter(({ id }) => id !== itemId) }
      : group
  ),
});

const ColumnSelection = ({
  tableColumns,
  fetchFieldsIfNeeded,
  fieldsData,
  onColumnSelect,
  selectedColumns,
}) => {
  const handleChange = columns => {
    console.log(columns);
  };

  return (
    <ColumnSelectView
      tableColumns={tableColumns.filter(col => col !== entryField.itemId)}
      fetchFieldsIfNeeded={fetchFieldsIfNeeded}
      fieldsData={removeFieldFromFieldsData(entryField, fieldsData)}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
  // fieldsData: state.results.fields.data,
  fieldsData,
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
  )(CustomiseTable)
);

export default ColumnSelectionContainer;
