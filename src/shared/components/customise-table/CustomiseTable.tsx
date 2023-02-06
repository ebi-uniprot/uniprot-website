import { FormEvent } from 'react';
import { Button } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';

import { Namespace } from '../../types/namespaces';
import { Column } from '../../config/columns';

import sticky from '../../styles/sticky.module.scss';

type CustomiseTableProps = {
  isEntryPage: boolean;
  namespace: Namespace;
  columns: Column[];
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (columns: Column[]) => void;
  onCancel: (reason: 'cancel') => void;
};

const CustomiseTable = ({
  isEntryPage,
  namespace,
  columns,
  onSubmit,
  onReset,
  onChange,
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
      onChange={onChange}
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
        <Button variant="secondary" onClick={() => onCancel('cancel')}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </ColumnSelect>
  </form>
);

export default CustomiseTable;
