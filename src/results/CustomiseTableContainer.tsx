import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Loader, Accordion } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as searchActions from '../search/state/searchActions';

const CustomiseTable = ({
  tableColumns,
  dispatchFetchSearchTermsIfNeeded,
  searchTerms,
}) => {
  useEffect(() => {
    dispatchFetchSearchTermsIfNeeded();
  });

  if (!searchTerms || !searchTerms.length) {
    return <Loader />;
  }

  return (
    <ul>
      {tableColumns.map(tableColumn => (
        <li>{tableColumn}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
  searchTerms: state.query.searchTerms.data,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchSearchTermsIfNeeded: () =>
        searchActions.fetchSearchTermsIfNeeded(),
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
