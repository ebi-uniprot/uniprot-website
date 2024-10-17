import { PageIntro } from 'franklin-sites';
import { FC, memo, ReactNode } from 'react';

import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import { toolsResultsLocationToLabel } from '../../../app/config/urls';

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
