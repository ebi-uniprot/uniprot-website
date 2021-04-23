import { FC, FormEvent } from 'react';
import { Button } from 'franklin-sites';

import ColumnSelect from '../column-select/ColumnSelect';

import useNS from '../../hooks/useNS';
import useUserPreferences from '../../hooks/useUserPreferences';

import { nsToDefaultColumns } from '../../config/columns';

import './styles/customise-table.scss';
import '../../styles/sticky.scss';

type CustomiseTableProps = {
  onSave: () => void;
};

const CustomiseTable: FC<CustomiseTableProps> = ({ onSave }) => {
  const [namespace] = useNS();
  const [columns, setColumns] = useUserPreferences(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns[namespace]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="customise-table"
      aria-label={`Customise ${namespace} result table columns form`}
    >
      <ColumnSelect
        onChange={setColumns}
        selectedColumns={columns}
        namespace={namespace}
      />
      <div className="button-group sticky-bottom-right sliding-panel__button-row">
        <Button type="submit">Close</Button>
      </div>
    </form>
  );
};

export default CustomiseTable;
