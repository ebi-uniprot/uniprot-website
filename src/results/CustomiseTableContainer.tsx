import React, { useEffect, useState, Fragment, useRef } from 'react';
import idx from 'idx';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Loader, AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import fieldsData from '../data/fields.json';
import { serializableDeepAreEqual } from '../utils/utils';

const prepareFieldData = (fieldsData) => fieldsData.map(
  ({ groupName, fields, isDatabase }) => ({
    id: groupName,
    title: groupName,
    isDatabase,
    items: fields.map(({ label, name }) => ({
      id: name,
      label,
    })),
  }));

const getFieldsLinks = (accordionData) => ({
  data: accordionData.filter(({ isDatabase }) => !isDatabase),
  links: accordionData.filter(({ isDatabase }) => isDatabase),
})

const getTitle = (tabId, tabSelected) => {
  return (
    <span>
      {`${tabId} `}
      <span
        style={{
          position: 'relative',
          top: -4,
          visibility: tabSelected.length ? 'visible' : 'hidden',
        }}
      >
        <Bubble size="small" value={tabSelected.length} />
      </span>
    </span>
  );
};

const findFieldDataForColumns = (columns, accordionData) => {
  const selected = [];
  Object.keys(accordionData).forEach((tabId) => {
    accordionData[tabId].forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId, label }) => {
        if (columns.includes(itemId)) {
          selected.push({ tabId, accordionId, itemId, label })
        }
      })
    })
  })
  return selected;
}

const findFieldStringForItem = (tabId, accordionId, itemId, accordionData) => {
  const foundAccordion = accordionData[tabId].find(accordion => accordion.id === accordionId )
  if (foundAccordion) {
    const foundItem = foundAccordion.items.find(item => item.id === itemId);
    if (foundItem) {
      return foundItem.label;
    }
  }
}

const CustomiseTable = ({
  tableColumns,
  dispatchFetchFieldsIfNeeded,
  fieldsData: outOfDateFields,
}) => {
  const [selected, setSelected] = useState([]);
  const accordionData = useRef({});

  useEffect(() => {
    console.log('in tableColumns useEffect')
    accordionData.current = getFieldsLinks(prepareFieldData(fieldsData));
    setSelected(findFieldDataForColumns(tableColumns, accordionData.current));
  }, [tableColumns])

  dispatchFetchFieldsIfNeeded();

  if (!fieldsData || !fieldsData.length) {
    return <Loader />;
  }

  
  
  const onSelect = (tabId, accordionId, itemId) => {
    const label = findFieldStringForItem(tabId, accordionId, itemId, accordionData.current);
    const selectedItem = { tabId, accordionId, itemId, label }
    const index = selected.findIndex(item => serializableDeepAreEqual(selectedItem, item));
    if (index >= 0) {
      setSelected([...selected.slice(0, index), ...selected.slice(index + 1)]);
    } else {
      setSelected([...selected,  selectedItem]);
    }
  };

  const tabData = ['data', 'links'].map(tabId => {
    const tabSelected = selected.filter(item => item.tabId === tabId);
    return {
      title: getTitle(tabId, tabSelected),
      id: tabId,
      key: tabId,
      content: (
        <AccordionSearch
          accordionData={accordionData.current[tabId]}
          onSelect={(accordionId, itemId) => {
            onSelect(tabId, accordionId, itemId);
          }}
          selected={tabSelected}
        />
      ),
    }
  });
  return (
    <Fragment>
      {selected.map(({ label }) => label).join(' | ')}
      <br />
      <Tabs tabData={tabData} />
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
  fieldsData: state.results.fields.data,
  isFetching: state.results.fields.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchFieldsIfNeeded: () => resultsActions.fetchFieldsIfNeeded(),
    },
    dispatch
  );

const CustomiseTableContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomiseTable)
);

export default CustomiseTableContainer;
