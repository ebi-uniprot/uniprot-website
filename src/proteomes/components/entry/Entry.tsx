import '../../../shared/components/entry/styles/entry-page.scss';

import { Loader } from 'franklin-sites';
import { useRouteMatch } from 'react-router-dom';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../../app/config/urls';
import TaxonomyView from '../../../shared/components/entry/TaxonomyView';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../shared/components/layouts/SingleColumnLayout';
import {
  checkMoveUrl,
  type ProteomesCheckMoveResponse,
  RefProtMoveProteomesEntryMessage,
} from '../../../shared/components/RefProtMoveMessages';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import generatePageTitle from '../../adapters/generatePageTitle';
import proteomesConverter, {
  type ProteomesAPIModel,
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

  const relatedProteomes = mainData.data?.relatedProteomes;
  const similarProteomesData = useDataApi<SearchResults<ProteomesAPIModel>>(
    relatedProteomes?.length
      ? apiUrls.search.search({
          namespace: Namespace.proteomes,
          query: relatedProteomes
            .map(({ proteomeId }) => `upid:${proteomeId}`)
            .join(' OR '),
          size: relatedProteomes.length,
          facets: null,
        })
      : null
  );

  const refprotmoveData = useDataApi<ProteomesCheckMoveResponse>(
    accession ? joinUrl(checkMoveUrl, 'proteomes', accession) : null
  );

  if (
    mainData.loading ||
    panProteomeData.loading ||
    similarProteomesData.loading ||
    refprotmoveData.loading
  ) {
    return <Loader progress={mainData.progress || similarProteomesData.progress || panProteomeData.progress} />;
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
    panProteomeData.data,
    similarProteomesData.data?.results
  );

  const moveStatus = refprotmoveData.data?.status;
  const showMoveMessage =
    moveStatus === 'becoming-non-reference' || moveStatus === 'other';

  return (
    <SingleColumnLayout className="entry-page">
      <HTMLHead
        title={[
          generatePageTitle(transformedData),
          searchableNamespaceLabels[Namespace.proteomes],
        ]}
      />
      {showMoveMessage && moveStatus && (
        <RefProtMoveProteomesEntryMessage
          id={transformedData.id}
          taxonomy={transformedData.taxonomy}
          moveStatus={moveStatus}
        />
      )}
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
