import { Button } from 'franklin-sites';
import { zip } from 'lodash-es';
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Location, LocationToPath } from '../../../../app/config/urls';
import { getAPIQueryUrl } from '../../../../shared/config/apiUrls';
import { Namespace } from '../../../../shared/types/namespaces';
import fetchData from '../../../../shared/utils/fetchData';
import listFormat from '../../../../shared/utils/listFormat';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import { UniProtkbAPIModel } from '../../../adapters/uniProtkbConverter';
import { IsoformsAndCluster } from './SimilarProteins';
import SimilarProteinsTable, { columns } from './SimilarProteinsTable';

type Props = {
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

const SimilarProteinsTabContent = ({
  clusterType,
  isoformsAndClusters,
}: Props) => {
  const [partitionedProteins, setPartitionedProteins] = useState<
    [string[], HasSimilarProteins[]]
  >([[], []]);
  useEffect(() => {
    const promises = isoformsAndClusters.map(({ isoforms, cluster }) => {
      if (isoforms.length <= 1 && cluster.memberCount <= 1) {
        return null;
      }
      const query = `(uniref_cluster_${cluster.entryType.replace(
        'UniRef',
        ''
      )}:${cluster.id})${isoforms
        .map((isoform) => ` AND NOT (accession:${isoform})`)
        .join('')}`;
      const url = getAPIQueryUrl({
        namespace: Namespace.uniprotkb,
        query,
        facets: [],
        columns,
        size: 10,
      });
      return fetchData<{
        results: UniProtkbAPIModel[];
      }>(url);
    });
    Promise.all(promises).then((responses) => {
      const hasSimilar: HasSimilarProteins[] = [];
      const noSimilar: string[][] = [];
      for (const [isoformsAndCluster, response] of zip(
        isoformsAndClusters,
        responses
      )) {
        /* istanbul ignore if */
        if (!isoformsAndCluster) {
          break; // Shouldn't happen, used to restric types
        }
        const { isoforms, cluster } = isoformsAndCluster;
        const total = +(response?.headers?.['x-total-records'] || 0);
        if (total && response?.data.results && isoforms && cluster) {
          hasSimilar.push({
            total,
            isoforms,
            cluster,
            uniprotkbResults: response?.data.results,
            uniprotkbQuery: `(uniref_cluster_${cluster.entryType.replace(
              'UniRef',
              ''
            )}:${cluster.id})${isoforms
              .map((isoform) => ` AND NOT (accession:${isoform})`)
              .join('')}`,
          });
        } else if (isoforms) {
          noSimilar.push(isoforms);
        }
      }
      setPartitionedProteins([noSimilar.flat(), hasSimilar]);
    });
  }, [isoformsAndClusters]);
  const [noSimilarProteins, hasSimilarProteins] = partitionedProteins;
  return (
    <>
      {hasSimilarProteins.map(
        ({ total, isoforms, cluster, uniprotkbResults, uniprotkbQuery }) => (
          <section key={cluster.id} className="text-block">
            <h4>
              {isoforms.map((isoform, index) => (
                <Fragment key={isoform}>
                  {listFormat(index, isoforms)}
                  {isoform}
                </Fragment>
              ))}
            </h4>
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
      <section key="no-similar-proteins" className="text-block">
        <h4>
          {noSimilarProteins.map((isoform, index) => (
            <Fragment key={isoform}>
              {listFormat(index, noSimilarProteins)}
              {isoform}
            </Fragment>
          ))}
        </h4>
        <section>
          No similar proteins at{' '}
          {uniRefEntryTypeToPercent[clusterType as UniRefEntryType]} identity
          for this isoform
        </section>
        <hr />
      </section>
      <Button
        element={Link}
        to={{
          pathname: LocationToPath[Location.UniProtKBResults],
          search: `query=(${isoformsAndClusters
            .map(
              ({ cluster }) =>
                `uniref_cluster_${clusterType.replace('UniRef', '')}:${
                  cluster.id
                }`
            )
            .sort()
            .join(' OR ')})`,
        }}
      >
        View all
      </Button>
    </>
  );
};

export default SimilarProteinsTabContent;
