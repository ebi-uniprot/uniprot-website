import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'franklin-sites';
import {
  moveItemInList,
  removeItemFromList,
} from '../../../shared/utils/utils';
import { RootState } from '../../../app/state/rootInitialState';
import ColumnSelectView from './ColumnSelectView';
import defaultColumns from '../../../shared/config/defaultColumns';
import { UniProtKBColumn } from '../../types/columnTypes';
import {
  ColumnSelectTab,
  FieldData,
  FieldDatum,
  ReceivedField,
  ReceivedFieldData,
} from '../../types/resultsTypes';
import { Namespace } from '../../../shared/types/namespaces';
import useDataApi from '../../../shared/hooks/useDataApi';
import apiUrls from '../../../shared/config/apiUrls';

export const prepareFields = (fields: ReceivedField[]) =>
  fields.map(({ label, name }) => ({ id: name as UniProtKBColumn, label }));

export const prepareFieldData = (fieldData: ReceivedFieldData) => {
  const dataTab: FieldDatum[] = [];
  const linksTab: FieldDatum[] = [];
  const linksAdded: Record<string, boolean> = {};
  fieldData.forEach(({ groupName, fields, isDatabaseGroup, id }) => {
    const group = {
      id,
      title: groupName,
      items: prepareFields(fields),
    };
    if (isDatabaseGroup) {
      if (!linksAdded[groupName]) {
        linksTab.push(group);
        linksAdded[groupName] = true;
      }
    } else {
      dataTab.push(group);
    }
  });
  return {
    [ColumnSelectTab.data]: dataTab,
    [ColumnSelectTab.links]: linksTab,
  };
};

type ColumnSelectProps = {
  selectedColumns: UniProtKBColumn[];
  fetchFieldsIfNeeded: () => void;
  isFetching: boolean;
  onChange: (columndIds: UniProtKBColumn[]) => void;
  namespace: Namespace;
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
  selectedColumns,
  onChange,
  namespace,
}) => {
  const { loading, data } = useDataApi<ReceivedFieldData>(
    namespace && apiUrls.resultsFields(namespace)
  );

  if (loading || !data) {
    return <Loader />;
  }

  const fieldData = prepareFieldData(data);

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
      onReset={() =>
        onChange(defaultColumns[Namespace.uniprotkb] as UniProtKBColumn[])
      }
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
});

const ColumnSelectContainer = connect(mapStateToProps)(ColumnSelect);

export default ColumnSelectContainer;
