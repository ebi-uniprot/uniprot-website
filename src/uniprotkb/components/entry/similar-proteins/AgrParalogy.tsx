import cn from 'classnames';
import { Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';

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
  AgrParalogs,
  AgrParalogsResult,
  PredictionMethodName,
} from '../../../types/agrParalogs';
import { getXrefAndTaxonQuery } from '../../../utils/agr-homology';
import getHomologyMethodColumnConfig from './getHomologyMethodColumnConfig';
import styles from './styles/agr-homology.module.scss';

// From https://github.com/alliance-genome/agr_ui/blob/f1ab35ab8a869e2956e87c8c19e0fcce2f7988ed/src/components/paralogy/methods.js
const PARALOGY_METHODS: PredictionMethodName[] = [
  'Ensembl Compara',
  'HGNC',
  'InParanoid',
  'OMA',
  'OrthoFinder',
  'OrthoInspector',
  'PANTHER',
  'PhylomeDB',
  'SonicParanoid',
  'SGD',
];

export const columns: TableFromDataColumn<AgrParalogsResult>[] = [
  {
    id: 'gene-symbol',
    label: 'Gene Symbol',
    render: (data) => {
      const query = getXrefAndTaxonQuery(data.geneToGeneParalogy.objectGene);
      const gene = data.geneToGeneParalogy.objectGene.geneSymbol.displayText;

      return query ? (
        <Link
          to={{
            pathname: LocationToPath[Location.UniProtKBResults],
            search: stringifyQuery({ query }),
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
    id: 'rank',
    label: 'Rank',
    render: (data) => data.geneToGeneParalogy.rank,
  },
  {
    id: 'length',
    label: 'Length',
    render: (data) => data.geneToGeneParalogy.length,
  },
  {
    id: 'similarity',
    label: 'Similarity',
    render: (data) => data.geneToGeneParalogy.similarity,
  },
  {
    id: 'identity',
    label: 'Identity',
    render: (data) => data.geneToGeneParalogy.identity,
  },
];

for (const [index, method] of PARALOGY_METHODS.entries()) {
  columns.push(
    getHomologyMethodColumnConfig(
      index,
      method,
      (data) => data.geneToGeneParalogy
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
      data.geneToGeneParalogy.predictionMethodsMatched.length;
    const scoreDenominator =
      scoreNumerator +
      (data.geneToGeneParalogy.predictionMethodsNotMatched?.length || 0);
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

export const getRowId = (data: AgrParalogsResult) =>
  data.geneToGeneParalogy.objectGene.primaryExternalId;

type Props = {
  agrId: string;
};

const AgrParalogy = ({ agrId }: Props) => {
  const { data, loading, error, status, progress } = useDataApi<AgrParalogs>(
    agrId ? externalUrls.AgrHomologs(agrId, 'paralogs') : null
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error) {
    return <ErrorHandler status={status} error={error} />;
  }

  if (!data?.results?.length) {
    return 'No paralogy data is available from the Alliance of Genome Resources.';
  }

  return (
    <>
      <div className={styles['agr-link']}>
        The data in this table is sourced from the Alliance of Genome Resources.
        <br />
        <ExternalLink url={externalUrls.AgrEntryHomologs(agrId, 'paralogy')}>
          View source data
        </ExternalLink>
        {' | '}
        <ExternalLink url={externalUrls.AgrHelp}>View source help</ExternalLink>
      </div>
      <TableFromData
        id="agr-orthology"
        columns={columns}
        data={data.results}
        getRowId={getRowId}
        className={cn(
          styles['agr-homology-table'],
          styles['agr-paralogy-table']
        )}
      />
    </>
  );
};

export default AgrParalogy;
