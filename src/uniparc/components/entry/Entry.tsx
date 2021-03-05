import { FC, useMemo } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { stringify } from 'query-string';
import { Loader } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import EntryMain from './EntryMain';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';
import XRefsFacets from './XRefsFacets';
import { UniParcColumn } from '../../config/UniParcColumnConfiguration';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniParcEntry]
  );
  const { search } = useLocation();

  const accession = match?.params.accession;

  const baseURL = apiUrls.uniparc.entry(accession);
  const { loading, data, status, error } = useDataApi<UniParcAPIModel>(
    `${baseURL}?query=${UniParcColumn.sequence}`
  );

  const xrefsURL =
    baseURL +
    useMemo(() => {
      const { selectedFacets } = getParamsFromURL(search);
      if (!selectedFacets.length) {
        return '';
      }
      return `?${stringify(
        Object.fromEntries(
          selectedFacets.map(({ name, value }) => [name, value])
        )
      )}`;
    }, [search]);
  const xrefDataObject = useDataApiWithStale<UniParcAPIModel>(xrefsURL);

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const transformedData = uniParcConverter(data);

  return (
    <SideBarLayout
      sidebar={<XRefsFacets xrefs={xrefDataObject} />}
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
      <EntryMain transformedData={transformedData} xrefs={xrefDataObject} />
    </SideBarLayout>
  );
};

export default Entry;
