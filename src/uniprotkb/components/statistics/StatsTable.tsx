import { Button, LongNumber } from 'franklin-sites';
import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import { stringifyQuery } from '../../../shared/utils/url';
import { CategoryName, StatisticsCategory } from './StatisticsPage';
import styles from './styles/statistics-page.module.scss';

const tableCollapsedRows = 10 as const;
// TODO: create a function to determine collapsable.

const sortByCount = new Set<CategoryName>([
  'AUDIT',
  'COMMENTS',
  'CROSS_REFERENCE',
  'EUKARYOTA',
  'FEATURES',
  'JOURNAL_FREQUENCY',
  'MISCELLANEOUS',
  'ORGANISM_FREQUENCY',
  'PROTEIN_EXISTENCE',
  'PUBLICATION',
  'SEQUENCE_AMINO_ACID',
  'SEQUENCE_RANGE',
  'SEQUENCE_STATS',
  'SUPERKINGDOM',
  'TOP_JOURNAL',
  'TOP_ORGANISM',
]);

const commentNameToHelpArticle = new Map([
  ['ACTIVITY_REGULATION', 'activity_regulation'],
  ['ALLERGEN', 'allergenic_properties'],
  ['ALTERNATIVE_PRODUCTS', 'alternative_products'],
  ['BIOPHYSICOCHEMICAL_PROPERTIES', 'biophysicochemical_properties'],
  ['BIOTECHNOLOGY', 'biotechnological_use'],
  ['CATALYTIC_ACTIVITY', 'catalytic_activity'],
  ['CAUTION', 'caution'],
  ['COFACTOR', 'cofactor'],
  ['DEVELOPMENTAL_STAGE', 'developmental_stage'],
  ['DISEASE', 'involvement_in_disease'],
  ['DISRUPTION_PHENOTYPE', 'disruption_phenotype'],
  ['DOMAIN', 'domain'],
  ['FUNCTION', 'function'],
  ['INDUCTION', 'induction'],
  ['INTERACTION', 'binary_interactions'],
  ['MASS_SPECTROMETRY', 'mass_spectrometry'],
  ['MISCELLANEOUS', 'miscellaneous'],
  ['PATHWAY', 'pathway'],
  ['PHARMACEUTICAL', 'pharmaceutical_use'],
  ['POLYMORPHISM', 'polymorphism'],
  ['PTM', 'post-translational_modification'],
  ['RNA_EDITING', 'rna_editing'],
  ['SEQUENCE_CAUTION', 'sequence_caution'],
  ['SIMILARITY', 'sequence_similarities'],
  ['SUBCELLULAR_LOCATION', 'subcellular_location'],
  ['SUBUNIT', 'subunit_structure'],
  ['TISSUE_SPECIFICITY', 'tissue_specificity'],
  ['TOXIC_DOSE', 'toxic_dose'],
  ['WEBRESOURCE', 'web_resource'],
]);

type StatsTableProps = {
  category: StatisticsCategory;
  alwaysExpand?: boolean;
  nameLabel?: string;
  abbreviationLabel?: string;
  countLabel?: string;
  caption?: string;
  numberReleaseEntries: number;
  dataset: 'UniProtKB' | 'reviewed' | 'unreviewed';
  nameToAbbreviation?: Map<string, string>;
};

const StatsTable = ({
  category,
  alwaysExpand,
  nameLabel,
  abbreviationLabel,
  countLabel,
  caption,
  numberReleaseEntries,
  dataset,
  nameToAbbreviation,
}: StatsTableProps) => {
  const [expand, setExpand] = useState(alwaysExpand);
  const tableRef = useRef<HTMLTableElement>(null);
  const onExpandCollapseClick = useCallback(() => {
    if (expand) {
      tableRef.current?.scrollIntoView();
      setExpand(false);
    } else {
      setExpand(true);
    }
  }, [expand]);

  const hasDescription = category.items.some((item) => item.description);
  const hasOnlyEntryCounts = category.items.every(
    (item) => item.count === item.entryCount
  );
  // Exceptions
  const hasEntryCount = category.categoryName !== 'TOTAL_ORGANISM';
  const hasPercent =
    category.items.length > 1 &&
    category.categoryName === 'SEQUENCE_AMINO_ACID';
  let rows = category.items;
  if (category.categoryName === 'SEQUENCE_COUNT') {
    rows = Array.from(category.items).sort((a, b) => +a.name - +b.name);
  }
  if (sortByCount.has(category.categoryName)) {
    rows = Array.from(category.items).sort((a, b) => b.count - a.count);
  }

  return (
    <div className={styles.container}>
      <table ref={tableRef}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th>{nameLabel || 'Name'}</th>
            {abbreviationLabel && nameToAbbreviation && (
              <th>{abbreviationLabel}</th>
            )}
            {!hasOnlyEntryCounts && <th>{countLabel || 'Count'}</th>}
            {hasPercent && !hasOnlyEntryCounts && <th>Percent</th>}
            {hasEntryCount && (
              <th>
                {nameLabel
                  ? `Entries with ${nameLabel.toLowerCase()}`
                  : 'Entry count'}
              </th>
            )}
            {hasPercent && hasOnlyEntryCounts && <th>Percent</th>}
            {!hasOnlyEntryCounts && (
              <th>
                Average {countLabel?.toLowerCase() || 'count'} per {dataset}{' '}
                entry
              </th>
            )}
            {hasDescription && <th>Description</th>}
          </tr>
        </thead>
        <tbody>
          {rows.slice(0, expand ? undefined : tableCollapsedRows).map((row) => {
            const percent =
              hasPercent &&
              ((row.count / category.totalCount) * 100).toFixed(2);
            const perEntryAverage = (row.count / numberReleaseEntries).toFixed(
              2
            );
            const abbreviation =
              abbreviationLabel &&
              nameToAbbreviation &&
              nameToAbbreviation.get(row.label as string);

            return (
              <tr key={row.name}>
                {/* Name */}
                <td
                  data-article-id={
                    (category.categoryName === 'COMMENTS' &&
                      commentNameToHelpArticle.has(row.name) &&
                      commentNameToHelpArticle.get(row.name)) ||
                    (category.categoryName === 'FEATURES' &&
                      row.name.toLowerCase()) ||
                    undefined
                  }
                >
                  {row.label || row.name}
                </td>
                {abbreviation && <td>{abbreviation}</td>}
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
                    {row.query ? (
                      <Link
                        to={{
                          pathname: LocationToPath[Location.UniProtKBResults],
                          search: stringifyQuery({ query: row.query }),
                        }}
                      >
                        <LongNumber>{row.entryCount}</LongNumber>
                      </Link>
                    ) : (
                      <LongNumber>{row.entryCount}</LongNumber>
                    )}
                  </td>
                )}
                {/* Percent */}
                {hasPercent && hasOnlyEntryCounts && (
                  <td className={styles.end}>
                    {percent === '0.00' ? '<0.01' : percent}%
                  </td>
                )}
                {/* Per-entry average */}
                {!hasOnlyEntryCounts && (
                  <td className={styles.end}>
                    {perEntryAverage === '0.00' ? '<0.01' : perEntryAverage}
                  </td>
                )}
                {/* Description */}
                {hasDescription && <td>{row.description}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      {!alwaysExpand && rows.length > tableCollapsedRows && (
        <Button onClick={onExpandCollapseClick}>
          {expand ? 'Collapse' : 'Expand'} table
        </Button>
      )}
    </div>
  );
};

export default StatsTable;
