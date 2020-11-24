import React, { FC, useCallback } from 'react';
import { AccordionSearch, Tabs, Tab, Loader } from 'franklin-sites';
import { moveItemInList, removeItemFromList } from '../../utils/utils';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import {
  ReceivedFieldData,
  ColumnSelectTab,
} from '../../../uniprotkb/types/resultsTypes';
import { Namespace } from '../../types/namespaces';
import useDataApi from '../../hooks/useDataApi';
import apiUrls from '../../config/apiUrls';

import ColumnSelectDragDrop from './ColumnSelectDragDrop';

import './styles/column-select.scss';
import defaultColumns from '../../config/defaultColumns';
import {
  entryField,
  removeFieldFromFieldsData,
  getFieldDataForColumns,
  getTabTitle,
  prepareFieldData,
} from './utils';

type ColumnSelectProps = {
  selectedColumns: UniProtKBColumn[];
  onChange: (columndIds: UniProtKBColumn[]) => void;
  namespace: Namespace;
};

const ColumnSelect: FC<ColumnSelectProps> = ({
  selectedColumns,
  onChange,
  namespace,
}) => {
  // remove the entry field from the choices as this must always be present
  // in the url fields parameter when making the search request ie
  // don't give users the choice to remove it
  const selectedColumnsWithoutEntry = selectedColumns.filter(
    (col) => col !== entryField.itemId
  );
  const handleChange = useCallback(
    (columns: UniProtKBColumn[]) => {
      onChange([entryField.itemId, ...columns]);
    },
    [onChange]
  );

  const handleSelect = useCallback(
    (itemId: UniProtKBColumn) => {
      const index = selectedColumnsWithoutEntry.indexOf(itemId);
      console.log(index, itemId, selectedColumnsWithoutEntry);
      handleChange(
        index >= 0
          ? removeItemFromList(selectedColumnsWithoutEntry, index)
          : [...selectedColumnsWithoutEntry, itemId]
      );
    },
    [handleChange, selectedColumnsWithoutEntry]
  );

  const handleDragDrop = useCallback(
    (srcIndex: number, destIndex: number) => {
      handleChange(
        moveItemInList(selectedColumnsWithoutEntry, srcIndex, destIndex)
      );
    },
    [handleChange, selectedColumnsWithoutEntry]
  );

  const { loading, data } = useDataApi<ReceivedFieldData>(
    namespace && apiUrls.resultsFields(namespace)
  );

  if (loading || !data) {
    return <Loader />;
  }

  const fieldData = prepareFieldData(data);

  const fieldDataForSelectedColumns = getFieldDataForColumns(
    selectedColumnsWithoutEntry,
    removeFieldFromFieldsData(entryField, fieldData)
  );

  const tabs = [ColumnSelectTab.data, ColumnSelectTab.links].map((tabId) => {
    const selectedColumnsInTab = fieldDataForSelectedColumns.filter(
      (item) => item.tabId === tabId
    );
    return (
      <Tab key={tabId} title={getTabTitle(tabId, selectedColumnsInTab)}>
        <AccordionSearch
          accordionData={Object.values(fieldData[tabId])}
          onSelect={(_accordionId: string, itemId: UniProtKBColumn) =>
            handleSelect(itemId)
          }
          selected={selectedColumnsInTab}
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
      <button
        className="button secondary"
        type="button"
        tabIndex={0}
        onClick={() =>
          onChange(defaultColumns[Namespace.uniprotkb] as UniProtKBColumn[])
        }
        data-testid="column-select-reset-button"
      >
        Reset to default
      </button>
      <Tabs>{tabs}</Tabs>
    </div>
  );
};

export default ColumnSelect;
