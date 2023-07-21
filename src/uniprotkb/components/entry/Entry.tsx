import { useMemo, useEffect, Suspense } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { InPageNav, Loader, Tabs, Tab } from 'franklin-sites';
import cn from 'classnames';
import qs from 'query-string';
import { frame } from 'timing-functions';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import ContactLink from '../../../contact/components/ContactLink';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryMain from './EntryMain';

import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import EntryDownload from '../../../shared/components/entry/EntryDownload';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import BasketStatus from '../../../basket/BasketStatus';
import CommunityAnnotationLink from './CommunityAnnotationLink';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useMatchWithRedirect from '../../../shared/hooks/useMatchWithRedirect';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import { addMessage } from '../../../messages/state/messagesActions';

import { hasExternalLinks, getListOfIsoformAccessions } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import lazy from '../../../shared/utils/lazy';
import apiUrls, { proteinsApi } from '../../../shared/config/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';
import generatePageTitle from '../../adapters/generatePageTitle';
import { subcellularLocationSectionHasContent } from './SubcellularLocationSection';

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

import helper from '../../../shared/styles/helper.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import '../../../shared/components/entry/styles/entry-page.scss';

export enum TabLocation {
  Entry = 'entry',
  VariantViewer = 'variant-viewer',
  FeatureViewer = 'feature-viewer',
  GenomicCoordinates = 'genomic-coordinates',
  Publications = 'publications',
  ExternalLinks = 'external-links',
  History = 'history',
}

const legacyToNewSubPages = {
  protvista: TabLocation.FeatureViewer,
  'features-viewer': TabLocation.FeatureViewer,
  'variants-viewer': TabLocation.VariantViewer,
};

const VariationViewer = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-variation-viewer" */ './tabs/variation-viewer/VariationViewer'
    )
);

const FeatureViewer = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-feature-viewer" */ './tabs/FeatureViewer'
    )
);

const GenomicCoordinates = lazy(
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
  const smallScreen = useSmallScreen();

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry(match?.params.accession, Namespace.uniprotkb)
    );

  const variantsHeadPayload = useDataApi(
    match?.params.accession && proteinsApi.variation(match?.params.accession),
    { method: 'HEAD' }
  );

  const coordinatesHeadPayload = useDataApi(
    match?.params.accession && proteinsApi.coordinates(match?.params.accession),
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
      history.replace(
        // eslint-disable-next-line uniprot-website/use-config-location
        `${getEntryPath(Namespace.uniprotkb, accession, TabLocation.Entry)}#${
          match.params.accession
        }`
      );
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

  const historyOldEntry =
    isObsolete ||
    (redirectedTo && match?.params.subPage === TabLocation.History);

  const hasImportedVariants =
    !variantsHeadPayload.loading && variantsHeadPayload.status === 200;

  const hasCoordinates =
    !coordinatesHeadPayload.loading && coordinatesHeadPayload.status === 200;

  if (error || !match?.params.accession || !transformedData) {
    return <ErrorHandler status={status} />;
  }

  const entrySidebar = (
    <InPageNav sections={sections} rootElement={`.${sidebarStyles.content}`} />
  );

  const publicationsSideBar = (
    <EntryPublicationsFacets accession={match.params.accession} />
  );

  let sidebar = null;
  if (!isObsolete) {
    if (match.params.subPage === TabLocation.Publications) {
      sidebar = publicationsSideBar;
    } else if (match.params.subPage === TabLocation.Entry) {
      sidebar = entrySidebar;
    }
  }

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <HTMLHead>
        <link rel="canonical" href={window.location.href} />
      </HTMLHead>
      {historyOldEntry ? (
        <h1>{match.params.accession}</h1>
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
              className={historyOldEntry ? helper.disabled : undefined}
              tabIndex={historyOldEntry ? -1 : undefined}
              to={getEntryPath(
                Namespace.uniprotkb,
                match.params.accession,
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
              <div className="button-group">
                <BlastButton selectedEntries={[match.params.accession]} />
                {listOfIsoformAccessions.length > 1 && (
                  <AlignButton selectedEntries={listOfIsoformAccessions} />
                )}
                <EntryDownload />
                <AddToBasketButton selectedEntries={match.params.accession} />
                <CommunityAnnotationLink accession={match.params.accession} />
                <a
                  href={externalUrls.CommunityCurationAdd(
                    match.params.accession
                  )}
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
                    search: qs.stringify({
                      entry: match.params.accession,
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
                hasImportedVariants={hasImportedVariants}
              />
            </>
          )}
        </Tab>
        <Tab
          title={
            <Link
              className={hasImportedVariants ? undefined : helper.disabled}
              tabIndex={hasImportedVariants ? undefined : -1}
              to={getEntryPath(
                Namespace.uniprotkb,
                match.params.accession,
                TabLocation.VariantViewer
              )}
            >
              Variant viewer
            </Link>
          }
          id={TabLocation.VariantViewer}
          onPointerOver={VariationViewer.preload}
          onFocus={VariationViewer.preload}
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
              <VariationViewer
                primaryAccession={match.params.accession}
                title="Variants"
              />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <Link
                className={historyOldEntry ? helper.disabled : undefined}
                tabIndex={historyOldEntry ? -1 : undefined}
                to={getEntryPath(
                  Namespace.uniprotkb,
                  match.params.accession,
                  TabLocation.FeatureViewer
                )}
              >
                Feature viewer
              </Link>
            )
          }
          id={TabLocation.FeatureViewer}
          onPointerOver={FeatureViewer.preload}
          onFocus={FeatureViewer.preload}
        >
          {smallScreen ? (
            <Redirect
              to={getEntryPath(
                Namespace.uniprotkb,
                match.params.accession,
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
                <FeatureViewer accession={match.params.accession} />
              </ErrorBoundary>
            </Suspense>
          )}
        </Tab>
        <Tab
          title={
            <Link
              className={hasCoordinates ? undefined : helper.disabled}
              tabIndex={hasCoordinates ? undefined : -1}
              to={getEntryPath(
                Namespace.uniprotkb,
                match.params.accession,
                TabLocation.GenomicCoordinates
              )}
            >
              Genomic coordinates
            </Link>
          }
          id={TabLocation.GenomicCoordinates}
          onPointerOver={GenomicCoordinates.preload}
          onFocus={GenomicCoordinates.preload}
        >
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <HTMLHead
                title={[
                  pageTitle,
                  'Coordinates viewer',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <GenomicCoordinates
                primaryAccession={match.params.accession}
                title="Genomic coordinates"
              />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              className={historyOldEntry ? helper.disabled : undefined}
              tabIndex={historyOldEntry ? -1 : undefined}
              to={getEntryPath(
                Namespace.uniprotkb,
                match.params.accession,
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
                <CommunityAnnotationLink accession={match.params.accession} />
                <a
                  href={externalUrls.CommunityCurationAdd(
                    match.params.accession
                  )}
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
              <PublicationsTab accession={match.params.accession} />
            </ErrorBoundary>
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              className={historyOldEntry ? helper.disabled : undefined}
              tabIndex={historyOldEntry ? -1 : undefined}
              to={getEntryPath(
                Namespace.uniprotkb,
                match.params.accession,
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
                match.params.accession,
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
                  historyOldEntry ? match.params.accession : pageTitle,
                  'History',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <HistoryTab accession={match.params.accession} />
            </ErrorBoundary>
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default Entry;
