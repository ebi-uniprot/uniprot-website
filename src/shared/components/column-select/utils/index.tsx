import React from 'react';
import { Bubble } from 'franklin-sites';
import { getBEMClassName as bem } from '../../../utils/utils';

import {
  ColumnSelectTab,
  FieldData,
  ReceivedField,
  ReceivedFieldData,
  FieldDatum,
  SelectedColumn,
} from '../../../../uniprotkb/types/resultsTypes';
import { Column } from '../../../config/columns';

export const prepareFields = (fields: ReceivedField[]) =>
  fields.map(({ label, name, id }) => ({
    id: name,
    label,
    key: id,
  }));

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
  columns: Column[],
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
