import { FormEvent } from 'react';
import { Button } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import ColumnSelect from '../column-select/ColumnSelect';

import useNS from '../../hooks/useNS';
import useUserPreferences from '../../hooks/useUserPreferences';

import { nsToDefaultColumns } from '../../config/columns';
import { allEntryPages } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import '../../styles/sticky.scss';
import './styles/customise-table.scss';

type CustomiseTableProps = {
  onSave: () => void;
};

const CustomiseTable = ({ onSave }: CustomiseTableProps) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const isEntryPage = Boolean(useRouteMatch(allEntryPages));
  const [columns, setColumns] = useUserPreferences(
    `table columns for ${namespace}${
      isEntryPage ? ' entry page' : ''
    }` as const,
    nsToDefaultColumns(namespace, isEntryPage)
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="customise-table"
      aria-label={`Customise ${namespace}${
        isEntryPage ? '' : ' result'
      } table columns form`}
    >
      <ColumnSelect
        onChange={setColumns}
        selectedColumns={columns}
        namespace={namespace}
        isEntryPage={isEntryPage}
      />
      <div className="button-group sticky-bottom-right sliding-panel__button-row">
        <Button type="submit">Close</Button>
      </div>
    </form>
  );
};

export default CustomiseTable;
