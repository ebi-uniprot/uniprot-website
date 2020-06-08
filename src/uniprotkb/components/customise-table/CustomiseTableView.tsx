import React from 'react';
import ColumnSelectContainer from '../column-select/ColumnSelectContainer';
import { Column } from '../../types/columnTypes';

import './styles/customise-table.scss';

type CustomiseTableViewProps = {
  selectedColumns: Column[];
  onChange: (columndIds: Column[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const CustomiseTableView: React.FC<CustomiseTableViewProps> = ({
  selectedColumns,
  onChange,
  onSubmit,
  onCancel,
}) => (
  <form
    onSubmit={onSubmit}
    className="customise-table"
    data-testid="customise-table-form"
  >
    <ColumnSelectContainer
      onChange={onChange}
      selectedColumns={selectedColumns}
    />
    <div className="button-group customise-table--cancel-submit-buttons">
      <button
        className="button secondary"
        type="button"
        onClick={onCancel}
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

export default CustomiseTableView;
