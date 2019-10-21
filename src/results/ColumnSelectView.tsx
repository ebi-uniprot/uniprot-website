import React, { useEffect, useRef, useState, Fragment } from 'react';
import { AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import {
  moveItemInList,
  removeItemFromList,
  getBEMClassName,
} from '../utils/utils';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';
import ColumnId from '../model/types/columnIdTypes';
import './styles/ColumnSelect.scss';

enum Tab {
  data = 'data',
  links = 'links',
}

type SelectedColumn = {
  tabId: Tab;
  accordionId: string;
  itemId: string;
  label: string;
};

type FieldKeys = {
  tabId: Tab;
  accordionId: string;
  itemId: ColumnId;
};

type FieldDatum = {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
  }[];
};

type FieldData = {
  [tab in Tab]: FieldDatum[];
};

const getTabTitle = (tabId: Tab, selectedColumns: SelectedColumn[]) => {
  return (
    <Fragment>
      {tabId}
      <span
        className={getBEMClassName({
          b: 'column-select',
          e: ['tab', 'title'],
          m: selectedColumns.length ? 'visible' : 'hidden',
        })}
      >
        <Bubble size="small" value={selectedColumns.length} />
      </span>
    </Fragment>
  );
};

const getFieldDataForColumns = (columns, fieldsData) => {
  const selected: SelectedColumn[] = [];
  Object.keys(fieldsData).forEach(tabId => {
    fieldsData[tabId].forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId, label }) => {
        if (columns.includes(itemId)) {
          selected.push({ tabId, accordionId, itemId, label });
        }
      });
    });
  });
  return selected;
};

const ColumnSelectView = ({
  selectedColumns,
  fieldsData,
  onChange,
  onReset,
}) => {
  // if (!fieldsData || !fieldsData.length) {
  //   fetchFieldsIfNeeded();
  //   return <Loader />;
  // }

  const fieldDataForSelectedColumns = getFieldDataForColumns(
    selectedColumns,
    fieldsData
  );

  const handleSelect = itemId => {
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

  const tabData = [Tab.data, Tab.links].map(tabId => {
    const selectedColumnsInTab = fieldDataForSelectedColumns.filter(
      item => item.tabId === tabId
    );
    return {
      title: getTabTitle(tabId, selectedColumnsInTab),
      id: tabId,
      key: tabId,
      content: (
        <AccordionSearch
          accordionData={fieldsData[tabId]}
          onSelect={(_, itemId) => handleSelect(itemId)}
          selected={selectedColumnsInTab}
          columns
        />
      ),
    };
  });
  return (
    <div className='column-select'>
      <ColumnSelectDragDrop
        columns={fieldDataForSelectedColumns}
        onDragDrop={handleDragDrop}
        onRemove={handleSelect}
      />
      <button className="button secondary" type="button" tabIndex={0} onClick={onReset}>
        Reset to default
      </button>
      <Tabs tabData={tabData} />
    </div>
  );
};

export default ColumnSelectView;
