import { ReactNode } from 'react';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import { Button, LongNumber, Dropdown } from 'franklin-sites';
import { SetOptional } from 'type-fest';

import { pluralise } from '../utils/utils';
import { stringifyQuery } from '../utils/url';

import {
  allSupportingDataAndAAEntryLocations,
  LocationToPath,
  Location,
} from '../../app/config/urls';

import { Namespace } from '../types/namespaces';
import { Statistics } from '../types/apiModel';

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
          <LongNumber>{count}</LongNumber> UniProtKB{' '}
          {pluralise('entry', count, 'entries')}
        </>
      ),
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        search: stringifyQuery({ query: `(${fieldName}:${accession})` }),
      }),
    },
  ],
  [
    'reviewedProteinCount',
    {
      label: 'UniProtKB reviewed (Swiss-Prot)',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> reviewed UniProtKB{' '}
          {pluralise('entry', count, 'entries')}
        </>
      ),
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        search: stringifyQuery({
          query: `(${fieldName}:${accession}) AND (reviewed:true)`,
        }),
      }),
    },
  ],
  [
    'unreviewedProteinCount',
    {
      label: 'UniProtKB unreviewed (TrEMBL)',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> unreviewed UniProtKB{' '}
          {pluralise('entry', count, 'entries')}
        </>
      ),
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        search: stringifyQuery({
          query: `(${fieldName}:${accession}) AND (reviewed:false)`,
        }),
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
          <LongNumber>{count}</LongNumber> computationally mapped{' '}
          {pluralise('protein', count)}
        </>
      ),
      to: (_, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        // NOTE: only works for PubMed IDs
        search: stringifyQuery({
          query: `(computational_pubmed_id:${accession})`,
        }),
      }),
    },
  ],
  [
    'communityMappedProteinCount',
    {
      label: 'Community mapped proteins',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> community mapped{' '}
          {pluralise('protein', count)}
        </>
      ),
      to: (_, accession) => ({
        pathname: LocationToPath[Location.UniProtKBResults],
        // NOTE: only works for PubMed IDs
        search: stringifyQuery({ query: `(community_pubmed_id:${accession})` }),
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
          <LongNumber>{count}</LongNumber> {pluralise('proteome', count)}
        </>
      ),
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.ProteomesResults],
        search: stringifyQuery({ query: `(${fieldName}:${accession})` }),
      }),
    },
  ],
  [
    'referenceProteomeCount',
    {
      label: 'Reference proteomes',
      text: (count) => (
        <>
          <LongNumber>{count}</LongNumber> reference{' '}
          {pluralise('proteome', count)}
        </>
      ),
      to: (fieldName, accession) => ({
        pathname: LocationToPath[Location.ProteomesResults],
        search: stringifyQuery({
          query: `(${fieldName}:${accession}) AND (proteome_type:1)`,
        }),
      }),
    },
  ],
]);

const namespaceToUniProtKBFieldMap = new Map([
  // Supporting data
  [Namespace.citations, 'lit_citation_id'],
  // NOTE: This field doesn't use the ID but the Abbrev...
  [Namespace.database, 'database'],
  [Namespace.diseases, 'cc_disease'],
  [Namespace.keywords, 'keyword'],
  [Namespace.locations, 'cc_scl_term'],
  // NOTE: to get high-level nodes, currently only `taxonomy_id` works
  [Namespace.taxonomy, 'taxonomy_id'],
  // Annotations
  [Namespace.unirule, 'source'],
  [Namespace.arba, 'source'],
]);

type EnrichedStatistics = {
  key: keyof Statistics | 'proteinCount' | 'uniparcCount';
  count: number;
  label: ReactNode;
  text?: ReactNode;
  to: LinkProps['to'];
};

export type MapToConfig = EnrichedStatistics[];

const statFilter = (
  s: SetOptional<EnrichedStatistics, 'count'> | undefined
): s is EnrichedStatistics => Boolean(s?.count);

const enrichStatistics = (
  statistics: Partial<Statistics>,
  fieldName: string,
  accession: string
): MapToConfig => {
  const entries = statistics && Object.entries(statistics);

  // Prepend a compound value for UniProtKB reviewed + unreviewed
  if (statistics?.reviewedProteinCount || statistics?.unreviewedProteinCount) {
    entries?.unshift([
      'proteinCount',
      (statistics?.reviewedProteinCount || 0) +
        (statistics?.unreviewedProteinCount || 0),
    ]);
  }

  const mapped: Array<SetOptional<EnrichedStatistics, 'count'> | undefined> =
    entries.map(([key, value]) => {
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

type MapToDropdownBasic = {
  children: ReactNode;
  config: MapToConfig;
};

/**
 * Basic component, only in charge of rendering the markup, needs to come with a
 * config object already defined with links
 */
export const MapToDropdownBasic = ({
  children,
  config,
}: MapToDropdownBasic) => (
  <Dropdown
    // eslint-disable-next-line react/no-unstable-nested-components
    visibleElement={(onClick: () => unknown) => (
      <Button variant="tertiary" onClick={onClick}>
        {children}
      </Button>
    )}
  >
    <ul>
      {config.map(({ key, count, label, to }) =>
        count ? (
          <li key={key}>
            {/* eslint-disable-next-line uniprot-website/use-config-location */}
            <Link to={to}>
              {label} (<LongNumber>{count}</LongNumber>)
            </Link>
          </li>
        ) : undefined
      )}
    </ul>
  </Dropdown>
);

type MapToDropdownProps = {
  children?: ReactNode;
  statistics?: Partial<Statistics> | undefined;
  accession?: string;
  fieldNameOverride?: string;
};

/**
 * Advanced component, in charge of rendering the markup and also generating the
 * the config object containing the links
 */
export const MapToDropdown = ({
  statistics,
  accession,
  children = 'View proteins',
  fieldNameOverride,
}: MapToDropdownProps) => {
  const match = useRouteMatch<{ namespace: Namespace; accession: string }>(
    allSupportingDataAndAAEntryLocations
  );
  const { namespace, accession: accessionFromPath } = match?.params || {};
  const fieldName =
    fieldNameOverride ||
    (namespace && namespaceToUniProtKBFieldMap.get(namespace));

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
    <MapToDropdownBasic config={enrichedStatistics}>
      {children}
    </MapToDropdownBasic>
  );
};

export const mapToLinks = (
  namespace: Namespace,
  accession?: string,
  statistics?: Statistics,
  // TODO: remove as this is only needed for the depracated reviewed column in taxonomy. See https://www.ebi.ac.uk/panda/jira/browse/TRM-30869
  filter?: (x: EnrichedStatistics) => boolean
) => {
  const fieldName = namespaceToUniProtKBFieldMap.get(namespace);
  if (!(accession && statistics && fieldName)) {
    return [];
  }
  const enrichedStatistics = enrichStatistics(
    statistics,
    fieldName,
    accession
  ).filter((stat) => 'text' in stat);
  return (filter ? enrichedStatistics.filter(filter) : enrichedStatistics).map(
    (stat) => (
      // eslint-disable-next-line uniprot-website/use-config-location
      <Link to={stat.to} key={stat.key}>
        {stat.text}
      </Link>
    )
  );
};
