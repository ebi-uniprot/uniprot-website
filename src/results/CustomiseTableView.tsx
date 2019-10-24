import React from 'react';
import ColumnSelectContainer from './ColumnSelectContainer';
import { Column } from '../model/types/ColumnTypes';
import './styles/CustomiseTable.scss';

type CustomiseTableViewProps = {
  onChange: (columndIds: Column[]) => void;
  selectedColumns: Column[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

const CustomiseTableView: React.FC<CustomiseTableViewProps> = ({
  onChange,
  selectedColumns,
  onSubmit,
  onCancel,
}) => (
  <form onSubmit={onSubmit} className="customise-table">
    <ColumnSelectContainer
      onChange={onChange}
      selectedColumns={selectedColumns}
    />
    <div className="button-group customise-table--cancel-submit-buttons">
      <button className="button secondary" type="button" onClick={onCancel}>
        Cancel
      </button>
      <button className="button" type="submit">
        Save
      </button>
    </div>
  </form>
);

export default CustomiseTableView;
