import { FC, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Card,
  Loader,
  DataListWithLoader,
  InfoList,
  ExternalLink,
} from 'franklin-sites';
import { SetRequired } from 'type-fest';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import LiteratureCitation from '../../../supporting-data/citations/components/LiteratureCitation';

import getNextURLFromHeaders from '../../../shared/utils/getNextURLFromHeaders';
import { getIdKeyFor } from '../../../shared/utils/getIdKeyForNamespace';
import { getParamsFromURL } from '../../utils/resultsUtils';
import { processUrlTemplate } from '../protein-data-views/XRefView';

import { getEntryPath } from '../../../app/config/urls';
import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';
import { getDatabaseInfoByName } from '../../config/database';

import {
  CitationsAPIModel,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { Namespace } from '../../../shared/types/namespaces';

const PublicationReference: FC<{ reference: Reference; accession: string }> = ({
  reference,
  accession,
}) => {
  const {
    referencePositions,
    referenceComments,
    source,
    sourceCategories,
  } = reference;

  const url = useMemo(() => {
    const databaseInfo = getDatabaseInfoByName(source.name);
    if (databaseInfo && source.id) {
      return processUrlTemplate(databaseInfo.uriLink, { id: source.id });
    }
    return null;
  }, [source]);

  const infoListData = [
    {
      title: 'Source',
      content: (
        <>
          <EntryTypeIcon entryType={source.name} />
          {url ? (
            <ExternalLink url={url}>{source.name}</ExternalLink>
          ) : (
            source.name
          )}
          {source.name === 'ORCID' && (
            <>
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
    {
      title: 'Cited for',
      content: referencePositions?.join(', '),
    },
    {
      title: 'Tissue',
      content: referenceComments?.map(({ value }) => value).join(', '),
    },
    {
      title: 'Categories',
      content: sourceCategories?.join(', '),
    },
  ];
  return <InfoList infoData={infoListData} isCompact className="text-block" />;
};

const getIdKey = getIdKeyFor(Namespace.citations);

const hasReference = (
  data: CitationsAPIModel
): data is SetRequired<CitationsAPIModel, 'references'> =>
  Boolean(data.references?.length);

const EntryPublications: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();
  const { selectedFacets } = getParamsFromURL(search);
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

  const { data, loading, status, error, headers } = useDataApi<{
    results: CitationsAPIModel[];
  }>(url);

  const resultsWithReferences = useMemo(() => allResults.filter(hasReference), [
    allResults,
  ]);

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
      total: +(headers?.['x-total-records'] || 0),
      nextUrl: getNextURLFromHeaders(headers),
    }));
  }, [data, headers]);

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
        dataRenderer={(data) => (
          <Card to={getEntryPath(Namespace.citations, getIdKey(data))}>
            <LiteratureCitation data={data} headingLevel="h3">
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
        )}
        onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
        loaderComponent={<Loader />}
        hasMoreData={total > allResults.length}
      />
    </section>
  );
};

export default EntryPublications;
