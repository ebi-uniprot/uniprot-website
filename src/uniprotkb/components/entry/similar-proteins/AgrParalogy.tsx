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

export const columns: TableFromDataColumn<AgrParalogsResult>[] = [
  {
    id: 'gene-symbol',
    label: (
      <WithTooltip tooltip="Official gene symbol for the genetic marker, linked to the corresponding UniProtKB entries.">
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
      <WithTooltip
        tooltip={`The ranking score is calculated using a weighted formula: Score = w₁ x (Alignment Length x Similarity %) + w₂ x (Alignment Length x Identity %) + w₃ x (Method Count) + w₄ x (Alignment Length).<br>
<br>
Where the weights are as follows:<br>
<br>
<ul>
  <li>w₁ = 1.000: Weight for the absolute number of similar amino acids.</li>
  <li>w₂ = 1.000: Weight for the absolute number of identical amino acids.</li>
  <li>w₃ = 1.500: Weight for the method count.</li>
  <li>w₄ = 1.500: Weight for the alignment length.</li>
</ul>

Multiple entries can share the same rank.`}
      >
        Rank
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.rank,
  },
  {
    id: 'length',
    label: (
      <WithTooltip tooltip="For the purpose of identifying alignment lengths, protein sequences were obtained from the NCBI RefSeq database release 207. In scenarios where multiple isoforms were available, the longest isoform was utilized. Alignments of the sequences were carried out via EMBOSS water software utilizing the BLOSUM62 matrix and retaining all default configurations.">
        Length
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.length,
  },
  {
    id: 'similarity',
    label: (
      <WithTooltip tooltip="Includes not only identical matches but matches that are conservative substitutions.">
        Similarity
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.similarity,
  },
  {
    id: 'identity',
    label: (
      <WithTooltip tooltip="The percent of nucleotides that are the same in an alignment at the same position.">
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
      'A solid circle notes algorithms that made the paralogy association. Dashes indicate the comparison was not performed.',
      (data) => data.geneToGeneParalogy
    )
  );
}

columns.push({
  id: 'method-match-count',
  label: (
    <span className={styles['method-match-count-label']}>
      <WithTooltip tooltip="The number of the 10 paralogy methods that make the paralogy association.">
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
