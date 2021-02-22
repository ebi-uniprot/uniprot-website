import { FC, useState, useEffect } from 'react';
import { uniq } from 'lodash-es';
import { useLocation } from 'react-router-dom';
import {
  Loader,
  Publication,
  DataListWithLoader,
  InfoList,
} from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';

import formatCitationData, {
  getCitationPubMedId,
} from '../../adapters/literatureConverter';

import getNextURLFromHeaders from '../../../shared/utils/getNextURLFromHeaders';
import { getParamsFromURL } from '../../utils/resultsUtils';
import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';
import { Location, LocationToPath } from '../../../app/config/urls';

import { LiteratureResultsAPI, Reference } from '../../types/literatureTypes';

const linkBuilder = (author: string) => ({
  pathname: LocationToPath[Location.UniProtKBResults],
  search: `query=lit_author:"${author}"`,
});

const PublicationReference: FC<{ reference: Reference }> = ({ reference }) => {
  const {
    referencePositions,
    referenceComments,
    source,
    sourceCategories,
  } = reference;

  const infoListData = [
    {
      title: 'Cited for',
      content: referencePositions,
    },
    {
      title: 'Tissue',
      content: referenceComments && (
        <ul className="no-bullet">
          {referenceComments.map((comment) => (
            <li key={comment.value}>{comment.value}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Categories',
      content: sourceCategories && (
        <ul className="no-bullet">
          {uniq(sourceCategories).map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Source',
      content: source.name,
    },
  ];
  return <InfoList infoData={infoListData} isCompact />;
};

const EntryPublications: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();
  const { selectedFacets } = getParamsFromURL(search);
  const initialUrl = getUniProtPublicationsQueryUrl({
    accession,
    selectedFacets,
  });

  const [url, setUrl] = useState(initialUrl);
  const [allResults, setAllResults] = useState<LiteratureResultsAPI[]>([]);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  usePrefetch(metaData.nextUrl);

  const { data, loading, status, error, headers } = useDataApi<{
    results: LiteratureResultsAPI[];
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
      <DataListWithLoader<LiteratureResultsAPI>
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
        dataRenderer={({ references, statistics, citation }) => {
          const { pubmedId, journalInfo } = formatCitationData(citation);

          return (
            references.length > 0 && (
              <Publication
                {...citation}
                abstract={citation.literatureAbstract}
                statistics={statistics}
                pubmedId={pubmedId}
                journalInfo={journalInfo}
                linkBuilder={linkBuilder}
              >
                {references.map((reference) => (
                  <PublicationReference
                    reference={reference}
                    key={reference.referenceNumber}
                  />
                ))}
              </Publication>
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
