import cn from 'classnames';
import { Button } from 'franklin-sites';
import { type FormEvent, type MouseEvent } from 'react';

import { type Column } from '../../config/columns';
import sticky from '../../styles/sticky.module.scss';
import { type Namespace } from '../../types/namespaces';
import ColumnSelect from '../column-select/ColumnSelect';

type CustomiseTableProps = {
  isEntryPage: boolean;
  namespace: Namespace;
  columns: Column[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  onColumnChange: (columns: Column[]) => void;
};

const CustomiseTable = ({
  isEntryPage,
  namespace,
  columns,
  onSubmit,
  onReset,
  onColumnChange,
  onCancel,
}: CustomiseTableProps) => (
  <form
    onSubmit={onSubmit}
    onReset={onReset}
    aria-label={`Customize ${namespace}${
      isEntryPage ? '' : ' result'
    } table columns form`}
  >
    <ColumnSelect
      onColumnChange={onColumnChange}
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
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </ColumnSelect>
  </form>
);

export default CustomiseTable;
