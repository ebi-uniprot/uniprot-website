import { useMemo, useEffect, FC, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import {
  Link,
  useRouteMatch,
  useHistory,
  generatePath,
} from 'react-router-dom';
import {
  InPageNav,
  Loader,
  DownloadIcon,
  DropdownButton,
  Tabs,
  Tab,
} from 'franklin-sites';
import cn from 'classnames';
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
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ObsoleteEntryPage from '../../../shared/components/error-pages/ObsoleteEntryPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import BasketStatus from '../../../basket/BasketStatus';
import CommunityAnnotationLink from './CommunityAnnotationLink';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { addMessage } from '../../../messages/state/messagesActions';

import { hasExternalLinks, getListOfIsoformAccessions } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import lazy from '../../../shared/utils/lazy';
import apiUrls from '../../../shared/config/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import { fileFormatEntryDownload } from '../../config/download';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniProtKbConverter, {
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';
import generatePageTitle from '../../adapters/generatePageTitle';

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

const Entry: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const match = useRouteMatch<{ accession: string; subPage?: TabLocation }>(
    LocationToPath[Location.UniProtKBEntry]
  );

  // if URL doesn't finish with "entry" redirect to /entry by default
  useEffect(() => {
    if (match && !match.params.subPage) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[Location.UniProtKBEntry], {
          accession: match.params.accession,
          subPage: TabLocation.Entry,
        }),
      });
    }
  }, [match, history]);

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry(match?.params.accession, Namespace.uniprotkb)
    );

  const [transformedData, pageTitle] = useMemo(() => {
    if (!data) {
      return [];
    }
    const transformedData = uniProtKbConverter(data);
    return [transformedData, generatePageTitle(transformedData)];
  }, [data]);

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

  useEffect(() => {
    if (redirectedTo && match?.params.subPage !== TabLocation.History) {
      const split = redirectedTo.split('/');
      const newEntry = split[split.length - 1];
      dispatch(
        addMessage({
          id: 'job-id',
          content: `${match?.params.accession} has been merged into ${newEntry}. You have automatically been redirected.`,
          format: MessageFormat.IN_PAGE,
          level: MessageLevel.SUCCESS,
          dateActive: Date.now(),
          dateExpired: Date.now(),
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

  if (
    loading ||
    !data ||
    // if we're gonna redirect, show loading in the meantime
    (redirectedTo && match?.params.subPage !== TabLocation.History)
  ) {
    return <Loader progress={progress} />;
  }

  const isObsolete = Boolean(
    transformedData?.entryType === EntryType.INACTIVE &&
      transformedData.inactiveReason
  );

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
        historyOldEntry ? null : (
          <ErrorBoundary>
            <HTMLHead
              title={[
                pageTitle,
                searchableNamespaceLabels[Namespace.uniprotkb],
              ]}
            />
            <h1 className="big">
              <EntryTitle
                mainTitle={data.primaryAccession}
                optionalTitle={data.uniProtkbId}
                entryType={data.entryType}
              />
              <BasketStatus id={data.primaryAccession} className="big" />
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
              className={
                historyOldEntry && !isObsolete ? helper.disabled : undefined
              }
              tabIndex={historyOldEntry && !isObsolete ? -1 : undefined}
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
          {isObsolete ? (
            <ObsoleteEntryPage
              accession={match.params.accession}
              details={transformedData.inactiveReason}
            />
          ) : (
            <>
              <div className="button-group">
                <BlastButton selectedEntries={[match.params.accession]} />
                <AlignButton
                  selectedEntries={[
                    match.params.accession,
                    ...listOfIsoformAccessions,
                  ]}
                />
                <DropdownButton
                  label={
                    <>
                      <DownloadIcon />
                      Download
                    </>
                  }
                  variant="tertiary"
                >
                  <div className="dropdown-menu__content">
                    <ul>
                      {fileFormatEntryDownload.map((fileFormat) => (
                        <li key={fileFormat}>
                          <a
                            href={apiUrls.entryDownload(
                              transformedData.primaryAccession,
                              fileFormat
                            )}
                          >
                            {fileFormat}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DropdownButton>
                <AddToBasketButton selectedEntries={match.params.accession} />
                <CommunityAnnotationLink accession={match.params.accession} />
                <a
                  href={externalUrls.CommunityCurationAdd(
                    match.params.accession
                  )}
                  className="button tertiary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Add a publication
                </a>
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
