import React, { useState, FC } from 'react';
import ColumnSelect from '../column-select/ColumnSelect';

import { Column } from '../../config/columns';

import './styles/customise-table.scss';
import '../../styles/sticky.scss';

type CustomiseTableProps = {
  onSave: (selectedColumns: Column[]) => void;
  selectedColumns?: Column[] | null;
};

const CustomiseTable: FC<CustomiseTableProps> = ({
  onSave,
  selectedColumns: initialSelectedColumns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState(
    initialSelectedColumns || []
  );

  const handleChange = (columnIds: Column[]) => {
    setSelectedColumns(columnIds);
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
      <ColumnSelect onChange={handleChange} selectedColumns={selectedColumns} />
      <div className="button-group sticky-bottom-right">
        <button
          className="button secondary"
          type="button"
          onClick={handleCancel}
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
