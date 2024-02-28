import { useMemo, useEffect, Suspense, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { InPageNav, Loader, Tabs, Tab, Chip, LongNumber } from 'franklin-sites';
import cn from 'classnames';
import { frame } from 'timing-functions';

import EntrySection from '../../types/entrySection';
import ContactLink from '../../../contact/components/ContactLink';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryMain from './EntryMain';

import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import BasketStatus from '../../../basket/BasketStatus';
import CommunityAnnotationLink from './CommunityAnnotationLink';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useMatchWithRedirect from '../../../shared/hooks/useMatchWithRedirect';
import {
  useMediumScreen,
  useSmallScreen,
} from '../../../shared/hooks/useMatchMedia';
import useStructuredData from '../../../shared/hooks/useStructuredData';

import { addMessage } from '../../../messages/state/messagesActions';

import { getListOfIsoformAccessions } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import lazy from '../../../shared/utils/lazy';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import { stringifyQuery } from '../../../shared/utils/url';

import uniProtKbConverter, {
  UniProtkbAPIModel,
  UniProtkbUIModel,
} from '../../adapters/uniProtkbConverter';
import generatePageTitle from '../../adapters/generatePageTitle';
import { subcellularLocationSectionHasContent } from './SubcellularLocationSection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import dataToSchema from './entry.structured';

import {
  LocationToPath,
  Location,
  getEntryPath,
} from '../../../app/config/urls';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';
import {
  MessageLevel,
  MessageFormat,
  MessageTag,
} from '../../../messages/types/messagesTypes';
import { TabLocation } from '../../types/entry';
import { DatabaseCategory } from '../../types/databaseRefs';

import helper from '../../../shared/styles/helper.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import '../../../shared/components/entry/styles/entry-page.scss';
import { extractIsoformNames } from '../../adapters/extractIsoformsConverter';

const legacyToNewSubPages = {
  protvista: TabLocation.FeatureViewer,
  'features-viewer': TabLocation.FeatureViewer,
  'variants-viewer': TabLocation.VariantViewer,
};

const VariationViewerTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-variation-viewer" */ './tabs/variation-viewer/VariationViewer'
    )
);

const FeatureViewerTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-feature-viewer" */ './tabs/FeatureViewer'
    )
);

const GenomicCoordinatesTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-genomic-coordinates" */ './tabs/genomic-coordinates/GenomicCoordinates'
    )
);

const PublicationsTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-publications" */ './tabs/Publications'
    )
);

const ExternalLinksTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-external-links" */ './tabs/ExternalLinks'
    )
);

const HistoryTab = lazy(
  () =>
    import(/* webpackChunkName: "uniprotkb-entry-history" */ './tabs/History')
);

const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ id }) => {
    const data = transformedData[id];
    return Boolean('xrefData' in data && data.xrefData?.length);
  });

const Entry = () => {
  const dispatch = useMessagesDispatch();
  const history = useHistory();
  const match = useMatchWithRedirect<{
    accession: string;
    subPage?: TabLocation;
  }>(
    Location.UniProtKBEntry,
    TabLocation,
    TabLocation.Entry,
    legacyToNewSubPages
  );
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const smallScreen = useSmallScreen();
  const mediumScreen = useMediumScreen();

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry.entry(match?.params.accession, Namespace.uniprotkb)
    );

  const variantsHeadPayload = useDataApi(
    match?.params.accession &&
      apiUrls.proteinsApi.variation(match?.params.accession),
    { method: 'HEAD' }
  );

  const coordinatesHeadPayload = useDataApi(
    match?.params.accession &&
      apiUrls.proteinsApi.coordinates(match?.params.accession),
    { method: 'HEAD' }
  );

  const databaseInfoMaps = useDatabaseInfoMaps();

  const [transformedData, pageTitle] = useMemo(() => {
    if (!data || !databaseInfoMaps) {
      return [];
    }
    const transformedData = uniProtKbConverter(data, databaseInfoMaps);
    return [transformedData, generatePageTitle(transformedData)];
  }, [data, databaseInfoMaps]);

  const sections = useMemo(() => {
    if (transformedData) {
      const taxId =
        transformedData[EntrySection.NamesAndTaxonomy].organismData?.taxonId;
      const numberOfIsoforms =
        transformedData[EntrySection.Sequence].alternativeProducts?.isoforms
          .length;
      return UniProtKBEntryConfig.map((section) => {
        const nameAndId = getEntrySectionNameAndId(
          section.id,
          taxId,
          numberOfIsoforms
        );
        let disabled = true;
        switch (nameAndId.id) {
          case EntrySection.ExternalLinks:
            disabled = !hasExternalLinks(transformedData);
            break;
          case EntrySection.SimilarProteins:
            disabled = false;
            break;
          case EntrySection.SubCellularLocation:
            disabled = !subcellularLocationSectionHasContent(
              transformedData[EntrySection.SubCellularLocation]
            );
            break;
          default:
            disabled = !hasContent(transformedData[nameAndId.id]);
        }
        return {
          label: nameAndId.name,
          id: nameAndId.id,
          disabled,
        };
      });
    }
    return [];
  }, [transformedData]);

  const listOfIsoformAccessions = useMemo(
    () => getListOfIsoformAccessions(data),
    [data]
  );

  const listOfIsoformNames = useMemo(() => extractIsoformNames(data), [data]);

  // Redirect to new entry when obsolete and merged into one
  useEffect(() => {
    if (
      redirectedTo &&
      match?.params.accession &&
      match?.params.subPage !== TabLocation.History
    ) {
      const split = new URL(redirectedTo).pathname.split('/');
      const newEntry = split[split.length - 1];
      // If the redirection is because of ID or version in which case, the following message doesn't make sense
      if (
        !match?.params.accession.includes('_') &&
        !match?.params.accession.includes('.')
      ) {
        dispatch(
          addMessage({
            id: 'accession-merge',
            content: (
              <>
                {match.params.accession} has been merged into {newEntry}. You
                have automatically been redirected. To see{' '}
                {match.params.accession}
                &apos;s history,{' '}
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    match.params.accession,
                    TabLocation.History
                  )}
                >
                  click here
                </Link>
                .
              </>
            ),
            format: MessageFormat.IN_PAGE,
            level: MessageLevel.SUCCESS,
            tag: MessageTag.REDIRECT,
          })
        );
      }
      frame().then(() => {
        // If accession contains version, it should be redirected to History tab
        const activeTab = match?.params.accession.includes('.')
          ? TabLocation.History
          : TabLocation.Entry;
        history.replace(getEntryPath(Namespace.uniprotkb, newEntry, activeTab));
      });
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, redirectedTo]);

  useEffect(() => {
    if (match?.params.accession.includes('-')) {
      const [accession] = match.params.accession.split('-');
      history.replace({
        pathname: getEntryPath(
          Namespace.uniprotkb,
          accession,
          TabLocation.Entry
        ),
        hash: match.params.accession,
      });
    }
  }, [history, match?.params.accession]);

  const isObsolete = Boolean(
    transformedData?.entryType === EntryType.INACTIVE &&
      transformedData.inactiveReason
  );

  // Redirect to history when obsolete and not merged into a single new one
  useEffect(() => {
    if (
      isObsolete &&
      match?.params.accession &&
      match?.params.subPage !== TabLocation.History
    ) {
      frame().then(() => {
        history.replace(
          getEntryPath(
            Namespace.uniprotkb,
            match?.params.accession,
            TabLocation.History
          )
        );
      });
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isObsolete]);

  const structuredData = useMemo(() => dataToSchema(data), [data]);
  useStructuredData(structuredData);

  if (
    loading ||
    !data ||
    // if we're gonna redirect, show loading in the meantime
    (redirectedTo && match?.params.subPage !== TabLocation.History)
  ) {
    if (error) {
      return <ErrorHandler status={status} />;
    }
    return <Loader progress={progress} />;
  }

  // If there is redirection in place (might be an obsolete entry or an ID link), use the primary accession instead of match params
  const accession = redirectedTo
    ? data.primaryAccession
    : match?.params.accession || '';

  let importedVariants: number | 'loading' = 0;
  if (variantsHeadPayload.loading) {
    importedVariants = 'loading';
  } else {
    const count = +(variantsHeadPayload.headers?.['x-feature-records'] ?? 0);
    if (variantsHeadPayload.status === 200 && !Number.isNaN(count)) {
      importedVariants = count;
    }
  }

  let hasGenomicCoordinates: boolean | 'loading' = false;
  if (coordinatesHeadPayload.loading) {
    hasGenomicCoordinates = 'loading';
  } else {
    hasGenomicCoordinates = coordinatesHeadPayload.status === 200;
  }

  if (error || !match?.params.accession || !transformedData) {
    return <ErrorHandler status={status} />;
  }

  const entrySidebar = (
    <InPageNav sections={sections} rootElement={`.${sidebarStyles.content}`} />
  );

  const publicationsSideBar = <EntryPublicationsFacets accession={accession} />;

  let sidebar = null;
  if (!isObsolete) {
    if (match.params.subPage === TabLocation.Publications) {
      sidebar = publicationsSideBar;
    } else if (match.params.subPage === TabLocation.Entry) {
      sidebar = entrySidebar;
    }
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <HTMLHead>
        <link rel="canonical" href={window.location.href} />
      </HTMLHead>
      {isObsolete ? (
        <h3>{match.params.accession}</h3>
      ) : (
        <ErrorBoundary>
          <HTMLHead
            title={[pageTitle, searchableNamespaceLabels[Namespace.uniprotkb]]}
          />
          <h1>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
            <BasketStatus id={data.primaryAccession} className="small" />
          </h1>
          <ProteinOverview data={data} />
        </ErrorBoundary>
      )}
      <Tabs active={match.params.subPage}>
        <Tab
          title={
            <Link
              className={isObsolete ? helper.disabled : undefined}
              tabIndex={isObsolete ? -1 : undefined}
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.Entry
              )}
            >
              Entry
            </Link>
          }
          id={TabLocation.Entry}
        >
          {!isObsolete && (
            <>
              {displayDownloadPanel && (
                <EntryDownloadPanel
                  handleToggle={handleToggleDownload}
                  isoformsAvailable={Boolean(listOfIsoformAccessions.length)}
                />
              )}
              <div className="button-group">
                <BlastButton selectedEntries={[accession]} />
                {listOfIsoformAccessions.length > 1 && (
                  <AlignButton selectedEntries={listOfIsoformAccessions} />
                )}
                <EntryDownloadButton handleToggle={handleToggleDownload} />
                <AddToBasketButton selectedEntries={accession} />
                <CommunityAnnotationLink accession={accession} />
                <a
                  href={externalUrls.CommunityCurationAdd(accession)}
                  className="button tertiary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add a publication
                </a>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <ContactLink
                  to={{
                    pathname: LocationToPath[Location.ContactUpdate],
                    search: stringifyQuery({
                      entry: accession,
                      entryType:
                        transformedData?.entryType === EntryType.REVIEWED
                          ? 'Reviewed (Swiss-Prot)'
                          : 'Unreviewed (TrEMBL)',
                    }),
                  }}
                  className="button tertiary"
                >
                  Entry feedback
                </ContactLink>
              </div>
              <EntryMain
                transformedData={transformedData}
                importedVariants={importedVariants}
                hasGenomicCoordinates={hasGenomicCoordinates}
                isoforms={listOfIsoformNames}
              />
            </>
          )}
        </Tab>
        <Tab
          title={
            <Link
              className={cn({
                [helper.disabled]:
                  importedVariants === 'loading' || !importedVariants,
                loading: importedVariants === 'loading',
              })}
              tabIndex={
                importedVariants !== 'loading' && importedVariants
                  ? undefined
                  : -1
              }
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                importedVariants === 'loading' || !importedVariants
                  ? TabLocation.Entry
                  : TabLocation.VariantViewer
              )}
            >
              Variant viewer
              {!mediumScreen &&
                importedVariants !== 'loading' &&
                importedVariants > 0 && (
                  <>
                    {' '}
                    <Chip compact>
                      <LongNumber>{importedVariants}</LongNumber>
                    </Chip>
                  </>
                )}
            </Link>
          }
          id={TabLocation.VariantViewer}
          onPointerOver={VariationViewerTab.preload}
          onFocus={VariationViewerTab.preload}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <HTMLHead
                title={[
                  pageTitle,
                  'Variants viewer',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <VariationViewerTab
                importedVariants={importedVariants}
                primaryAccession={accession}
                title="Variants"
              />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <Link
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.FeatureViewer
                )}
              >
                Feature viewer
              </Link>
            )
          }
          id={TabLocation.FeatureViewer}
          onPointerOver={FeatureViewerTab.preload}
          onFocus={FeatureViewerTab.preload}
        >
          {smallScreen ? (
            <Redirect
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.Entry
              )}
            />
          ) : (
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <HTMLHead
                  title={[
                    pageTitle,
                    'Feature viewer',
                    searchableNamespaceLabels[Namespace.uniprotkb],
                  ]}
                />
                <FeatureViewerTab accession={accession} />
              </ErrorBoundary>
            </Suspense>
          )}
        </Tab>
        <Tab
          title={
            <Link
              className={cn({
                [helper.disabled]:
                  hasGenomicCoordinates === 'loading' || !hasGenomicCoordinates,
                loading: hasGenomicCoordinates === 'loading',
              })}
              tabIndex={
                hasGenomicCoordinates !== 'loading' && hasGenomicCoordinates
                  ? undefined
                  : -1
              }
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                hasGenomicCoordinates === 'loading' || !hasGenomicCoordinates
                  ? TabLocation.Entry
                  : TabLocation.GenomicCoordinates
              )}
            >
              Genomic coordinates
            </Link>
          }
          id={TabLocation.GenomicCoordinates}
          onPointerOver={GenomicCoordinatesTab.preload}
          onFocus={GenomicCoordinatesTab.preload}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <HTMLHead
                title={[
                  pageTitle,
                  'Genomic coordinates',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <GenomicCoordinatesTab
                primaryAccession={accession}
                isoforms={
                  transformedData[EntrySection.Sequence].alternativeProducts
                    ?.isoforms
                }
                maneSelect={
                  // Get all unique unversioned MANE-Select IDs
                  new Set(
                    transformedData[EntrySection.Sequence].xrefData
                      ?.find(
                        (xrefDatum) =>
                          xrefDatum.category === DatabaseCategory.GENOME
                      )
                      ?.databases.find(
                        (database) => database.database === 'MANE-Select'
                      )
                      ?.xrefs.map((xref) => xref.id?.split('.')[0])
                      .filter((id: string | undefined): id is string =>
                        Boolean(id)
                      )
                  )
                }
                title="Genomic coordinates"
              />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              className={isObsolete ? helper.disabled : undefined}
              tabIndex={isObsolete ? -1 : undefined}
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.Publications
              )}
            >
              Publications
            </Link>
          }
          id={TabLocation.Publications}
          onPointerOver={PublicationsTab.preload}
          onFocus={PublicationsTab.preload}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <div className="button-group">
                <CommunityAnnotationLink accession={accession} />
                <a
                  href={externalUrls.CommunityCurationAdd(accession)}
                  className="button tertiary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add a publication
                </a>
              </div>
              <HTMLHead
                title={[
                  pageTitle,
                  'Publications',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <PublicationsTab accession={accession} />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              className={isObsolete ? helper.disabled : undefined}
              tabIndex={isObsolete ? -1 : undefined}
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.ExternalLinks
              )}
            >
              External links
            </Link>
          }
          id={TabLocation.ExternalLinks}
          onPointerOver={ExternalLinksTab.preload}
          onFocus={ExternalLinksTab.preload}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <HTMLHead
                title={[
                  pageTitle,
                  'External links',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <ExternalLinksTab transformedData={transformedData} />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              to={getEntryPath(
                Namespace.uniprotkb,
                accession,
                TabLocation.History
              )}
            >
              History
            </Link>
          }
          id={TabLocation.History}
          onPointerOver={HistoryTab.preload}
          onFocus={HistoryTab.preload}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <HTMLHead
                title={[
                  isObsolete ? accession : pageTitle,
                  'History',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <HistoryTab accession={accession} />
            </ErrorBoundary>
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default Entry;
