import { Column } from '../../shared/config/columns';

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

export enum ColumnSelectTab {
  data = 'data',
  links = 'links',
}

export type SelectedColumn = {
  tabId: ColumnSelectTab;
  accordionId: string;
  itemId: Column;
  label: string;
};

export type FieldDatum = {
  id: string;
  title: string;
  items: {
    id: Column;
    label: string;
    sortField?: string;
  }[];
};

export type FieldData = Partial<Record<ColumnSelectTab, FieldDatum[]>>;

export type ReceivedField = {
  name: Column;
  label: string;
  id: string;
  sortField?: string;
};

export type ReceivedFieldData = {
  groupName: string;
  isDatabaseGroup: boolean;
  id: string;
  fields: ReceivedField[];
}[];
