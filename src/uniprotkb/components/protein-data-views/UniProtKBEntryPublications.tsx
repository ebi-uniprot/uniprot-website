import { FC } from 'react';
import { Loader, Message } from 'franklin-sites';

import useDataApi from '../../../shared/hooks/useDataApi';

import { getAPIQueryUrl } from '../../../shared/config/apiUrls';
import { CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';

import { MessageLevel } from '../../../messages/types/messagesTypes';
import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';
import { Namespace } from '../../../shared/types/namespaces';

import './styles/inline-publication.scss';

const UniProtKBEntryPublications: FC<{
  pubmedIds: string[];
}> = ({ pubmedIds }) => {
  const url = getAPIQueryUrl({
    namespace: Namespace.citations,
    query: pubmedIds.join(' OR '),
  });
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
      {results?.map((citationData) => (
        <div
          className="inline-publication"
          key={`${citationData.citation.title}-${citationData.citation.citationType}-${citationData.citation.journal}`}
        >
          <LiteratureCitation data={citationData} />
        </div>
      ))}
    </>
  );
};

export default UniProtKBEntryPublications;
