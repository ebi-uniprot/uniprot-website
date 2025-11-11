import cn from 'classnames';
import { Loader, Message, Tab, Tabs } from 'franklin-sites';
import { useEffect, useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ContactLink from '../../../contact/components/ContactLink';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../../messages/types/messagesTypes';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import InPageNav from '../../../shared/components/InPageNav';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi, { UseDataAPIState } from '../../../shared/hooks/useDataApi';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import * as logging from '../../../shared/utils/logging';
import uniprotkbUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import { UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import {
  UniParcLiteAPIModel,
  UniParcXRef,
} from '../../adapters/uniParcConverter';
import uniParcSubEntryConverter, {
  UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';
import uniparcApiUrls from '../../config/apiUrls';
import { groupTypesBySection } from '../../config/UniFireAnnotationTypeToSection';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';
import { TabLocation } from '../../types/entry';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryPath } from '../../utils/subEntry';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import SubEntryContext from './SubEntryContext';
import SubEntryMain from './SubEntryMain';
import SubEntryOverview from './SubEntryOverview';
import { hasStructure } from './SubEntryStructureSection';

const getErrorStatus = (
  uniparcData: UseDataAPIState<UniParcLiteAPIModel>,
  subEntryData: UseDataAPIState<SearchResults<UniParcXRef>>,
  unisaveData: UseDataAPIState<UniSaveStatus>
) => {
  if (uniparcData.error) {
    return uniparcData.status;
  } else if (subEntryData.error) {
    return subEntryData.status;
  } else if (unisaveData.error) {
    return unisaveData.status;
  }
  return undefined;
};

const SubEntry = () => {
  const smallScreen = useSmallScreen();
  const dispatch = useMessagesDispatch();
  const match = useRouteMatch<{
    accession: string;
    subPage: string;
    subEntryId: string;
  }>(LocationToPath[Location.UniParcSubEntry]);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [runUniFire, setRunUniFire] = useState(false);

  const { accession, subEntryId, subPage } = match?.params || {};

  const baseURL = `${apiUrls.entry.entry(
    subEntryId && accession,
    Namespace.uniparc
  )}/light`;
  const xrefIdURL = accession
    ? uniparcApiUrls.databases(accession, subEntryId, true)
    : '';

  const uniparcData = useDataApi<UniParcLiteAPIModel>(baseURL);
  const subEntryData = useDataApi<SearchResults<UniParcXRef>>(xrefIdURL);
  const unisaveData = useDataApi<UniSaveStatus>(
    uniprotkbUrls.unisave.status(subEntryId as string)
  );

  const subEntrytaxId = subEntryData.data?.results[0].organism?.taxonId;
  const canLoadUniFire =
    subEntrytaxId &&
    accession &&
    subEntryData.data?.results?.length &&
    subEntryData.data.results[0].organism?.taxonId;
  const uniFireData = useDataApi<UniFireModel>(
    canLoadUniFire && runUniFire
      ? apiUrls.unifire.unifire(accession, `${subEntrytaxId}`)
      : null
  );

  useEffect(() => {
    if (uniFireData.status === 200 && uniFireData.data) {
      dispatch(
        addMessage({
          id: 'load-AA-annotations',
          content: <>Predictions by automatic annotation rules are loaded</>,
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.JOB,
        })
      );
    } else if (uniFireData.status === 204) {
      dispatch(
        addMessage({
          id: 'load-AA-annotations',
          content: <>No predictions generated</>,
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.JOB,
        })
      );
    } else if (uniFireData.error) {
      logging.error(uniFireData.error);
      dispatch(
        addMessage({
          id: 'load-AA-annotations',
          content: <>Encountered error in running the service</>,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          tag: MessageTag.JOB,
        })
      );
    }
  }, [dispatch, uniFireData.data, uniFireData.error, uniFireData.status]);

  if (uniparcData.loading || subEntryData.loading || unisaveData.loading) {
    return (
      <Loader
        progress={
          uniparcData.loading ? uniparcData.progress : subEntryData.progress
        }
      />
    );
  }

  if (
    uniparcData.error ||
    !uniparcData.data ||
    subEntryData.error ||
    !subEntryData.data ||
    unisaveData.error ||
    !unisaveData.data ||
    !match ||
    !accession ||
    !subEntryId
  ) {
    return (
      <ErrorHandler
        status={getErrorStatus(uniparcData, subEntryData, unisaveData)}
        error={uniparcData.error || subEntryData.error || unisaveData.error}
        fullPage
      />
    );
  }

  const transformedData = uniParcSubEntryConverter(
    uniparcData.data,
    subEntryData.data?.results[0],
    unisaveData.data,
    // If no data, it would be an empty string
    uniFireData.data || undefined
  );

  if (!transformedData) {
    return (
      <Redirect
        to={{
          pathname: LocationToPath[Location.UniParcResults],
          search: `query=(dbid:${subEntryId})`,
        }}
      />
    );
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  const sidebar = subPage === TabLocation.Entry && (
    <InPageNav
      sections={Object.values(uniParcSubEntryConfig).map((section) => ({
        ...section,
        disabled:
          (section.id === SubEntrySection.Structure &&
            !hasStructure(transformedData.subEntry)) ||
          (section.id === SubEntrySection.NamesAndTaxonomy &&
            !transformedData.subEntry.proteinName) ||
          (section.id === SubEntrySection.Function &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.Function).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.SubcellularLocation &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.SubcellularLocation).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.Expression &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.Expression).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.ProteinProcessing &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.ProteinProcessing).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.Interaction &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.Interaction).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.FamilyAndDomains &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.FamilyAndDomains).includes(
                p.annotationType
              )
            ) &&
            !transformedData.entry.sequenceFeatures) ||
          (section.id === SubEntrySection.Keywords &&
            !transformedData.unifire?.predictions.some(
              (p) => p.annotationType === 'keyword'
            )),
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
                <Link
                  to={getEntryPath(
                    Namespace.uniparc,
                    accession,
                    TabLocation.Entry
                  )}
                >
                  {accession}
                </Link>
                {`  · ${subEntryId}`}
              </>
            }
          />
        </h1>
        <SubEntryOverview data={transformedData} />
        <Message level="info">
          These pages are in beta version, please{' '}
          <ContactLink>
            provide feedback about them through our contact form
          </ContactLink>
          .
        </Message>
        <SubEntryContext
          subEntryId={subEntryId}
          data={unisaveData.data}
          showUniFireOption={!!canLoadUniFire}
          uniFireData={uniFireData.data}
          uniFireLoading={uniFireData.loading}
          runUniFire={runUniFire}
          setRunUniFire={setRunUniFire}
        />
      </ErrorBoundary>
      <Tabs active={subPage}>
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
              nResults={uniparcData.data?.crossReferenceCount}
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
              to={getSubEntryPath(accession, subEntryId, TabLocation.Entry)}
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
