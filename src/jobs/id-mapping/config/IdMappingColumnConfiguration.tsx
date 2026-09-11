import { Link } from 'react-router-dom';

import { PRODUCTION_ORIGIN } from '../../../app/config/urls';
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

const isSameOrigin = (url: string) => {
  if (url === PRODUCTION_ORIGIN) {
    return true;
  }
  return (
    url.startsWith(`${PRODUCTION_ORIGIN}/`) ||
    url.startsWith(`${PRODUCTION_ORIGIN}?`)
  );
};

IdMappingColumnConfiguration.set(IDMappingColumn.to, {
  label: 'To',
  render: (row) => {
    const { url, to } = row as MappingTo & MappingFrom;
    if (url && isSameOrigin(url)) {
      return <Link to={url.slice(PRODUCTION_ORIGIN.length)}>{to}</Link>;
    }
    return <ExternalLink url={url || null}>{to}</ExternalLink>;
  },
});
