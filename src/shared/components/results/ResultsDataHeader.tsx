import { PageIntro } from 'franklin-sites';
import { FC, memo, ReactNode } from 'react';

import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';

import { Namespace, namespaceAndToolsLabels } from '../../types/namespaces';

const ResultsDataHeader: FC<{
  total?: number;
  loadedTotal: number;
  selectedEntries: string[];
  namespaceOverride?: Namespace;
  titlePostscript?: ReactNode;
  accessions?: string[];
  base?: string;
  disableCardToggle?: boolean; // Note: remove if we have card view for id mapping
}> = ({
  total = 0,
  loadedTotal,
  selectedEntries,
  namespaceOverride,
  titlePostscript,
  accessions,
  base,
  disableCardToggle = false,
}) => {
  const namespace = useNS(namespaceOverride) || Namespace.uniprotkb;

  return (
    <>
      <PageIntro
        title={namespaceAndToolsLabels[namespace]}
        titlePostscript={titlePostscript}
        resultsCount={total}
      />
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

export default memo(ResultsDataHeader);
