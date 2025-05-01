import { DragEndEvent } from '@dnd-kit/core';
import { AccordionSearch, Loader } from 'franklin-sites';
import { difference } from 'lodash-es';
import { FC, useCallback, useMemo } from 'react';

import {
  ReceivedFieldData,
  SelectedColumn,
} from '../../../uniprotkb/types/resultsTypes';
import apiUrls from '../../config/apiUrls/apiUrls';
import { Column, nsToPrimaryKeyColumns } from '../../config/columns';
import useDataApi from '../../hooks/useDataApi';
import { Namespace } from '../../types/namespaces';
import { moveItemInArray, removeItemFromArray } from '../../utils/utils';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';
import styles from './styles/column-select.module.scss';
import { getLabel, prepareFieldData } from './utils';

type ColumnSelectProps = {
  selectedColumns: string[]; // Includes primary key columns but no _full xref columns
  onColumnChange: (columndIds: Column[]) => void;
  namespace: Namespace;
  isEntryPage?: boolean;
  isDownload?: boolean;
};

const ColumnSelect: FC<React.PropsWithChildren<ColumnSelectProps>> = ({
  selectedColumns,
  onColumnChange,
  namespace,
  isEntryPage,
  isDownload,
  children,
}) => {
  const primaryKeyColumns = nsToPrimaryKeyColumns(namespace, isEntryPage);

  // remove the entry field from the choices as this must always be present
  // in the url fields parameter when making the search request ie
  // don't give users the choice to remove it
  const removableSelectedColumns = useMemo(
    () => difference(selectedColumns, primaryKeyColumns) as Column[],
    [primaryKeyColumns, selectedColumns]
  );

  const handleSelect = useCallback(
    (itemId: Column) => {
      const index = removableSelectedColumns.indexOf(itemId);
      onColumnChange([
        ...primaryKeyColumns,
        ...(index >= 0
          ? removeItemFromArray(removableSelectedColumns, index)
          : [...removableSelectedColumns, itemId]),
      ]);
    },
    [primaryKeyColumns, removableSelectedColumns, onColumnChange]
  );

  const handleDragDrop = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const from = removableSelectedColumns.indexOf(
          active.id.toString() as Column
        );
        const to = removableSelectedColumns.indexOf(
          over.id.toString() as Column
        );
        onColumnChange([
          ...primaryKeyColumns,
          ...moveItemInArray(removableSelectedColumns, from, to),
        ]);
      }
    },
    [primaryKeyColumns, removableSelectedColumns, onColumnChange]
  );

  const { loading, data, progress } = useDataApi<ReceivedFieldData>(
    apiUrls.configure.resultsFields(namespace, isEntryPage)
  );

  const fieldData = useMemo(
    // Exclude the primaryKeyColumns in the tabs as users can't toggle selection
    () => prepareFieldData(data, primaryKeyColumns, isDownload),
    [data, primaryKeyColumns, isDownload]
  );

  const fieldDataForSelectedColumns = useMemo(
    () =>
      loading
        ? []
        : removableSelectedColumns
            .map((id) => ({
              id,
              label: getLabel(fieldData, namespace, id),
            }))
            .filter((c): c is SelectedColumn => Boolean(c.label)),
    [fieldData, loading, namespace, removableSelectedColumns]
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  return (
    <>
      <div className={styles['column-select']}>
        <ColumnSelectDragDrop
          columns={fieldDataForSelectedColumns}
          onDragDrop={handleDragDrop}
          onRemove={handleSelect}
        />
        <AccordionSearch
          accordionData={fieldData}
          onSelect={(itemId: string) => {
            handleSelect(itemId as Column);
          }}
          selected={removableSelectedColumns}
          placeholder="Search for available columns"
          columns
        />
      </div>
      {children}
    </>
  );
};

export default ColumnSelect;
