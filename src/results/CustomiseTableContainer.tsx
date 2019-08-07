import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Loader, AccordionSearch, Tabs, Bubble } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import fieldsData from '../data/fields.json';
import { removeItemFromArray, addItemToArray } from '../utils/utils';

const CustomiseTable = ({
  tableColumns,
  dispatchFetchFieldsIfNeeded,
  fieldsData: outOfDateFields,
}) => {
  const [selected, setSelected] = useState({ fields: [], links: [] });
  dispatchFetchFieldsIfNeeded();
  useEffect(() => {
    dispatchFetchFieldsIfNeeded();
  });

  if (!fieldsData || !fieldsData.length) {
    return <Loader />;
  }

  const accordionData = fieldsData.map(({ groupName, fields, isDatabase }) => ({
    title: groupName,
    id: groupName,
    isDatabase,
    items: fields.map(({ label, name }) => ({
      content: label,
      id: name,
      isDatabase,
    })),
  }));

  const accordionDataFields = accordionData.filter(
    ({ isDatabase }) => !isDatabase
  );
  const accordionDataLinks = accordionData.filter(
    ({ isDatabase }) => isDatabase
  );

  const onSelect = (type, itemId) => {
    let t;
    if (selected[type].includes(itemId)) {
      t = removeItemFromArray(selected[type], itemId);
    } else {
      t = addItemToArray(selected[type], itemId);
    }
    console.log(t);
    setSelected({ ...selected, [type]: t });
  };

  const getTitle = type => {
    console.log(selected, type);
    return (
      <span style={{ textTransform: 'capitalize' }}>
        {`${type} `}
        <span
          style={{
            position: 'relative',
            top: -4,
            visibility: selected[type].length ? 'visible' : 'hidden',
          }}
        >
          <Bubble size="small" value={selected[type].length} />
        </span>
      </span>
    );
  };

  const tabData = [
    {
      title: getTitle('fields'),
      id: 'fields',
      content: (
        <AccordionSearch
          accordionData={accordionDataFields}
          onSelect={itemId => {
            onSelect('fields', itemId);
          }}
        />
      ),
    },
    {
      title: getTitle('links'),
      id: 'links',
      content: (
        <AccordionSearch
          accordionData={accordionDataLinks}
          onSelect={itemId => {
            onSelect('links', itemId);
          }}
        />
      ),
    },
  ];
  return <Tabs tabData={tabData} />;
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
