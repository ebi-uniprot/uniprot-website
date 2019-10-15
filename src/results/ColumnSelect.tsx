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

const entryField = {
  tabId: 'data',
  accordionId: 'Names & Taxonomy',
  itemId: ColumnId.accession,
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

const findFieldDataForColumns = (columns, fieldsData) => {
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

const findFieldStringForItem = (tabId, accordionId, itemId, fieldsData) => {
  const foundAccordion = fieldsData[tabId].find(({ id }) => id === accordionId);
  if (foundAccordion) {
    const foundItem = foundAccordion.items.find(({ id }) => id === itemId);
    if (foundItem) {
      return foundItem.label;
    }
  }
};

const findIndexInSelectedColumns = (
  selectedColumns,
  tabId,
  accordionId,
  itemId
) =>
  selectedColumns.findIndex(
    item =>
      item.tabId === tabId &&
      item.accordionId === accordionId &&
      item.itemId === itemId
  );

const getTableColumnToFieldKeysMapping = fieldsData => {
  console.log(fieldsData);
  const map = new Map<ColumnId, FieldKeys>();
  Object.keys(fieldsData).forEach(tabId => {
    fieldsData[tabId].forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId }) => {
        map.set(itemId, {
          tabId,
          accordionId,
          itemId,
        });
      });
    });
  });
  return map;
};

const removeFieldFromFieldsData = (
  { tabId, accordionId, itemId },
  fieldsData
) => {
  console.log('removeFieldFromFieldsData');
  return {
    ...fieldsData,
    [tabId]: fieldsData[tabId].map(group =>
      group.id === accordionId
        ? { ...group, items: group.items.filter(({ id }) => id !== itemId) }
        : group
    ),
  };
};

const ColumnSelect = ({
  tableColumns,
  fieldsData: fieldsDataProp,
  defaultTableColumns,
  onChange,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumn[]>([]);

  // useEffect(() => {
  //   const fieldsData = removeFieldFromFieldsData(entryField, fieldsDataProp);
  // }, [])
  const fieldsData = removeFieldFromFieldsData(entryField, fieldsDataProp);
  useEffect(() => {
    setSelectedColumns(findFieldDataForColumns(tableColumns, fieldsData));
  }, [fieldsData, tableColumns]);

  if (!fieldsData) {
    return null;
  }

  const t = getTableColumnToFieldKeysMapping(fieldsData);
  console.log(t);

  // if (!fieldsData || !fieldsData.length) {
  //   fetchFieldsIfNeeded();
  //   return <Loader />;
  // }

  console.log(fieldsData);
  console.log(selectedColumns);
  let allIds = [];
  [(Tab.data, Tab.links)].forEach(tabId => {
    fieldsData[tabId].forEach(({ items }) => {
      allIds = [...allIds, ...items.map(({ id }) => id)];
    });
  });

  const handleSelect = (tabId: Tab, accordionId, itemId) => {
    const index = findIndexInSelectedColumns(
      selectedColumns,
      tabId,
      accordionId,
      itemId
    );
    if (index >= 0) {
      setSelectedColumns(removeItemFromList(selectedColumns, index));
    } else {
      // TODO the label should be with the selected to save having to retrieve it whenever it is selected
      const label = findFieldStringForItem(
        tabId,
        accordionId,
        itemId,
        fieldsData
      );
      setSelectedColumns([
        ...selectedColumns,
        { tabId, accordionId, itemId, label },
      ]);
    }
  };

  const handleDragDrop = (srcIndex: number, destIndex: number) => {
    setSelectedColumns(moveItemInList(selectedColumns, srcIndex, destIndex));
  };

  const resetToDefault = () => {
    setSelectedColumns(
      findFieldDataForColumns(defaultTableColumns, fieldsData)
    );
  };

  const tabData = [Tab.data, Tab.links].map(tabId => {
    const selectedColumnsInTab = selectedColumns.filter(
      item => item.tabId === tabId
    );
    return {
      title: getTabTitle(tabId, selectedColumnsInTab),
      id: tabId,
      key: tabId,
      content: (
        <AccordionSearch
          accordionData={fieldsData[tabId]}
          onSelect={(accordionId, itemId) => {
            handleSelect(tabId, accordionId, itemId);
          }}
          selected={selectedColumnsInTab}
          columns
        />
      ),
    };
  });
  return (
    <Fragment>
      <ColumnSelectDragDrop
        columns={selectedColumns}
        onDragDrop={handleDragDrop}
        onRemove={({ tabId, accordionId, itemId }) =>
          handleSelect(tabId, accordionId, itemId)
        }
      />
      <button
        className="button"
        type="button"
        tabIndex={0}
        onClick={resetToDefault}
      >
        Reset to default
      </button>
      <Tabs tabData={tabData} />
    </Fragment>
  );
};

export default ColumnSelect;
