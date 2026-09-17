import { Card, DataListWithLoader, InfoList, Loader } from 'franklin-sites';
import { type InfoListItem } from 'franklin-sites/dist/types/components/info-list';
import { capitalize, groupBy } from 'lodash-es';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { type Except, type SetRequired, type Simplify } from 'type-fest';

import { Location, LocationToPath } from '../../../../app/config/urls';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ExternalLink from '../../../../shared/components/ExternalLink';
import externalUrls from '../../../../shared/config/externalUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
// import usePrefetch from '../../../shared/hooks/usePrefetch';
import useDatabaseInfoMaps from '../../../../shared/hooks/useDatabaseInfoMaps';
import { Namespace } from '../../../../shared/types/namespaces';
import { type SearchResults } from '../../../../shared/types/results';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import getNextURLFromHeaders from '../../../../shared/utils/getNextURLFromHeaders';
import {
  addBlastLinksToFreeText,
  pluralise,
} from '../../../../shared/utils/utils';
import { processUrlTemplate } from '../../../../shared/utils/xrefs';
import {
  type Citation,
  type CitationsAPIModel,
  type Reference,
  type Source,
} from '../../../../supporting-data/citations/adapters/citationsConverter';
import LiteratureCitation from '../../../../supporting-data/citations/components/LiteratureCitation';
import apiUrls from '../../../config/apiUrls/apiUrls';
import WithheldByRequest, {
  isCommunityCuratedFacet,
  isWithheldSubmitter,
} from '../../../utils/CommunitySubmission';
import { getParamsFromURL } from '../../../utils/resultsUtils';
import CommunityPublicationsMessage from '../CommunityPublicationsMessage';

const orcidIDRegExp = /(\d{4}-){3}\d{4}/;

type PublicationSourceProps = {
  accession: string;
  source: Source;
  citationId?: Citation['id'];
};

export const PublicationSource = ({
  accession,
  source,
  citationId,
}: PublicationSourceProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();

  if (source.name.includes('UniProtKB')) {
    return (
      <>
        <EntryTypeIcon entryType={source.name} />
        {source.name}
      </>
    );
  }

  let uriLink =
    source && databaseInfoMaps?.databaseToDatabaseInfo[source.name]?.uriLink;

  if (source.name === 'ORCID') {
    return (
      <>
        <EntryTypeIcon entryType={source.name} />
        {source.name}:{' '}
        {isWithheldSubmitter(source.id) ? (
          <WithheldByRequest />
        ) : (
          <ExternalLink
            url={
              source.id && orcidIDRegExp.test(source.id)
                ? processUrlTemplate(uriLink, { id: source.id })
                : null
            }
          >
            {source.id}
          </ExternalLink>
        )}
        {' ('}
        <ExternalLink
          url={externalUrls.CommunityCuratedGetByAccession(
            accession,
            citationId
          )}
        >
          see community submission
        </ExternalLink>
        ).
      </>
    );
  }

  /* URI link exceptions: */
  if (source.name === 'GeneRif') {
    // 'GeneRif' is indexed as 'GeneRIF' in the configuration endpoint
    uriLink = databaseInfoMaps?.databaseToDatabaseInfo.GeneRIF?.uriLink;
  } else if (source.name === 'MGI') {
    // 'MGI' ID is missing the initial "MGI:"
    uriLink = uriLink?.replace('%id', 'MGI:%id');
  } else if (source.name === 'IEDB') {
    // 'IEDB' is not in the configuration endpoint
    uriLink = 'https://iedb.org/antigen/UNIPROT:%id';
  } else if (source.name === 'IMPC') {
    // 'IMPC' is not in the configuration endpoint
    uriLink = 'https://www.mousephenotype.org/data/genes/%id';
  }
  /* Some DBs are dead and not in the configuration endpoint (eg GAD) and so we
  only display the accession but not the link. No need to handle them here */

  const url =
    (source?.id &&
      processUrlTemplate(uriLink, {
        id: source.id,
        primaryAccession: source.id,
      })) ||
    null;

  return (
    <>
      <EntryTypeIcon entryType="computationally mapped" />
      {source.name}
      {': '}
      <ExternalLink url={url}>{source.id}</ExternalLink>
    </>
  );
};

type PublicationsReferenceProps = {
  references: Reference[];
  accession: string;
};

export const PublicationReference = ({
  references,
  accession,
}: PublicationsReferenceProps) => {
  /* The categories of every reference end up merged into a single row below,
  so pluralise its title on what that row will hold rather than on any one
  reference: a title that changes from one reference to the next would be two
  rows counting the same thing. */
  const totalCategories = references.reduce(
    (total, { sourceCategories }) => total + (sourceCategories?.length ?? 0),
    0
  );

  const infoListWithContent = references.map((reference) => {
    const {
      referencePositions,
      referenceComments,
      source,
      sourceCategories,
      communityAnnotation,
      annotation,
      citationId,
    } = reference;

    const groupedReferenceComments = groupBy(referenceComments, 'type');

    const infoListData = [
      {
        title: 'Cited for',
        content:
          referencePositions &&
          addBlastLinksToFreeText(referencePositions, accession).map(
            (item, i) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key
              <Fragment key={i}>
                {i > 0 && ', '}
                {item}
              </Fragment>
            )
          ),
      },
      ...Object.entries(groupedReferenceComments).map(([type, comments]) => {
        // Capitalise title
        const title = capitalize(type);
        return {
          title,
          content: (
            <>
              {comments.map((comment, i) => (
                // eslint-disable-next-line @eslint-react/no-array-index-key
                <Fragment key={i}>
                  {i > 0 && ', '}
                  {type === 'STRAIN' ? (
                    <Link
                      to={{
                        pathname: LocationToPath[Location.UniProtKBResults],
                        search: `query=strain:"${comment.value}"`,
                      }}
                    >
                      {comment.value}
                    </Link>
                  ) : (
                    comment.value
                  )}
                </Fragment>
              ))}
            </>
          ),
        };
      }),
      {
        title: 'Annotation',
        // both mutually exclusive
        content: annotation || communityAnnotation?.comment,
      },
      {
        title: 'Function',
        content: communityAnnotation?.function,
      },
      {
        title: 'Disease',
        content: communityAnnotation?.disease,
      },
      {
        title: pluralise('Category', totalCategories, 'Categories'),
        content: sourceCategories?.join(', '),
      },
      {
        title: 'Source',
        content: source && (
          <PublicationSource
            accession={accession}
            source={source}
            citationId={citationId}
          />
        ),
      },
    ];
    return infoListData;
  });

  /* Merging all of them into one, matching rows by title rather than by
  position: the comment groups spliced in above vary from one reference to the
  next, so the same title doesn't sit at the same index in every list. A row a
  later reference is alone in having — the community submission link on the
  source of an ORCID reference, say — is appended rather than dropped. */
  const mergedInfoList: InfoListItem[] = [];
  const mergedByTitle = new Map<string, InfoListItem>();
  for (const infoListData of infoListWithContent) {
    for (const { title, content } of infoListData) {
      const merged = mergedByTitle.get(title);
      if (!merged) {
        const item: InfoListItem = { title, content };
        mergedByTitle.set(title, item);
        mergedInfoList.push(item);
      } else if (content !== undefined && merged.content !== content) {
        merged.content = (
          <>
            {merged.content}
            {merged.content && ', '}
            {content}
          </>
        );
      }
    }
  }

  return (
    <InfoList infoData={mergedInfoList} isCompact className="text-block" />
  );
};

const getIdKey = getIdKeyForNamespace(Namespace.citations);

const cardRendererFor =
  (accession: string) =>
  (
    data: Simplify<
      Except<CitationsAPIModel, 'references'> &
        Required<Pick<CitationsAPIModel, 'references'>>
    >
  ) => (
    <Card>
      <LiteratureCitation data={data} headingLevel="h3" linkToEntry>
        <PublicationReference
          references={data.references}
          accession={accession}
        />
      </LiteratureCitation>
    </Card>
  );

const hasReference = (
  data: CitationsAPIModel
): data is SetRequired<CitationsAPIModel, 'references'> =>
  Boolean(data.references?.length);

type PublicationsProps = { accession: string };

const Publications = ({ accession }: PublicationsProps) => {
  const { search } = useLocation();
  const [{ selectedFacets }] = getParamsFromURL(search);
  const initialUrl = apiUrls.publications.entryPublications({
    accession,
    selectedFacets,
  });

  const [url, setUrl] = useState(initialUrl);
  const [allResults, setAllResults] = useState<CitationsAPIModel[]>([]);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  // usePrefetch(metaData.nextUrl);

  const { data, loading, status, error, headers } =
    useDataApi<SearchResults<CitationsAPIModel>>(url);

  const resultsWithReferences = useMemo(
    () => allResults.filter(hasReference),
    [allResults]
  );

  useEffect(() => {
    /* eslint-disable @eslint-react/set-state-in-effect -- resets the accumulated pages when the query changes; cannot be derived during render */
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
    setUrl(initialUrl);
    /* eslint-enable @eslint-react/set-state-in-effect */
  }, [initialUrl]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    /* eslint-disable @eslint-react/set-state-in-effect -- accumulates each fetched page into state as the request resolves */
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: +(headers?.['x-total-results'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
    /* eslint-enable @eslint-react/set-state-in-effect */
  }, [data, headers]);

  const cardRenderer = useMemo(() => cardRendererFor(accession), [accession]);

  if (error) {
    return <ErrorHandler status={status} error={error} />;
  }

  const { total, nextUrl } = metaData;

  /* Only the results are replaced by the loader, rather than the whole section,
  so that the heading and the community message stay put while a facet change
  reloads the results, rather than flashing out and back in around it. */
  const loadingFirstPage = allResults.length === 0 && loading;

  return (
    <section>
      <h2 data-article-id="publications_section">
        {pluralise('Publication', total)} for {accession}
      </h2>
      {selectedFacets.some(isCommunityCuratedFacet) && (
        <CommunityPublicationsMessage accession={accession} />
      )}
      {loadingFirstPage ? (
        <Loader />
      ) : (
        <DataListWithLoader
          getIdKey={getIdKey}
          data={resultsWithReferences}
          dataRenderer={cardRenderer}
          onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
          loaderComponent={<Loader />}
          hasMoreData={total > allResults.length}
        />
      )}
    </section>
  );
};

export default Publications;
