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
  type CitationsAPIModel,
  type Reference,
  type Source,
} from '../../../../supporting-data/citations/adapters/citationsConverter';
import LiteratureCitation from '../../../../supporting-data/citations/components/LiteratureCitation';
import apiUrls from '../../../config/apiUrls/apiUrls';
import { getParamsFromURL } from '../../../utils/resultsUtils';

const orcidIDRegExp = /(\d{4}-){3}\d{4}/;

type PublicationSourceProps = {
  accession: string;
  source: Source;
};

export const PublicationSource = ({
  accession,
  source,
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
        <ExternalLink
          url={
            source.id && orcidIDRegExp.test(source.id)
              ? processUrlTemplate(uriLink, { id: source.id })
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
  const infoListWithContent = references.map((reference) => {
    const {
      referencePositions,
      referenceComments,
      source,
      sourceCategories,
      communityAnnotation,
      annotation,
    } = reference;

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
          <PublicationSource accession={accession} source={source} />
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
