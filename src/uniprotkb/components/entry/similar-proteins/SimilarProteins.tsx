import { Loader, Message, Tabs, Tab, Card, Button } from 'franklin-sites';
import { FC, useMemo } from 'react';
import { groupBy } from 'lodash-es';
import { generatePath, Link, useHistory } from 'react-router-dom';
import { getClustersForProteins } from '../../../../shared/config/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import {
  UniRefEntryType,
  UniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../types/entrySection';
import { Location, LocationToPath } from '../../../../app/config/urls';
import SimilarProteinsTable from './SimilarProteinsTable';

const SimilarProteins: FC<{
  isoforms: { isoforms: string[] };
  primaryAccession: string;
}> = ({ isoforms, primaryAccession }) => {
  const searchUrl = getClustersForProteins([
    primaryAccession,
    ...isoforms.isoforms,
  ]);

  const history = useHistory();

  // Get the clusters in which the canonical and isoforms are found
  const { loading, data, error } = useDataApi<{
    results: UniRefLiteAPIModel[];
  }>(searchUrl);

  const clusterData = useMemo(() => {
    if (data) {
      const { results } = data;
      // Remove all items with only 1 member as it will be canonical/isoform
      const filtered = results.filter((item) => item.members.length > 1);

      const clusterTypeGroups = groupBy(filtered, 'entryType');
      // Note: thought we could use Dictionary<T> here but lodash doesn't
      // seem to export it
      const allClusterTypesGroups: {
        [key: string]: { [key: string]: UniRefLiteAPIModel[] };
      } = {};
      Object.keys(clusterTypeGroups).forEach((key) => {
        allClusterTypesGroups[key] = groupBy(
          clusterTypeGroups[key],
          'representativeId'
        );
      });
      return allClusterTypesGroups;
    }
    return null;
  }, [data]);

  const nameAndId = getEntrySectionNameAndId(EntrySection.SimilarProteins);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message level="failure">{error?.message}</Message>;
  }
  if (!clusterData) {
    return null;
  }

  return (
    <div id={EntrySection.SimilarProteins}>
      <Card title={nameAndId.name}>
        <Tabs>
          {Object.values(UniRefEntryType).map(
            (clusterType) =>
              clusterData[clusterType] && (
                <Tab
                  id={clusterType}
                  title={`${
                    UniRefEntryTypeToPercent[clusterType as UniRefEntryType]
                  } identity`}
                  key={clusterType}
                >
                  {Object.keys(clusterData[clusterType]).map(
                    (representativeId) => (
                      <section key={representativeId} className="text-block">
                        <h4>{representativeId}</h4>
                        {clusterData[clusterType][representativeId].map(
                          (row) => {
                            const unirefEntryUrl = generatePath(
                              LocationToPath[Location.UniRefEntry],
                              {
                                accession: row.id,
                              }
                            );
                            return (
                              <section key={row.id}>
                                <h5>
                                  <Link to={unirefEntryUrl}>{row.id}</Link>
                                </h5>
                                <SimilarProteinsTable members={row.members} />
                                {row.memberCount - row.members.length > 0 && (
                                  <Link to={unirefEntryUrl}>
                                    {row.memberCount - row.members.length} More
                                  </Link>
                                )}
                              </section>
                            );
                          }
                        )}
                        <hr />
                      </section>
                    )
                  )}
                  {/* TODO: This query doesn't seem to work currently */}
                  <Button
                    onClick={() => {
                      history.push({
                        pathname: LocationToPath[Location.UniProtKBResults],
                        search: `query=(${data?.results
                          .filter(({ entryType }) => entryType === clusterType)
                          .map(({ id }) => `uniref_cluster_100:${id}`)
                          .join(' OR ')})`,
                      });
                    }}
                  >
                    View all
                  </Button>
                </Tab>
              )
          )}
        </Tabs>
      </Card>
    </div>
  );
};

export default SimilarProteins;
