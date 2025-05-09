import { ExpandableList, Loader, Message } from 'franklin-sites';

import { MessageLevel } from '../../../messages/types/messagesTypes';
import ExternalLink from '../../../shared/components/ExternalLink';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import { CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';
import style from './styles/inline-publication.module.scss';

const UniProtKBEntryPublications = ({ pubmedIds }: { pubmedIds: string[] }) => {
  const url = apiUrls.search.search({
    namespace: Namespace.citations,
    query: Array.from(pubmedIds).sort().join(' OR '),
  });
  const { loading, data, status, error } =
    useDataApi<SearchResults<CitationsAPIModel>>(url);

  if (error) {
    return (
      <Message level={MessageLevel.FAILURE}>
        <small>
          {status}: {error.message}
        </small>
      </Message>
    );
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { results } = data;

  if (!results?.length) {
    return (
      <div className={style['fallback-publication']}>
        <ExpandableList
          numberCollapsedItems={10}
          displayNumberOfHiddenItems
          descriptionString="PubMed/Europe PMC links"
        >
          {pubmedIds.map((pubmedId) => (
            <span key={pubmedId}>
              <ExternalLink url={externalUrls.PubMed(pubmedId)}>
                PubMed
              </ExternalLink>
              {'| '}
              <ExternalLink url={externalUrls.EuropePMC(pubmedId)}>
                Europe PMC
              </ExternalLink>
            </span>
          ))}
        </ExpandableList>
      </div>
    );
  }

  return (
    <>
      {results.map((citationData) => (
        <LiteratureCitation
          key={`${citationData.citation.title}-${citationData.citation.citationType}-${citationData.citation.journal}`}
          data={citationData}
          className={style['inline-publication']}
          headingLevel="h5"
        />
      ))}
    </>
  );
};

export default UniProtKBEntryPublications;
