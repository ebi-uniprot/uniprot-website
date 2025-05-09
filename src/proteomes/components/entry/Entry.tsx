import '../../../shared/components/entry/styles/entry-page.scss';

import { Loader } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../shared/components/layouts/SingleColumnLayout';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import generatePageTitle from '../../adapters/generatePageTitle';
import proteomesConverter, {
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';
import EntryMain from './EntryMain';
import Overview from './Overview';

const Entry = () => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.ProteomesEntry]
  );

  const accession = match?.params.accession;

  const mainData = useDataApi<ProteomesAPIModel>(
    apiUrls.entry.entry(accession, Namespace.proteomes)
  );

  const panProteomeData = useDataApi<ProteomesAPIModel>(
    mainData.data?.panproteome && mainData.data.panproteome !== mainData.data.id
      ? apiUrls.entry.entry(mainData.data.panproteome, Namespace.proteomes)
      : null
  );

  if (mainData.loading || panProteomeData.loading) {
    return <Loader progress={mainData.progress || panProteomeData.progress} />;
  }

  if (mainData.error || panProteomeData.error || !accession || !mainData.data) {
    return (
      <ErrorHandler
        status={mainData.status || panProteomeData.status}
        error={mainData.error}
        fullPage
      />
    );
  }

  const transformedData = proteomesConverter(
    mainData.data,
    panProteomeData.data
  );

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
        <TaxonomyView data={mainData.data.taxonomy} noLink />
      </h1>
      <Overview data={transformedData} />
      <EntryMain transformedData={transformedData} />
    </SingleColumnLayout>
  );
};

export default Entry;
