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

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import {
  MessageLevel,
  MessageFormat,
  MessageType,
  MessageTag,
} from '../../../messages/types/messagesTypes';

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

import { LocationToPath, Location } from '../../../app/config/urls';
import { Namespace } from '../../../shared/types/namespaces';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';

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

  const { loading, data, status, error, redirectedTo } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry(match?.params.accession, Namespace.uniprotkb)
    );

  const transformedData = useMemo(
    () => data && uniProtKbConverter(data),
    [data]
  );

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

  if (loading || !data) {
    return <Loader />;
  }

  if (
    transformedData &&
    transformedData.entryType === EntryType.INACTIVE &&
    transformedData.inactiveReason
  ) {
    if (!match) {
      return <ErrorHandler />;
    }

    return (
      <ObsoleteEntryPage
        accession={match.params.accession}
        details={transformedData.inactiveReason}
      />
    );
  }

  if (error || !match?.params.accession || !transformedData) {
    return <ErrorHandler status={status} />;
  }

  if (redirectedTo) {
    const message: MessageType = {
      id: 'job-id',
      content: `You are seeing the results from: ${redirectedTo}.`,
      format: MessageFormat.IN_PAGE,
      level: MessageLevel.SUCCESS,
      dateActive: Date.now(),
      dateExpired: Date.now(),
      tag: MessageTag.REDIRECT,
    };

    dispatch(addMessage(message));
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

  let sidebar;

  switch (match.params.subPage) {
    case TabLocation.FeatureViewer:
    case TabLocation.ExternalLinks:
    case TabLocation.History:
      sidebar = emptySidebar;
      break;

    case TabLocation.Publications:
      sidebar = publicationsSideBar;
      break;

    default:
      sidebar = entrySidebar;
      break;
  }

  return (
    <SideBarLayout
      sidebar={sidebar}
      className={cn('entry-page', sticky['sticky-tabs-container'])}
      title={
        <ErrorBoundary>
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
      }
    >
      <Tabs active={match.params.subPage}>
        <Tab
          cache
          title={
            <Link
              to={{
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.Entry}`,
                hash: undefined,
              }}
            >
              Entry
            </Link>
          }
          id={TabLocation.Entry}
        >
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
              href={externalUrls.CommunityCurationAdd(match.params.accession)}
              className="button tertiary"
              target="_blank"
              rel="noreferrer"
            >
              Add a publication
            </a>
          </div>
          <EntryMain transformedData={transformedData} />
        </Tab>
        <Tab
          title={
            <Link
              to={{
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.FeatureViewer}`,
                hash: undefined,
              }}
            >
              Feature viewer
            </Link>
          }
          id={TabLocation.FeatureViewer}
          onPointerOver={FeatureViewer.preload}
          onFocus={FeatureViewer.preload}
        >
          <Suspense fallback={<Loader />}>
            <FeatureViewer accession={match.params.accession} />
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              to={{
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.Publications}`,
                hash: undefined,
              }}
            >
              Publications
            </Link>
          }
          id={TabLocation.Publications}
          onPointerOver={EntryPublications.preload}
          onFocus={EntryPublications.preload}
        >
          <Suspense fallback={<Loader />}>
            <EntryPublications accession={match.params.accession} />
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              to={{
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.ExternalLinks}`,
                hash: undefined,
              }}
            >
              External links
            </Link>
          }
          id={TabLocation.ExternalLinks}
          onPointerOver={EntryExternalLinks.preload}
          onFocus={EntryExternalLinks.preload}
        >
          <Suspense fallback={<Loader />}>
            <EntryExternalLinks transformedData={transformedData} />
          </Suspense>
        </Tab>
        <Tab
          title={
            <Link
              to={{
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.History}`,
                hash: undefined,
              }}
            >
              History
            </Link>
          }
          id={TabLocation.History}
          onPointerOver={EntryHistory.preload}
          onFocus={EntryHistory.preload}
        >
          <Suspense fallback={<Loader />}>
            <EntryHistory transformedData={transformedData} />
          </Suspense>
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default Entry;
