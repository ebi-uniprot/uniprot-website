import React, { useEffect, useState, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import * as resultsActions from './state/resultsActions';
import ColumnSelect from './ColumnSelect';
import defaultTableColumns from '../data/defaultTableColumns.json';

const CustomiseTable = ({
  tableColumns,
  fetchFieldsIfNeeded,
  fieldsData: outOfDateFields,
}) => (
  <ColumnSelect
    tableColumns={tableColumns}
    fetchFieldsIfNeeded={fetchFieldsIfNeeded}
    fieldsData={outOfDateFields}
    defaultTableColumns={defaultTableColumns}
  />
);

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
  fieldsData: state.results.fields.data,
  isFetching: state.results.fields.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      fetchFieldsIfNeeded: () => resultsActions.fetchFieldsIfNeeded(),
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
