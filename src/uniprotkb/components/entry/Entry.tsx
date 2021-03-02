import { useMemo, useEffect, FC } from 'react';
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
import FeatureViewer from './FeatureViewer';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import EntryPublications from './EntryPublications';
import EntryMain from './EntryMain';
import EntryExternalLinks from './EntryExternalLinks';

import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ObsoleteEntryPage from '../../../shared/components/error-pages/ObsoleteEntryPage';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';

import { addMessage } from '../../../messages/state/messagesActions';

import { hasExternalLinks, getListOfIsoformAccessions } from '../../utils';
import { hasContent } from '../../../shared/utils/utils';
import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';
import { fileFormatEntryDownload } from '../../config/download';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniProtKbConverter, {
  EntryType,
  UniProtkbAPIModel,
} from '../../adapters/uniProtkbConverter';

import '../../../shared/components/entry/styles/entry-page.scss';
import '../../../shared/styles/sticky.scss';
import { Namespace } from '../../../shared/types/namespaces';

enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
  Publications = 'publications',
  ExternalLinks = 'external-links',
}

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

  const {
    loading,
    data,
    status,
    error,
    redirectedTo,
  } = useDataApi<UniProtkbAPIModel>(
    apiUrls.entry(match?.params.accession, Namespace.uniprotkb)
  );

  const transformedData = useMemo(() => data && uniProtKbConverter(data), [
    data,
  ]);

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
    return false;
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
      className="entry-page sticky-tabs-container"
      title={
        <ErrorBoundary>
          <h2>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </h2>
          <ProteinOverview data={data} />
        </ErrorBoundary>
      }
    >
      <Tabs active={match.params.subPage}>
        <Tab
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.Entry}`,
                hash: undefined,
              })}
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
            <AddToBasketButton selectedEntries={[match.params.accession]} />
          </div>
          <EntryMain transformedData={transformedData} />
        </Tab>
        <Tab
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.FeatureViewer}`,
                hash: undefined,
              })}
            >
              Feature viewer
            </Link>
          }
          id={TabLocation.FeatureViewer}
        >
          <FeatureViewer accession={match.params.accession} />
        </Tab>
        <Tab
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.Publications}`,
                hash: undefined,
              })}
            >
              Publications
            </Link>
          }
          id={TabLocation.Publications}
        >
          <EntryPublications accession={match.params.accession} />
        </Tab>
        <Tab
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/uniprotkb/${match.params.accession}/${TabLocation.ExternalLinks}`,
                hash: undefined,
              })}
            >
              External links
            </Link>
          }
          id={TabLocation.ExternalLinks}
        >
          <EntryExternalLinks transformedData={transformedData} />
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default Entry;
