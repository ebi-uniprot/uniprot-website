import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import TableFromData, {
  TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { AgrOrthologs, AgrOrthologsResult } from '../../types/agrOrthologs';
import { XrefUIModel } from '../../utils/xrefUtils';
import styles from './styles/agr-orthology.module.scss';

type Props = {
  xrefs: XrefUIModel[];
};

const getHgncId = (xrefs: XrefUIModel[]) => {
  const hgncXref = xrefs[0].databases.find((xref) => xref.database === 'HGNC');
  return hgncXref?.xrefs.find((xref) => xref.database === 'HGNC')?.id;
};

// Lifted from https://github.com/alliance-genome/agr_ui/blob/6f5acc104df6274bb0642a2317a5b6b102a91b32/src/components/orthology/orthologyTable.js#L29
const isBest = (value = '') =>
  typeof value === 'boolean' ? value : !!value.match(/yes/i);

// Lifted from https://github.com/alliance-genome/agr_ui/blob/6f5acc104df6274bb0642a2317a5b6b102a91b32/src/components/homology/constants.js#L1
const ORTHOLOGY_METHODS = [
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

// Lifted, with modification, from https://github.com/alliance-genome/agr_ui/blob/f1ab35ab8a869e2956e87c8c19e0fcce2f7988ed/src/constants.js#L424C14-L424C20
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

const columns: TableFromDataColumn<AgrOrthologsResult>[] = [
  {
    id: 'species',
    label: 'Species',
    render: (data) => data.geneToGeneOrthologyGenerated.objectGene.taxon.name,
  },
  {
    id: 'gene-symbol',
    label: 'Gene Symbol',
    render: (data) =>
      data.geneToGeneOrthologyGenerated.objectGene.geneSymbol.displayText,
  },
  {
    id: 'count',
    label: 'Count',
    render: (data) => {
      const scoreNumerator =
        data.geneToGeneOrthologyGenerated.predictionMethodsMatched.length;
      const scoreDemominator =
        scoreNumerator +
        (data.geneToGeneOrthologyGenerated.predictionMethodsNotMatched
          ?.length || 0);
      return `${scoreNumerator} of ${scoreDemominator}`;
    },
  },
  {
    id: 'best',
    label: 'Best',
    render: (data) =>
      isBest(data.geneToGeneOrthologyGenerated.isBestScore.name) ? 'Yes' : 'No',
  },
  {
    id: 'best-reverse',
    label: 'Best Reverse',
    render: (data) =>
      isBest(data.geneToGeneOrthologyGenerated.isBestScoreReverse.name)
        ? 'Yes'
        : 'No',
  },
  {
    id: 'methods',
    label: (
      <div className={styles.methods}>
        Method
        {ORTHOLOGY_METHODS.map((method) => (
          <div key={method}>{method}</div>
        ))}
      </div>
    ),
    render: (data) =>
      ORTHOLOGY_METHODS.map((method) => {
        const predictionMethodsMatchedSet = new Set(
          data.geneToGeneOrthologyGenerated.predictionMethodsMatched?.map(
            (m) => m.name
          )
        );
        const predictionMethodsNotMatchedSet = new Set(
          data.geneToGeneOrthologyGenerated.predictionMethodsNotMatched?.map(
            (m) => m.name
          )
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
          title = `Comparision not available on ${method}`;
        }
        return (
          <span
            key={method}
            title={title}
            style={{
              fontSize: 30,
              width: 30,
              display: 'inline-block',
              textAlign: 'center',
              cursor: 'default',
            }}
          >
            {symbol}
          </span>
        );
      }),
  },
];

const getRowId = (data: AgrOrthologsResult) =>
  `${data.geneToGeneOrthologyGenerated.objectGene.taxon.name}-${data.geneToGeneOrthologyGenerated.objectGene.geneSymbol.displayText}`;

const AgrOrthology = ({ xrefs }: Props) => {
  const hgncId = getHgncId(xrefs);
  const agrOrthologsResponse = useDataApi<AgrOrthologs>(
    hgncId ? externalUrls.AgrOrthologs(hgncId) : null
  );

  if (agrOrthologsResponse.loading) {
    // TODO: add data-article-id="..."
    return (
      <>
        <div>Searching Alliance of Genome Resources for orthologs.</div>
        <Loader />
      </>
    );
  }
  if (agrOrthologsResponse.error) {
    return (
      <ErrorHandler
        status={agrOrthologsResponse.status}
        error={agrOrthologsResponse.error}
        noReload
      />
    );
  }

  if (agrOrthologsResponse?.data?.results?.length) {
    // Lifted from https://github.com/alliance-genome/agr_ui/blob/f1ab35ab8a869e2956e87c8c19e0fcce2f7988ed/src/components/orthology/orthologyTable.js#L56
    const sorted = agrOrthologsResponse.data.results.sort((a, b) => {
      const aIndex =
        TAXON_TO_INDEX.get(
          a.geneToGeneOrthologyGenerated.objectGene.taxon.curie
        ) || TAXON_TO_INDEX.size;
      const bIndex =
        TAXON_TO_INDEX.get(
          b.geneToGeneOrthologyGenerated.objectGene.taxon.curie
        ) || TAXON_TO_INDEX.size;
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
    });
    // TODO: expand/collapse showing for P05067 when it shouldn't be there
    return (
      <TableFromData
        id="agr-orthology"
        columns={columns}
        data={sorted}
        getRowId={getRowId}
      />
    );
  }

  return null;
};

export default AgrOrthology;
