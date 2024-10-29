import { Card, Loader } from 'franklin-sites';
import LazyComponent from '../../../shared/components/LazyComponent';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import UniProtKBStatsTabs from './UniProtKBStatsTabs';
import HistoricalReleasesEntriesLinePlot, {
  Bounds,
  DateCount,
} from './HistoricalReleasesEntriesLinePlot';

import useDataApi from '../../../shared/hooks/useDataApi';

import { DefaultDict } from '../../../shared/utils/utils';

import apiUrls from '../../config/apiUrls/apiUrls';

import styles from './styles/statistics-page.module.scss';

type DateToCount = Record<string, number>;

type Proccessed = {
  UNIPROTKB: DateToCount;
  REVIEWED: DateToCount;
  UNREVIEWED: DateToCount;
};
type StatisticsType = 'UNIPROTKB' | 'REVIEWED' | 'UNREVIEWED';
type StatisticsTypeToDateCount = Record<StatisticsType, DateCount[]>;
type StatisticsTypeToBounds = Record<StatisticsType, Bounds>;

const sortByDate = (dateToCount: DateToCount) =>
  Array.from(Object.entries(dateToCount))
    .map(([date, count]): DateCount => [new Date(date), count])
    .sort(([a], [b]) => a.getTime() - b.getTime());

const processResults = (results: Results): StatisticsTypeToDateCount => {
  const processed: Proccessed = {
    UNIPROTKB: DefaultDict(0),
    REVIEWED: DefaultDict(0),
    UNREVIEWED: DefaultDict(0),
  };
  for (const { entryCount, releaseDate, statisticsType } of results) {
    processed[statisticsType][releaseDate] += entryCount;
    processed.UNIPROTKB[releaseDate] += entryCount;
  }
  return {
    UNIPROTKB: sortByDate(processed.UNIPROTKB),
    REVIEWED: sortByDate(processed.REVIEWED),
    UNREVIEWED: sortByDate(processed.UNREVIEWED),
  };
};

const getBounds = (
  processed: StatisticsTypeToDateCount
): StatisticsTypeToBounds => {
  const f = (dateCounts: DateCount[]): Bounds => ({
    date: [dateCounts[0][0], dateCounts[dateCounts.length - 1][0]],
    count: [0, Math.max(...dateCounts.map(([, count]) => count))],
  });
  return {
    UNIPROTKB: f(processed.UNIPROTKB),
    REVIEWED: f(processed.REVIEWED),
    UNREVIEWED: f(processed.UNREVIEWED),
  };
};

type Results = {
  statisticsType: 'REVIEWED' | 'UNREVIEWED';
  releaseName: string;
  releaseDate: string;
  valueCount: number;
  entryCount: number;
}[];

type HistoricalReleasesEntriesPayload = {
  results: Results;
};

const HistoricalReleaseEntryCounts = () => {
  const { data, error, loading, status } =
    useDataApi<HistoricalReleasesEntriesPayload>(apiUrls.statistics.history);
  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  const processed = processResults(data.results);
  const bounds = getBounds(processed);

  return (
    <Card id="amino-acid-composition">
      <h2>Total number of entries per release over time</h2>
      <UniProtKBStatsTabs>
        <div className={styles['side-by-side']}>
          <div className={styles.viz}>
            <LazyComponent
              // Keep the space with an empty visualisation
              fallback={<HistoricalReleasesEntriesLinePlot />}
              rootMargin="0px 0px"
            >
              <HistoricalReleasesEntriesLinePlot
                dateCounts={processed.UNIPROTKB}
                bounds={bounds.UNIPROTKB}
              />
            </LazyComponent>
          </div>
        </div>
        <div className={styles['side-by-side']}>
          <div className={styles.viz}>
            <LazyComponent
              // Keep the space with an empty visualisation
              fallback={<HistoricalReleasesEntriesLinePlot />}
              rootMargin="0px 0px"
            >
              <HistoricalReleasesEntriesLinePlot
                dateCounts={processed.REVIEWED}
                bounds={bounds.REVIEWED}
              />
            </LazyComponent>
          </div>
        </div>
        <div className={styles['side-by-side']}>
          <div className={styles.viz}>
            <LazyComponent
              // Keep the space with an empty visualisation
              fallback={<HistoricalReleasesEntriesLinePlot />}
              rootMargin="0px 0px"
            >
              <HistoricalReleasesEntriesLinePlot
                dateCounts={processed.UNREVIEWED}
                bounds={bounds.UNREVIEWED}
              />
            </LazyComponent>
          </div>
        </div>
      </UniProtKBStatsTabs>
    </Card>
  );
};

export default HistoricalReleaseEntryCounts;
