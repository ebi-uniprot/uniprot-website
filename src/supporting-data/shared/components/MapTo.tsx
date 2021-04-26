import { FC, ReactNode } from 'react';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import { DropdownButton, LongNumber } from 'franklin-sites';
import { SetOptional } from 'type-fest';

import {
  allSupportingDataEntryLocations,
  LocationToPath,
  Location,
} from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { Statistics } from '../../../shared/types/apiModel';

const configMap = new Map<
  keyof Statistics | 'proteinCount',
  {
    label: ReactNode;
    to: (fieldName: string, accession: string) => LinkProps['to'];
  }
>([
  // Add this first one, will be just the sum of the following 2
  [
    'proteinCount',
    {
      label: 'UniProtKB',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `query=(${fieldName}:${accession})`,
      }),
    },
  ],
  [
    'reviewedProteinCount',
    {
      label: 'UniProtKB reviewed (Swiss-Prot)',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `facets=reviewed:true&query=(${fieldName}:${accession})`,
      }),
    },
  ],
  [
    'unreviewedProteinCount',
    {
      label: 'UniProtKB unreviewed (TrEMBL)',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        search: `facets=reviewed:false&query=(${fieldName}:${accession})`,
      }),
    },
  ],
  // in citations
  [
    'computationallyMappedProteinCount',
    {
      label: 'Computationally mapped proteins',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        // TODO:
        search: `query=(${fieldName}:${accession})`,
      }),
    },
  ],
  [
    'communityMappedProteinCount',
    {
      label: 'Community mapped proteins',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        // TODO:
        search: `query=(${fieldName}:${accession})`,
      }),
    },
  ],
  // in taxonomy
  [
    'proteomeCount',
    {
      label: 'Proteomes',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.ProteomesResults],
        search: `query=(${fieldName}:${accession})`,
      }),
    },
  ],
  [
    'referenceProteomeCount',
    {
      label: 'Reference proteomes',
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.ProteomesResults],
        search: `facets=proteome_type:1&query=(${fieldName}:${accession})`,
      }),
    },
  ],
]);

export const supportingDataUniProtKBFieldMap = new Map([
  [Namespace.citations, 'lit_citation_id'],
  // NOTE: This field doesn't use the ID but the Abbrev...
  [Namespace.database, 'database'],
  [Namespace.diseases, 'cc_disease'],
  [Namespace.keywords, 'keyword'],
  [Namespace.locations, 'cc_scl_term'],
  // NOTE: to get high-level nodes, currently only `tax_id` works...
  [Namespace.taxonomy, 'taxonomy_id'],
]);

type EnrichedStatistics = {
  key: keyof Statistics | 'proteinCount';
  count: number;
  label: ReactNode;
  to: LinkProps['to'];
};

const statFilter = (
  s: SetOptional<EnrichedStatistics, 'count'> | undefined
): s is EnrichedStatistics => Boolean(s?.count);

const enrichStatistics = (
  statistics: Partial<Statistics>,
  fieldName: string,
  accession: string
): EnrichedStatistics[] => {
  const entries = statistics && Object.entries(statistics);

  // Prepend a compond value for UniProtKB reviewed + unreviewed
  if (statistics?.reviewedProteinCount || statistics?.unreviewedProteinCount) {
    entries?.unshift([
      'proteinCount',
      (statistics?.reviewedProteinCount || 0) +
        (statistics?.unreviewedProteinCount || 0),
    ]);
  }

  const mapped: Array<
    SetOptional<EnrichedStatistics, 'count'> | undefined
  > = entries.map(([key, value]) => {
    const config = configMap.get(key as keyof Statistics | 'proteinCount');
    if (!config) {
      return;
    }
    // eslint-disable-next-line consistent-return
    return {
      key: key as keyof Statistics | 'proteinCount',
      count: value,
      label: config.label,
      to: config.to(fieldName, accession),
    };
  });
  // filter out undefined and zero counts
  return mapped.filter(statFilter);
};

type Props = {
  statistics: Partial<Statistics> | undefined;
  accession?: string; // eslint-disable-line react/require-default-props
};

export const MapToDropdown: FC<Props> = ({
  statistics,
  accession,
  children = 'View proteins',
}) => {
  const match = useRouteMatch<{ namespace: Namespace; accession: string }>(
    allSupportingDataEntryLocations
  );
  const { namespace, accession: accessionFromPath } = match?.params || {};
  const fieldName = namespace && supportingDataUniProtKBFieldMap.get(namespace);

  if (!(statistics && namespace && accessionFromPath && fieldName)) {
    return null;
  }

  const enrichedStatistics = enrichStatistics(
    statistics,
    fieldName,
    accession || accessionFromPath
  );

  if (!enrichedStatistics.length) {
    return null;
  }

  return (
    <DropdownButton variant="tertiary" label={children}>
      <div className="dropdown-menu__content">
        <ul>
          {enrichedStatistics.map(({ key, count, label, to }) => (
            <li key={key}>
              {/* eslint-disable-next-line uniprot-website/use-config-location */}
              <Link to={to}>
                {label} (<LongNumber>{count}</LongNumber>)
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </DropdownButton>
  );
};

export const mapToLinks = (
  namespace: Namespace,
  accession: string,
  statistics: Statistics | undefined
): Array<{ name: string; link: LinkProps['to'] }> | undefined => {
  const fieldName = supportingDataUniProtKBFieldMap.get(namespace);
  if (!(statistics && fieldName)) {
    return;
  }
  const enrichedStatistics = enrichStatistics(statistics, fieldName, accession);
  // eslint-disable-next-line consistent-return
  return enrichedStatistics.map(({ count, label, to }) => ({
    name: `${label}: ${count}`,
    link: to,
  }));
};
