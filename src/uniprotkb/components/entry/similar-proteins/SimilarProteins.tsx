import { Loader, Message, Tabs, Tab, Card, Button } from 'franklin-sites';
import { useMemo } from 'react';
import { groupBy } from 'lodash-es';
import { Link } from 'react-router-dom';

import SimilarProteinsTable from './SimilarProteinsTable';

import useDataApi from '../../../../shared/hooks/useDataApi';

import { getClustersForProteins } from '../../../../shared/config/apiUrls';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../../app/config/urls';
import { Namespace } from '../../../../shared/types/namespaces';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../../types/entrySection';
import {
  UniRefEntryType,
  uniRefEntryTypeToPercent,
  UniRefLiteAPIModel,
} from '../../../../uniref/adapters/uniRefConverter';

type Props = {
  isoforms: { isoforms: string[] };
  primaryAccession: string;
};

const SimilarProteins = ({ isoforms, primaryAccession }: Props) => {
  const allAccessions = useMemo(
    () => [primaryAccession, ...isoforms.isoforms],
    [primaryAccession, isoforms]
  );

  const searchUrl = getClustersForProteins(allAccessions);

  // Get the clusters in which the canonical and isoforms are found
  const { loading, data, error } = useDataApi<{
    results: UniRefLiteAPIModel[];
  }>(searchUrl);

  const clusterData = useMemo(() => {
    if (data) {
      const { results } = data;
      // Remove all items with only 1 member as it will be canonical/isoform

      const filtered = results
        .map((item) => ({
          ...item,
          members: item.members.filter(
            (member) =>
              !member.startsWith('UPI') && !allAccessions.includes(member)
          ),
        }))
        .filter((item) => item.members.length > 1);

      if (filtered.length === 0) {
        return null;
      }

      const clusterTypeGroups: Partial<
        Record<UniRefEntryType, UniRefLiteAPIModel[]>
      > = groupBy(filtered, (cluster) => cluster.entryType);
      const allClusterTypesGroups: Partial<
        Record<UniRefEntryType, Record<string, UniRefLiteAPIModel[]>>
      > = Object.fromEntries(
        Object.entries(clusterTypeGroups).map(([key, clusters]) => [
          key,
          groupBy(
            clusters,
            (cluster) => cluster.representativeMember.memberId
          ) || [],
        ])
      );
      return allClusterTypesGroups;
    }
    return null;
  }, [data, allAccessions]);

  const nameAndId = getEntrySectionNameAndId(EntrySection.SimilarProteins);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Message level="failure">{error?.message}</Message>;
  }

  return (
    <Card
      header={<h2>{nameAndId.name}</h2>}
      id={EntrySection.SimilarProteins}
      data-entry-section
    >
      {clusterData ? (
        <Tabs>
          {Object.entries(uniRefEntryTypeToPercent).map(
            ([clusterType, percentValue]) =>
              clusterType in clusterData &&
              clusterData[clusterType as UniRefEntryType] ? (
                <Tab
                  id={clusterType}
                  title={`${percentValue} identity`}
                  key={clusterType}
                >
                  {Object.entries(
                    clusterData[clusterType as UniRefEntryType] || {}
                  ).map(([representativeId, clusters]) => (
                    <section key={representativeId} className="text-block">
                      <h4>{representativeId}</h4>
                      {clusters.map((row) => {
                        const unirefEntryUrl = getEntryPath(
                          Namespace.uniref,
                          row.id
                        );
                        return (
                          <section key={row.id}>
                            <h5>
                              <Link to={unirefEntryUrl}>{row.id}</Link>
                            </h5>
                            <SimilarProteinsTable members={row.members} />
                            {row.memberCount - row.members.length - 1 > 0 && (
                              <Link to={unirefEntryUrl}>
                                {row.memberCount - row.members.length - 1} more
                              </Link>
                            )}
                          </section>
                        );
                      })}
                      <hr />
                    </section>
                  ))}
                  {/* TODO: This query doesn't seem to work currently */}
                  <Button
                    element={Link}
                    to={{
                      pathname: LocationToPath[Location.UniProtKBResults],
                      search: `query=(${data?.results
                        .filter(({ entryType }) => entryType === clusterType)
                        .map(
                          ({ id }) =>
                            `uniref_cluster_${clusterType.replace(
                              'UniRef',
                              ''
                            )}:${id}`
                        )
                        .join(' OR ')})`,
                    }}
                  >
                    View all
                  </Button>
                </Tab>
              ) : null
          )}
        </Tabs>
      ) : (
        <em>No similar UniProtKB entry found.</em>
      )}
    </Card>
  );
};

export default SimilarProteins;
