import { Card, InPageNav, Loader, LongNumber } from 'franklin-sites';
import { Link, LinkProps } from 'react-router-dom';
import { RequireAtLeastOne } from 'type-fest';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import HTMLHead from '../../../shared/components/HTMLHead';

import useUniProtDataVersion from '../../../shared/hooks/useUniProtDataVersion';
import useDataApi from '../../../shared/hooks/useDataApi';

import { stringifyQuery } from '../../../shared/utils/url';

import { LocationToPath, Location } from '../../../app/config/urls';

import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import styles from './styles/statistics-page.module.scss';

type CategoryName =
  | 'AUDIT' // 1 - introduction
  | 'COMMENTS' // 5 - statistics for some line types
  | 'CROSS_REFERENCE' // 5 - statistics for some line types
  | 'EUKARYOTA' // 2 - taxonomic origin
  | 'FEATURES' // 5 - statistics for some line types
  | 'JOURNAL_FREQUENCY' // 4 - journal citations
  | 'MISCELLANEOUS' // 7 - miscellaneous statistics
  | 'ORGANISM_FREQUENCY' // 2 - taxonomic origin
  | 'PROTEIN_EXISTENCE' // 1 - introduction
  | 'PUBLICATION' // 4 - journal citations
  | 'SEQUENCE_AMINO_ACID' // 6 - amino acid composition
  | 'SEQUENCE_COUNT' // 3 - sequence size
  | 'SEQUENCE_RANGE' // 3 - sequence size
  | 'SEQUENCE_STATS' // 3 - sequence size
  | 'SUPERKINGDOM' // 2 - taxonomic origin
  | 'TOP_JOURNAL' // 4 - journal citations
  | 'TOP_ORGANISM' // 2 - taxonomic origin
  | 'TOTAL_ORGANISM'; // 2 - taxonomic origin

export type StatisticsItem = {
  name: string;
  count: number;
  entryCount: number;
  label?: string;
  description?: string;
};

export type StatisticsCategory = {
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

type LinkOrNothingProps<T> = { condition: boolean } & LinkProps<T>;

const LinkOrNothing = <T,>({
  condition,
  children,
  ...props
}: LinkOrNothingProps<T>) => {
  if (condition) {
    return <Link {...props}>{children}</Link>;
  }
  return <>{children}</>;
};

type MergedStatistics = RequireAtLeastOne<
  {
    reviewed?: StatisticsItem;
    unreviewed?: StatisticsItem;
  },
  'reviewed' | 'unreviewed'
>;

type MergedStatisticsItem = {
  name: string;
  statistics: MergedStatistics;
  query?: string;
};

const mergeToMap = (
  reviewed: StatisticsItem[],
  unreviewed: StatisticsItem[]
) => {
  const accumulator = new Map<string, MergedStatistics>();
  for (const item of reviewed) {
    accumulator.set(item.name, { reviewed: item });
  }
  for (const item of unreviewed) {
    const stats = accumulator.get(item.name);
    if (stats) {
      stats.unreviewed = item;
    } else {
      accumulator.set(item.name, { unreviewed: item });
    }
  }
  return accumulator;
};

const merge = (
  reviewed: StatisticsItem[],
  unreviewed: StatisticsItem[]
): MergedStatisticsItem[] =>
  Array.from(mergeToMap(reviewed, unreviewed), ([name, statistics]) => ({
    name,
    statistics,
  }));

type StatsTableProps = {
  category: StatisticsCategory;
  reviewed?: boolean;
  noTitle?: boolean;
};

const StatsTable = ({ category, reviewed, noTitle }: StatsTableProps) => {
  const hasDescription = category.items.some((item) => item.description);
  const hasOnlyEntryCounts =
    category.categoryName !== 'TOTAL_ORGANISM' &&
    category.items.every((item) => item.count === item.entryCount);
  // Exceptions
  const hasEntryCount = category.categoryName !== 'TOTAL_ORGANISM';
  const hasPercent =
    category.items.length > 1 &&
    category.categoryName !== 'AUDIT' &&
    category.categoryName !== 'TOP_ORGANISM';
  let rows = category.items;
  if (category.categoryName === 'SEQUENCE_COUNT') {
    rows = Array.from(category.items).sort((a, b) => +a.name - +b.name);
  }
  if (sortByCount.has(category.categoryName)) {
    rows = Array.from(category.items).sort((a, b) => b.count - a.count);
  }
  return (
    <section>
      {!noTitle && (
        <h4>
          {category.label} (UniProtKB {reviewed ? '' : 'un'}reviewed)
        </h4>
      )}
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
            const percent =
              hasPercent &&
              ((row.count / category.totalCount) * 100).toFixed(2);
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
    </section>
  );
};

type TableProps = {
  reviewedData: StatisticsCategory;
  unreviewedData: StatisticsCategory;
};

const proteinExistenceToNumber = new Map([
  ['PROTEIN_LEVEL', 1],
  ['TRANSCRIPT_LEVEL', 2],
  ['HOMOLOGY', 3],
  ['PREDICTED', 4],
  ['UNCERTAIN', 5],
]);

const proteinExistenceToNiceName = new Map([
  ['PROTEIN_LEVEL', '1: Evidence at protein level'],
  ['TRANSCRIPT_LEVEL', '2: Evidence at transcript level'],
  ['HOMOLOGY', '3: Inferred from homology'],
  ['PREDICTED', '4: Predicted'],
  ['UNCERTAIN', '5: Uncertain'],
]);

const sortByPE = (a: MergedStatisticsItem, b: MergedStatisticsItem) =>
  (proteinExistenceToNumber.get(a.name) || 0) -
  (proteinExistenceToNumber.get(b.name) || 0);

const ProteinExistenceTable = ({
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const list = merge(reviewedData.items, unreviewedData.items)
    .sort(sortByPE)
    .map(
      ({ name, statistics }): MergedStatisticsItem => ({
        name: proteinExistenceToNiceName.get(name) || name,
        statistics,
        query: `(existence:${proteinExistenceToNumber.get(name)})`,
      })
    );

  return (
    <table>
      <caption>
        Total number of entries per protein existence (PE) annotation
      </caption>
      <thead>
        <tr>
          <th>Protein existence (PE)</th>
          <th>UniProtKB</th>
          <th>UniProtKB reviewed</th>
          <th>UniProtKB unreviewed</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ name, statistics, query }) => (
          <tr key={name}>
            <td>{name}</td>
            <td className={styles.end}>
              <Link
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({ query }),
                }}
              >
                <LongNumber>
                  {(statistics.reviewed?.entryCount || 0) +
                    (statistics.unreviewed?.entryCount || 0)}
                </LongNumber>
              </Link>
            </td>
            <td className={styles.end}>
              <LinkOrNothing
                condition={Boolean(statistics.reviewed?.entryCount)}
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: `(reviewed:true) AND ${query}`,
                  }),
                }}
              >
                <LongNumber>{statistics.reviewed?.entryCount || 0}</LongNumber>
              </LinkOrNothing>
            </td>
            <td className={styles.end}>
              <LinkOrNothing
                condition={Boolean(statistics.unreviewed?.entryCount)}
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: `(reviewed:false) AND ${query}`,
                  }),
                }}
              >
                <LongNumber>
                  {statistics.unreviewed?.entryCount || 0}
                </LongNumber>
              </LinkOrNothing>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TotalOrganismTable = ({ reviewedData, unreviewedData }: TableProps) => (
  <table>
    <caption>
      Total number of species represented in this release of UniProtKB
    </caption>
    <thead>
      <tr>
        <th>Section</th>
        <th>Species represented</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>whole UniProtKB</td>
        <td className={styles.end}>
          <LongNumber>
            {reviewedData.totalCount + unreviewedData.totalCount}
          </LongNumber>
        </td>
      </tr>
      <tr>
        <td>UniProtKB reviewed (Swiss-Prot)</td>
        <td className={styles.end}>
          <LongNumber>{reviewedData.totalCount}</LongNumber>
        </td>
      </tr>
      <tr>
        <td>UniProtKB unreviewed (TrEMBL)</td>
        <td className={styles.end}>
          <LongNumber>{unreviewedData.totalCount}</LongNumber>
        </td>
      </tr>
    </tbody>
  </table>
);

const organismFrequencySort = (
  a: MergedStatisticsItem,
  b: MergedStatisticsItem
) => {
  const aValue = +a.name.split(/\D/).filter((part) => Boolean(part))[0];
  const bValue = +b.name.split(/\D/).filter((part) => Boolean(part))[0];
  return aValue - bValue;
};

const OrganismFrequencyTable = ({
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const list = merge(reviewedData.items, unreviewedData.items).sort(
    organismFrequencySort
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Species represented</th>
          <th>UniProtKB reviewed</th>
          <th>UniProtKB unreviewed</th>
        </tr>
      </thead>
      <tbody>
        {list.map(({ name, statistics }) => (
          <tr key={name}>
            <td>{name}</td>
            <td className={styles.end}>
              <LongNumber>{statistics.reviewed?.entryCount || 0}</LongNumber>
            </td>
            <td className={styles.end}>
              <LongNumber>{statistics.unreviewed?.entryCount || 0}</LongNumber>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const sections = [
  { label: 'Introduction', id: 'introduction' },
  { label: 'Taxonomic origin', id: 'taxonomic-origin' },
  { label: 'Sequence size', id: 'sequence-size' },
  { label: 'Journal citations', id: 'journal-citations' },
  {
    label: 'Statistics for some line types',
    id: 'statistics-for-some-line-type',
  },
  { label: 'Amino acid composition', id: 'amino-acid-composition' },
  { label: 'Miscellaneous statistics', id: 'miscellaneous-statistics' },
];

const StatisticsPage = () => {
  const release = useUniProtDataVersion();

  const reviewedStats = useDataApi<StatisticsPayload>(
    release &&
      `${API_PREFIX}/statistics/releases/${release.releaseNumber}/reviewed`
  );
  const unreviewedStats = useDataApi<StatisticsPayload>(
    release &&
      `${API_PREFIX}/statistics/releases/${release.releaseNumber}/unreviewed`
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

  const reviewedData = Object.fromEntries(
    reviewedStats.data.results.map((stat) => [stat.categoryName, stat])
  ) as Record<CategoryName, StatisticsCategory>;
  const unreviewedData = Object.fromEntries(
    unreviewedStats.data.results.map((stat) => [stat.categoryName, stat])
  ) as Record<CategoryName, StatisticsCategory>;

  return (
    <SidebarLayout
      sidebar={
        <InPageNav
          sections={sections}
          rootElement={`.${sidebarStyles.content}`}
        />
      }
      className={styles['statistics-page']}
    >
      <HTMLHead title={['UniProtKB', 'Statistics']} />
      <h1>UniProtKB statistics</h1>
      <Card id="introduction">
        <h2>Introduction</h2>
        <StatsTable category={reviewedData.AUDIT} reviewed />
        <StatsTable category={unreviewedData.AUDIT} />
        <ProteinExistenceTable
          reviewedData={reviewedData.PROTEIN_EXISTENCE}
          unreviewedData={unreviewedData.PROTEIN_EXISTENCE}
        />
      </Card>
      <Card id="taxonomic-origin">
        <h2>Taxonomic origin</h2>
        <TotalOrganismTable
          reviewedData={reviewedData.TOTAL_ORGANISM}
          unreviewedData={unreviewedData.TOTAL_ORGANISM}
        />
        <section>
          <h3>Table of the frequency of occurrence of species</h3>
          <OrganismFrequencyTable
            reviewedData={reviewedData.ORGANISM_FREQUENCY}
            unreviewedData={unreviewedData.ORGANISM_FREQUENCY}
          />
        </section>
        <section>
          <h3>Table of the most represented species</h3>
          <StatsTable category={reviewedData.TOP_ORGANISM} reviewed />
          <StatsTable category={unreviewedData.TOP_ORGANISM} />
        </section>
        <section>
          <h3>Taxonomic distribution of the sequences</h3>
          <StatsTable category={reviewedData.SUPERKINGDOM} reviewed />
          <StatsTable category={unreviewedData.SUPERKINGDOM} />
          <StatsTable category={reviewedData.EUKARYOTA} reviewed />
          <StatsTable category={unreviewedData.EUKARYOTA} />
        </section>
      </Card>
      <Card id="sequence-size">
        <h2>Sequence size</h2>
        <p>Repartition of the sequences by size (excluding fragments)</p>
        <StatsTable category={reviewedData.SEQUENCE_STATS} reviewed />
        <StatsTable category={unreviewedData.SEQUENCE_STATS} />
        <StatsTable category={reviewedData.SEQUENCE_COUNT} reviewed />
        <StatsTable category={unreviewedData.SEQUENCE_COUNT} />
        <StatsTable category={reviewedData.SEQUENCE_RANGE} reviewed />
        <StatsTable category={unreviewedData.SEQUENCE_RANGE} />
      </Card>
      <Card id="journal-citations">
        <h2>Journal citations</h2>
        <p>
          Note: the following citation statistics reflect the number of distinct
          journal citations.
        </p>
        <StatsTable category={reviewedData.JOURNAL_FREQUENCY} reviewed />
        <StatsTable category={unreviewedData.JOURNAL_FREQUENCY} />
        <StatsTable category={reviewedData.TOP_JOURNAL} reviewed />
        <StatsTable category={unreviewedData.TOP_JOURNAL} />
        <StatsTable category={reviewedData.PUBLICATION} reviewed />
        <StatsTable category={unreviewedData.PUBLICATION} />
      </Card>
      <Card id="statistics-for-some-line-type">
        <h2>Statistics for some line types</h2>
        <p>
          The following table summarizes the total number of some UniProtKB
          lines, as well as the number of entries with at least one such line,
          and the frequency of the lines.
        </p>
        <StatsTable category={reviewedData.FEATURES} reviewed />
        <StatsTable category={unreviewedData.FEATURES} />
        <StatsTable category={reviewedData.COMMENTS} reviewed />
        <StatsTable category={unreviewedData.COMMENTS} />
        <StatsTable category={reviewedData.CROSS_REFERENCE} reviewed />
        <StatsTable category={unreviewedData.CROSS_REFERENCE} />
      </Card>
      <Card id="amino-acid-composition">
        <h2>Amino acid composition</h2>
        <StatsTable category={reviewedData.SEQUENCE_AMINO_ACID} reviewed />
        <StatsTable category={unreviewedData.SEQUENCE_AMINO_ACID} />
      </Card>
      <Card id="miscellaneous-statistics">
        <h2>Miscellaneous statistics</h2>
        <StatsTable category={reviewedData.MISCELLANEOUS} reviewed />
        <StatsTable category={unreviewedData.MISCELLANEOUS} />
      </Card>
    </SidebarLayout>
  );
};

export default StatisticsPage;
