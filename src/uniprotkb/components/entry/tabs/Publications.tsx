import { useState, useEffect, useMemo, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Loader, DataListWithLoader, InfoList } from 'franklin-sites';
import { Except, SetRequired, Simplify } from 'type-fest';
import { groupBy, capitalize } from 'lodash-es';
import { InfoListItem } from 'franklin-sites/dist/types/components/info-list';

import ExternalLink from '../../../../shared/components/ExternalLink';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';
// import usePrefetch from '../../../shared/hooks/usePrefetch';
import useDatabaseInfoMaps from '../../../../shared/hooks/useDatabaseInfoMaps';

import EntryTypeIcon from '../../../../shared/components/entry/EntryTypeIcon';
import LiteratureCitation from '../../../../supporting-data/citations/components/LiteratureCitation';

import { addBlastLinksToFreeText } from '../../../../shared/utils/utils';
import getNextURLFromHeaders from '../../../../shared/utils/getNextURLFromHeaders';
import { getIdKeyForNamespace } from '../../../../shared/utils/getIdKey';
import { getParamsFromURL } from '../../../utils/resultsUtils';
import { processUrlTemplate } from '../../../../shared/utils/xrefs';

import { Location, LocationToPath } from '../../../../app/config/urls';

import {
  CitationsAPIModel,
  Reference,
} from '../../../../supporting-data/citations/adapters/citationsConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import { SearchResults } from '../../../../shared/types/results';
import apiUrls from '../../../config/apiUrls/apiUrls';

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
      processUrlTemplate(databaseInfo?.uriLink, { id: source.id });
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
        title: 'Categories',
        content: sourceCategories?.join(', '),
      },
      {
        title: 'Source',
        content: source && (
          <>
            <EntryTypeIcon entryType={source.name} />
            {url ? (
              <>
                <EntryTypeIcon entryType="computationally mapped" />
                {source.name}:<ExternalLink url={url}>{source.id}</ExternalLink>
              </>
            ) : (
              <span>
                {source.name}
                {source.name === 'ORCID' && source.id ? (
                  <>
                    {': '}
                    <ExternalLink url={`https://orcid.org/${source.id}`}>
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
  ) =>
    (
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
    return <ErrorHandler status={status} />;
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
