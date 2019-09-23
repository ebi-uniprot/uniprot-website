import React, { useEffect, useState, Fragment } from 'react';
import { AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import {
  moveItemInList,
  removeItemFromList,
  getBEMClassName,
} from '../utils/utils';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';
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
  const foundAccordion = fieldsData[tabId].find(
    accordion => accordion.id === accordionId
  );
  if (foundAccordion) {
    const foundItem = foundAccordion.items.find(item => item.id === itemId);
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

const ColumnSelect = ({
  tableColumns,
  fieldsData,
  defaultTableColumns,
}) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumn[]>([]);
  useEffect(() => {
    setSelectedColumns(findFieldDataForColumns(tableColumns, fieldsData));
  }, [tableColumns]);

  // if (!fieldsData || !fieldsData.length) {
  //   fetchFieldsIfNeeded();
  //   return <Loader />;
  // }

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
