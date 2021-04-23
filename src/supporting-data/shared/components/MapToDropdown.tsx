import { ReactNode } from 'react';
import { Link, LinkProps, useRouteMatch } from 'react-router-dom';
import { DropdownButton, LongNumber } from 'franklin-sites';

import { allSupportingDataEntryLocations } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { Statistics } from '../../../shared/types/apiModel';

const configMap = new Map<
  keyof Statistics | 'proteinCount',
  {
    label: ReactNode;
    urlGetter?: (accession: string) => LinkProps['to'];
  }
>([
  // Add this first one, will be just the sum of the following 2
  ['proteinCount', { label: 'UniProtKB' }],
  [
    'reviewedProteinCount',
    {
      label: 'UniProtKB reviewed (Swiss-Prot)',
    },
  ],
  [
    'unreviewedProteinCount',
    {
      label: 'UniProtKB unreviewed (TrEMBL)',
    },
  ],
  // in citations
  [
    'computationallyMappedProteinCount',
    { label: 'Computationally mapped protein count' },
  ],
  ['communityMappedProteinCount', { label: 'Community mapped protein count' }],
  // in taxonomy
  ['proteomeCount', { label: 'Proteome count' }],
  [
    'referenceProteomeCount',
    {
      label: 'Reference proteome count',
    },
  ],
]);

const MapToDropdown = ({
  statistics,
}: {
  statistics: Statistics | undefined;
}) => {
  const match = useRouteMatch<{ namespace: Namespace; accession: string }>(
    allSupportingDataEntryLocations
  );
  const { namespace, accession } = match?.params || {};

  const entries = statistics && Object.entries(statistics);
  if (statistics?.reviewedProteinCount || statistics?.unreviewedProteinCount) {
    entries?.unshift([
      'proteinCount',
      (statistics?.reviewedProteinCount || 0) +
        (statistics?.unreviewedProteinCount || 0),
    ]);
  }

  if (!(namespace && accession && entries?.length)) {
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
                <Link to="/">
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
