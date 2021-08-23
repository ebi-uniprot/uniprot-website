import { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Loader } from 'franklin-sites';

import EntryMain from './EntryMain';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import apiUrls from '../../../shared/config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

import proteomesConverter, {
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import generatePageTitle from '../../adapters/generatePageTitle';

import { Namespace } from '../../../shared/types/namespaces';
import { LocationToPath, Location } from '../../../app/config/urls';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.ProteomesEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.entry(accession, Namespace.proteomes);
  const { loading, data, status, error } =
    useDataApi<ProteomesAPIModel>(baseURL);

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const transformedData = proteomesConverter(data);

  return (
    <SingleColumnLayout className="entry-page">
      <Helmet>
        <title>{generatePageTitle(transformedData)}</title>
      </Helmet>
      <h1 className="big">
        {'Proteomes · '}
        <TaxonomyView data={data.taxonomy} noLink />
      </h1>
      <EntryMain transformedData={transformedData} />
    </SingleColumnLayout>
  );
};

export default Entry;
