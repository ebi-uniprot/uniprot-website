import { PageIntro } from 'franklin-sites';
import { FC, memo, useMemo, ReactNode } from 'react';

import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';

import namespaceToolTitles from '../../config/namespaceToolTitles';
import { Namespace } from '../../types/namespaces';

const ResultsDataHeader: FC<{
  total?: number;
  selectedEntries: string[];
  namespaceFallback?: Namespace;
  titlePostscript?: ReactNode;
  accessions?: string[];
}> = ({
  total = 0,
  selectedEntries,
  namespaceFallback,
  titlePostscript,
  accessions,
}) => {
  const namespace = useNS() || namespaceFallback || Namespace.uniprotkb;
  const title = useMemo(() => namespaceToolTitles[namespace], [namespace]);

  return (
    <>
      <PageIntro
        title={title}
        titlePostscript={titlePostscript}
        resultsCount={total}
      />
      <ResultsButtons
        total={total}
        selectedEntries={selectedEntries}
        accessions={accessions}
      />
    </>
  );
};

export default memo(ResultsDataHeader);
