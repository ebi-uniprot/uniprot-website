/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/no-array-index-key */
import { ReactNode } from 'react';
import { Card, InPageNav, Loader, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { schemeReds } from 'd3';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import HTMLHead from '../../../shared/components/HTMLHead';
import LazyComponent from '../../../shared/components/LazyComponent';
import PieChart, { StatisticsGraphItem } from '../graphs/PieChart';
import AminoAcidBarPlot from './AminoAcidBarPlot';
import ReviewedUnreviewedTabs from './ReviewedUnreviewedTabs';
import FrequencyTable from './FrequencyTable';
import CountLinkOrNothing from './CountLinkOrNothing';
import ReviewedUnreviewedStatsTable from './ReviewedUnreviewedStatsTable';
import ReviewedSequenceCorrections from './ReviewedSequenceCorrections';

import useUniProtDataVersion from '../../../shared/hooks/useUniProtDataVersion';
import useDataApi from '../../../shared/hooks/useDataApi';

import { stringifyQuery } from '../../../shared/utils/url';
import { nameToQueryEukaryota, nameToQueryKingdoms } from './taxonomyQueries';
import apiUrls from '../../../shared/config/apiUrls';
import {
  MergedStatistics,
  MergedStatisticsItem,
  filterAminoAcids,
  getEncodedLocations,
  getSequenceSizeLocation,
  getUniqueAuthorString,
  merge,
  mergeToMap,
} from './utils';

import { LocationToPath, Location } from '../../../app/config/urls';

import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import styles from './styles/statistics-page.module.scss';
import StatsTable from './StatsTable';

export type CategoryName =
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

type AbstractSectionTableProps = {
  caption: ReactNode;
  tableData: Array<{
    header: ReactNode;
    data: MergedStatistics;
    query?: string;
    accessor?: 'count' | 'entryCount';
  }>;
};

const AbstractSectionTable = ({
  caption,
  tableData,
}: AbstractSectionTableProps) => (
  <table>
    <caption>{caption}</caption>
    <thead>
      <tr>
        <th>Section</th>
        {tableData.map(({ header }, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>UniProtKB</td>
        {tableData.map(({ data, query, accessor = 'entryCount' }, index) => (
          <td key={index} className={styles.end}>
            <CountLinkOrNothing
              condition={Boolean(query)}
              to={{
                pathname: LocationToPath[Location.UniProtKBResults],
                search: stringifyQuery({ query }),
              }}
            >
              {(data.reviewed?.[accessor] || 0) +
                (data.unreviewed?.[accessor] || 0)}
            </CountLinkOrNothing>
          </td>
        ))}
      </tr>
      <tr>
        <td>⮑ UniProtKB reviewed</td>
        {tableData.map(({ data, query, accessor = 'entryCount' }, index) => (
          <td key={index} className={styles.end}>
            <CountLinkOrNothing
              condition={Boolean(query)}
              to={{
                pathname: LocationToPath[Location.UniProtKBResults],
                search: stringifyQuery({
                  query: `(reviewed:true)${
                    query === '*' ? '' : ` AND ${query}`
                  }`,
                }),
              }}
            >
              {data.reviewed?.[accessor] || 0}
            </CountLinkOrNothing>
          </td>
        ))}
      </tr>
      <tr>
        <td>⮑ UniProtKB unreviewed</td>
        {tableData.map(({ data, query, accessor = 'entryCount' }, index) => (
          <td key={index} className={styles.end}>
            <CountLinkOrNothing
              condition={Boolean(query)}
              to={{
                pathname: LocationToPath[Location.UniProtKBResults],
                search: stringifyQuery({
                  query: `(reviewed:false)${
                    query === '*' ? '' : ` AND ${query}`
                  }`,
                }),
              }}
            >
              {data.unreviewed?.[accessor] || 0}
            </CountLinkOrNothing>
          </td>
        ))}
      </tr>
    </tbody>
  </table>
);

export type TableProps = {
  reviewedData: StatisticsCategory;
  unreviewedData: StatisticsCategory;
};

// ☑️ ENTRY
// ☑️ NEW_ENTRY
// ☑️ NEW_ENTRY_AND_NEW_SEQUENCE
// ☑️ ANNOTATION_UPDATED
// ☑️ UPDATED_SEQUENCE
const IntroductionEntriesTable = ({
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const map = mergeToMap(reviewedData.items, unreviewedData.items);
  return (
    <>
      <AbstractSectionTable
        caption="Total number of entries in this release of UniProtKB"
        tableData={[
          {
            header: (
              <>
                Number of entries
                <br />
                in total
              </>
            ),
            data: map.get('ENTRY')!,
            query: '*',
          },
          {
            header: (
              <>
                Number of entries
                <br />
                with an annotation update
              </>
            ),
            data: map.get('ANNOTATION_UPDATED')!,
          },
          {
            header: (
              <>
                Number of entries
                <br />
                with a sequence update
              </>
            ),
            data: map.get('UPDATED_SEQUENCE')!,
          },
        ]}
      />
      <AbstractSectionTable
        caption={
          <>
            Total number of <strong>new</strong> entries in this release of
            UniProtKB
          </>
        }
        tableData={[
          {
            header: (
              <>
                Number of <strong>new</strong> entries
              </>
            ),
            data: map.get('NEW_ENTRY')!,
          },
          {
            header: (
              <>
                Number of <strong>new</strong> sequences
              </>
            ),
            data: map.get('NEW_ENTRY_AND_NEW_SEQUENCE')!,
          },
        ]}
      />
    </>
  );
};

// ☑️ ISOFORMS
// ☑️ AMINO_ACID_TOTAL
// ☐ SEQUENCE_SHORTEST => skipped, numbers are not accurate
// ☐ SEQUENCE_LONGEST => skipped, numbers are not accurate
// ☑️ FRAGMENT

const IntroductionSequenceTable = ({
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const map = mergeToMap(reviewedData.items, unreviewedData.items);

  return (
    <>
      <AbstractSectionTable
        caption={<>Number of fragments</>}
        tableData={[
          {
            header: <>Fragments</>,
            data: map.get('FRAGMENT')!,
            query: '(fragment:true)',
          },
        ]}
      />
      <AbstractSectionTable
        caption={<>Number of isoforms</>}
        tableData={[
          {
            header: <>Isoforms</>,
            data: map.get('ISOFORMS')!,
            accessor: 'count',
          },
          {
            header: <>Entries with isoforms</>,
            data: map.get('ISOFORMS')!,
            query: '(cc_ap:*)',
          },
        ]}
      />
      <AbstractSectionTable
        caption={<>Amino acids in this release</>}
        tableData={[
          {
            header: <>Amino acids</>,
            data: map.get('AMINO_ACID_TOTAL')!,
            accessor: 'count',
          },
        ]}
      />
    </>
  );
};

const proteinExistenceToNumber = new Map([
  ['PROTEIN_LEVEL', 1],
  ['TRANSCRIPT_LEVEL', 2],
  ['HOMOLOGY', 3],
  ['PREDICTED', 4],
  ['UNCERTAIN', 5],
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
      ({ name, label, statistics }): MergedStatisticsItem => ({
        name,
        label,
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
        {list.map(({ name, label, statistics, query }) => (
          <tr key={name}>
            <td>
              {proteinExistenceToNumber.get(name)}: {label}
            </td>
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
              <CountLinkOrNothing
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: `(reviewed:true) AND ${query}`,
                  }),
                }}
              >
                {statistics.reviewed?.entryCount || 0}
              </CountLinkOrNothing>
            </td>
            <td className={styles.end}>
              <CountLinkOrNothing
                to={{
                  pathname: LocationToPath[Location.UniProtKBResults],
                  search: stringifyQuery({
                    query: `(reviewed:false) AND ${query}`,
                  }),
                }}
              >
                {statistics.unreviewed?.entryCount || 0}
              </CountLinkOrNothing>
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
        <td>UniProtKB</td>
        <td className={styles.end}>
          <LongNumber>
            {reviewedData.totalCount + unreviewedData.totalCount}
          </LongNumber>
        </td>
      </tr>
      <tr>
        <td>⮑ UniProtKB reviewed</td>
        <td className={styles.end}>
          <LongNumber>{reviewedData.totalCount}</LongNumber>
        </td>
      </tr>
      <tr>
        <td>⮑ UniProtKB unreviewed</td>
        <td className={styles.end}>
          <LongNumber>{unreviewedData.totalCount}</LongNumber>
        </td>
      </tr>
    </tbody>
  </table>
);

const TaxonomiDistributionTable = ({
  reviewedData,
  unreviewedData,
  colorScheme,
  distributionLabel,
  nameToQuery,
}: TableProps & {
  colorScheme?: string[][];
  distributionLabel: string;
  nameToQuery: Map<string, string | undefined>;
}) => {
  const list = merge(reviewedData.items, unreviewedData.items)
    // .sort(sortByPE)
    .map(
      ({ name, statistics }): MergedStatisticsItem => ({
        name,
        statistics,
        query: nameToQuery.get(name),
      })
    );

  const graphData: StatisticsGraphItem[] = list.map((entry) => ({
    name: entry.name,
    entryCount:
      (entry.statistics.reviewed?.entryCount || 0) +
      (entry.statistics.unreviewed?.entryCount || 0),
    to: {
      pathname: LocationToPath[Location.UniProtKBResults],
      search: stringifyQuery({ query: entry.query }),
    },
  }));

  return (
    <div className={styles['side-by-side']}>
      <table>
        <caption>
          Taxonomic distribution of the sequences {distributionLabel}
        </caption>
        <thead>
          <tr>
            <th>Taxonomy</th>
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
                <CountLinkOrNothing
                  condition={Boolean(query)}
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: stringifyQuery({ query }),
                  }}
                >
                  {(statistics.reviewed?.entryCount || 0) +
                    (statistics.unreviewed?.entryCount || 0)}
                </CountLinkOrNothing>
              </td>
              <td className={styles.end}>
                <CountLinkOrNothing
                  condition={Boolean(query)}
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: stringifyQuery({
                      query: `(reviewed:true) AND ${query}`,
                    }),
                  }}
                >
                  {statistics.reviewed?.entryCount || 0}
                </CountLinkOrNothing>
              </td>
              <td className={styles.end}>
                <CountLinkOrNothing
                  condition={Boolean(query)}
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: stringifyQuery({
                      query: `(reviewed:false) AND ${query}`,
                    }),
                  }}
                >
                  {statistics.unreviewed?.entryCount || 0}
                </CountLinkOrNothing>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LazyComponent
        fallback={<PieChart type="taxonomy" />}
        rootMargin="0px 0px"
      >
        <PieChart data={graphData} type="taxonomy" colorScheme={colorScheme} />
      </LazyComponent>
    </div>
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

export type CategoryToStatistics = Record<CategoryName, StatisticsCategory>;

const StatisticsPage = () => {
  const release = useUniProtDataVersion();

  const reviewedStats = useDataApi<StatisticsPayload>(
    release && apiUrls.statistics(release.releaseNumber, 'reviewed')
  );
  const unreviewedStats = useDataApi<StatisticsPayload>(
    release && apiUrls.statistics(release.releaseNumber, 'unreviewed')
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
  ) as CategoryToStatistics;
  const unreviewedData = Object.fromEntries(
    unreviewedStats.data.results.map((stat) => [stat.categoryName, stat])
  ) as CategoryToStatistics;

  return (
    <SidebarLayout
      sidebar={
        <InPageNav
          sections={sections}
          rootElement={`.${sidebarStyles.content}`}
        />
      }
      className={styles['statistics-page']}
      noOverflow
    >
      <HTMLHead title={['UniProtKB', 'Statistics']}>
        {/* Remove when this page is finished */}
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <h1>UniProtKB statistics</h1>
      <Card id="introduction">
        <h2>Introduction</h2>
        <p>
          This is release{' '}
          <strong>
            <code>{release.releaseNumber}</code>
          </strong>{' '}
          of UniProtKB, published on{' '}
          <strong>
            <time dateTime={release.releaseDate.toISOString()}>
              {release.releaseDate.toDateString()}
            </time>
          </strong>
          .
        </p>
        <IntroductionEntriesTable
          reviewedData={reviewedData.AUDIT}
          unreviewedData={unreviewedData.AUDIT}
        />
        <IntroductionSequenceTable
          reviewedData={reviewedData.SEQUENCE_STATS}
          unreviewedData={unreviewedData.SEQUENCE_STATS}
        />
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
        <FrequencyTable
          reviewedData={reviewedData.ORGANISM_FREQUENCY}
          unreviewedData={unreviewedData.ORGANISM_FREQUENCY}
          header="Species represented"
          caption="Table of the frequency of occurrence of species"
        />
        <ReviewedUnreviewedStatsTable
          categoryName="TOP_ORGANISM"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          caption="Table of the most represented species"
        />
        <TaxonomiDistributionTable
          reviewedData={reviewedData.SUPERKINGDOM}
          unreviewedData={unreviewedData.SUPERKINGDOM}
          distributionLabel="across kingdoms"
          nameToQuery={nameToQueryKingdoms}
        />
        <TaxonomiDistributionTable
          reviewedData={reviewedData.EUKARYOTA}
          unreviewedData={unreviewedData.EUKARYOTA}
          colorScheme={schemeReds as string[][]}
          distributionLabel="within eukaryota"
          nameToQuery={nameToQueryEukaryota}
        />
      </Card>
      <Card id="sequence-size">
        <h2>Sequence size</h2>
        <FrequencyTable
          reviewedData={reviewedData.SEQUENCE_RANGE}
          unreviewedData={unreviewedData.SEQUENCE_RANGE}
          header="sequence sizes, from-to"
          caption="Repartition of the sequences by size (excluding fragments)"
          locationGetter={getSequenceSizeLocation}
        />
        <ReviewedUnreviewedStatsTable
          categoryName="SEQUENCE_COUNT"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
        />
      </Card>
      <Card id="journal-citations">
        <h2>Journal citations</h2>
        <p>
          Note: the following citation statistics reflect the number of distinct
          journal citations.
        </p>
        <FrequencyTable
          reviewedData={reviewedData.JOURNAL_FREQUENCY}
          unreviewedData={unreviewedData.JOURNAL_FREQUENCY}
          header="Journals cited"
          caption="Table of the frequency of journal citations"
        />
        <ReviewedUnreviewedStatsTable
          categoryName="TOP_JOURNAL"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
        />
      </Card>
      <Card id="statistics-for-some-line-type">
        <h2>Statistics for some line types</h2>
        <p>
          The following table summarizes the total number of some UniProtKB
          lines, as well as the number of entries with at least one such line,
          and the frequency of the lines.
        </p>
        <ReviewedUnreviewedStatsTable
          categoryName="PUBLICATION"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          reviewedCaption={getUniqueAuthorString(reviewedData)}
          unreviewedCaption={getUniqueAuthorString(unreviewedData)}
        />
        <ReviewedUnreviewedStatsTable
          categoryName="FEATURES"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
        />
        <ReviewedUnreviewedStatsTable
          categoryName="COMMENTS"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
        />
        <ReviewedUnreviewedStatsTable
          categoryName="CROSS_REFERENCE"
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
        />
      </Card>
      <Card id="amino-acid-composition">
        <h2>Amino acid composition</h2>
        <ReviewedUnreviewedTabs>
          <div className={styles['side-by-side']}>
            <AminoAcidBarPlot category={reviewedData.SEQUENCE_AMINO_ACID} />
            <StatsTable
              key="reviewed"
              category={filterAminoAcids(reviewedData.SEQUENCE_AMINO_ACID)}
            />
          </div>
          <div className={styles['side-by-side']}>
            <AminoAcidBarPlot category={unreviewedData.SEQUENCE_AMINO_ACID} />
            <StatsTable
              key="reviewed"
              category={filterAminoAcids(unreviewedData.SEQUENCE_AMINO_ACID)}
            />
          </div>
        </ReviewedUnreviewedTabs>
      </Card>
      <Card id="miscellaneous-statistics">
        <h2>Miscellaneous statistics</h2>
        <ReviewedUnreviewedStatsTable
          title="Encoded Locations"
          categoryName="MISCELLANEOUS"
          reviewedData={getEncodedLocations(reviewedData)}
          unreviewedData={getEncodedLocations(unreviewedData)}
        />
        <ReviewedSequenceCorrections data={reviewedData} />
      </Card>
    </SidebarLayout>
  );
};

export default StatisticsPage;
