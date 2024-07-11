// TODO: fix import order
import { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
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

import useDataApi from '../../../shared/hooks/useDataApi';

import { getSubEntryPath } from '../../utils/subEntry';
import uniParcSubEntryConverter from '../../adapters/uniParcSubEntryConverter';
import { hasStructure } from './SubEntryStructureSection';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

import { Location, LocationToPath } from '../../../app/config/urls';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import SubEntrySection, { TabLocation } from '../../types/subEntry';
import { UniParcAPIModel } from '../../adapters/uniParcConverter';

import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';

const SubEntry = () => {
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
    return 'TODO: handle this';
  }
  const transformedData = uniParcSubEntryConverter(
    uniparcData.data,
    subEntryId
  );
  // TODO: handle when no xrefsForId
  if (!transformedData) {
    return 'TODO: handle this';
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
            transformedData.entry.uniParcId,
            searchableNamespaceLabels[Namespace.uniparc],
          ]}
        />
        <h1>
          <EntryTitle
            mainTitle="UniParc"
            optionalTitle={`${transformedData.entry.uniParcId} · ${subEntryId}`}
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
      </Tabs>
    </SidebarLayout>
  );
};

export default SubEntry;
