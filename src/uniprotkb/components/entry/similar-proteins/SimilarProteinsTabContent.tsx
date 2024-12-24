import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from 'franklin-sites';
import { zip } from 'lodash-es';

import SimilarProteinsTable, { columns } from './SimilarProteinsTable';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import fetchData from '../../../../shared/utils/fetchData';
import listFormat from '../../../../shared/utils/listFormat';
import { pluralise } from '../../../../shared/utils/utils';

import { Location, LocationToPath } from '../../../../app/config/urls';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { IsoformsAndCluster } from './SimilarProteins';
import { Namespace } from '../../../../shared/types/namespaces';
import { stringifyQuery } from '../../../../shared/utils/url';

type Props = {
  canonical: string;
  clusterType: string;
  isoformsAndClusters: IsoformsAndCluster[];
};

type HasSimilarProteins = {
  total: number;
  isoforms: string[];
  cluster: UniRefLiteAPIModel;
  uniprotkbResults: UniProtkbAPIModel[];
  uniprotkbQuery: string;
};

const getUniprotkbQuery = (
  cluster: UniRefLiteAPIModel,
  isoforms: string[],
  canonical: string
) =>
  `(uniref_cluster_${cluster.entryType.replace('UniRef', '')}:${
    cluster.id
  })${isoforms
    .map(
      (isoform) =>
        ` NOT (accession:${isoform === canonical ? isoform.replace(/-\d+$/, '') : isoform})`
    )
    .join('')}`;

const SimilarProteinsTabContent = ({
  canonical,
  clusterType,
  isoformsAndClusters,
}: Props) => {
  const [partitionedProteins, setPartitionedProteins] = useState<
    [string[], HasSimilarProteins[]]
  >([[], []]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const promises = isoformsAndClusters.map(({ isoforms, cluster }) => {
      if (isoforms.length <= 1 && cluster.memberCount <= 1) {
        return null;
      }
      const url = apiUrls.search.search({
        namespace: Namespace.uniprotkb,
        query: getUniprotkbQuery(cluster, isoforms, canonical),
        facets: null,
        columns,
        size: 10,
      });
      return fetchData<{
        results: UniProtkbAPIModel[];
      }>(url, undefined, { signal: controller.signal });
    });
    Promise.all(promises).then(
      (responses) => {
        const hasSimilar: HasSimilarProteins[] = [];
        const noSimilar: string[] = [];
        for (const [isoformsAndCluster, response] of zip(
          isoformsAndClusters,
          responses
        )) {
          /* istanbul ignore if */
          if (!isoformsAndCluster) {
            break; // Shouldn't happen, used to restrict types
          }
          const { isoforms, cluster } = isoformsAndCluster;
          const total = +(response?.headers?.['x-total-results'] || 0);
          if (total && response?.data.results && isoforms && cluster) {
            hasSimilar.push({
              total,
              isoforms,
              cluster,
              uniprotkbResults: response?.data.results,
              uniprotkbQuery: getUniprotkbQuery(cluster, isoforms, canonical),
            });
          } else if (isoforms) {
            noSimilar.push(...isoforms);
          }
        }
        setPartitionedProteins([noSimilar, hasSimilar]);
        setLoading(false);
      },
      () => {
        /* ignore fetch errors */
      }
    );
    return () => controller.abort();
  }, [isoformsAndClusters, canonical]);

  if (loading) {
    return <Loader />;
  }

  const [noSimilarProteins, hasSimilarProteins] = partitionedProteins;

  return (
    <>
      {hasSimilarProteins.map(
        ({ total, isoforms, cluster, uniprotkbResults, uniprotkbQuery }) => (
          <section key={cluster.id} className="text-block">
            <h4>
              {isoforms.map((isoform, index) => (
                <span key={isoform}>
                  {listFormat(index, isoforms)}
                  {isoform}
                </span>
              ))}
            </h4>
            <SimilarProteinsTable
              cluster={cluster}
              total={total}
              uniprotkbResults={uniprotkbResults}
              uniprotkbQuery={uniprotkbQuery}
            />
            <hr />
          </section>
        )
      )}
      {!!noSimilarProteins.length && (
        <section key="no-similar-proteins" className="text-block">
          <h4>
            {noSimilarProteins.map((isoform, index) => (
              <span key={isoform}>
                {listFormat(index, noSimilarProteins)}
                {isoform}
              </span>
            ))}
          </h4>
          {`No similar proteins at ${
            uniRefEntryTypeToPercent[clusterType as UniRefEntryType]
          } identity for ${pluralise(
            'this isoform.',
            noSimilarProteins.length,
            'these isoforms.'
          )}`}
          <hr />
        </section>
      )}
      <Link
        className="button primary"
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: stringifyQuery({
            query: isoformsAndClusters
              .map(
                ({ cluster }) =>
                  `uniref_cluster_${clusterType.replace('UniRef', '')}:${
                    cluster.id
                  }`
              )
              .sort()
              .join(' OR '),
          }),
        }}
      >
        View all
      </Link>
    </>
  );
};

export default SimilarProteinsTabContent;
