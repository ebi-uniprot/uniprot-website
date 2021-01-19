import { Loader, Message, Tabs, Tab, Card, Button } from 'franklin-sites';
import { FC, useMemo } from 'react';
import { groupBy } from 'lodash-es';
import { generatePath, Link } from 'react-router-dom';
import { getClustersForProteins } from '../../../shared/config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { Location, LocationToPath } from '../../../app/config/urls';

const SimilarProteins: FC<{
  isoforms: { isoforms: string[] };
  primaryAccession: string;
}> = ({ isoforms, primaryAccession }) => {
  const searchUrl = getClustersForProteins([
    primaryAccession,
    ...isoforms.isoforms,
  ]);
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

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message level="failure">{error.message}</Message>;
  }
  if (!clusterData) {
    return null;
  }

  const nameAndId = getEntrySectionNameAndId(EntrySection.SimilarProteins);

  // TODO get extra columns about the cluster members

  return (
    <div id={EntrySection.SimilarProteins}>
      <Card title={nameAndId.name}>
        <Tabs>
          {Object.keys(clusterData).map((clusterType) => (
            <Tab id={clusterType} title={clusterType} key={clusterType}>
              {Object.keys(clusterData[clusterType]).map((representativeId) => (
                <section key={representativeId} className="text-block">
                  <h4>{representativeId}</h4>
                  {clusterData[clusterType][representativeId].map((row) => (
                    <section key={row.id}>
                      <h5>
                        <Link
                          to={generatePath(
                            LocationToPath[Location.UniRefEntry],
                            {
                              accession: row.id,
                            }
                          )}
                        >
                          {row.id}
                        </Link>
                      </h5>
                      <ul className="no-bullet">
                        {/* Note: move following to its own component  */}
                        {row.members
                          ?.filter((member) => member !== representativeId)
                          .map((member) => (
                            <li key={member}>
                              <Link
                                to={generatePath(
                                  LocationToPath[Location.UniProtKBEntry],
                                  {
                                    accession: member,
                                  }
                                )}
                              >
                                {member}
                              </Link>
                            </li>
                          ))}
                        {row.members &&
                          row.memberCount > row.members?.length && (
                            <li>{row.memberCount} more</li>
                          )}
                      </ul>
                    </section>
                  ))}
                  <hr />
                </section>
              ))}
              {/* TODO: check with backend what query should be generated here */}
              <Button>View all</Button>
            </Tab>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default SimilarProteins;
