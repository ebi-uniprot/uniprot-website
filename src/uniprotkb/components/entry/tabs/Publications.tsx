import { Card, DataListWithLoader, InfoList, Loader } from 'franklin-sites';
import { InfoListItem } from 'franklin-sites/dist/types/components/info-list';
import { capitalize, groupBy } from 'lodash-es';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Except, SetRequired, Simplify } from 'type-fest';

import { Location, LocationToPath } from '../../../../app/config/urls';
import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ExternalLink from '../../../../shared/components/ExternalLink';
import useDataApi from '../../../../shared/hooks/useDataApi';
// import usePrefetch from '../../../shared/hooks/usePrefetch';
import useDatabaseInfoMaps from '../../../../shared/hooks/useDatabaseInfoMaps';
import { Namespace } from '../../../../shared/types/namespaces';
import { SearchResults } from '../../../../shared/types/results';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import getNextURLFromHeaders from '../../../../shared/utils/getNextURLFromHeaders';
import {
  addBlastLinksToFreeText,
  pluralise,
} from '../../../../shared/utils/utils';
import { processUrlTemplate } from '../../../../shared/utils/xrefs';
import {
  CitationsAPIModel,
  Reference,
} from '../../../../supporting-data/citations/adapters/citationsConverter';
import LiteratureCitation from '../../../../supporting-data/citations/components/LiteratureCitation';
import apiUrls from '../../../config/apiUrls/apiUrls';
import { getParamsFromURL } from '../../../utils/resultsUtils';

type PublicationsReferenceProps = {
  references: Reference[];
  accession: string;
};

const PublicationReference = ({
  references,
  accession,
}: PublicationsReferenceProps) => {
  const databaseInfoMaps = useDatabaseInfoMaps();

  const infoListWithContent = references.map((reference) => {
    const {
      referencePositions,
      referenceComments,
      source,
      sourceCategories,
      communityAnnotation,
      annotation,
    } = reference;

    const databaseInfo =
      source && databaseInfoMaps?.databaseToDatabaseInfo[source.name];
    let url =
      source?.id &&
      processUrlTemplate(databaseInfo?.uriLink, {
        id: source.id,
        primaryAccession: source.id,
      });
    if (source?.name === 'GeneRif') {
      url = `https://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=DetailsSearch&Term=${source.id}`;
    }
    // if (source?.name === 'GAD') => don't inject a link
    // This DB is dead so we only display the accession, but no link to point to

    const groupedReferenceComments = groupBy(referenceComments, 'type');

    const infoListData = [
      {
        title: 'Cited for',
        content:
          referencePositions &&
          addBlastLinksToFreeText(referencePositions, accession).map(
            (item, i) => (
              // eslint-disable-next-line react/no-array-index-key
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
                // eslint-disable-next-line react/no-array-index-key
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
        title: pluralise(
          'Category',
          sourceCategories?.length ?? 0,
          'Categories'
        ),
        content: sourceCategories?.join(', '),
      },
      {
        title: 'Source',
        content: source && (
          <>
            <EntryTypeIcon entryType={source.name} />
            {url && source.name !== 'ORCID' ? (
              <>
                <EntryTypeIcon entryType="computationally mapped" />
                {source.name}
                {': '}
                <ExternalLink url={url}>{source.id}</ExternalLink>
              </>
            ) : (
              <span>
                {source.name}
                {source.name === 'ORCID' ? (
                  <>
                    {': '}
                    <ExternalLink
                      url={
                        source.id && source.id !== 'Anonymous'
                          ? processUrlTemplate(
                              databaseInfoMaps?.databaseToDatabaseInfo[
                                source.name
                              ]?.uriLink,
                              { id: source.id }
                            )
                          : null
                      }
                    >
                      {source.id}
                    </ExternalLink>
                    {' ('}
                    <ExternalLink
                      url={`//community.uniprot.org/bbsub/bbsubinfo.html?accession=${accession}`}
                    >
                      see community submission
                    </ExternalLink>
                    ).
                  </>
                ) : (
                  <>{source.id && `:${source.id}`}</>
                )}
              </span>
            )}
          </>
        ),
      },
    ];
    return infoListData;
  });

  // Merging all of them into one
  let mergedInfoList: InfoListItem[] = [];
  infoListWithContent.forEach((arr) => {
    if (mergedInfoList.length) {
      arr.forEach((obj, i) => {
        if (
          obj.title === mergedInfoList[i].title &&
          obj.content !== undefined &&
          mergedInfoList[i].content !== obj.content
        ) {
          mergedInfoList[i].content = (
            <>
              {mergedInfoList[i].content}
              {mergedInfoList[i].content && ', '}
              {obj.content}
            </>
          );
        }
      });
    } else {
      mergedInfoList = [...arr];
    }
  });

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
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: +(headers?.['x-total-results'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

  const cardRenderer = useMemo(() => cardRendererFor(accession), [accession]);

  if (error) {
    return <ErrorHandler status={status} error={error} />;
  }

  if (allResults.length === 0 && loading) {
    return <Loader />;
  }

  const { total, nextUrl } = metaData;

  return (
    <section>
      <h2>Publications for {accession}</h2>
      <DataListWithLoader
        getIdKey={getIdKey}
        data={resultsWithReferences}
        dataRenderer={cardRenderer}
        onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
        loaderComponent={<Loader />}
        hasMoreData={total > allResults.length}
      />
    </section>
  );
};

export default Publications;
