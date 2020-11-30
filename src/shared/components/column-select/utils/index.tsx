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

type PreparedField = {
  id: Column;
  label: string;
  key: string;
};

export const prepareFields = (fields: ReceivedField[], exclude: Column[]) =>
  fields
    .filter(({ name }) => !exclude.includes(name))
    .map(
      ({ label, name, id }) =>
        ({
          id: name,
          label,
          key: id,
        } as PreparedField)
    );

export const prepareFieldData = (
  fieldData: ReceivedFieldData,
  exclude: Column[] = [] // Exclude any columns which should not be user-selectable eg accession
) => {
  const dataTab: FieldDatum[] = [];
  const linksTab: FieldDatum[] = [];
  const linksAdded: Record<string, boolean> = {};
  fieldData.forEach(({ groupName, fields, isDatabaseGroup, id }) => {
    const items = prepareFields(fields, exclude);
    if (items.length) {
      const group = {
        id,
        title: groupName,
        items,
      };
      if (isDatabaseGroup) {
        if (!linksAdded[groupName]) {
          linksTab.push(group);
          linksAdded[groupName] = true;
        }
      } else {
        dataTab.push(group);
      }
    }
  });
  const prepared: FieldData = {};
  if (dataTab.length) {
    prepared[ColumnSelectTab.data] = dataTab;
  }
  if (linksTab.length) {
    prepared[ColumnSelectTab.links] = linksTab;
  }
  return prepared;
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
  Object.entries(fieldData).forEach(([tabId, tabData = []]) => {
    tabData.forEach(({ id: accordionId, items }) => {
      items.forEach(({ id: itemId, label }) => {
        const index = columns.indexOf(itemId);
        if (index >= 0) {
          selected[index] = {
            tabId: tabId as ColumnSelectTab,
            accordionId,
            itemId,
            label,
          };
        }
      });
    });
  });
  return selected;
};
