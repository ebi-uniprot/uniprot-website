import React from 'react';
import ColumnSelectContainer from './ColumnSelectContainer';
import './styles/CustomiseTable.scss';

const CustomiseTableView = ({
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
