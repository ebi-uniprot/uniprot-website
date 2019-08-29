import React, { useEffect, useState, Fragment, useRef } from 'react';
import { Loader, AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import { serializableDeepAreEqual, moveItemInList } from '../utils/utils';
import ColumnSelectDragDrop from './ColumnSelectDragDrop';
import fieldsData from '../data/fields.json';

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
        style={{
          position: 'relative', // TODO remove span?
          top: '-0.25rem',
          left: '0.5rem',
          visibility: tabSelected.length ? 'visible' : 'hidden',
        }}
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
    const selectedItem = { tabId, accordionId, itemId, label };
    const index = selectedColumns.findIndex(item =>
      serializableDeepAreEqual(selectedItem, item)
    );
    if (index >= 0) {
      // Remove column
      setSelectedColumns([
        ...selectedColumns.slice(0, index),
        ...selectedColumns.slice(index + 1),
      ]);
    } else {
      // Append to end
      setSelectedColumns([...selectedColumns, selectedItem]);
    }
  };

  const handleDragDrop = (srcIndex, destIndex) => {
    setSelectedColumns(moveItemInList(selectedColumns, srcIndex, destIndex));
  };

  const handleRemove = column => {
    console.log(column);
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
        />
      ),
    };
  });

  return (
    <Fragment>
      <ColumnSelectDragDrop
        columns={selectedColumns}
        onDragDrop={handleDragDrop}
        onRemove={handleRemove}
      />
      <Tabs tabData={tabData} />
    </Fragment>
  );
};

export default ColumnSelect;
