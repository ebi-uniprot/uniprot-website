import { FC, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Loader,
  DataListWithLoader,
  InfoList,
  ExternalLink,
} from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';

import getNextURLFromHeaders from '../../../shared/utils/getNextURLFromHeaders';
import { getParamsFromURL } from '../../utils/resultsUtils';
import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';

import EntryTypeIcon from '../../../shared/components/entry/EntryTypeIcon';
import { getDatabaseInfoByName } from '../../config/database';
import { processUrlTemplate } from '../protein-data-views/XRefView';
import {
  CitationsAPIModel,
  getCitationPubMedId,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import CitationCard from '../../../supporting-data/citations/components/results/CitationCard';

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
      total: +(headers?.['x-totalrecords'] || 0),
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
      <DataListWithLoader<CitationsAPIModel>
        getIdKey={(item, index) => {
          const { citation } = item;
          const pubMedXref = getCitationPubMedId(citation);
          let id = pubMedXref?.id;
          if (!id) {
            id = citation.authors
              ? citation.authors?.join('')
              : citation.authoringGroup?.join('');
          }
          return id || `${index}`;
        }}
        data={allResults}
        dataRenderer={(data) => {
          const { references } = data;
          return (
            references &&
            references.length > 0 && (
              <CitationCard data={data}>
                {references.map((reference, index) => (
                  // No obvious key as there can be more than 1 for the same source
                  <PublicationReference
                    reference={reference}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    accession={accession}
                  />
                ))}
              </CitationCard>
            )
          );
        }}
        onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
        loaderComponent={<Loader />}
        hasMoreData={total > allResults.length}
      />
    </section>
  );
};

export default EntryPublications;
