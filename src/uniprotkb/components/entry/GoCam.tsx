import { useEffect, useMemo, useState } from 'react';
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
  const { data, loading, error, status } = useDataApi<GoCamModels[]>(
    isSmallScreen ? null : externalUrls.GeneOntologyModels(primaryAccession)
  );
  const [uniprotGoCamIds, setUniprotGoCamIds] = useState<string[]>([]);

  const goCamIdToItem = useMemo(() => getGoCamStructures(data), [data]);

  useEffect(() => {
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
        results.filter(({ data }) => isUniprotCurated(data)).map(({ id }) => id)
      );
    });
  }, [goCamIdToItem]);

  useEffect(() => {
    if (uniprotGoCamIds?.[0]) {
      setSelectedId(uniprotGoCamIds[0]);
    }
  }, [uniprotGoCamIds]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorHandler status={status} error={error} noReload />;
  }

  if (isSmallScreen || !goCamIdToItem.size || !selectedId) {
    return null;
  }

  return (
    <div className={styles['go-cam-container']}>
      {/* TODO: update data-article-id with new GO-CAM article */}
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
      <ExternalLink url={externalUrls.NoctuaAlliancePathwayPreview(selectedId)}>
        View in Noctua Alliance Pathway Preview
      </ExternalLink>
    </div>
  );
};

export default GoCam;
