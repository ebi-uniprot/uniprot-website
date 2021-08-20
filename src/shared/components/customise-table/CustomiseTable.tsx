import { FormEvent } from 'react';
import { Button } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';

import useNS from '../../hooks/useNS';
import useLocalStorage from '../../hooks/useLocalStorage';

import { nsToDefaultColumns } from '../../config/columns';
import { allEntryPages } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import sticky from '../../styles/sticky.module.scss';

type CustomiseTableProps = {
  onSave: () => void;
};

const CustomiseTable = ({ onSave }: CustomiseTableProps) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const isEntryPage = Boolean(useRouteMatch(allEntryPages));
  const defaultColumns = nsToDefaultColumns(namespace, isEntryPage);
  const [columns, setColumns] = useLocalStorage(
    `table columns for ${namespace}${
      isEntryPage ? ' entry page' : ''
    }` as const,
    defaultColumns
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave();
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setColumns(defaultColumns);
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      aria-label={`Customise ${namespace}${
        isEntryPage ? '' : ' result'
      } table columns form`}
    >
      <ColumnSelect
        onChange={setColumns}
        selectedColumns={columns}
        namespace={namespace}
        isEntryPage={isEntryPage}
      >
        <div
          className={cn(
            'button-group',
            'sliding-panel__button-row',
            sticky['sticky-bottom-right']
          )}
        >
          <Button variant="secondary" type="reset">
            Reset to default
          </Button>
          <Button type="submit">Close</Button>
        </div>
      </ColumnSelect>
    </form>
  );
};

export default CustomiseTable;
