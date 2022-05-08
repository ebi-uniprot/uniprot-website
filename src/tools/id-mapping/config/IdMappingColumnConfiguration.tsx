import ExternalLink from '../../../shared/components/ExternalLink';

import From from '../components/results/FromColumn';

import { ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import {
  MappingFlat,
  MappingTo,
  MappingFrom,
} from '../types/idMappingSearchResults';

export enum IDMappingColumn {
  from = 'from',
  to = 'to',
}

export const defaultColumns = [IDMappingColumn.from, IDMappingColumn.to];

export const primaryKeyColumns = [IDMappingColumn.from, IDMappingColumn.to];

export const IdMappingColumnConfiguration: ColumnConfiguration<
  IDMappingColumn,
  Partial<MappingFlat>
> = new Map();

export const fromColumnConfig = {
  label: 'From',
  render: ({ from }: Partial<MappingFlat>) => <From from={from} />,
};

IdMappingColumnConfiguration.set(IDMappingColumn.from, fromColumnConfig);

IdMappingColumnConfiguration.set(IDMappingColumn.to, {
  label: 'To',
  render: (row) => {
    const { url, to } = row as MappingTo & MappingFrom;
    return url ? <ExternalLink url={url}>{to}</ExternalLink> : to;
  },
});
