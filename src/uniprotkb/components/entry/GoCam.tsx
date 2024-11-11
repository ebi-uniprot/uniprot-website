import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Loader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import GoCamViz from '../protein-data-views/GoCamViz';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useDataApi from '../../../shared/hooks/useDataApi';

import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/go-cam.module.scss';

const extractGoCamId = (url: string) => {
  const reGoCamId = /https?:\/\/model\.geneontology\.org\/(?<goCamId>.*)/;
  const m = url.match(reGoCamId);
  return m?.groups?.goCamId;
};

const getGoCamStructures = (
  data: GoCamModel[] = []
): [string[], { id: string; label: string }[]] => {
  const ids = [];
  const items = [];
  for (const d of data) {
    const goCamId = extractGoCamId(d.gocam);
    if (goCamId) {
      ids.push(goCamId);
      items.push({
        id: goCamId,
        label: d.title,
      });
    }
  }
  return [ids, items];
};

export type GoCamModel = {
  gocam: string;
  title: string;
};

type Props = {
  primaryAccession: string;
};

const GoCam = ({ primaryAccession }: Props) => {
  const isSmallScreen = useSmallScreen();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, loading, error, status } = useDataApi<GoCamModel[]>(
    isSmallScreen ? null : externalUrls.GeneOntologyModels(primaryAccession)
  );

  const [goCamIds, goCamItems] = useMemo(
    () => getGoCamStructures(data),
    [data]
  );

  useEffect(() => {
    if (goCamIds?.[0]) {
      setSelectedId(goCamIds[0]);
    }
  }, [goCamIds]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorHandler status={status} error={error} noReload />;
  }

  if (isSmallScreen || !goCamIds.length || !selectedId) {
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
          {goCamItems.map((item) => (
            <option value={item.id} key={item.id}>
              {item.label}
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
