import { useMemo } from 'react';
import { Loader, Tab, Tabs } from 'franklin-sites';

import GoCamViz from '../protein-data-views/GoCamViz';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useDataApi from '../../../shared/hooks/useDataApi';

import externalUrls from '../../../shared/config/externalUrls';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

const extractGoCamId = (url: string) => {
  const reGoCamId = /https?:\/\/model\.geneontology\.org\/(?<goCamId>.*)/;
  const m = url.match(reGoCamId);
  return m?.groups?.goCamId;
};

const getGoCamStructures = (data: GoCamModel[] = []) => {
  const goCamIdToTitle: Record<string, string> = {};
  for (const d of data) {
    const goCamId = extractGoCamId(d.gocam);
    if (goCamId) {
      goCamIdToTitle[goCamId] = d.title;
    }
  }
  return [goCamIdToTitle, Object.keys(goCamIdToTitle)];
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
  const { data, loading, error, status } = useDataApi<GoCamModel[]>(
    isSmallScreen ? null : externalUrls.GeneOntologyModels(primaryAccession)
  );

  const [goCamIdToTitle, goCamIds] = useMemo(
    () => getGoCamStructures(data),
    [data]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorHandler status={status} error={error} noReload />;
  }

  if (isSmallScreen || !goCamIds.length) {
    return null;
  }

  return (
    <Tabs>
      <Tab title="GO-CAM">
        <GoCamViz id={goCamIds[0]} />
      </Tab>
    </Tabs>
  );
};

export default GoCam;
