import React from 'react';
import ColumnSelectContainer from './ColumnSelectContainer';

const CustomiseTableView = ({
  onColumnSelect,
  selectedColumns,
  onSubmit,
  onCancel,
}) => (
  <form onSubmit={onSubmit}>
    <ColumnSelectContainer onColumnSelect={handleColumnSelect} />;
    <div className="button-group">
      <button className="button secondary" type="button">
        Cancel
      </button>
      <button className="button" type="submit" onClick={onCancel}>
        Save
      </button>
    </div>
  </form>
);

export default CustomiseTableView;
