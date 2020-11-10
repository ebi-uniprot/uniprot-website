import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../../../app/state/rootInitialState';
import * as resultsActions from '../../state/resultsActions';
import CustomiseTableView from './CustomiseTableView';
import { UniProtKBColumn } from '../../types/columnTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';

type CustomiseTableProps = {
  tableColumns: Partial<Record<Namespace, UniProtKBColumn[] | UniRefColumn[]>>;
  updateTableColumns: (
    namespace: Namespace,
    columnIds: UniProtKBColumn[]
  ) => void;
} & RouteComponentProps;

const CustomiseTable: React.FC<CustomiseTableProps> = ({
  tableColumns,
  updateTableColumns,
  history,
}) => {
  // TODO this should come from the url
  const namespace = Namespace.uniprotkb;

  const [selectedColumns, setSelectedColumns] = useState(
    tableColumns[namespace]
  );

  if (!selectedColumns) {
    // TODO return an error here?
    return null;
  }

  const handleChange = (columnIds: UniProtKBColumn[]) => {
    setSelectedColumns(columnIds);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO temporary casting to UniProtKBColumn to make TS happy
    updateTableColumns(namespace, selectedColumns as UniProtKBColumn[]);
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    // TODO temporary casting to UniProtKBColumn to make TS happy
    <CustomiseTableView
      selectedColumns={selectedColumns as UniProtKBColumn[]}
      onChange={handleChange}
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
      updateTableColumns: (
        namespace: Namespace,
        tableColumns: UniProtKBColumn[]
      ) => resultsActions.updateTableColumns(namespace, tableColumns),
    },
    dispatch
  );

const CustomiseTableContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomiseTable)
);

export default CustomiseTableContainer;
