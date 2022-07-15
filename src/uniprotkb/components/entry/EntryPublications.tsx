import { FC, useState, useEffect, useMemo, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, Loader, DataListWithLoader, InfoList } from 'franklin-sites';
import { Except, SetRequired, Simplify } from 'type-fest';
import { groupBy, capitalize } from 'lodash-es';

import ExternalLink from '../../../shared/components/ExternalLink';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';

import { addBlastLinksToFreeText } from '../../../shared/utils/utils';
import getNextURLFromHeaders from '../../../shared/utils/getNextURLFromHeaders';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';
import { getParamsFromURL } from '../../utils/resultsUtils';
import { processUrlTemplate } from '../protein-data-views/XRefView';

import { Location, LocationToPath } from '../../../app/config/urls';
import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';

import {
  CitationsAPIModel,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { Namespace } from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';

const PublicationReference: FC<{
  reference: Reference;
  accession: string;
}> = ({ reference, accession }) => {
  const {
    referencePositions,
    referenceComments,
    source,
    sourceCategories,
    communityAnnotation,
    annotation,
  } = reference;

  const databaseInfoMaps = useDatabaseInfoMaps();
  const url = useMemo(() => {
    if (!databaseInfoMaps) {
      return null;
    }
    const databaseInfo =
      source && databaseInfoMaps.databaseToDatabaseInfo[source.name];
    if (databaseInfo?.uriLink && source?.id) {
      return processUrlTemplate(databaseInfo.uriLink, { id: source.id });
    }
    if (source?.name === 'GeneRif') {
      return `https://www.ncbi.nlm.nih.gov/gene?Db=gene&Cmd=DetailsSearch&Term=${source.id}`;
    }
    return null;
  }, [databaseInfoMaps, source]);

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
              <ExternalLink url={url}>{source.name}</ExternalLink>
            </>
          ) : (
            source.name
          )}
          {source.name === 'ORCID' && (
            <>
              {' '}
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
          )}
        </>
      ),
    },
  ];
  return <InfoList infoData={infoListData} isCompact className="text-block" />;
};

const getIdKey = getIdKeyFor(Namespace.citations);

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
          {data.references.map((reference, index) => (
            <PublicationReference
              reference={reference}
              // No obvious key as there can be more than 1 for the same source
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              accession={accession}
            />
          ))}
        </LiteratureCitation>
      </Card>
    );

const hasReference = (
  data: CitationsAPIModel
): data is SetRequired<CitationsAPIModel, 'references'> =>
  Boolean(data.references?.length);

const EntryPublications: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();
  const [{ selectedFacets }] = getParamsFromURL(search);
  const initialUrl = getUniProtPublicationsQueryUrl({
    accession,
    selectedFacets,
  });

  const [url, setUrl] = useState(initialUrl);
  const [allResults, setAllResults] = useState<CitationsAPIModel[]>([]);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  usePrefetch(metaData.nextUrl);

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

export default EntryPublications;
