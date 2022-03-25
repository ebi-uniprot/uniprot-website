import { Button } from 'franklin-sites';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Location, LocationToPath } from '../../../../app/config/urls';
import listFormat from '../../../../shared/utils/listFormat';
import { IsoformsAndCluster } from './SimilarProteins';
import SimilarProteinsTable from './SimilarProteinsTable';

type Props = {
  clusterType: string;
  isoformsAndClusters: IsoformsAndCluster[];
};

const SimilarProteinsTabContent = ({
  clusterType,
  isoformsAndClusters,
}: Props) => (
  <>
    {isoformsAndClusters.map(({ isoforms, cluster }) => (
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
            clusterType={clusterType}
            cluster={cluster}
            isoforms={isoforms}
          />
        </section>
        <hr />
      </section>
    ))}
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

export default SimilarProteinsTabContent;
