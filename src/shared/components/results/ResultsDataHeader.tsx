import { Message, PageIntro } from 'franklin-sites';
import { FC, memo, ReactNode } from 'react';
import { generatePath, Link } from 'react-router-dom';

import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import {
  Location,
  LocationToPath,
  toolsResultsLocationToLabel,
} from '../../../app/config/urls';

import { Namespace, namespaceAndToolsLabels } from '../../types/namespaces';

const ResultsDataHeader: FC<
  React.PropsWithChildren<{
    total?: number;
    loadedTotal: number;
    selectedEntries: string[];
    namespaceOverride?: Namespace;
    headingPostscript?: ReactNode;
    accessions?: string[];
    base?: string;
    disableCardToggle?: boolean; // Note: remove if we have card view for id mapping
  }>
> = ({
  total = 0,
  loadedTotal,
  selectedEntries,
  namespaceOverride,
  headingPostscript,
  accessions,
  base,
  disableCardToggle = false,
  children,
}) => {
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;
  const { jobResultsLocation } = useJobFromUrl();
  return (
    <>
      <PageIntro
        heading={
          jobResultsLocation
            ? toolsResultsLocationToLabel?.[jobResultsLocation]
            : namespaceAndToolsLabels[namespace]
        }
        headingPostscript={headingPostscript}
        resultsCount={total}
      >
        {children}
      </PageIntro>
      {/* Keep the message until 2025_02 data release */}
      {namespace === Namespace.uniparc ? (
        <Message level="info">
          A few changes have recently been made to UniParc. Please refer to{' '}
          <Link
            to={{
              pathname: generatePath(
                LocationToPath[Location.ReleaseNotesEntry],
                {
                  accession: '2024-11-27-release',
                }
              ),
              hash: 'changes-in-uniprot-website-rest-api-for-uniparc',
            }}
          >
            release 2024_06 notes
          </Link>{' '}
          for more information.
        </Message>
      ) : null}
      <ResultsButtons
        total={total}
        loadedTotal={loadedTotal}
        selectedEntries={selectedEntries}
        accessions={accessions}
        namespaceOverride={namespace}
        disableCardToggle={disableCardToggle}
        base={base}
      />
    </>
  );
};

export default memo<typeof ResultsDataHeader>(ResultsDataHeader);
