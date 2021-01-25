import { FC, useState, useEffect } from 'react';
import { uniq } from 'lodash-es';
import { useLocation } from 'react-router-dom';
import { Loader, Publication, DataListWithLoader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../shared/hooks/useDataApi';
import usePrefetch from '../../../shared/hooks/usePrefetch';

import formatCitationData, {
  getCitationPubMedId,
} from '../../adapters/literatureConverter';

import getNextUrlFromResponse from '../../../shared/utils/queryUtils';
import { getParamsFromURL } from '../../utils/resultsUtils';
import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';
import { Location, LocationToPath } from '../../../app/config/urls';

import { LiteratureForProteinAPI } from '../../types/literatureTypes';

const linkBuilder = (author: string) => ({
  pathname: LocationToPath[Location.UniProtKBResults],
  search: `query=lit_author:"${author}"`,
});

const EntryPublications: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();
  const { selectedFacets } = getParamsFromURL(search);
  const initialUrl = getUniProtPublicationsQueryUrl({
    accession,
    selectedFacets,
  });

  const [url, setUrl] = useState(initialUrl);
  const [allResults, setAllResults] = useState<LiteratureForProteinAPI[]>([]);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl?: string;
  }>(() => ({ total: 0, nextUrl: undefined }));
  usePrefetch(metaData.nextUrl);

  const { data, loading, status, error, headers } = useDataApi<{
    results: LiteratureForProteinAPI[];
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
      nextUrl: getNextUrlFromResponse(headers?.link),
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
        getIdKey={(item: LiteratureForProteinAPI) => {
          const {
            reference: { citation },
          } = item;
          const pubMedXref = getCitationPubMedId(citation);
          let id = pubMedXref?.id;
          if (!id) {
            id = citation.authors
              ? citation.authors?.join('')
              : citation.authoringGroup?.join('');
          }
          return id;
        }}
        data={allResults}
        dataRenderer={({
          reference,
          publicationSource,
          statistics,
          categories,
        }: LiteratureForProteinAPI) => {
          const { citation, referencePositions, referenceComments } = reference;

          const { pubmedId, journalInfo } = formatCitationData(citation);

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
              content: categories && (
                <ul className="no-bullet">
                  {uniq(categories).map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              ),
            },
            {
              title: 'Source',
              content: publicationSource,
            },
          ];
          return (
            reference && (
              <Publication
                {...citation}
                abstract={citation.literatureAbstract}
                infoData={infoListData}
                statistics={statistics}
                pubmedId={pubmedId}
                journalInfo={journalInfo}
                linkBuilder={linkBuilder}
              />
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
