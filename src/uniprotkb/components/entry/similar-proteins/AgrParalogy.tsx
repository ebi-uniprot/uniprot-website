import cn from 'classnames';
import { ExternalLink, Loader } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { Location, LocationToPath } from '../../../../app/config/urls';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import TableFromData, {
  TableFromDataColumn,
} from '../../../../shared/components/table/TableFromData';
import WithTooltip from '../../../../shared/components/WithTooltip';
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
const PARALOGY_METHODS: {
  method: PredictionMethodName;
  tooltip: string;
}[] = [
  {
    method: 'Ensembl Compara',
    tooltip: 'Paralogy relationships inferred by the Ensembl Compara pipeline.',
  },
  {
    method: 'HGNC',
    tooltip:
      'Paralogs manually curated by the HUGO Gene Nomenclature Committee for human gene family relationships.',
  },
  {
    method: 'InParanoid',
    tooltip:
      'In-paralogs identified within species using the InParanoid clustering algorithm.',
  },
  {
    method: 'OMA',
    tooltip:
      'Paralogy relationships predicted by the OMA (Orthologous MAtrix) algorithm through internal duplication detection.',
  },
  {
    method: 'OrthoFinder',
    tooltip:
      'Paralog assignments determined by OrthoFinder’s graph-based gene-family inference.',
  },
  {
    method: 'OrthoInspector',
    tooltip:
      'Paralogs detected using the OrthoInspector homology-detection framework.',
  },
  {
    method: 'PANTHER',
    tooltip:
      'Paralog relationships assigned by PANTHER’s phylogenetic family and subfamily models.',
  },
  {
    method: 'PhylomeDB',
    tooltip:
      'Paralogy calls supported by the PhylomeDB gene-tree database through duplication nodes.',
  },
  {
    method: 'SonicParanoid',
    tooltip:
      'Paralogs inferred by the SonicParanoid pipeline leveraging fast pairwise comparisons.',
  },
  {
    method: 'SGD',
    tooltip:
      'Paralogous gene relationships manually curated by the Saccharomyces Genome Database for S. cerevisiae.',
  },
];

const columns: TableFromDataColumn<AgrParalogsResult>[] = [
  {
    id: 'gene-symbol',
    label: (
      <WithTooltip tooltip="Gene symbol of the paralog in the same species.">
        Gene Symbol
      </WithTooltip>
    ),
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
    label: (
      <WithTooltip tooltip="Rank of this gene among all paralog candidates based on supporting evidence.">
        Rank
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.rank,
  },
  {
    id: 'length',
    label: (
      <WithTooltip tooltip="Length (in amino acids) of the paralogous protein sequence.">
        Length
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.length,
  },
  {
    id: 'similarity',
    label: (
      <WithTooltip tooltip="Percent sequence similarity between the query gene and its paralog.">
        Similarity
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.similarity,
  },
  {
    id: 'identity',
    label: (
      <WithTooltip tooltip="Percent sequence identity between the query gene and its paralog.">
        Identity
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.identity,
  },
];

for (const [index, { method, tooltip }] of PARALOGY_METHODS.entries()) {
  columns.push(
    getHomologyMethodColumnConfig(
      index,
      method,
      tooltip,
      'Result of paralogy-inference resource and algorithm methods.',
      (data) => data.geneToGeneParalogy
    )
  );
}

columns.push({
  id: 'method-match-count',
  label: (
    <span className={styles['method-match-count-label']}>
      <WithTooltip tooltip="Number of independent paralogy-inference resource and algorithm methods that support this gene pair.">
        Match count
      </WithTooltip>
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

const getRowId = (data: AgrParalogsResult) =>
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
