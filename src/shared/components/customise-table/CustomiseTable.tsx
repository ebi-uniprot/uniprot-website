import React, { useState, FC } from 'react';
import { sleep } from 'timing-functions';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { UniRefColumn } from '../../../uniref/config/UniRefColumnConfiguration';
import { Namespace } from '../../types/namespaces';
import { useTableColumnsFromLocalStorage } from '../../utils/localStorage';
import ColumnSelect from '../column-select/ColumnSelect';

type CustomiseTableProps = {
  namespace: Namespace;
  onClose: () => void;
};

const CustomiseTable: FC<CustomiseTableProps> = ({
  namespace = Namespace.uniprotkb,
  onClose,
}) => {
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
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="customise-table"
      data-testid="customise-table-form"
    >
      <ColumnSelect
        onChange={handleChange}
        // TODO temporary casting to UniProtKBColumn to make TS happy
        selectedColumns={selectedColumns as UniProtKBColumn[]}
        namespace={Namespace.uniprotkb}
      />
      <div className="button-group customise-table--cancel-submit-buttons">
        <button
          className="button secondary"
          type="button"
          onClick={handleCancel}
          data-testid="customise-table-cancel-button"
        >
          Cancel
        </button>
        <button className="button" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default CustomiseTable;
