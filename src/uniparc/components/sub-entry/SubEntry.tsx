// TODO: fix import order
import { useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import cn from 'classnames';
import { Loader, Tab, Tabs } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SubEntryOverview from './SubEntryOverview';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import SubEntryMain from './SubEntryMain';
import InPageNav from '../../../shared/components/InPageNav';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';

import useDataApi from '../../../shared/hooks/useDataApi';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import { getSubEntryPath } from '../../utils/subEntry';
import uniParcSubEntryConverter from '../../adapters/uniParcSubEntryConverter';
import { hasStructure } from './SubEntryStructureSection';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

import {
  Location,
  LocationToPath,
  getEntryPath,
} from '../../../app/config/urls';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import SubEntrySection, { TabLocation } from '../../types/subEntry';
import { UniParcAPIModel } from '../../adapters/uniParcConverter';

import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';

const SubEntry = () => {
  const smallScreen = useSmallScreen();
  const match = useRouteMatch<{
    accession: string;
    subPage: string;
    subEntryId: string;
  }>(LocationToPath[Location.UniParcSubEntry]);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const { accession, subEntryId } = match?.params || {};
  const baseURL = apiUrls.entry.entry(
    subEntryId && accession,
    Namespace.uniparc
  );
  const uniparcData = useDataApi<UniParcAPIModel>(baseURL);

  if (uniparcData.error || !match || !accession || !subEntryId) {
    return (
      <ErrorHandler
        status={uniparcData.status}
        error={uniparcData.error}
        fullPage
      />
    );
  }

  if (!uniparcData.data) {
    return <Loader progress={uniparcData.progress} />;
  }
  if (!uniparcData.data.uniParcCrossReferences) {
    // TODO: handle this
    return <>TODO: handle this</>;
  }
  const transformedData = uniParcSubEntryConverter(
    uniparcData.data,
    subEntryId
  );
  if (!transformedData) {
    // TODO: handle when no xrefsForId
    return <>TODO: handle this</>;
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  const sidebar = (
    <InPageNav
      sections={Object.values(uniParcSubEntryConfig).map((section) => ({
        ...section,
        disabled:
          section.id === SubEntrySection.Structure &&
          !hasStructure(transformedData.subEntry),
      }))}
      rootElement={`.${sidebarStyles.content}`}
    />
  );

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <ErrorBoundary>
        <HTMLHead
          title={[
            subEntryId,
            accession,
            searchableNamespaceLabels[Namespace.uniparc],
          ]}
        />
        <h1>
          <EntryTitle
            mainTitle="UniParc"
            optionalTitle={
              <>
                <Link to={getEntryPath(Namespace.uniparc, accession)}>
                  {accession}
                </Link>
                {`  · ${subEntryId}`}
              </>
            }
          />
        </h1>
        <SubEntryOverview data={transformedData} />
      </ErrorBoundary>
      <Tabs active={match.params.subPage}>
        <Tab
          title={
            <Link
              to={getSubEntryPath(accession, subEntryId, TabLocation.Entry)}
            >
              Entry
            </Link>
          }
          id={TabLocation.Entry}
        >
          {/* TODO: evenutally remove nResults prop (see note in EntryDownload) */}
          {displayDownloadPanel && (
            <EntryDownloadPanel
              handleToggle={handleToggleDownload}
              nResults={uniparcData.data?.uniParcCrossReferences?.length}
            />
          )}
          <div className="button-group">
            <BlastButton selectedEntries={[accession]} />
            <EntryDownloadButton handleToggle={handleToggleDownload} />
            <AddToBasketButton selectedEntries={accession} />
          </div>
          <SubEntryMain transformedData={transformedData} />
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <Link
                to={getSubEntryPath(
                  accession,
                  subEntryId,
                  TabLocation.FeatureViewer
                )}
              >
                Feature viewer
              </Link>
            )
          }
          id={TabLocation.FeatureViewer}
        >
          {smallScreen ? (
            <Redirect
              to={getSubEntryPath(
                Namespace.uniparc,
                match.params.accession,
                TabLocation.Entry
              )}
            />
          ) : (
            <>
              <HTMLHead
                title={[
                  transformedData.entry.uniParcId,
                  'Feature viewer',
                  searchableNamespaceLabels[Namespace.uniparc],
                ]}
              />
              {transformedData.entry.sequenceFeatures &&
              transformedData.entry.sequence?.value ? (
                <div className="wider-tab-content">
                  <UniParcFeaturesView
                    data={transformedData.entry.sequenceFeatures}
                    sequence={transformedData.entry.sequence?.value}
                  />
                </div>
              ) : (
                'No features available'
              )}
            </>
          )}
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default SubEntry;
