import { FC } from 'react';
import { Publication, Loader, Message } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import { getPublicationsURL } from '../../../shared/config/apiUrls';

import formatCitationData from '../../adapters/literatureConverter';

import { MessageLevel } from '../../../messages/types/messagesTypes';
import { LiteratureResultsAPI } from '../../types/literatureTypes';
import { Location, LocationToPath } from '../../../app/config/urls';

const linkBuilder = (author: string) => ({
  pathname: LocationToPath[Location.UniProtKBResults],
  search: `query=lit_author:"${author}"`,
});

const UniProtKBEntryPublications: FC<{
  pubmedIds: string[];
}> = ({ pubmedIds }) => {
  const url = getPublicationsURL(pubmedIds);
  const { loading, data, status, error } = useDataApi<{
    results: LiteratureResultsAPI[];
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
            <Publication
              title={citation.title}
              authors={citation.authors}
              key={`${citation.title}-${citation.citationType}-${citation.journal}`}
              pubmedId={pubmedId}
              statistics={statistics}
              journalInfo={journalInfo}
              linkBuilder={linkBuilder}
            />
          ))}
    </>
  );
};

export default UniProtKBEntryPublications;
