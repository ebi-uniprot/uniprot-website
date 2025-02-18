import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Chip, ExternalLink, Loader } from 'franklin-sites';
import pMap from 'p-map';
import cn from 'classnames';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import GoCamViz from '../protein-data-views/GoCamViz';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useDataApi from '../../../shared/hooks/useDataApi';

import fetchData from '../../../shared/utils/fetchData';
import { heuristic } from '../../../tools/state/utils/heuristic';

import externalUrls from '../../../shared/config/externalUrls';

import { GoCamModelInfo, GoCamModels } from '../../types/goCamTypes';

import styles from './styles/go-cam.module.scss';

const extractGoCamId = (url: string) => {
  const reGoCamId = /https?:\/\/model\.geneontology\.org\/(?<goCamId>.*)/;
  const m = url.match(reGoCamId);
  return m?.groups?.goCamId;
};

export const getGoCamStructures = (data: GoCamModels[] = []) => {
  const idToItem = new Map<string, { id: string; label: string }>();
  for (const d of data) {
    const id = extractGoCamId(d.gocam);
    if (id) {
      idToItem.set(id, {
        id,
        label: d.title,
      });
    }
  }
  return idToItem;
};

export const isUniprotCurated = (goCamModel: GoCamModelInfo) =>
  goCamModel?.annotations?.some(
    ({ key, value }) =>
      key === 'providedBy' && value === 'https://www.uniprot.org'
  );

export const getUniprotNode = (
  primaryAccession: string,
  goCamModel: GoCamModelInfo
) => {
  const idToFind = `UniProtKB:${primaryAccession}`;
  for (const individual of goCamModel.individuals) {
    for (const type of individual.type) {
      if (type.id === idToFind) {
        return type.label;
      }
    }
  }
  return null;
};

type Props = {
  primaryAccession: string;
};

const GoCam = ({ primaryAccession }: Props) => {
  const isSmallScreen = useSmallScreen();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const allGoCamIdsResponse = useDataApi<GoCamModels[]>(
    isSmallScreen ? null : externalUrls.GeneOntologyModels(primaryAccession)
  );
  const [goCamIdToNode, setGoCamIdToNode] = useState<Map<
    string,
    string | null
  > | null>(null);

  const uniprotGoCamIds = goCamIdToNode && Array.from(goCamIdToNode.keys());

  const goCamIdToItem = useMemo(
    () => getGoCamStructures(allGoCamIdsResponse.data),
    [allGoCamIdsResponse.data]
  );

  useEffect(() => {
    async function fetchGoCamModels() {
      if (goCamIdToItem.size) {
        const mapper = (id: string) =>
          fetchData<GoCamModelInfo>(
            externalUrls.GeneOntologyModelInfo(id)
          ).then((response) => ({
            id,
            data: response.data,
          }));
        const results = await pMap(Array.from(goCamIdToItem.keys()), mapper, {
          concurrency: heuristic.concurrency,
        });
        setGoCamIdToNode(
          new Map(
            results
              .filter(({ data }) => isUniprotCurated(data))
              .map(({ id, data }) => [
                id,
                getUniprotNode(primaryAccession, data),
              ])
          )
        );
      }
    }
    fetchGoCamModels();
  }, [goCamIdToItem, primaryAccession]);

  useEffect(() => {
    if (uniprotGoCamIds?.[0]) {
      setSelectedId(uniprotGoCamIds[0]);
    }
  }, [uniprotGoCamIds]);

  const selectedIdNode = selectedId && goCamIdToNode?.get(selectedId);

  let content: ReactNode;
  const loadingUniprotGoCamIds = goCamIdToItem.size && uniprotGoCamIds === null;
  if (allGoCamIdsResponse.loading || loadingUniprotGoCamIds) {
    content = (
      <>
        <div className={styles.preamble} data-article-id="gene-ontology">
          Searching Gene Ontology knowledgebase for GO-CAM models.
        </div>
        <Loader />
      </>
    );
  } else if (
    !goCamIdToItem.size ||
    (Array.isArray(uniprotGoCamIds) && !uniprotGoCamIds.length)
  ) {
    content = (
      <>
        <div className={styles.preamble} data-article-id="gene-ontology">
          UniProt curated GO-CAM models have not been found for this entry
          within the Gene Ontology knowledgebase.
        </div>
        <ExternalLink url={externalUrls.GeneOntologyUniprotCuratedModels}>
          Browse all available UniProt curated GO-CAM models.
        </ExternalLink>
      </>
    );
  } else if (allGoCamIdsResponse.error) {
    content = (
      <ErrorHandler
        status={allGoCamIdsResponse.status}
        error={allGoCamIdsResponse.error}
        noReload
      />
    );
  } else if (!isSmallScreen && selectedId && !!uniprotGoCamIds?.length) {
    content = (
      <>
        <div className={styles.preamble} data-article-id="gene-ontology">
          Gene Ontology Causal Activity Models (GO-CAM) associated with this
          entry.
        </div>
        <label>
          Select GO-CAM model
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className={styles['id-select']}
          >
            {uniprotGoCamIds.map((id) => (
              <option value={id} key={id}>
                {goCamIdToItem.get(id)?.label}
              </option>
            ))}
          </select>
        </label>
        {selectedIdNode && (
          <div className={styles['node-description']}>
            The{' '}
            <Chip className={cn('secondary', styles['node-chip'])}>
              {selectedIdNode}
            </Chip>{' '}
            node in this visualization corresponds to the current (
            {primaryAccession}) UniProtKB entry page.
          </div>
        )}
        <GoCamViz id={selectedId} />
        <ExternalLink
          url={externalUrls.NoctuaAlliancePathwayPreview(selectedId)}
        >
          View in Noctua Alliance Pathway Preview
        </ExternalLink>
      </>
    );
  }

  return content ? (
    <div className={styles['go-cam-container']}>{content}</div>
  ) : null;
};

export default GoCam;
