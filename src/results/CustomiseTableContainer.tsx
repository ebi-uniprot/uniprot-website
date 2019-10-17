import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import CustomiseTableView from './CustomiseTableView';

const CustomiseTable = ({ columns }) => {
  const [selectedColumns, setSelectedColumns] = useState(columns);

  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <CustomiseTableView
      onColumnSelect={cols => setSelectedColumns(cols)}
      selectedColumns={selectedColumns}
      onSubmit={saveColumns} // dispatch submit update columns
      onCancel={handleCancel}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      // dispatchFetchBatchOfResultsIfNeeded: (url: string | undefined) =>
      //   resultsActions.fetchBatchOfResultsIfNeeded(url),
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
