import { FC } from 'react';
import { Loader, Message } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import { getPublicationsURL } from '../../../shared/config/apiUrls';
import {
  CitationsAPIModel,
  formatCitationData,
} from '../../../supporting-data/citations/adapters/citationsConverter';

import { MessageLevel } from '../../../messages/types/messagesTypes';
import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';

const UniProtKBEntryPublications: FC<{
  pubmedIds: string[];
}> = ({ pubmedIds }) => {
  const url = getPublicationsURL(pubmedIds);
  const { loading, data, status, error } = useDataApi<{
    results: CitationsAPIModel[];
  }>(url);

  if (error) {
    return (
      <Message level={MessageLevel.FAILURE}>
        {status}: {error.message}
      </Message>
    );
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { results } = data;
  return (
    <>
      {results &&
        results
          .map((literatureItem) => ({
            ...literatureItem,
            ...formatCitationData(literatureItem.citation),
          }))
          .map(({ citation, statistics, pubmedId, journalInfo }) => (
            <LiteratureCitation
              title={citation.title}
              authors={citation.authors}
              key={`${citation.title}-${citation.citationType}-${citation.journal}`}
              pubmedId={pubmedId}
              statistics={statistics}
              journalInfo={journalInfo}
            />
          ))}
    </>
  );
};

export default UniProtKBEntryPublications;
