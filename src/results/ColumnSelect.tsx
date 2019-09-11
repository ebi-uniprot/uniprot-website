import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Loader, AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import {
  serializableDeepAreEqual,
  moveItemInList,
  removeItemFromList,
  getBEMClassName,
} from '../utils/utils';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';

import fieldsData from '../data/fields.json';
import './styles/ColumnSelect.scss';

const prepareFieldData = fieldsData =>
  fieldsData.map(({ groupName, fields, isDatabase }) => ({
    id: groupName,
    title: groupName,
    isDatabase,
    items: fields.map(({ label, name }) => ({
      id: name,
      label,
    })),
  }));

const getFieldsLinks = accordionData => ({
  data: accordionData.filter(({ isDatabase }) => !isDatabase),
  links: accordionData.filter(({ isDatabase }) => isDatabase),
});

const getTabTitle = (tabId, tabSelected) => {
  return (
    <Fragment>
      {tabId}
      <span
        className={getBEMClassName({
          b: 'column-select',
          e: ['tab', 'title'],
          m: tabSelected.length ? 'visible' : 'hidden',
        })}
      >
        <Bubble size="small" value={tabSelected.length} />
      </span>
    </Fragment>
  );
};

const findFieldDataForColumns = (columns, accordionData) => {
  const selected = [];
  Object.keys(accordionData).forEach(tabId => {
    accordionData[tabId].forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId, label }) => {
        if (columns.includes(itemId)) {
          selected.push({ tabId, accordionId, itemId, label });
        }
      });
    });
  });
  return selected;
};

const findFieldStringForItem = (tabId, accordionId, itemId, accordionData) => {
  const foundAccordion = accordionData[tabId].find(
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
  fetchFieldsIfNeeded,
  fieldsData: outOfDateFields,
}) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const accordionData = useRef({});
  useEffect(() => {
    accordionData.current = getFieldsLinks(prepareFieldData(fieldsData));
    setSelectedColumns(
      findFieldDataForColumns(tableColumns, accordionData.current)
    );
  }, [tableColumns]);

  if (!fieldsData || !fieldsData.length) {
    fetchFieldsIfNeeded();
    return <Loader />;
  }

  const handleSelect = (tabId, accordionId, itemId) => {
    // TODO the label should be with the selected to save having to retrieve it whenever it is selected
    const label = findFieldStringForItem(
      tabId,
      accordionId,
      itemId,
      accordionData.current
    );
    const index = findIndexInSelectedColumns(
      selectedColumns,
      tabId,
      accordionId,
      itemId
    );
    if (index >= 0) {
      setSelectedColumns(removeItemFromList(selectedColumns, index));
    } else {
      setSelectedColumns([
        ...selectedColumns,
        { tabId, accordionId, itemId, label },
      ]);
    }
  };

  const handleDragDrop = (srcIndex, destIndex) => {
    setSelectedColumns(moveItemInList(selectedColumns, srcIndex, destIndex));
  };

  const tabData = ['data', 'links'].map(tabId => {
    const tabSelected = selectedColumns.filter(item => item.tabId === tabId);
    return {
      title: getTabTitle(tabId, tabSelected),
      id: tabId,
      key: tabId,
      content: (
        <AccordionSearch
          accordionData={accordionData.current[tabId]}
          onSelect={(accordionId, itemId) => {
            handleSelect(tabId, accordionId, itemId);
          }}
          selected={tabSelected}
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
      <Tabs tabData={tabData} />
    </Fragment>
  );
};

export default ColumnSelect;
