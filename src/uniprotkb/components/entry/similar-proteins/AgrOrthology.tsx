import cn from 'classnames';
import { Loader } from 'franklin-sites';
import { Link } from 'react-router';

import { Location, LocationToPath } from '../../../../app/config/urls';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ExternalLink from '../../../../shared/components/ExternalLink';
import TableFromData, {
  TableFromDataColumn,
} from '../../../../shared/components/table/TableFromData';
import externalUrls from '../../../../shared/config/externalUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { stringifyQuery } from '../../../../shared/utils/url';
import {
  AgrOrthologs,
  AgrOrthologsResult,
  PredictionMethodName,
} from '../../../types/agrOrthologs';
import { getXrefAndTaxonQuery } from '../../../utils/agr-homology';
import getHomologyMethodColumnConfig from './getHomologyMethodColumnConfig';
import styles from './styles/agr-homology.module.scss';

// From https://github.com/alliance-genome/agr_ui/blob/6f5acc104df6274bb0642a2317a5b6b102a91b32/src/components/orthology/orthologyTable.js#L29
export const isBest = (value: boolean | string = '') =>
  typeof value === 'boolean' ? value : !!value.match(/yes/i);

// From https://github.com/alliance-genome/agr_ui/blob/6f5acc104df6274bb0642a2317a5b6b102a91b32/src/components/homology/constants.js#L1
const ORTHOLOGY_METHODS: PredictionMethodName[] = [
  'Ensembl Compara',
  'HGNC',
  'Hieranoid',
  'InParanoid',
  'OMA',
  'OrthoFinder',
  'OrthoInspector',
  'PANTHER',
  'PhylomeDB',
  'SonicParanoid',
  'Xenbase',
  'ZFIN',
];

// With modification from https://github.com/alliance-genome/agr_ui/blob/f1ab35ab8a869e2956e87c8c19e0fcce2f7988ed/src/constants.js#L424C14-L424C20
const TAXON_TO_INDEX = new Map(
  [
    'NCBITaxon:9606',
    'NCBITaxon:10090',
    'NCBITaxon:10116',
    'NCBITaxon:8355',
    'NCBITaxon:8364',
    'NCBITaxon:7955',
    'NCBITaxon:7227',
    'NCBITaxon:6239',
    'NCBITaxon:559292',
    'NCBITaxon:2697049',
  ].map((taxon, index) => [taxon, index])
);

export const resultsCompare = (
  a: AgrOrthologsResult,
  b: AgrOrthologsResult
) => {
  const aIndex =
    TAXON_TO_INDEX.get(a.geneToGeneOrthologyGenerated.objectGene.taxon.curie) ??
    TAXON_TO_INDEX.size;
  const bIndex =
    TAXON_TO_INDEX.get(b.geneToGeneOrthologyGenerated.objectGene.taxon.curie) ??
    TAXON_TO_INDEX.size;
  const indexComparison = aIndex - bIndex;
  if (indexComparison !== 0) {
    return indexComparison;
  }
  const aLength =
    a.geneToGeneOrthologyGenerated.predictionMethodsMatched.length;
  const bLength =
    b.geneToGeneOrthologyGenerated.predictionMethodsMatched.length;
  const lengthComparison = bLength - aLength;
  return lengthComparison;
};

export const columns: TableFromDataColumn<AgrOrthologsResult>[] = [
  {
    id: 'species',
    label: 'Species',
    filter: (data, filterValue) =>
      data.geneToGeneOrthologyGenerated.objectGene.taxon.name === filterValue,
    render: (data) => data.geneToGeneOrthologyGenerated.objectGene.taxon.name,
  },
  {
    id: 'gene-symbol',
    label: 'Gene Symbol',
    getOption: (data) =>
      data.geneToGeneOrthologyGenerated.objectGene.geneSymbol.displayText || '',
    filter: (data, filterValue) =>
      data.geneToGeneOrthologyGenerated.objectGene.geneSymbol.displayText ===
      filterValue,
    render: (data) => {
      const query = getXrefAndTaxonQuery(
        data.geneToGeneOrthologyGenerated.objectGene
      );
      const gene =
        data.geneToGeneOrthologyGenerated.objectGene.geneSymbol.displayText;

      return query ? (
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: stringifyQuery({
              query,
            }),
          }}
        >
          {gene}
        </Link>
      ) : (
        gene
      );
    },
  },
  {
    id: 'best',
    label: 'Best',
    filter: (data, filterValue) =>
      filterValue ===
      (isBest(data.geneToGeneOrthologyGenerated.isBestScore.name)
        ? 'Yes'
        : 'No'),
    render: (data) =>
      isBest(data.geneToGeneOrthologyGenerated.isBestScore.name) ? 'Yes' : 'No',
  },
  {
    id: 'best-reverse',
    label: 'Best Reverse',
    filter: (data, filterValue) =>
      filterValue ===
      (isBest(data.geneToGeneOrthologyGenerated.isBestScoreReverse.name)
        ? 'Yes'
        : 'No'),
    render: (data) =>
      isBest(data.geneToGeneOrthologyGenerated.isBestScoreReverse.name)
        ? 'Yes'
        : 'No',
  },
];

for (const [index, method] of ORTHOLOGY_METHODS.entries()) {
  columns.push(
    getHomologyMethodColumnConfig(
      index,
      method,
      (data) => data.geneToGeneOrthologyGenerated
    )
  );
}

columns.push({
  id: 'method-match-count',
  label: (
    <span className={styles['method-match-count-label']}>
      <span>Match count</span>
    </span>
  ),
  render: (data) => {
    const scoreNumerator =
      data.geneToGeneOrthologyGenerated.predictionMethodsMatched.length;
    const scoreDenominator =
      scoreNumerator +
      (data.geneToGeneOrthologyGenerated.predictionMethodsNotMatched?.length ||
        0);
    return (
      <span
        title={`${scoreNumerator} matches from ${scoreDenominator} checked methods (${Math.round((100 * scoreNumerator) / scoreDenominator)}%)`}
        className={styles['method-match-count-render']}
      >
        {scoreNumerator} of {scoreDenominator}
      </span>
    );
  },
});

export const getRowId = (data: AgrOrthologsResult) =>
  `${data.geneToGeneOrthologyGenerated.objectGene.taxon.name}-${data.geneToGeneOrthologyGenerated.objectGene.geneSymbol.displayText}`;

type Props = {
  agrId: string;
};

const AgrOrthology = ({ agrId }: Props) => {
  const { data, loading, error, status, progress } = useDataApi<AgrOrthologs>(
    agrId ? externalUrls.AgrHomologs(agrId, 'orthologs') : null
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error) {
    return <ErrorHandler status={status} error={error} />;
  }

  if (!data?.results?.length) {
    return 'No orthology data is available from the Alliance of Genome Resources.';
  }

  // From https://github.com/alliance-genome/agr_ui/blob/f1ab35ab8a869e2956e87c8c19e0fcce2f7988ed/src/components/orthology/orthologyTable.js#L56
  const sorted = data.results.sort(resultsCompare);
  return (
    <>
      <div className={styles['agr-link']}>
        The data in this table is sourced from the Alliance of Genome Resources.
        <br />
        <ExternalLink url={externalUrls.AgrEntryHomologs(agrId, 'orthology')}>
          View source data
        </ExternalLink>
        {' | '}
        <ExternalLink url={externalUrls.AgrHelp}>View source help</ExternalLink>
      </div>
      <TableFromData
        id="agr-orthology"
        columns={columns}
        data={sorted}
        getRowId={getRowId}
        className={cn(
          styles['agr-homology-table'],
          styles['agr-orthology-table']
        )}
      />
    </>
  );
};

export default AgrOrthology;
