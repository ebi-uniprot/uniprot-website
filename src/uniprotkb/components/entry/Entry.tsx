import { useMemo, useEffect, Suspense, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { InPageNav, Loader, Tabs, Tab } from 'franklin-sites';
import joinUrl from 'url-join';
import cn from 'classnames';
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
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useStructuredData from '../../../shared/hooks/useStructuredData';

import { addMessage } from '../../../messages/state/messagesActions';

import { hasExternalLinks, getListOfIsoformAccessions } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import lazy from '../../../shared/utils/lazy';
import apiUrls, { proteinsApi } from '../../../shared/config/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import { stringifyQuery } from '../../../shared/utils/url';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';
import generatePageTitle from '../../adapters/generatePageTitle';
import { subcellularLocationSectionHasContent } from './SubcellularLocationSection';

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
import { Dataset } from '../../../shared/components/entry/EntryDownload';

import helper from '../../../shared/styles/helper.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import '../../../shared/components/entry/styles/entry-page.scss';

export enum TabLocation {
  Entry = 'entry',
  VariantViewer = 'variant-viewer',
  FeatureViewer = 'feature-viewer',
  Publications = 'publications',
  ExternalLinks = 'external-links',
  History = 'history',
}

const legacyToNewSubPages = {
  protvista: TabLocation.FeatureViewer,
  'features-viewer': TabLocation.FeatureViewer,
  'variants-viewer': TabLocation.VariantViewer,
};

const FeatureViewer = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-feature-viewer" */ './FeatureViewer'
    )
);

const VariationView = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-variation-view" */ '../protein-data-views/VariationView'
    )
);

const EntryPublications = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-history" */ './EntryPublications'
    )
);

const EntryExternalLinks = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-external-links" */ './EntryExternalLinks'
    )
);

const EntryHistory = lazy(
  () =>
    import(/* webpackChunkName: "uniprotkb-entry-history" */ './EntryHistory')
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
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const smallScreen = useSmallScreen();

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry(match?.params.accession, Namespace.uniprotkb)
    );

  const variantsHeadPayload = useDataApi(
    match?.params.accession &&
      joinUrl(apiUrls.variation, match?.params.accession),
    { method: 'HEAD' }
  );

  const proteinsAPIDatasets = [];
  const proteinsApiVariation = useDataApi(
    match?.params.accession &&
      joinUrl(proteinsApi.variation(match.params.accession)),
    { method: 'HEAD' }
  );

  const proteinsApiPTMs = useDataApi(
    match?.params.accession &&
      joinUrl(proteinsApi.proteomicsPtm(match.params.accession)),
    { method: 'HEAD' }
  );

  const proteinsApiCoordinates = useDataApi(
    match?.params.accession &&
      joinUrl(proteinsApi.coordinates(match.params.accession)),
    { method: 'HEAD' }
  );

  if (!proteinsApiVariation.loading && proteinsApiVariation.status === 200) {
    proteinsAPIDatasets.push(Dataset.variation);
  }
  if (!proteinsApiPTMs.loading && proteinsApiPTMs.status === 200) {
    proteinsAPIDatasets.push(Dataset.proteomicsPtm);
  }
  if (
    !proteinsApiCoordinates.loading &&
    proteinsApiCoordinates.status === 200
  ) {
    proteinsAPIDatasets.push(Dataset.coordinates);
  }

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

  const hasImportedVariants =
    !variantsHeadPayload.loading && variantsHeadPayload.status === 200;

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
          <h3>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
            <BasketStatus id={data.primaryAccession} className="small" />
          </h3>
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
                  availableDatasets={proteinsAPIDatasets}
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
                accession,
                TabLocation.VariantViewer
              )}
            >
              Variant viewer
            </Link>
          }
          id={TabLocation.VariantViewer}
          onPointerOver={VariationView.preload}
          onFocus={VariationView.preload}
        >
          <Suspense fallback={<Loader />}>
            <HTMLHead
              title={[
                pageTitle,
                'Variants viewer',
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <VariationView primaryAccession={accession} title="Variants" />
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
          onPointerOver={FeatureViewer.preload}
          onFocus={FeatureViewer.preload}
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
              <HTMLHead
                title={[
                  pageTitle,
                  'Feature viewer',
                  searchableNamespaceLabels[Namespace.uniprotkb],
                ]}
              />
              <FeatureViewer accession={accession} />
            </Suspense>
          )}
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
          onPointerOver={EntryPublications.preload}
          onFocus={EntryPublications.preload}
        >
          <Suspense fallback={<Loader />}>
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
            <EntryPublications accession={accession} />
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
          onPointerOver={EntryExternalLinks.preload}
          onFocus={EntryExternalLinks.preload}
        >
          <Suspense fallback={<Loader />}>
            <HTMLHead
              title={[
                pageTitle,
                'External links',
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <EntryExternalLinks transformedData={transformedData} />
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
          onPointerOver={EntryHistory.preload}
          onFocus={EntryHistory.preload}
        >
          <Suspense fallback={<Loader />}>
            <HTMLHead
              title={[
                isObsolete ? match.params.accession : pageTitle,
                'History',
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <EntryHistory accession={accession} />
          </Suspense>
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default Entry;
