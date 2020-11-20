import React from 'react';
import { Bubble } from 'franklin-sites';
import { getBEMClassName as bem } from '../../../../shared/utils/utils';
import { UniProtKBColumn } from '../../../types/columnTypes';
import {
  ColumnSelectTab,
  FieldData,
  ReceivedField,
  ReceivedFieldData,
  FieldDatum,
  SelectedColumn,
} from '../../../types/resultsTypes';

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

export const getTabTitle = (
  tabId: ColumnSelectTab,
  columns: SelectedColumn[]
) => (
  <div
    className={bem({
      b: 'column-select',
      e: 'tab-title',
    })}
  >
    {tabId}
    <span
      className={bem({
        b: 'column-select',
        e: ['tab-title', 'count'],
        m: columns.length ? 'visible' : 'hidden',
      })}
    >
      <Bubble size="small" value={columns.length} />
    </span>
  </div>
);

export const getFieldDataForColumns = (
  columns: UniProtKBColumn[],
  fieldData: FieldData
) => {
  /*
  For each column (a string enum) searches through the result field structure
  to find the associated information:
    -tabId
    -accordionId
    -itemId
    -label
  */
  const selected: SelectedColumn[] = new Array(columns.length);
  [ColumnSelectTab.data, ColumnSelectTab.links].forEach((tabId) => {
    fieldData[tabId].forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId, label }) => {
        const index = columns.indexOf(itemId);
        if (index >= 0) {
          selected[index] = { tabId, accordionId, itemId, label };
        }
      });
    });
  });
  return selected;
};
