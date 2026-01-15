import { Link } from 'react-router-dom';

import ExternalLink from '../../../shared/components/ExternalLink';
import { type ColumnConfiguration } from '../../../shared/types/columnConfiguration';
import From from '../components/results/FromColumn';
import {
  type MappingFlat,
  type MappingFrom,
  type MappingTo,
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

const origin = 'https://www.uniprot.org';

IdMappingColumnConfiguration.set(IDMappingColumn.to, {
  label: 'To',
  render: (row) => {
    const { url, to } = row as MappingTo & MappingFrom;
    if (url?.startsWith(origin)) {
      return <Link to={url.replace(origin, '')}>{to}</Link>;
    }
    return <ExternalLink url={url || null}>{to}</ExternalLink>;
  },
});
