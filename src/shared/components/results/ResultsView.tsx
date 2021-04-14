import { useEffect, useRef, useMemo, FC, ReactNode } from 'react';
import {
  DataTableWithLoader,
  DataListWithLoader,
  Loader,
  PageIntro,
} from 'franklin-sites';
import { useHistory, useLocation } from 'react-router-dom';

// card renderers for card views
import UniProtKBCard from '../../../uniprotkb/components/results/UniProtKBCard';
import UniRefCard from '../../../uniref/components/results/UniRefCard';
import UniParcCard from '../../../uniparc/components/results/UniParcCard';
import ProteomesCard from '../../../proteomes/components/results/ProteomesCard';
import TaxonomyCard from '../../../supporting-data/taxonomy/components/results/TaxonomyCard';
import KeywordsCard from '../../../supporting-data/keywords/components/results/KeywordsCard';
import CitationsCard from '../../../supporting-data/citations/components/results/CitationsCard';
import DiseasesCard from '../../../supporting-data/diseases/components/results/DiseasesCard';
import DatabaseCard from '../../../supporting-data/database/components/results/DatabaseCard';
import LocationsCard from '../../../supporting-data/locations/components/results/LocationsCard';

import NoResultsPage from '../error-pages/NoResultsPage';
import ResultsButtons from './ResultsButtons';

import useNS from '../../hooks/useNS';
import useNSQuery from '../../hooks/useNSQuery';
import useUserPreferences from '../../hooks/useUserPreferences';
import useColumns from '../../hooks/useColumns';
import usePagination from '../../hooks/usePagination';

import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';

import { getEntryPathFor } from '../../../app/config/urls';
import infoMappings from '../../config/InfoMappings';

import { UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../../proteomes/adapters/proteomesConverter';
import { TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../../supporting-data/locations/adapters/locationsConverter';

import { Namespace } from '../../types/namespaces';
import { APIModel } from '../../types/apiModel';
import { ViewMode } from './ResultsContainer';

import './styles/warning.scss';
import './styles/results-view.scss';
import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import useItemSelect from '../../hooks/useItemSelect';

const cardRenderer = (
  namespace: Namespace,
  selectedEntries: string[],
  handleEntrySelection: (rowId: string) => void
): ((data: APIModel) => ReactNode) => {
  const getIdKey = getIdKeyFor(namespace);
  switch (namespace) {
    case Namespace.uniprotkb: {
      return (cardData) => (
        <UniProtKBCard
          data={cardData as UniProtkbAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.uniref: {
      return (cardData) => (
        <UniRefCard
          data={cardData as UniRefLiteAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.uniparc: {
      return (cardData) => (
        <UniParcCard
          data={cardData as UniParcAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.proteomes: {
      return (cardData) => (
        <ProteomesCard
          data={cardData as ProteomesAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.taxonomy: {
      return (cardData) => (
        <TaxonomyCard
          data={cardData as TaxonomyAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.keywords: {
      return (cardData) => (
        <KeywordsCard
          data={cardData as KeywordsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.citations: {
      return (cardData) => (
        <CitationsCard
          data={cardData as CitationsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.diseases: {
      return (cardData) => (
        <DiseasesCard
          data={cardData as DiseasesAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.database: {
      return (cardData) => (
        <DatabaseCard
          data={cardData as DatabaseAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    case Namespace.locations: {
      return (cardData) => (
        <LocationsCard
          data={cardData as LocationsAPIModel}
          selected={selectedEntries.includes(getIdKey(cardData))}
          handleEntrySelection={handleEntrySelection}
        />
      );
    }
    default:
      return () => (
        <div className="warning">{`${namespace} has no card renderer yet`}</div>
      );
  }
};

const ResultsView: FC = () => {
  const namespace = useNS() || Namespace.uniprotkb;
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const history = useHistory();
  const [columns, updateColumnSort] = useColumns();
  const [selectedEntries, handleEntrySelection] = useItemSelect();
  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );
  const { url: initialApiUrl, direct } = useNSQuery();
  const {
    allResults,
    initialLoading,
    handleLoadMoreRows,
    hasMoreData,
    progress,
    total,
  } = usePagination(initialApiUrl);

  const prevUrl = useRef<string | undefined>(initialApiUrl);
  useEffect(() => {
    // will set it *after* the current render
    prevUrl.current = initialApiUrl;
  });

  const prevViewMode = useRef<ViewMode>(viewMode);
  useEffect(() => {
    prevViewMode.current = viewMode;
  });

  const [getIdKey, getEntryPathForEntry] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace);
    return [getIdKey, (entry: APIModel) => getEntryPath(getIdKey(entry))];
  }, [namespace]);

  // redirect to entry directly when only 1 result and query marked as "direct"
  useEffect(() => {
    if (direct && !hasMoreData && allResults.length === 1) {
      const uniqueItem = allResults[0];
      history.replace(getEntryPathForEntry(uniqueItem));
    }
  }, [history, direct, hasMoreData, allResults, getEntryPathForEntry]);

  if (
    // if loading the first page of results
    initialLoading ||
    // or we just switched namespace (a bit hacky workaround to force unmount)
    prevUrl.current !== initialApiUrl ||
    // or we just switched view mode (hacky too)
    prevViewMode.current !== viewMode
  ) {
    return <Loader progress={progress} />;
  }

  // no results if total is 0, or if not loading anymore and still no total info
  if (total === 0 || !(total || initialLoading)) {
    return <NoResultsPage />;
  }

  const loadComponent = (
    <Loader progress={progress !== 1 ? progress : undefined} />
  );

  const { name, links, info } = infoMappings[namespace];

  return (
    <>
      <PageIntro title={name} links={links} resultsCount={total}>
        {info}
      </PageIntro>
      <ResultsButtons
        query={query}
        selectedFacets={selectedFacets}
        selectedEntries={selectedEntries}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        total={total || 0}
      />

      <div className="results-view">
        {viewMode === ViewMode.CARD ? (
          // Card view
          <DataListWithLoader<APIModel>
            getIdKey={getIdKey}
            data={allResults}
            dataRenderer={cardRenderer(
              namespace,
              selectedEntries,
              handleEntrySelection
            )}
            onLoadMoreItems={handleLoadMoreRows}
            hasMoreData={hasMoreData}
            loaderComponent={loadComponent}
          />
        ) : (
          // Column view
          <DataTableWithLoader
            getIdKey={getIdKey}
            columns={columns}
            data={allResults}
            selected={selectedEntries}
            onSelectRow={handleEntrySelection}
            onHeaderClick={updateColumnSort}
            onLoadMoreItems={handleLoadMoreRows}
            hasMoreData={hasMoreData}
            loaderComponent={loadComponent}
          />
        )}
      </div>
    </>
  );
};

export default ResultsView;
