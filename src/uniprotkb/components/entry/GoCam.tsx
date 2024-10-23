import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import {
  Button,
  Dropdown,
  ExternalLink,
  Loader,
  Tab,
  Tabs,
} from 'franklin-sites';

import GoCamViz from '../protein-data-views/GoCamViz';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import LazyComponent from '../../../shared/components/LazyComponent';

import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useDataApi from '../../../shared/hooks/useDataApi';

import { clickOnFranklinDropdown } from '../../../shared/utils/utils';

import externalUrls from '../../../shared/config/externalUrls';

import styles from './styles/go-cam.module.scss';

const extractGoCamId = (url: string) => {
  const reGoCamId = /https?:\/\/model\.geneontology\.org\/(?<goCamId>.*)/;
  const m = url.match(reGoCamId);
  return m?.groups?.goCamId;
};

const getGoCamStructures = (
  data: GoCamModel[] = []
): [Map<string, string>, string[]] => {
  const goCamIdToTitle: Map<string, string> = new Map();
  for (const d of data) {
    const goCamId = extractGoCamId(d.gocam);
    if (goCamId) {
      goCamIdToTitle.set(goCamId, d.title);
    }
  }
  return [goCamIdToTitle, Array.from(goCamIdToTitle.keys())];
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

  const [goCamIdToTitle, goCamIds] = useMemo(
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
    <Tabs>
      <Tab title="GO-CAM">
        <div className={styles['go-cam-container']}>
          <Dropdown
            // eslint-disable-next-line react/no-unstable-nested-components
            visibleElement={(onClick: () => unknown) => (
              <Button variant="primary" onClick={onClick}>
                Select GO-CAM model
              </Button>
            )}
          >
            <ul className={styles['ids-list']}>
              {goCamIds.map((goCamId) => (
                <li key={goCamId}>
                  <Button
                    variant="tertiary"
                    key={goCamId}
                    id={goCamId}
                    onClick={(event) => {
                      setSelectedId((event.target as HTMLButtonElement).id);
                      clickOnFranklinDropdown(
                        event.target as HTMLButtonElement
                      );
                    }}
                    className={cn(styles.item, {
                      [styles.selected]: goCamId === selectedId,
                    })}
                  >
                    {goCamIdToTitle.get(goCamId)}
                  </Button>
                </li>
              ))}
            </ul>
          </Dropdown>
          <LazyComponent>
            <GoCamViz id={selectedId} />
          </LazyComponent>
          <ExternalLink
            url={externalUrls.NoctuaAlliancePathwayPreview(selectedId)}
          >
            View in Noctua Alliance Pathway Preview
          </ExternalLink>
        </div>
      </Tab>
    </Tabs>
  );
};

export default GoCam;
