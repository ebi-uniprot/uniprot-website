import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { sleep } from 'timing-functions';
import CustomiseTableView from './CustomiseTableView';
import { UniProtKBColumn } from '../../types/columnTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import { Namespace } from '../../../shared/types/namespaces';
import { useTableColumnsFromLocalStorage } from '../../../shared/utils/localStorage';

type CustomiseTableProps = {
  tableColumns: Partial<Record<Namespace, UniProtKBColumn[] | UniRefColumn[]>>;
  updateTableColumns: (
    namespace: Namespace,
    columnIds: UniProtKBColumn[]
  ) => void;
} & RouteComponentProps;

const CustomiseTable: React.FC<CustomiseTableProps> = ({ history }) => {
  // TODO this should come from the url
  const namespace = Namespace.uniprotkb;

  const [
    tableColumnsFromLocalStorage,
    setTableColumnsFromLocalStorage,
  ] = useTableColumnsFromLocalStorage(namespace);
  const [selectedColumns, setSelectedColumns] = useState(
    tableColumnsFromLocalStorage
  );

  if (!selectedColumns) {
    // TODO return an error here?
    return null;
  }

  const handleChange = (columnIds: UniProtKBColumn[]) => {
    setSelectedColumns(columnIds);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTableColumnsFromLocalStorage(selectedColumns);
    // TODO remove this hack when it's no longer in its own page
    await sleep(500);
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

const CustomiseTableContainer = withRouter(CustomiseTable);

export default CustomiseTableContainer;
