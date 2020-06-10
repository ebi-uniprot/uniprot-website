import React, { FC, useState, useEffect } from 'react';
import { uniq } from 'lodash-es';
import { Loader, Publication, DataList } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { LiteratureForProteinAPI } from '../../types/literatureTypes';

import { getUniProtPublicationsQueryUrl } from '../../config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import formatCitationData, {
  getCitationPubMedId,
} from '../../adapters/literatureConverter';

import getNextUrlFromResponse from '../../utils/queryUtils';
import { getParamsFromURL } from '../../utils/resultsUtils';

const EntryPublications: FC<
  {
    accession: string;
  } & RouteComponentProps
> = ({ accession, location }) => {
  const { search } = location;
  const { selectedFacets } = getParamsFromURL(search);
  const initialUrl = getUniProtPublicationsQueryUrl(accession, selectedFacets);

  const [url, setUrl] = useState(initialUrl);
  const [allResults, setAllResults] = useState<LiteratureForProteinAPI[]>([]);
  const [metaData, setMetaData] = useState<{
    total: number;
    nextUrl: string | undefined;
  }>({ total: 0, nextUrl: undefined });

  const { data, status, error, headers } = useDataApi<{
    results: LiteratureForProteinAPI[];
  }>(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setMetaData(() => ({
      total: headers['x-totalrecords'],
      nextUrl: getNextUrlFromResponse(headers.link),
    }));
  }, [data, headers]);

  useEffect(() => {
    if (url === initialUrl) {
      return;
    }
    setUrl(initialUrl);
    setAllResults([]);
    setMetaData({ total: 0, nextUrl: undefined });
  }, [initialUrl, url]);

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (allResults.length === 0) {
    return <Loader />;
  }

  const { total, nextUrl } = metaData;

  return (
    <section>
      <div style={{ height: '80vh' }}>
        <h2>Publications for {accession}</h2>
        {/* The height css will be removed after Franklin DataList is updated */}
        <DataList
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
            const {
              citation,
              referencePositions,
              referenceComments,
            } = reference;

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
                />
              )
            );
          }}
          onLoadMoreItems={() => nextUrl && setUrl(nextUrl)}
          loaderComponent={<Loader />}
          hasMoreData={total > allResults.length}
        />
      </div>
    </section>
  );
};

export default withRouter(EntryPublications);
