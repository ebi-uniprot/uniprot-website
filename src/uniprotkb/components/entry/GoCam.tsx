import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import GoCamViz from '../protein-data-views/GoCamViz';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useDataApi from '../../../shared/hooks/useDataApi';

import fetchData from '../../../shared/utils/fetchData';

import externalUrls from '../../../shared/config/externalUrls';

import { GoCamModelInfo, GoCamModels } from '../../types/goCamTypes';

import styles from './styles/go-cam.module.scss';

const extractGoCamId = (url: string) => {
  const reGoCamId = /https?:\/\/model\.geneontology\.org\/(?<goCamId>.*)/;
  const m = url.match(reGoCamId);
  return m?.groups?.goCamId;
};

const getGoCamStructures = (data: GoCamModels[] = []) => {
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

const isUniprotCurated = (goCamModel: GoCamModelInfo) =>
  goCamModel?.annotations?.some(
    ({ key, value }) =>
      key === 'providedBy' && value === 'https://www.uniprot.org'
  );

type Props = {
  primaryAccession: string;
};

const GoCam = ({ primaryAccession }: Props) => {
  const isSmallScreen = useSmallScreen();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const allGoCamIdsResponse = useDataApi<GoCamModels[]>(
    isSmallScreen ? null : externalUrls.GeneOntologyModels(primaryAccession)
  );
  const [uniprotGoCamIds, setUniprotGoCamIds] = useState<string[] | null>(null);

  const goCamIdToItem = useMemo(
    () => getGoCamStructures(allGoCamIdsResponse.data),
    [allGoCamIdsResponse.data]
  );

  useEffect(() => {
    if (goCamIdToItem.size) {
      const promises = Array.from(goCamIdToItem.keys()).map((id) =>
        fetchData<GoCamModelInfo>(externalUrls.GeneOntologyModelInfo(id)).then(
          (response) => ({
            id,
            data: response.data,
          })
        )
      );
      Promise.all(promises).then((results) => {
        setUniprotGoCamIds(
          results
            .filter(({ data }) => isUniprotCurated(data))
            .map(({ id }) => id)
        );
      });
    }
  }, [goCamIdToItem]);

  useEffect(() => {
    if (uniprotGoCamIds?.[0]) {
      setSelectedId(uniprotGoCamIds[0]);
    }
  }, [uniprotGoCamIds]);

  const loadingUniprotGoCamIds = uniprotGoCamIds === null;

  let content: ReactNode;
  if (allGoCamIdsResponse.loading || loadingUniprotGoCamIds) {
    content = (
      <>
        Searching Gene Ontology knowledgebase for GO-CAM models.
        <Loader />
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
  } else if (
    !goCamIdToItem.size ||
    (Array.isArray(uniprotGoCamIds) && uniprotGoCamIds.length === 0)
  ) {
    content = (
      <>
        UniProt curated GO-CAM models have not been found for this entry within
        the Gene Ontology knowledgebase.{' '}
        <ExternalLink url={externalUrls.GeneOntologyUniprotCuratedModels}>
          Browse all available UniProt curated GO-CAM models.
        </ExternalLink>
      </>
    );
  }
  // {/* TODO: update data-article-id with new GO-CAM article */}
  else if (!isSmallScreen && selectedId) {
    content = (
      <>
        <div className={styles.preamble} data-article-id="gene_ontology">
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
