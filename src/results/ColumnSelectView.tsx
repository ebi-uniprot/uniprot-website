import React from 'react';
import { AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import {
  moveItemInList,
  removeItemFromList,
  getBEMClassName as bem,
} from '../utils/utils';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';
import { Column } from '../model/types/ColumnTypes';
import {
  ColumnSelectTab,
  FieldData,
  SelectedColumn,
} from './types/resultsTypes';
import './styles/ColumnSelect.scss';

const getTabTitle = (tabId: ColumnSelectTab, columns: SelectedColumn[]) => (
  <div
    className={bem({
      b: 'column-select',
      e: 'tab-title',
    })}
  >
    {tabId}
    <span
      className={bem({
        b: 'column-select',
        e: ['tab-title', 'count'],
        m: columns.length ? 'visible' : 'hidden',
      })}
    >
      <Bubble size="small" value={columns.length} />
    </span>
  </div>
);

const getFieldDataForColumns = (columns: Column[], fieldData: FieldData) => {
  const selected: SelectedColumn[] = new Array(columns.length);
  [ColumnSelectTab.data, ColumnSelectTab.links].forEach(tabId => {
    Object.values(fieldData[tabId]).forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId, label }) => {
        const index = columns.indexOf(itemId);
        if (index >= 0) {
          selected[index] = { tabId, accordionId, itemId, label };
        }
      });
    });
  });
  return selected;
};

type ColumnSelectViewProps = {
  selectedColumns: Column[];
  fieldData: FieldData;
  onChange: (columnId: Column[]) => void;
  onReset: () => void;
};

const ColumnSelectView: React.FC<ColumnSelectViewProps> = ({
  selectedColumns,
  fieldData,
  onChange,
  onReset,
}) => {
  const handleSelect = (itemId: Column) => {
    const index = selectedColumns.indexOf(itemId);
    onChange(
      index >= 0
        ? removeItemFromList(selectedColumns, index)
        : [...selectedColumns, itemId]
    );
  };

  const handleDragDrop = (srcIndex: number, destIndex: number) => {
    onChange(moveItemInList(selectedColumns, srcIndex, destIndex));
  };

  const fieldDataForSelectedColumns = getFieldDataForColumns(
    selectedColumns,
    fieldData
  );

  const tabData = [ColumnSelectTab.data, ColumnSelectTab.links].map(tabId => {
    const selectedColumnsInTab = fieldDataForSelectedColumns.filter(
      item => item.tabId === tabId
    );
    return {
      title: getTabTitle(tabId, selectedColumnsInTab),
      id: tabId,
      key: tabId,
      content: (
        <AccordionSearch
          accordionData={Object.values(fieldData[tabId])}
          onSelect={(_accordionId: string, itemId: Column) =>
            handleSelect(itemId)
          }
          selected={selectedColumnsInTab}
          columns
        />
      ),
    };
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
        onClick={onReset}
      >
        Reset to default
      </button>
      <Tabs tabData={tabData} />
    </div>
  );
};

export default ColumnSelectView;
