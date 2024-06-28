import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Loader } from 'franklin-sites';
import { zip } from 'lodash-es';

import useSafeState from '../../../../shared/hooks/useSafeState';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import fetchData from '../../../../shared/utils/fetchData';
import listFormat from '../../../../shared/utils/listFormat';
import { pluralise } from '../../../../shared/utils/utils';

import { Location, LocationToPath } from '../../../../app/config/urls';
import {
  UniRefAPIModel,
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import SimilarProteinsTable, {
  columns,
} from '../../../../uniprotkb/components/entry/similar-proteins/SimilarProteinsTable';

type Props = {
  clusterType: string;
  clusters: UniRefLiteAPIModel[];
};

type HasSimilarProteins = {
  total: number;
  cluster: UniRefLiteAPIModel;
  uniprotkbResults: UniProtkbAPIModel[];
  uniprotkbQuery: string;
};

const canonicalIsoformRE = /-1$/;

const getUniprotkbQuery = (cluster: UniRefLiteAPIModel) =>
  `(uniref_cluster_${cluster.entryType.replace('UniRef', '')}:${cluster.id})`;

const SimilarProteinsTabContent = ({ clusterType, clusters }: Props) => {
  const [partitionedProteins, setPartitionedProteins] = useSafeState<
    [string[], HasSimilarProteins[]]
  >([[], []]);
  const [loading, setLoading] = useSafeState(true);

  useEffect(() => {
    const promises = clusters.map((cluster) => {
      const url = apiUrls.search.search({
        namespace: Namespace.uniprotkb,
        query: getUniprotkbQuery(cluster),
        columns,
        size: 10,
      });
      return fetchData<{
        results: UniProtkbAPIModel[];
      }>(url);
    });
    Promise.all(promises).then((responses) => {
      // May not have uniprotkb entries and consist only of uniparc entries
      const hasSimilar: HasSimilarProteins[] = [];
      const noSimilar: string[] = [];
      for (const [cluster, response] of zip(clusters, responses)) {
        const total = +(response?.headers?.['x-total-results'] || 0);
        if (total && response?.data.results && cluster) {
          hasSimilar.push({
            total,
            cluster,
            uniprotkbResults: response?.data.results,
            uniprotkbQuery: getUniprotkbQuery(cluster),
          });
        } else {
          noSimilar.push();
        }
      }
      setPartitionedProteins([noSimilar, hasSimilar]);
      setLoading(false);
    });
  }, [clusters, setLoading, setPartitionedProteins]);

  if (loading) {
    return <Loader />;
  }

  const [noSimilarProteins, hasSimilarProteins] = partitionedProteins;

  return (
    <>
      {hasSimilarProteins.map(
        ({ total, cluster, uniprotkbResults, uniprotkbQuery }) => (
          <section key={cluster.id} className="text-block">
            <section>
              <SimilarProteinsTable
                cluster={cluster}
                total={total}
                uniprotkbResults={uniprotkbResults}
                uniprotkbQuery={uniprotkbQuery}
              />
            </section>
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
          <section>
            {`No similar proteins at ${
              uniRefEntryTypeToPercent[clusterType as UniRefEntryType]
            } identity for ${pluralise(
              'this isoform.',
              noSimilarProteins.length,
              'these isoforms.'
            )}`}
          </section>
          <hr />
        </section>
      )}
      <Button
        element={Link}
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=${clusters
            .map(
              (cluster) =>
                `uniref_cluster_${clusterType.replace('UniRef', '')}:${
                  cluster.id
                }`
            )
            .sort()
            .join(' OR ')}`,
        }}
      >
        View all
      </Button>
    </>
  );
};

export default SimilarProteinsTabContent;
