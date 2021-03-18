import { useState, FC, FormEvent } from 'react';
import { Button } from 'franklin-sites';

import ColumnSelect from '../column-select/ColumnSelect';

import useNS from '../../hooks/useNS';

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
  const namespace = useNS();
  if (!namespace) {
    throw new Error('No namespace provided');
  }

  const [selectedColumns, setSelectedColumns] = useState(
    initialSelectedColumns || []
  );

  const handleChange = (columnIds: Column[]) => {
    setSelectedColumns(columnIds);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        selectedColumns={selectedColumns}
        namespace={namespace}
      />
      <div className="button-group sticky-bottom-right sliding-panel__button-row">
        <Button variant="secondary" type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CustomiseTable;
