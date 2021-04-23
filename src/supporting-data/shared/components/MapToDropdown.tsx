import { ReactNode } from 'react';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import { DropdownButton, LongNumber } from 'franklin-sites';

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
  [Namespace.taxonomy, 'taxonomy_id'],
]);

type Props = {
  statistics: Statistics | undefined;
  accession?: string; // eslint-disable-line react/require-default-props
};

const MapToDropdown = ({ statistics, accession }: Props) => {
  const match = useRouteMatch<{ namespace: Namespace; accession: string }>(
    allSupportingDataEntryLocations
  );
  const { namespace, accession: accessionFromPath } = match?.params || {};
  const fieldName = namespace && supportingDataUniProtKBFieldMap.get(namespace);

  const entries = statistics && Object.entries(statistics);
  if (statistics?.reviewedProteinCount || statistics?.unreviewedProteinCount) {
    entries?.unshift([
      'proteinCount',
      (statistics?.reviewedProteinCount || 0) +
        (statistics?.unreviewedProteinCount || 0),
    ]);
  }

  if (!(namespace && accessionFromPath && fieldName && entries?.length)) {
    return null;
  }

  return (
    <DropdownButton variant="tertiary" label="Map to">
      <div className="dropdown-menu__content">
        <ul>
          {entries.map(([key, count]) => {
            const config = configMap.get(
              key as keyof Statistics | 'proteinCount'
            );
            if (!(count && config)) {
              return null;
            }
            return (
              <li key={key}>
                <Link to={config.to(fieldName, accession || accessionFromPath)}>
                  {config.label} (<LongNumber>{count}</LongNumber>)
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </DropdownButton>
  );
};

export default MapToDropdown;
