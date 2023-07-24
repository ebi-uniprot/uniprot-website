import { Fragment } from 'react';
import { Card, Loader, LongNumber } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useUniProtDataVersion from '../../../shared/hooks/useUniProtDataVersion';
import useDataApi from '../../../shared/hooks/useDataApi';

import styles from './styles/statistics-page.module.scss';

type CategoryName =
  | 'TOTAL_ORGANISM'
  | 'SUPERKINGDOM'
  | 'FEATURES'
  | 'COMMENTS'
  | 'ORGANISM_FREQUENCY'
  | 'JOURNAL_FREQUENCY'
  | 'SEQUENCE_STATS'
  | 'SEQUENCE_AMINO_ACID'
  | 'TOP_ORGANISM'
  | 'TOP_JOURNAL'
  | 'EUKARYOTA'
  | 'SEQUENCE_COUNT'
  | 'AUDIT'
  | 'CROSS_REFERENCE'
  | 'SEQUENCE_RANGE'
  | 'MISCELLANEOUS'
  | 'PUBLICATION'
  | 'PROTEIN_EXISTENCE';

type StatisticsItem = {
  name: string;
  count: number;
  entryCount: number;
  label?: string;
  description?: string;
};

type StatisticsCategory = {
  categoryName: CategoryName;
  label: string;
  totalCount: number;
  items: StatisticsItem[];
};

export type StatisticsPayload = {
  results: StatisticsCategory[];
};

const sortByCount = new Set<CategoryName>([
  'SUPERKINGDOM',
  'FEATURES',
  'COMMENTS',
  'ORGANISM_FREQUENCY',
  'JOURNAL_FREQUENCY',
  'SEQUENCE_STATS',
  'SEQUENCE_AMINO_ACID',
  'TOP_ORGANISM',
  'TOP_JOURNAL',
  'EUKARYOTA',
  'AUDIT',
  'CROSS_REFERENCE',
  'SEQUENCE_RANGE',
  'MISCELLANEOUS',
  'PUBLICATION',
  'PROTEIN_EXISTENCE',
]);

type StatsTableProps = {
  items: StatisticsItem[];
  name: CategoryName;
  total: number;
};

const StatsTable = ({ items, name, total }: StatsTableProps) => {
  const hasDescription = items.some((item) => item.description);
  const hasOnlyEntryCounts =
    name !== 'TOTAL_ORGANISM' &&
    items.every((item) => item.count === item.entryCount);
  // Exceptions
  const hasEntryCount = name !== 'TOTAL_ORGANISM';
  const hasPercent = items.length > 1;
  let rows = items;
  if (name === 'SEQUENCE_COUNT') {
    rows = Array.from(items).sort((a, b) => +a.name - +b.name);
  }
  if (sortByCount.has(name)) {
    rows = Array.from(items).sort((a, b) => b.count - a.count);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {!hasOnlyEntryCounts && <th>Count</th>}
          {hasPercent && !hasOnlyEntryCounts && <th>Percent</th>}
          {hasEntryCount && <th>Entry count</th>}
          {hasPercent && hasOnlyEntryCounts && <th>Percent</th>}
          {/* {!hasOnlyEntryCounts && <th>Per-entry average</th>} */}
          {hasDescription && <th>Description</th>}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const percent = hasPercent && ((row.count / total) * 100).toFixed(2);
          return (
            <tr key={row.name}>
              {/* Name */}
              <td>{row.label || row.name}</td>
              {/* Count */}
              {!hasOnlyEntryCounts && (
                <td className={styles.end}>
                  <LongNumber>{row.count}</LongNumber>
                </td>
              )}
              {/* Percent */}
              {hasPercent && !hasOnlyEntryCounts && (
                <td className={styles.end}>
                  {percent === '0.00' ? '<0.01' : percent}%
                </td>
              )}
              {/* Entry count */}
              {hasEntryCount && (
                <td className={styles.end}>
                  <LongNumber>{row.entryCount}</LongNumber>
                </td>
              )}
              {/* Percent */}
              {hasPercent && hasOnlyEntryCounts && (
                <td className={styles.end}>
                  {percent === '0.00' ? '<0.01' : percent}%
                </td>
              )}
              {/* Per-entry average */}
              {/* WRONG: This needs to be divided by number of entries in data release */}
              {/* {!hasOnlyEntryCounts && (
                <td className={styles.end}>
                  {(row.count / row.entryCount).toFixed(2)}
                </td>
              )} */}
              {/* Description */}
              {hasDescription && <td>{row.description}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Stats = ({ stats }: { stats: StatisticsCategory[] }) => (
  <>
    {stats.map((cat) => (
      <Fragment key={cat.categoryName}>
        <h3>{cat.label}</h3>
        <StatsTable
          items={cat.items}
          name={cat.categoryName}
          total={cat.totalCount}
        />
      </Fragment>
    ))}
  </>
);

const StatisticsPage = () => {
  const release = useUniProtDataVersion();

  const reviewedStats = useDataApi<StatisticsPayload>(
    release &&
      `https://wwwdev.ebi.ac.uk/uniprot/api/statistics/releases/${release.releaseNumber}/reviewed`
  );
  const unreviewedStats = useDataApi<StatisticsPayload>(
    release &&
      `https://wwwdev.ebi.ac.uk/uniprot/api/statistics/releases/${release.releaseNumber}/unreviewed`
  );

  if (!release || reviewedStats.loading || unreviewedStats.loading) {
    return <Loader />;
  }

  if (reviewedStats.error || !reviewedStats.data) {
    return <ErrorHandler status={reviewedStats.status} />;
  }

  if (unreviewedStats.error || !unreviewedStats.data) {
    return <ErrorHandler status={unreviewedStats.status} />;
  }

  return (
    <Card className={styles['statistics-page']}>
      <h1>Statistics for UniProtKB data release {release.releaseNumber}</h1>
      <div>Released on {release.releaseDate.toDateString()}</div>
      <h2>UniProtKB reviewed data</h2>
      <div>also known as Swiss-Prot</div>
      <Stats stats={reviewedStats.data.results} />
      <h2>UniProtKB unreviewed data</h2>
      <div>also known as TrEMBL</div>
      <Stats stats={unreviewedStats.data.results} />
    </Card>
  );
};

export default StatisticsPage;
