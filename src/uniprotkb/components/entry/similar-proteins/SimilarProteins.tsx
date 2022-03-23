import { Loader, Message, Tabs, Tab, Card, Button } from 'franklin-sites';
import { useMemo, useEffect } from 'react';
import { groupBy, zipWith } from 'lodash-es';
import { Link } from 'react-router-dom';

import SimilarProteinsTable from './SimilarProteinsTable';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useSafeState from '../../../../shared/hooks/useSafeState';

import apiUrls, {
  getClustersForProteins,
} from '../../../../shared/config/apiUrls';
import fetchData from '../../../../shared/utils/fetchData';

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
    () =>
      [primaryAccession, ...isoforms.isoforms].filter(
        // remove first isoform, it'll be the primary accession
        (accession) => !accession.endsWith('-1')
      ),
    [primaryAccession, isoforms]
  );

  const [mappingData, setMappingData] = useSafeState<
    Record<string, Record<UniRefEntryType, UniRefLiteAPIModel>>
  >({});
  const [mappingLoading, setMappingLoading] = useSafeState(true);

  useEffect(() => {
    setMappingLoading(true);
    const promises = allAccessions.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(`${apiUrls.search(Namespace.uniref)}?query=(uniprot_id:${accession})`)
    );
    Promise.all(promises).then((responses) => {
      const accessionsToClusters = Object.fromEntries(
        zipWith(allAccessions, responses, (accession, response) => [
          accession,
          Object.fromEntries(
            response.data.results.map((entry) => [entry.entryType, entry])
          ) as Record<UniRefEntryType, UniRefLiteAPIModel>,
        ])
      );
      setMappingData(accessionsToClusters);
      setMappingLoading(false);
    });
  }, [allAccessions, setMappingData, setMappingLoading]);

  console.log(mappingData);

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
      header={
        <h2 data-article-id="similar_proteins_section">{nameAndId.name}</h2>
      }
      id={EntrySection.SimilarProteins}
      data-entry-section
    >
      {clusterData ? (
        <Tabs>
          {Object.entries(uniRefEntryTypeToPercent).map(
            ([clusterType, percentValue]) => (
              <Tab
                id={clusterType}
                title={`${percentValue} identity`}
                key={clusterType}
              >
                {Object.entries(mappingData || {}).map(
                  ([isoform, clusters]) => {
                    const cluster = clusters[clusterType as UniRefEntryType];
                    if (!cluster) {
                      return null;
                    }
                    const unirefEntryUrl = getEntryPath(
                      Namespace.uniref,
                      cluster.id
                    );
                    return (
                      <section key={isoform} className="text-block">
                        <h4>{isoform}</h4>
                        <section key={cluster.id}>
                          <h5>
                            <Link to={unirefEntryUrl}>{cluster.id}</Link>
                          </h5>
                          <SimilarProteinsTable
                            members={cluster.members.filter(
                              (member) => !member.startsWith('UPI')
                            )}
                          />
                          {cluster.memberCount - cluster.members.length - 1 >
                            0 && (
                            <Link to={unirefEntryUrl}>
                              {cluster.memberCount - cluster.members.length - 1}{' '}
                              more
                            </Link>
                          )}
                        </section>
                        <hr />
                      </section>
                    );
                  }
                )}
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
                      .sort()
                      .join(' OR ')})`,
                  }}
                >
                  View all
                </Button>
              </Tab>
            )
          )}
        </Tabs>
      ) : (
        <em>No similar UniProtKB entry found.</em>
      )}
    </Card>
  );
};

export default SimilarProteins;
