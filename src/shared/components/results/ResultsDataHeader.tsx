import { PageIntro } from 'franklin-sites';
import { FC, memo, useMemo, ReactNode } from 'react';

import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';

import infoMappings from '../../config/InfoMappings';
import { Namespace } from '../../types/namespaces';

const ResultsDataHeader: FC<{
  total?: number;
  selectedEntries: string[];
  titlePostfix: ReactNode;
  accessions?: string[];
}> = ({ total = 0, selectedEntries, titlePostfix, accessions }) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const { name, links, info } = useMemo(() => infoMappings[namespace], [
    namespace,
  ]);

  return (
    <>
      <PageIntro
        title={`${name}`}
        titlePostfix={titlePostfix}
        links={links}
        resultsCount={total}
      >
        {info}
      </PageIntro>
      <ResultsButtons
        total={total}
        selectedEntries={selectedEntries}
        accessions={accessions}
      />
    </>
  );
};

export default memo(ResultsDataHeader);
