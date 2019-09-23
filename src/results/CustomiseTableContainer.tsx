import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import ColumnSelect from './ColumnSelect';
import defaultTableColumns from './state/resultsInitialState';
import fieldsData from '../data/fields.json';
import ColumnId from './types/columnIdTypes';

type CustomiseTableProps = {
  tableColumns: ColumnId[];
  // fetchFieldsIfNeeded: () => void;
  // fieldsData: ;
  namespace: Namespace;
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

const CustomiseTable = ({
  tableColumns,
  fetchFieldsIfNeeded,
  fieldsData,
}) => (
  <ColumnSelect
    tableColumns={tableColumns}
    fetchFieldsIfNeeded={fetchFieldsIfNeeded}
    fieldsData={fieldsData}
    defaultTableColumns={defaultTableColumns}
  />
);

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
  // fieldsData: state.results.fields.data,
  fieldsData: fieldsData,
  isFetching: state.results.fields.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      fetchFieldsIfNeeded: () => resultsActions.fetchFieldsIfNeeded(),
    },
    dispatch
  );

const CustomiseTableContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomiseTable)
);

export default CustomiseTableContainer;
