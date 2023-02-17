import { FC, useCallback, useMemo } from 'react';
import { AccordionSearch, Loader } from 'franklin-sites';
import { difference } from 'lodash-es';

import ColumnSelectDragDrop from './ColumnSelectDragDrop';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import { Column, nsToPrimaryKeyColumns } from '../../config/columns';

import { moveItemInList, removeItemFromList } from '../../utils/utils';
import { getLabel, prepareFieldData } from './utils';
import { Namespace } from '../../types/namespaces';

import {
  ReceivedFieldData,
  SelectedColumn,
} from '../../../uniprotkb/types/resultsTypes';

import './styles/column-select.scss';

type ColumnSelectProps = {
  selectedColumns: Column[];
  onChange: (columndIds: Column[]) => void;
  namespace: Namespace;
  isEntryPage?: boolean;
};

const ColumnSelect: FC<ColumnSelectProps> = ({
  selectedColumns,
  onChange,
  namespace,
  isEntryPage,
  children,
}) => {
  const primaryKeyColumns = nsToPrimaryKeyColumns(namespace, isEntryPage);

  // remove the entry field from the choices as this must always be present
  // in the url fields parameter when making the search request ie
  // don't give users the choice to remove it
  const removableSelectedColumns = difference(
    selectedColumns,
    primaryKeyColumns
  );
  const handleChange = useCallback(
    (columns: Column[]) => {
      onChange([...primaryKeyColumns, ...columns]);
    },
    [primaryKeyColumns, onChange]
  );

  const handleSelect = useCallback(
    (itemId: Column) => {
      const index = removableSelectedColumns.indexOf(itemId);
      handleChange(
        index >= 0
          ? removeItemFromList(removableSelectedColumns, index)
          : [...removableSelectedColumns, itemId]
      );
    },
    [handleChange, removableSelectedColumns]
  );

  const handleDragDrop = useCallback(
    (srcIndex: number, destIndex: number) => {
      handleChange(
        moveItemInList(removableSelectedColumns, srcIndex, destIndex)
      );
    },
    [handleChange, removableSelectedColumns]
  );

  const { loading, data, progress } = useDataApi<ReceivedFieldData>(
    apiUrls.resultsFields(namespace, isEntryPage)
  );

  // Exclude the primaryKeyColumns in the tabs as users can't toggle selection
  const fieldData = useMemo(
    () => prepareFieldData(data, primaryKeyColumns),
    [data, primaryKeyColumns]
  );

  if (loading) {
    return <Loader progress={progress} />;
  }
  const fieldDataForSelectedColumns = removableSelectedColumns
    .map((itemId) => {
      const label = getLabel(fieldData, namespace, itemId);
      return (
        label !== null && {
          itemId,
          label,
        }
      );
    })
    .filter((d: SelectedColumn | boolean): d is SelectedColumn => Boolean(d));

  return (
    <>
      <div className="column-select">
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
          selected={selectedColumns}
          placeholder="Search for available columns"
          columns
        />
      </div>
      {children}
    </>
  );
};

export default ColumnSelect;
