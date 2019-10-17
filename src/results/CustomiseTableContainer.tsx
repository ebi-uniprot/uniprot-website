import React, { useState } from 'react';
import CustomiseTableView from './CustomiseTableView';

const CustomiseTableContainer = ({ columns }) => {
  const [selectedColumns, setSelectedColumns] = useState(columns);

  const handleCancel = () => {
    console.log('cancel');
  };

  return (
    <CustomiseTableView
      onColumnSelect={cols => setSelectedColumns(cols)}
      selectedColumns={selectedColumns}
      onSubmit={saveColumns} // dispatch submit update columns
      onCancel={handleCancel}
    />
  );
};

export default CustomiseTableContainer;
