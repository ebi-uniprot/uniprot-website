/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState } from 'react';
import { Card, Loader, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';
import { schemeReds } from 'd3';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import HTMLHead from '../../../shared/components/HTMLHead';
import LazyComponent from '../../../shared/components/LazyComponent';
import PieChart, { StatisticsGraphItem } from '../graphs/PieChart';
import AminoAcidBarPlot from './AminoAcidBarPlot';
import UniProtKBStatsTabs from './UniProtKBStatsTabs';
import FrequencyTable from './FrequencyTable';
import CountLinkOrNothing from './CountLinkOrNothing';
import UniProtKBStatsTable from './UniProtKBStatsTable';
import ReviewedSequenceCorrections from './ReviewedSequenceCorrections';
import SequenceLengthLinePlot from './SequenceLengthLinePlot';
import AbstractSectionTable from './AbstractSectionTable';
import UniqueReferencesTable from './UniqueReferencesTable';
import AminoAcidCompositionTable from './AminoAcidCompositionTable';
import { ReviewedLabel, UnreviewedLabel } from './UniProtKBLabels';
import InPageNav from '../../../shared/components/InPageNav';

import useUniProtDataVersion from '../../../shared/hooks/useUniProtDataVersion';
import useDataApi from '../../../shared/hooks/useDataApi';

import { stringifyQuery } from '../../../shared/utils/url';
import { nameToQueryEukaryota, nameToQueryKingdoms } from './taxonomyQueries';
import apiUrls from '../../config/apiUrls/apiUrls';
import {
  MergedStatisticsItem,
  getEncodedLocations,
  getSequenceSizeLocation,
  getUniqueAuthorString,
  merge,
  mergeToMap,
  getNumberReleaseEntries,
} from './utils';

import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';

import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import styles from './styles/statistics-page.module.scss';

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

export type TableProps = {
  uniprotkbData: StatisticsCategory;
  reviewedData: StatisticsCategory;
  unreviewedData: StatisticsCategory;
};

const IntroductionEntriesTable = ({
  uniprotkbData,
  reviewedData,
  unreviewedData,
  releaseDate,
}: TableProps & {
  releaseDate: Date;
}) => {
  const map = mergeToMap(
    uniprotkbData.items,
    reviewedData.items,
    unreviewedData.items
  );
  return (
    <>
      <AbstractSectionTable
        title="Total number of entries in this release of UniProtKB"
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
        title={
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
            query: `(date_created:[${
              releaseDate.toISOString().split('T')[0]
            } TO *])`,
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
  uniprotkbData,
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const map = mergeToMap(
    uniprotkbData.items,
    reviewedData.items,
    unreviewedData.items
  );

  return (
    <>
      <AbstractSectionTable
        title="Number of fragments"
        tableData={[
          {
            header: <>Fragments</>,
            data: map.get('FRAGMENT')!,
            query: '(fragment:true)',
          },
        ]}
      />
      <AbstractSectionTable
        title="Number of isoforms"
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
        title="Amino acids in this release"
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
  uniprotkbData,
  reviewedData,
  unreviewedData,
}: TableProps) => {
  const list = merge(
    uniprotkbData.items,
    reviewedData.items,
    unreviewedData.items
  )
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
    <>
      <h3>Total number of entries per protein existence (PE) annotation</h3>
      <table>
        <thead>
          <tr>
            <th>Protein existence (PE)</th>
            <th>UniProtKB</th>
            <th>
              <ReviewedLabel />
            </th>
            <th>
              <UnreviewedLabel />
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ name, label, statistics, query }) => (
            <tr key={name}>
              <td>
                {proteinExistenceToNumber.get(name)}: {label}
              </td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <td className={styles.end}>
                <Link
                  to={{
                    pathname: LocationToPath[Location.UniProtKBResults],
                    search: stringifyQuery({ query }),
                  }}
                >
                  <LongNumber>
                    {statistics.uniprotkb?.entryCount || 0}
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
    </>
  );
};

const TotalOrganismTable = ({
  uniprotkbData,
  reviewedData,
  unreviewedData,
}: TableProps) => (
  <>
    <h3>Total number of species represented in this release of UniProtKB</h3>
    <table>
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
            <LongNumber>{uniprotkbData.totalCount}</LongNumber>
          </td>
        </tr>
        <tr>
          <td>
            <ReviewedLabel />
          </td>
          <td className={styles.end}>
            <LongNumber>{reviewedData.totalCount}</LongNumber>
          </td>
        </tr>
        <tr>
          <td>
            <UnreviewedLabel />
          </td>
          <td className={styles.end}>
            <LongNumber>{unreviewedData.totalCount}</LongNumber>
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

const options = ['UniProtKB', 'reviewed', 'unreviewed'] as const;

const TaxonomicDistributionTable = ({
  uniprotkbData,
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
  const list = merge(
    uniprotkbData.items,
    reviewedData.items,
    unreviewedData.items
  ).map(
    ({ name, statistics }): MergedStatisticsItem => ({
      name,
      statistics,
      query: nameToQuery.get(name),
    })
  );

  const [selected, setSelected] = useState<(typeof options)[number]>(
    options[0]
  );

  const graphData: StatisticsGraphItem[] = list.map((entry) => {
    let { query } = entry;
    if (query && selected !== 'UniProtKB') {
      query += `(reviewed:${selected === 'reviewed'}) AND ${query}`;
    }
    return {
      name: entry.name,
      entryCount:
        ((selected !== 'unreviewed'
          ? entry.statistics.reviewed?.entryCount
          : 0) || 0) +
        ((selected !== 'reviewed'
          ? entry.statistics.unreviewed?.entryCount
          : 0) || 0),
      to: entry.query && {
        pathname: LocationToPath[Location.UniProtKBResults],
        search: stringifyQuery({ query }),
      },
    };
  });

  return (
    <>
      <h3>Taxonomic distribution of the sequences {distributionLabel}</h3>
      <div className={styles['side-by-side']}>
        <table>
          <thead>
            <tr>
              <th>Taxonomy</th>
              <th>UniProtKB</th>
              <th>
                <ReviewedLabel />
              </th>
              <th>
                <UnreviewedLabel />
              </th>
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
                    {statistics.uniprotkb?.entryCount || 0}
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
        <div className={styles.viz}>
          <figure>
            <LazyComponent
              // Keep the space with an empty visualisation
              fallback={<PieChart type="taxonomy" />}
              rootMargin="0px 0px"
            >
              <PieChart
                data={graphData}
                type="taxonomy"
                colorScheme={colorScheme}
              />
            </LazyComponent>
            <figcaption>
              Taxonomic distribution for{' '}
              <select
                value={selected}
                onChange={(e) =>
                  setSelected(e.target.value as (typeof options)[number])
                }
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </figcaption>
          </figure>
        </div>
      </div>
    </>
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

  const uniprotkbStats = useDataApi<StatisticsPayload>(
    release && apiUrls.statistics.statistics(release.releaseNumber)
  );
  const reviewedStats = useDataApi<StatisticsPayload>(
    release && apiUrls.statistics.statistics(release.releaseNumber, 'reviewed')
  );
  const unreviewedStats = useDataApi<StatisticsPayload>(
    release &&
      apiUrls.statistics.statistics(release.releaseNumber, 'unreviewed')
  );

  if (
    !release ||
    uniprotkbStats.loading ||
    reviewedStats.loading ||
    unreviewedStats.loading
  ) {
    return <Loader />;
  }

  if (uniprotkbStats.error || !uniprotkbStats.data) {
    return (
      <ErrorHandler
        status={uniprotkbStats.status}
        error={uniprotkbStats.error}
        fullPage
      />
    );
  }

  if (reviewedStats.error || !reviewedStats.data) {
    return (
      <ErrorHandler
        status={reviewedStats.status}
        error={reviewedStats.error}
        fullPage
      />
    );
  }

  if (unreviewedStats.error || !unreviewedStats.data) {
    return (
      <ErrorHandler
        status={unreviewedStats.status}
        error={unreviewedStats.error}
        fullPage
      />
    );
  }

  const uniprotkbData = Object.fromEntries(
    uniprotkbStats.data.results.map((stat) => [stat.categoryName, stat])
  ) as CategoryToStatistics;
  const reviewedData = Object.fromEntries(
    reviewedStats.data.results.map((stat) => [stat.categoryName, stat])
  ) as CategoryToStatistics;
  const unreviewedData = Object.fromEntries(
    unreviewedStats.data.results.map((stat) => [stat.categoryName, stat])
  ) as CategoryToStatistics;

  const uniprotkbNumberReleaseEntries = getNumberReleaseEntries(uniprotkbData);
  const reviewedNumberReleaseEntries = getNumberReleaseEntries(reviewedData);
  const unreviewedNumberReleaseEntries =
    getNumberReleaseEntries(unreviewedData);

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
      <HTMLHead title={['UniProtKB', 'Statistics']} />
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
        <p>
          <Link
            to={getLocationEntryPath(Location.HelpEntry, 'release-statistics')}
          >
            Previous release statistics are available from the UniProt FTP
            server.
          </Link>
        </p>
        <p>
          Throughout this document, whenever a statistic has a corresponding
          query, a link has been provided. In some instances, due to the nature
          of the statistic, no query link is possible.
        </p>
        <IntroductionEntriesTable
          uniprotkbData={uniprotkbData.AUDIT}
          reviewedData={reviewedData.AUDIT}
          unreviewedData={unreviewedData.AUDIT}
          releaseDate={release.releaseDate}
        />
        <IntroductionSequenceTable
          uniprotkbData={uniprotkbData.SEQUENCE_STATS}
          reviewedData={reviewedData.SEQUENCE_STATS}
          unreviewedData={unreviewedData.SEQUENCE_STATS}
        />
        <UniqueReferencesTable
          uniprotkbData={uniprotkbData.MISCELLANEOUS}
          reviewedData={reviewedData.MISCELLANEOUS}
          unreviewedData={unreviewedData.MISCELLANEOUS}
        />
        <ProteinExistenceTable
          uniprotkbData={uniprotkbData.PROTEIN_EXISTENCE}
          reviewedData={reviewedData.PROTEIN_EXISTENCE}
          unreviewedData={unreviewedData.PROTEIN_EXISTENCE}
        />
      </Card>
      <Card id="taxonomic-origin">
        <h2>Taxonomic origin</h2>
        <TotalOrganismTable
          uniprotkbData={uniprotkbData.TOTAL_ORGANISM}
          reviewedData={reviewedData.TOTAL_ORGANISM}
          unreviewedData={unreviewedData.TOTAL_ORGANISM}
        />
        <TaxonomicDistributionTable
          uniprotkbData={uniprotkbData.SUPERKINGDOM}
          reviewedData={reviewedData.SUPERKINGDOM}
          unreviewedData={unreviewedData.SUPERKINGDOM}
          distributionLabel="across kingdoms"
          nameToQuery={nameToQueryKingdoms}
        />
        <TaxonomicDistributionTable
          uniprotkbData={uniprotkbData.EUKARYOTA}
          reviewedData={reviewedData.EUKARYOTA}
          unreviewedData={unreviewedData.EUKARYOTA}
          colorScheme={schemeReds as string[][]}
          distributionLabel="within eukaryota"
          nameToQuery={nameToQueryEukaryota}
        />
        <UniProtKBStatsTable
          categoryName="TOP_ORGANISM"
          uniprotkbData={uniprotkbData}
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          title="Most represented species"
          nameLabel="Species"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
        <FrequencyTable
          uniprotkbData={uniprotkbData.ORGANISM_FREQUENCY}
          reviewedData={reviewedData.ORGANISM_FREQUENCY}
          unreviewedData={unreviewedData.ORGANISM_FREQUENCY}
          header="Species represented"
          title="Frequency of occurrence of species"
        />
      </Card>
      <Card id="sequence-size">
        <h2>Sequence size</h2>
        <UniProtKBStatsTabs>
          <LazyComponent
            // Keep the space with an empty visualisation
            fallback={<SequenceLengthLinePlot />}
            rootMargin="0px 0px"
          >
            <SequenceLengthLinePlot
              counts={uniprotkbData.SEQUENCE_COUNT.items}
            />
          </LazyComponent>
          <LazyComponent
            // Keep the space with an empty visualisation
            fallback={<SequenceLengthLinePlot />}
            rootMargin="0px 0px"
          >
            <SequenceLengthLinePlot
              counts={reviewedData.SEQUENCE_COUNT.items}
            />
          </LazyComponent>
          <LazyComponent
            // Keep the space with an empty visualisation
            fallback={<SequenceLengthLinePlot />}
            rootMargin="0px 0px"
          >
            <SequenceLengthLinePlot
              counts={unreviewedData.SEQUENCE_COUNT.items}
            />
          </LazyComponent>
        </UniProtKBStatsTabs>

        <FrequencyTable
          uniprotkbData={uniprotkbData.SEQUENCE_RANGE}
          reviewedData={reviewedData.SEQUENCE_RANGE}
          unreviewedData={unreviewedData.SEQUENCE_RANGE}
          header="sequence sizes, from-to"
          title="Repartition of the sequences by size (excluding fragments)"
          locationGetter={getSequenceSizeLocation}
        />
      </Card>
      <Card id="journal-citations">
        <h2>Journal citations</h2>
        <p>
          Note: the following citation statistics reflect the number of distinct
          journal citations.
        </p>
        <FrequencyTable
          uniprotkbData={uniprotkbData.JOURNAL_FREQUENCY}
          reviewedData={reviewedData.JOURNAL_FREQUENCY}
          unreviewedData={unreviewedData.JOURNAL_FREQUENCY}
          header="Journals cited"
          title="Frequency of journal citations"
        />
        <UniProtKBStatsTable
          categoryName="TOP_JOURNAL"
          uniprotkbData={uniprotkbData}
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          countLabel="Citations"
          nameLabel="Journal"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
      </Card>
      <Card id="statistics-for-some-line-type">
        <h2>Statistics for some line types</h2>
        <p>
          The following table summarizes the total number of some UniProtKB
          lines, as well as the number of entries with at least one such line,
          and the frequency of the lines.
        </p>
        <UniProtKBStatsTable
          categoryName="PUBLICATION"
          uniprotkbData={uniprotkbData}
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          reviewedCaption={getUniqueAuthorString(reviewedData)}
          unreviewedCaption={getUniqueAuthorString(unreviewedData)}
          nameLabel="Publication type"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
        <UniProtKBStatsTable
          categoryName="FEATURES"
          title="Sequence annotations (features)"
          uniprotkbData={uniprotkbData}
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          nameLabel="Feature"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
        <UniProtKBStatsTable
          categoryName="COMMENTS"
          title="General annotation (comments)"
          uniprotkbData={uniprotkbData}
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          nameLabel="Comment"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
        <UniProtKBStatsTable
          categoryName="CROSS_REFERENCE"
          title="Cross-references"
          uniprotkbData={uniprotkbData}
          reviewedData={reviewedData}
          unreviewedData={unreviewedData}
          nameLabel="Cross reference"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
      </Card>
      <Card id="amino-acid-composition">
        <h2>Amino acid composition</h2>
        <UniProtKBStatsTabs>
          <div className={styles['side-by-side']}>
            <div className={styles.viz}>
              <LazyComponent
                // Keep the space with an empty visualisation
                fallback={<AminoAcidBarPlot />}
                rootMargin="0px 0px"
              >
                <AminoAcidBarPlot
                  category={uniprotkbData.SEQUENCE_AMINO_ACID}
                />
              </LazyComponent>
            </div>
            <AminoAcidCompositionTable
              dataset="UniProtKB"
              data={uniprotkbData.SEQUENCE_AMINO_ACID}
              numberReleaseEntries={uniprotkbNumberReleaseEntries}
            />
          </div>
          <div className={styles['side-by-side']}>
            <div className={styles.viz}>
              <LazyComponent
                // Keep the space with an empty visualisation
                fallback={<AminoAcidBarPlot />}
                rootMargin="0px 0px"
              >
                <AminoAcidBarPlot category={reviewedData.SEQUENCE_AMINO_ACID} />
              </LazyComponent>
            </div>
            <AminoAcidCompositionTable
              dataset="reviewed"
              data={reviewedData.SEQUENCE_AMINO_ACID}
              numberReleaseEntries={reviewedNumberReleaseEntries}
            />
          </div>
          <div className={styles['side-by-side']}>
            <div className={styles.viz}>
              <LazyComponent
                // Keep the space with an empty visualisation
                fallback={<AminoAcidBarPlot />}
                rootMargin="0px 0px"
              >
                <AminoAcidBarPlot
                  category={unreviewedData.SEQUENCE_AMINO_ACID}
                />
              </LazyComponent>
            </div>
            <AminoAcidCompositionTable
              dataset="unreviewed"
              data={unreviewedData.SEQUENCE_AMINO_ACID}
              numberReleaseEntries={unreviewedNumberReleaseEntries}
            />
          </div>
        </UniProtKBStatsTabs>
      </Card>
      <Card id="miscellaneous-statistics">
        <h2>Miscellaneous statistics</h2>
        <UniProtKBStatsTable
          title="Encoded Locations"
          categoryName="MISCELLANEOUS"
          uniprotkbData={getEncodedLocations(uniprotkbData)}
          reviewedData={getEncodedLocations(reviewedData)}
          unreviewedData={getEncodedLocations(unreviewedData)}
          nameLabel="Encoded location"
          uniprotkbNumberReleaseEntries={uniprotkbNumberReleaseEntries}
          reviewedNumberReleaseEntries={reviewedNumberReleaseEntries}
          unreviewedNumberReleaseEntries={unreviewedNumberReleaseEntries}
        />
        <ReviewedSequenceCorrections data={reviewedData} />
      </Card>
    </SidebarLayout>
  );
};

export default StatisticsPage;
