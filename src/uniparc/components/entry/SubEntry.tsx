// TODO: fix import order
import { useRouteMatch } from 'react-router-dom';
import { ErrorBoundary } from '@sentry/react';
import cn from 'classnames';
import { Loader } from 'franklin-sites';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import HTMLHead from '../../../shared/components/HTMLHead';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import SubEntryOverview from './SubEntryOverview';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';

import { getXRefsForId } from '../../utils/xrefEntry';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';

import { Location, LocationToPath } from '../../../app/config/urls';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';

import sticky from '../../../shared/styles/sticky.module.scss';

const SubEntry = () => {
  const match = useRouteMatch<{ accession: string; subEntryId: string }>(
    LocationToPath[Location.UniParcSubEntry]
  );
  const { accession, subEntryId } = match?.params || {};
  const baseURL = apiUrls.entry.entry(
    subEntryId && accession,
    Namespace.uniparc
  );
  const uniparcData = useDataApi<UniParcAPIModel>(baseURL);

  if (uniparcData.error || !accession || !subEntryId) {
    return (
      <ErrorHandler
        status={uniparcData.status}
        error={uniparcData.error}
        fullPage
      />
    );
  }

  if (!uniparcData.data) {
    return <Loader progress={uniparcData.progress} />;
  }
  if (!uniparcData.data.uniParcCrossReferences) {
    // TODO: handle this
    return 'TODO: handle this';
  }
  const transformedData = uniParcConverter(uniparcData.data);
  const xrefForId = getXRefsForId(
    subEntryId,
    transformedData.uniParcCrossReferences
  );
  // TODO: handle when no xrefsForId
  if (!xrefForId) {
    return 'TODO: handle this';
  }
  return (
    <SidebarLayout
      sidebar={null}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <ErrorBoundary>
        <HTMLHead
          title={[
            subEntryId,
            transformedData.uniParcId,
            searchableNamespaceLabels[Namespace.uniparc],
          ]}
        />
        <h1>
          <EntryTitle
            mainTitle="UniParc"
            optionalTitle={`${transformedData.uniParcId} · ${subEntryId}`}
          />
        </h1>
        <SubEntryOverview xrefData={xrefForId} uniparcData={uniparcData.data} />
      </ErrorBoundary>
    </SidebarLayout>
  );
};

export default SubEntry;
