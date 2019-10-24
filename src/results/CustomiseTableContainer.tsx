import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import CustomiseTableView from './CustomiseTableView';
import { Column } from '../model/types/ColumnTypes';

type CustomiseTableProps = {
  tableColumns: Column[];
  updateTableColumns: (columnIds: Column[]) => void;
} & RouteComponentProps;

const CustomiseTable: React.FC<CustomiseTableProps> = ({
  tableColumns,
  updateTableColumns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTableColumns(selectedColumns);
  };

  const handleCancel = () => {
    // eslint-disable-next-line no-console
    console.log('cancel');
  };

  return (
    <CustomiseTableView
      onChange={(columnIds: Column[]) => {
        setSelectedColumns(columnIds);
      }}
      selectedColumns={selectedColumns}
      onSubmit={handleSubmit}
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
      updateTableColumns: (tableColumns: Column[]) =>
        resultsActions.updateTableColumns(tableColumns),
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
