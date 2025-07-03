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
import * as logging from '../../../../shared/utils/logging';
import { stringifyQuery } from '../../../../shared/utils/url';
import {
  AgrParalogs,
  AgrParalogsResult,
  PredictionMethodsMatchedName,
} from '../../../types/agrParalogs';
import styles from './styles/agr-homology.module.scss';

const getTaxonQuery = (curie: string): string | null => {
  const reTaxonId = /NCBITaxon:(?<taxonId>\d+)/i;
  const match = curie.match(reTaxonId);
  if (!match?.groups?.taxonId) {
    return null;
  }
  return `(taxonomy_id:${match?.groups?.taxonId})`;
};

/*
MGI:88059               (xref:mgi-88059)
Xenbase:XB-GENE-479154  (xref:xenbase-XB-GENE-479154)
FB:FBgn0000108          (xref:flybase-FBgn0000108) 
RGD:2139                (xref:rgd-2139)
ZFIN:ZDB-GENE-000616-13 (xref:zfin-ZDB-GENE-000616-13)
HGNC:620                (xref:hgnc-620)
WB:WBGene00000149       (xref:agr-WBGene00000149) 
*/
const xrefTokenToQueryPrefix = new Map([
  ['MGI', 'mgi'],
  ['Xenbase', 'xenbase'],
  ['FB', 'flybase'],
  ['RGD', 'rgd'],
  ['ZFIN', 'zfin'],
  ['HGNC', 'hgnc'],
  ['WB', 'agr'],
]);

const getXrefQuery = (primaryExternalId: string) => {
  const [xrefToken, ...idToken] = primaryExternalId.split(':');
  if (!idToken) {
    logging.error(
      `No token found for AGR primaryExternalId: ${primaryExternalId}`
    );
    return null;
  }
  const queryPrefix = xrefTokenToQueryPrefix.get(xrefToken);
  if (!queryPrefix) {
    logging.error(
      `No query prefix found for AGR primaryExternalId: ${primaryExternalId}`
    );
    return null;
  }
  return `(xref:${queryPrefix}-${idToken})`;
};

const getXrefAndTaxonQuery = (
  gene: AgrParalogsResult['geneToGeneParalogy']['objectGene']
) => {
  const taxonQuery = getTaxonQuery(gene.taxon.curie);
  const xrefQuery = getXrefQuery(gene.primaryExternalId);
  return taxonQuery && xrefQuery ? `${taxonQuery} AND ${xrefQuery}` : null;
};

// Lifted from https://github.com/alliance-genome/agr_ui/blob/6f5acc104df6274bb0642a2317a5b6b102a91b32/src/components/homology/constants.js#L1

const PARALOGY_METHODS: {
  method: PredictionMethodsMatchedName;
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
      <WithTooltip tooltip="Gene symbol of the ortholog in the target species.">
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
    id: 'rank',
    label: (
      <WithTooltip tooltip="Gene symbol of the ortholog in the target species.">
        Rank
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.rank,
  },
  {
    id: 'length',
    label: (
      <WithTooltip tooltip="Gene symbol of the ortholog in the target species.">
        Length
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.length,
  },
  {
    id: 'similarity',
    label: (
      <WithTooltip tooltip="Gene symbol of the ortholog in the target species.">
        Similarity
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.similarity,
  },
  {
    id: 'identity',
    label: (
      <WithTooltip tooltip="Gene symbol of the ortholog in the target species.">
        Identity
      </WithTooltip>
    ),
    render: (data) => data.geneToGeneParalogy.identity,
  },
];
for (const [index, { method, tooltip }] of PARALOGY_METHODS.entries()) {
  columns.push({
    id: method,
    label:
      index === 0 ? (
        <div className={styles['methods-label-container']}>
          <span className={styles['methods-label']}>
            <WithTooltip tooltip="Result of paralogy-inference resource and algorithm methods.">
              Method
            </WithTooltip>
          </span>
          <div className={styles['method-label']}>
            <WithTooltip tooltip={tooltip}>{method}</WithTooltip>
          </div>
        </div>
      ) : (
        <div className={styles['method-label']}>
          <WithTooltip tooltip={tooltip}>{method}</WithTooltip>
        </div>
      ),
    render: (data) => {
      const predictionMethodsMatchedSet = new Set(
        data.geneToGeneParalogy.predictionMethodsMatched?.map((m) => m.name)
      );
      const predictionMethodsNotMatchedSet = new Set(
        data.geneToGeneParalogy.predictionMethodsNotMatched?.map((m) => m.name)
      );
      let symbol: string, title: string;
      if (predictionMethodsMatchedSet.has(method)) {
        symbol = '●';
        title = `Match by ${method}`;
      } else if (predictionMethodsNotMatchedSet.has(method)) {
        symbol = '○';
        title = `No match by ${method}`;
      } else {
        symbol = '-';
        title = `Comparison not available for ${method}`;
      }
      return (
        <span key={method} title={title} className={styles['method-render']}>
          {symbol}
        </span>
      );
    },
  });
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
    return 'No Orthology data is available from the Alliance of Genome Resources.';
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
