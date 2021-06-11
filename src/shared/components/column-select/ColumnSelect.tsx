import { FC, useCallback, useMemo } from 'react';
import { AccordionSearch, Tabs, Tab, Loader, Button } from 'franklin-sites';
import { difference } from 'lodash-es';

import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import {
  Column,
  nsToPrimaryKeyColumns,
  nsToDefaultColumns,
  nsToColumnConfig,
} from '../../config/columns';

import { moveItemInList, removeItemFromList } from '../../utils/utils';
import {
  getFieldDataForColumns,
  getTabTitle,
  prepareFieldData,
  prepareFieldDataFromColumnConfig,
} from './utils';
import {
  mainNamespaces,
  Namespace,
  supportingDataNamespaces,
} from '../../types/namespaces';

import {
  ReceivedFieldData,
  ColumnSelectTab,
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
}) => {
  const primaryKeyColumns = nsToPrimaryKeyColumns(namespace, isEntryPage);
  const defaultColumns = nsToDefaultColumns(namespace, isEntryPage);

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

  const { loading, data } = useDataApi<ReceivedFieldData>(
    // No configure endpoint for supporting data
    namespace && mainNamespaces.has(namespace)
      ? apiUrls.resultsFields(namespace, isEntryPage)
      : null
  );

  // Exclude the primaryKeyColumn in the tabs as users can't toggle selection
  const fieldData = useMemo(
    () =>
      supportingDataNamespaces.has(namespace)
        ? prepareFieldDataFromColumnConfig(
            nsToColumnConfig[namespace],
            primaryKeyColumns
          )
        : prepareFieldData(data, primaryKeyColumns),
    [namespace, data, primaryKeyColumns]
  );

  if (loading) {
    return <Loader />;
  }

  const fieldDataForSelectedColumns = getFieldDataForColumns(
    removableSelectedColumns,
    fieldData
  );
  const tabs = Object.entries(fieldData).map(([tabId, tabData]) => {
    const selectedColumnsInTab = fieldDataForSelectedColumns.filter(
      (item) => item.tabId === tabId
    );
    return (
      <Tab
        key={tabId}
        title={getTabTitle(tabId as ColumnSelectTab, selectedColumnsInTab)}
      >
        <AccordionSearch
          accordionData={tabData}
          onSelect={(_accordionId: string, itemId: UniProtKBColumn) =>
            handleSelect(itemId)
          }
          selected={selectedColumnsInTab}
          placeholder="Search for available columns"
          columns
        />
      </Tab>
    );
  });

  return (
    <div className="column-select">
      <ColumnSelectDragDrop
        columns={fieldDataForSelectedColumns}
        onDragDrop={handleDragDrop}
        onRemove={handleSelect}
      />
      <Button
        variant="secondary"
        onClick={() => onChange(defaultColumns)}
        data-testid="column-select-reset-button"
      >
        Reset to default
      </Button>
      {tabs.length ? <Tabs>{tabs}</Tabs> : undefined}
    </div>
  );
};

export default ColumnSelect;
