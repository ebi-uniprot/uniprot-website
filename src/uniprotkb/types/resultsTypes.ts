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

export type SelectedColumn = {
  id: Column;
  label: string;
};

export type FieldDatum = {
  id: string;
  label: string;
  items?: FieldDatum[];
  addAsterisk?: boolean;
};

export type FieldData = FieldDatum[];

export type ReceivedField = {
  name: Column;
  label: string;
  id: string;
  sortField?: string;
  isMultiValueCrossReference?: boolean;
};

export type ReceivedFieldData = {
  groupName: string;
  isDatabaseGroup: boolean;
  id: string;
  fields: ReceivedField[];
}[];
