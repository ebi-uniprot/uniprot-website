import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Loader, AccordionSearch, Tabs } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import fieldsData from '../data/fields.json';

const CustomiseTable = ({
  tableColumns,
  dispatchFetchFieldsIfNeeded,
  fieldsData: outOfDateFields,
}) => {
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

  const tabData = [
    {
      title: 'Fields',
      id: 'fields',
      content: <AccordionSearch accordionData={accordionDataFields} />,
    },
    {
      title: 'Links',
      id: 'links',
      content: <AccordionSearch accordionData={accordionDataLinks} />,
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
