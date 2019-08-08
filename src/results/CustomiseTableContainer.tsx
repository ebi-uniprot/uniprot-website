import React, { useEffect, useState, Fragment } from 'react';
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
    title: groupName,
    id: groupName,
    isDatabase,
    items: fields.map(({ label, name }) => ({
      content: label,
      id: name,
      isDatabase,
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

const CustomiseTable = ({
  tableColumns,
  dispatchFetchFieldsIfNeeded,
  fieldsData: outOfDateFields,
}) => {
  const [selected, setSelected] = useState([]);
  dispatchFetchFieldsIfNeeded();

  if (!fieldsData || !fieldsData.length) {
    return <Loader />;
  }

  const accordionData = getFieldsLinks(prepareFieldData(fieldsData));
  
  const onSelect = (tabId, accordionId, itemId) => {
    const selectedItem = { tabId, accordionId, itemId }
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
          accordionData={accordionData[tabId]}
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
      TableColumns: 
      {' '}
      {tableColumns.join(' | ')}
      <br />
      Selected Fields: 
      {' '}
      {selected.map(({itemId}) => itemId).join(' | ')}
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
