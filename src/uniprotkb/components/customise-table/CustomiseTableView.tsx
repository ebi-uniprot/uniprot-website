import React from 'react';
import ColumnSelect from '../column-select/ColumnSelect';
import { UniProtKBColumn } from '../../types/columnTypes';

import './styles/customise-table.scss';
import { Namespace } from '../../../shared/types/namespaces';

type CustomiseTableViewProps = {
  selectedColumns: UniProtKBColumn[];
  onChange: (columndIds: UniProtKBColumn[]) => void;
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
    <ColumnSelect
      onChange={onChange}
      selectedColumns={selectedColumns}
      namespace={Namespace.uniprotkb}
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
