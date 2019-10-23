import ColumnId from '../../model/types/columnIdTypes';

export enum SortDirection {
  ascend = 'ascend',
  descend = 'descend',
}

export enum SortDirectionApi {
  ascend = 'asc',
  descend = 'desc',
}

export const getApiSortDirection = (direction: SortDirection) =>
  direction === SortDirection.ascend
    ? SortDirectionApi.ascend
    : SortDirectionApi.descend;

export type SelectedFacet = { name: string; value: string };
export type SelectedEntries = { [key: string]: boolean };

export enum ColumnSelectTab {
  data = 'data',
  links = 'links',
}

export type SelectedColumn = {
  tabId: ColumnSelectTab;
  accordionId: string;
  itemId: ColumnId;
  label: string;
};

export type FieldDatum = {
  id: string;
  title: string;
  items: {
    id: ColumnId;
    label: string;
  }[];
};

export type FieldData = {
  [tab in ColumnSelectTab]: FieldDatum[];
};

export type ReceivedField = {
  name: ColumnId;
  label: string;
};

export type ReceivedFieldData = {
  groupName: string;
  isDatabase: boolean;
  fields: ReceivedField[];
}[];
