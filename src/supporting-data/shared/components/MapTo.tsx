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
    text: (count: number) => ReactNode;
    to: (fieldName: string, accession: string) => LinkProps['to'];
  }
>([
  // Add this first one, will be just the sum of the following 2
  [
    'proteinCount',
    {
      label: 'UniProtKB',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> UniProtKB entr
          {count === 1 ? 'y' : 'ies'}
        </>
      ),
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
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> reviewed UniProtKB entr
          {count === 1 ? 'y' : 'ies'}
        </>
      ),
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
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> unreviewed UniProtKB entr
          {count === 1 ? 'y' : 'ies'}
        </>
      ),
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
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> computationally mapped protein
          {count === 1 ? '' : 's'}
        </>
      ),
      to: (_, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        // NOTE: only works for PubMed IDs
        search: `query=(computational_pubmed_id:${accession})`,
      }),
    },
  ],
  [
    'communityMappedProteinCount',
    {
      label: 'Community mapped proteins',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> community mapped protein
          {count === 1 ? '' : 's'}
        </>
      ),
      to: (_, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        // NOTE: only works for PubMed IDs
        search: `query=(community_pubmed_id:${accession})`,
      }),
    },
  ],
  // in taxonomy
  [
    'proteomeCount',
    {
      label: 'Proteomes',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> proteome{count === 1 ? '' : 's'}
        </>
      ),
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
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> reference proteome
          {count === 1 ? '' : 's'}
        </>
      ),
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
  text: ReactNode;
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
      text: config.text(value || 0),
      to: config.to(fieldName, accession),
    };
  });
  // filter out undefined and zero counts
  return mapped.filter(statFilter);
};

type Props = {
  statistics: Partial<Statistics> | undefined;
  accession?: string;
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
):
  | Array<{ name: ReactNode; link: LinkProps['to']; key: string }>
  | undefined => {
  const fieldName = supportingDataUniProtKBFieldMap.get(namespace);
  if (!(statistics && fieldName)) {
    return;
  }
  const enrichedStatistics = enrichStatistics(statistics, fieldName, accession);
  // eslint-disable-next-line consistent-return
  return enrichedStatistics.map(({ text, to, key }) => ({
    name: text,
    link: to,
    key,
  }));
};
