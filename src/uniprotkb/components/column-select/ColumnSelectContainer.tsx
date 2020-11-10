import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Loader } from 'franklin-sites';
import {
  moveItemInList,
  removeItemFromList,
} from '../../../shared/utils/utils';
import { RootState, RootAction } from '../../../app/state/rootInitialState';
import * as resultsActions from '../../state/resultsActions';
import ColumnSelectView from './ColumnSelectView';
import { uniProtKBdefaultTableColumns } from '../../state/resultsInitialState';
import { UniProtKBColumn } from '../../types/columnTypes';
import { ColumnSelectTab, FieldData } from '../../types/resultsTypes';

type ColumnSelectProps = {
  selectedColumns: UniProtKBColumn[];
  fetchFieldsIfNeeded: () => void;
  isFetching: boolean;
  fieldData: FieldData;
  onChange: (columndIds: UniProtKBColumn[]) => void;
};

export const entryField = {
  tabId: ColumnSelectTab.data,
  accordionId: 'Names & Taxonomy',
  itemId: UniProtKBColumn.accession,
};

export const removeFieldFromFieldsData = (
  {
    tabId,
    accordionId,
    itemId,
  }: { tabId: ColumnSelectTab; accordionId: string; itemId: UniProtKBColumn },
  fieldData: FieldData
) => ({
  ...fieldData,
  [tabId]: fieldData[tabId].map((group) =>
    group.id === accordionId
      ? { ...group, items: group.items.filter(({ id }) => id !== itemId) }
      : group
  ),
});

const ColumnSelect: FC<ColumnSelectProps> = ({
  fetchFieldsIfNeeded,
  isFetching,
  fieldData,
  selectedColumns,
  onChange,
}) => {
  if (
    isFetching ||
    !fieldData ||
    !fieldData[ColumnSelectTab.data] ||
    !fieldData[ColumnSelectTab.data].length ||
    !fieldData[ColumnSelectTab.links] ||
    !fieldData[ColumnSelectTab.links].length
  ) {
    fetchFieldsIfNeeded();
    return <Loader />;
  }

  // remove the entry field from the choices as this must always be present
  // in the url fields parameter when making the search request ie
  // don't give users the choice to remove it
  const selectedColumnsWithoutEntry = selectedColumns.filter(
    (col) => col !== entryField.itemId
  );
  const FieldFromFieldsDataWithoutEntry = removeFieldFromFieldsData(
    entryField,
    fieldData
  );

  const handleChange = (columns: UniProtKBColumn[]) => {
    onChange([entryField.itemId, ...columns]);
  };

  const handleSelect = (itemId: UniProtKBColumn) => {
    const index = selectedColumnsWithoutEntry.indexOf(itemId);
    handleChange(
      index >= 0
        ? removeItemFromList(selectedColumnsWithoutEntry, index)
        : [...selectedColumnsWithoutEntry, itemId]
    );
  };

  const handleDragDrop = (srcIndex: number, destIndex: number) => {
    handleChange(
      moveItemInList(selectedColumnsWithoutEntry, srcIndex, destIndex)
    );
  };

  return (
    <ColumnSelectView
      selectedColumns={selectedColumnsWithoutEntry}
      fieldData={FieldFromFieldsDataWithoutEntry}
      onReset={() => onChange(uniProtKBdefaultTableColumns)}
      onSelect={handleSelect}
      onDragDrop={handleDragDrop}
    />
  );
};

const mapStateToProps = (
  state: RootState,
  ownProps: {
    onChange: (columndIds: UniProtKBColumn[]) => void;
    selectedColumns: UniProtKBColumn[];
  }
) => ({
  onChange: ownProps.onChange,
  fieldData: state.results.fields.data,
  isFetching: state.results.fields.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      fetchFieldsIfNeeded: () => resultsActions.fetchFieldsIfNeeded(),
    },
    dispatch
  );

const ColumnSelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ColumnSelect);

export default ColumnSelectContainer;
