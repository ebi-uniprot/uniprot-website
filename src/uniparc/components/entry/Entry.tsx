import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import EntryMain from './EntryMain';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import apiUrls from '../../../shared/config/apiUrls';
import { LocationToPath, Location } from '../../../app/config/urls';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';

import '../../../shared/components/entry/styles/entry-page.scss';
import XRefsFacets from './XRefsFacets';

const Entry: FC = () => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.UniParcEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.uniparc.entry(accession);
  const { loading, data, status, error, headers } = useDataApi<UniParcAPIModel>(
    baseURL
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const transformedData = uniParcConverter(data);

  return (
    <SideBarLayout
      sidebar={<XRefsFacets xrefs={transformedData.uniParcCrossReferences} />}
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
      <EntryMain transformedData={transformedData} metadata={headers} />
    </SideBarLayout>
  );
};

export default Entry;
