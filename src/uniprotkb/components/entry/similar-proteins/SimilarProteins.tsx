import { Loader, Tabs, Tab, Card, Button } from 'franklin-sites';
import { useMemo, useEffect, Fragment } from 'react';
import { zip } from 'lodash-es';
import { Link } from 'react-router-dom';

import SimilarProteinsTable from './SimilarProteinsTable';

import useSafeState from '../../../../shared/hooks/useSafeState';

import apiUrls from '../../../../shared/config/apiUrls';
import fetchData from '../../../../shared/utils/fetchData';
import listFormat from '../../../../shared/utils/listFormat';

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

type IsoformsAndCluster = {
  isoforms: string[];
  cluster: UniRefLiteAPIModel;
};

type Mapping = Record<UniRefEntryType, IsoformsAndCluster[]>;

const getClusterMapping = (
  allAccessions: string[],
  clusterData: UniRefLiteAPIModel[][]
) => {
  const mapping: Mapping = {
    UniRef100: [],
    UniRef90: [],
    UniRef50: [],
  };
  for (const [accession, clusters] of zip(allAccessions, clusterData)) {
    /* istanbul ignore if */
    if (!accession || !clusters) {
      break; // Shouldn't happen, used to restric types
    }
    for (const cluster of clusters) {
      let association: IsoformsAndCluster | undefined = mapping[
        cluster.entryType
      ].find((association) => association.cluster.id === cluster.id);
      if (!association) {
        association = { isoforms: [], cluster };
        mapping[cluster.entryType].push(association);
      }
      association.isoforms.push(accession);
    }
  }
  return mapping;
};

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

  const [mappingData, setMappingData] = useSafeState<Mapping | null>(null);
  const [mappingLoading, setMappingLoading] = useSafeState(true);

  useEffect(() => {
    setMappingLoading(true);
    const promises = allAccessions.map((accession) =>
      fetchData<{
        results: UniRefLiteAPIModel[];
      }>(`${apiUrls.search(Namespace.uniref)}?query=(uniprot_id:${accession})`)
    );
    Promise.all(promises).then((responses) => {
      const clusterData = responses.map((response) => response.data.results);
      const mapping = getClusterMapping(allAccessions, clusterData);
      setMappingData(mapping);
      setMappingLoading(false);
    });
  }, [allAccessions, setMappingData, setMappingLoading]);

  const nameAndId = getEntrySectionNameAndId(EntrySection.SimilarProteins);

  if (mappingLoading) {
    return <Loader />;
  }

  return (
    <Card
      header={
        <h2 data-article-id="similar_proteins_section">{nameAndId.name}</h2>
      }
      id={EntrySection.SimilarProteins}
      data-entry-section
    >
      {mappingData ? (
        <Tabs>
          {Object.entries(uniRefEntryTypeToPercent).map(
            ([clusterType, percentValue]) => (
              <Tab
                id={clusterType}
                title={`${percentValue} identity`}
                key={clusterType}
              >
                {mappingData[clusterType as UniRefEntryType].map(
                  ({ isoforms, cluster }) => {
                    const unirefEntryUrl = getEntryPath(
                      Namespace.uniref,
                      cluster.id
                    );
                    return (
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
                          {isoforms.length !== 1 || cluster.memberCount - 1 ? (
                            <>
                              <Link to={unirefEntryUrl}>{cluster.id}</Link>
                              <SimilarProteinsTable
                                cluster={cluster}
                                isoforms={isoforms}
                              />
                            </>
                          ) : (
                            `no similar proteins at ${
                              uniRefEntryTypeToPercent[
                                clusterType as UniRefEntryType
                              ]
                            } identity for this isoform`
                          )}
                        </section>
                        <hr />
                      </section>
                    );
                  }
                )}
                <Button
                  element={Link}
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: `query=(${mappingData[
                      clusterType as UniRefEntryType
                    ]
                      .map(
                        ({ cluster }) =>
                          `uniref_cluster_${clusterType.replace(
                            'UniRef',
                            ''
                          )}:${cluster.id}`
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
