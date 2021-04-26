import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import { MappingAPIModel } from '../types/idMappingSearchResults';

export enum IDMappingColumn {
  from = 'from',
  to = 'to',
}

export const defaultColumns = [IDMappingColumn.from, IDMappingColumn.to];

export const primaryKeyColumn = IDMappingColumn.from;

export const IdMappingColumnConfiguration: ColumnConfiguration<
  IDMappingColumn,
  Partial<MappingAPIModel>
> = new Map();

export const fromColumnConfig = {
  label: 'From',
  render: ({ from }: Partial<MappingAPIModel>) => from,
};

IdMappingColumnConfiguration.set(IDMappingColumn.from, fromColumnConfig);

IdMappingColumnConfiguration.set(IDMappingColumn.to, {
  label: 'To',
  render: (row) => row.to as string, // Add Links when new details endpoint exists
});
