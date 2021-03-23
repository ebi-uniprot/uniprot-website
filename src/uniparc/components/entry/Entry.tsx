import { FC, useEffect, useMemo } from 'react';
import {
  useRouteMatch,
  useLocation,
  Link,
  useHistory,
  generatePath,
} from 'react-router-dom';
import { stringify } from 'query-string';
import { Loader, Tabs, Tab } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import EntryMain from './EntryMain';
import UniParcFeaturesView from './UniParcFeaturesView';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';
import XRefsFacets from './XRefsFacets';

import '../../../shared/components/entry/styles/entry-page.scss';

export enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
}

const Entry: FC = () => {
  const match = useRouteMatch<{ accession: string; subPage?: TabLocation }>(
    LocationToPath[Location.UniParcEntry]
  );
  const history = useHistory();

  const { search } = useLocation();

  // if URL doesn't finish with "entry" redirect to /entry by default
  useEffect(() => {
    if (match && !match.params.subPage) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[Location.UniParcEntry], {
          accession: match.params.accession,
          subPage: TabLocation.Entry,
        }),
      });
    }
  }, [match, history]);

  const url = useMemo(() => {
    const baseURL = apiUrls.uniparc.entry(match?.params.accession);
    const { selectedFacets } = getParamsFromURL(search);
    if (!selectedFacets.length) {
      return baseURL;
    }
    return `${baseURL}?${stringify(
      Object.fromEntries(selectedFacets.map(({ name, value }) => [name, value]))
    )}`;
  }, [match, search]);
  const dataObject = useDataApiWithStale<UniParcAPIModel>(url);

  if (dataObject.error || !match?.params.accession || !match) {
    return <ErrorHandler status={dataObject.status} />;
  }

  if (!dataObject.data) {
    return <Loader progress={dataObject.progress} />;
  }

  const transformedData = uniParcConverter(dataObject.data);

  const entrySidebar = <XRefsFacets xrefs={dataObject} />;

  const emptySidebar = (
    <div className="sidebar-layout__sidebar-content--empty" />
  );

  let sidebar;

  switch (match.params.subPage) {
    case TabLocation.FeatureViewer:
      sidebar = emptySidebar;
      break;

    default:
      sidebar = entrySidebar;
      break;
  }

  return (
    <SideBarLayout
      sidebar={sidebar}
      className="entry-page"
      title={
        <ErrorBoundary>
          <h2>
            <EntryTitle
              mainTitle="UniParc"
              optionalTitle={transformedData.uniParcId}
            />
          </h2>
        </ErrorBoundary>
      }
    >
      <Tabs active={match.params.subPage}>
        <Tab
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/uniparc/${match.params.accession}/${TabLocation.Entry}`,
                hash: undefined,
              })}
            >
              Entry
            </Link>
          }
          id={TabLocation.Entry}
        >
          <EntryMain transformedData={transformedData} xrefs={dataObject} />
        </Tab>
        <Tab
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/uniparc/${match.params.accession}/${TabLocation.FeatureViewer}`,
                hash: undefined,
              })}
            >
              Feature viewer
            </Link>
          }
          id={TabLocation.FeatureViewer}
        >
          {transformedData.sequenceFeatures && (
            <UniParcFeaturesView
              data={transformedData.sequenceFeatures}
              sequence={transformedData.sequence.value}
            />
          )}
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default Entry;
