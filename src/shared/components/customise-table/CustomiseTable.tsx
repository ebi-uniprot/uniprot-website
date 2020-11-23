import React, { useState, FC } from 'react';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import { AllColumns } from '../../config/defaultColumns';
import { Namespace } from '../../types/namespaces';
import ColumnSelect from '../column-select/ColumnSelect';

type CustomiseTableProps = {
  namespace: Namespace;
  onSave: (selectedColumns: AllColumns) => void;
  selectedColumns?: AllColumns | null;
};

const CustomiseTable: FC<CustomiseTableProps> = ({
  namespace = Namespace.uniprotkb,
  onSave,
  selectedColumns: initialSelectedColumns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(
    initialSelectedColumns || []
  );

  const handleChange = (columnIds: UniProtKBColumn[]) => {
    setSelectedColumns(columnIds as AllColumns);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(selectedColumns);
  };

  const handleCancel = () => {
    onSave(initialSelectedColumns || []);
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
        namespace={namespace}
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
