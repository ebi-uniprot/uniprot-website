import { ExpandableList, ExternalLink, Loader, Message } from 'franklin-sites';

import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';

import useDataApi from '../../../shared/hooks/useDataApi';

import { getAPIQueryUrl } from '../../../shared/config/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';

import { CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import { MessageLevel } from '../../../messages/types/messagesTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';

import './styles/inline-publication.scss';

const UniProtKBEntryPublications = ({ pubmedIds }: { pubmedIds: string[] }) => {
  const url = getAPIQueryUrl({
    namespace: Namespace.citations,
    query: Array.from(pubmedIds).sort().join(' OR '),
  });
  const { loading, data, status, error } =
    useDataApi<SearchResults<CitationsAPIModel>>(url);

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

  if (!results?.length) {
    return (
      <ExpandableList
        numberCollapsedItems={10}
        displayNumberOfHiddenItems
        descriptionString="PubMed/Europe PMC links"
      >
        {pubmedIds.map((pubmedId) => (
          <>
            <ExternalLink url={externalUrls.PubMed(pubmedId)}>
              PubMed
            </ExternalLink>
            {'| '}
            <ExternalLink url={externalUrls.EuropePMC(pubmedId)}>
              Europe PMC
            </ExternalLink>
          </>
        ))}
      </ExpandableList>
    );
  }

  return (
    <>
      {results.map((citationData) => (
        <LiteratureCitation
          key={`${citationData.citation.title}-${citationData.citation.citationType}-${citationData.citation.journal}`}
          data={citationData}
          className="inline-publication"
          headingLevel="h5"
        />
      ))}
    </>
  );
};

export default UniProtKBEntryPublications;
