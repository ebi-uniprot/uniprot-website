import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import EntryMain from './EntryMain';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryDownload from '../../../shared/components/entry/EntryDownload';
import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import apiUrls from '../../../shared/config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

import proteomesConverter, {
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import generatePageTitle from '../../adapters/generatePageTitle';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { LocationToPath, Location } from '../../../app/config/urls';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry = () => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.ProteomesEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.entry(accession, Namespace.proteomes);
  const { loading, data, status, error, progress } =
    useDataApi<ProteomesAPIModel>(baseURL);

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  const transformedData = proteomesConverter(data);

  return (
    <SingleColumnLayout className="entry-page">
      <HTMLHead
        title={[
          generatePageTitle(transformedData),
          searchableNamespaceLabels[Namespace.proteomes],
        ]}
      />
      <h1>
        {searchableNamespaceLabels[Namespace.proteomes]}
        {' · '}
        <TaxonomyView data={data.taxonomy} noLink />
      </h1>
      <div className="button-group">
        <EntryDownload />
      </div>
      <EntryMain transformedData={transformedData} />
    </SingleColumnLayout>
  );
};

export default Entry;
