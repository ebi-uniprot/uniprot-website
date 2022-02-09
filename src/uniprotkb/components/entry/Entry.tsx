import { useMemo, useEffect, Suspense } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { InPageNav, Loader, Tabs, Tab } from 'franklin-sites';
import cn from 'classnames';
import qs from 'query-string';
import { frame } from 'timing-functions';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import {
  MessageLevel,
  MessageFormat,
  MessageTag,
} from '../../../messages/types/messagesTypes';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryMain from './EntryMain';

import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import EntryDownload from '../../../shared/components/entry/EntryDownload';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import BasketStatus from '../../../basket/BasketStatus';
import CommunityAnnotationLink from './CommunityAnnotationLink';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { useMessagesReducer } from '../../../shared/hooks/useGlobalReducer';

import { addMessage } from '../../../messages/state/messagesActions';

import { hasExternalLinks, getListOfIsoformAccessions } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import lazy from '../../../shared/utils/lazy';
import apiUrls from '../../../shared/config/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';

import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

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
import { ContactLocationState } from '../../../contact/components/ContactForm';

import helper from '../../../shared/styles/helper.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';
import '../../../shared/components/entry/styles/entry-page.scss';

export enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
  Publications = 'publications',
  ExternalLinks = 'external-links',
  History = 'history',
}

const FeatureViewer = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-feature-viewer" */ './FeatureViewer'
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
  const [, dispatch] = useMessagesReducer();
  const history = useHistory();
  const match = useRouteMatch<{ accession: string; subPage?: TabLocation }>(
    LocationToPath[Location.UniProtKBEntry]
  );

  // if URL doesn't finish with "entry" redirect to /entry by default
  useEffect(() => {
    if (match && !match.params.subPage) {
      history.replace({
        ...history.location,
        pathname: getEntryPath(
          Namespace.uniprotkb,
          match.params.accession,
          TabLocation.Entry
        ),
      });
    }
  }, [match, history]);

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry(match?.params.accession, Namespace.uniprotkb)
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
              transformedData['subcellular-location']
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
      dispatch(
        addMessage({
          id: 'accession-merge',
          content: (
            <>
              {match.params.accession} has been merged into {newEntry}. You have
              automatically been redirected. To see {match.params.accession}
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
      frame().then(() => {
        history.replace(
          getEntryPath(Namespace.uniprotkb, newEntry, TabLocation.Entry)
        );
      });
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, redirectedTo]);

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
    return <Loader progress={progress} />;
  }

  const historyOldEntry =
    isObsolete ||
    (redirectedTo && match?.params.subPage === TabLocation.History);

  if (error || !match?.params.accession || !transformedData) {
    return <ErrorHandler status={status} />;
  }

  const entrySidebar = (
    <InPageNav sections={sections} rootElement=".sidebar-layout__content" />
  );

  const publicationsSideBar = (
    <EntryPublicationsFacets accession={match.params.accession} />
  );

  const emptySidebar = (
    <div className="sidebar-layout__sidebar-content--empty" />
  );

  let sidebar = emptySidebar;
  if (!isObsolete) {
    if (match.params.subPage === TabLocation.Publications) {
      sidebar = publicationsSideBar;
    } else if (match.params.subPage === TabLocation.Entry) {
      sidebar = entrySidebar;
    }
  }

  return (
    <SideBarLayout
      sidebar={sidebar}
      className={cn('entry-page', sticky['sticky-tabs-container'])}
      title={
        historyOldEntry ? (
          <h1>{match.params.accession}</h1>
        ) : (
          <ErrorBoundary>
            <HTMLHead
              title={[
                pageTitle,
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
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
        )
      }
    >
      <Tabs active={match.params.subPage}>
        <Tab
          cache={!historyOldEntry}
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
                <AlignButton
                  selectedEntries={[
                    match.params.accession,
                    ...listOfIsoformAccessions,
                  ]}
                />
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
                <Link<ContactLocationState>
                  to={(location) => ({
                    pathname: LocationToPath[Location.ContactUpdate],
                    search: qs.stringify({
                      entry: match.params.accession,
                      entryType:
                        transformedData?.entryType === EntryType.REVIEWED
                          ? 'Reviewed (Swiss-Prot)'
                          : 'Unreviewed (TrEMBL)',
                    }),
                    state: { referrer: location },
                  })}
                  className="button tertiary"
                >
                  Entry feedback
                </Link>
              </div>
              <EntryMain transformedData={transformedData} />
            </>
          )}
        </Tab>
        <Tab
          title={
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
          }
          id={TabLocation.FeatureViewer}
          onPointerOver={FeatureViewer.preload}
          onFocus={FeatureViewer.preload}
        >
          <Suspense fallback={<Loader />}>
            <HTMLHead
              title={[
                pageTitle,
                'Feature viewer',
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <FeatureViewer accession={match.params.accession} />
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
          onPointerOver={EntryPublications.preload}
          onFocus={EntryPublications.preload}
        >
          <Suspense fallback={<Loader />}>
            <HTMLHead
              title={[
                pageTitle,
                'Publications',
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <EntryPublications accession={match.params.accession} />
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
                match.params.accession,
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
                historyOldEntry ? match.params.accession : pageTitle,
                'History',
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <EntryHistory accession={match.params.accession} />
          </Suspense>
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default Entry;
