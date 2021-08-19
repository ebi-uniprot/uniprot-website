import { FC, useCallback, useMemo } from 'react';
import { AccordionSearch, Tabs, Tab, Loader } from 'franklin-sites';
import { difference } from 'lodash-es';

import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';

import useDataApi from '../../hooks/useDataApi';

import apiUrls from '../../config/apiUrls';
import {
  Column,
  nsToPrimaryKeyColumns,
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

import '../../styles/sticky.scss';
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
    // No configure endpoint for supporting data
    namespace && mainNamespaces.has(namespace)
      ? apiUrls.resultsFields(namespace, isEntryPage)
      : null
  );

  // Exclude the primaryKeyColumns in the tabs as users can't toggle selection
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
    return <Loader progress={progress} />;
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
      {tabs.length ? (
        <Tabs className="sticky-tabs-container">{tabs}</Tabs>
      ) : undefined}
    </div>
  );
};

export default ColumnSelect;
