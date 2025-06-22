import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import TableFromData, {
  TableFromDataColumn,
} from '../../../shared/components/table/TableFromData';
import externalUrls from '../../../shared/config/externalUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { AgrOrthologs, AgrOrthologsResult } from '../../types/agrOrthologs';
import { XrefUIModel } from '../../utils/xrefUtils';

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
    id: 'best-reverse',
    label: 'Best Reverse',
    render: (data) =>
      isBest(data.geneToGeneOrthologyGenerated.isBestScoreReverse.name)
        ? 'Yes'
        : 'No',
  },
];

for (const method of ORTHOLOGY_METHODS) {
  columns.push({
    id: `method-${method}`,
    label: method,
    render: (data) => {
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
      let checked,
        title,
        disabled = false;
      if (predictionMethodsMatchedSet.has(method)) {
        checked = true;
        title = `Match by ${method}`;
      } else if (predictionMethodsNotMatchedSet.has(method)) {
        checked = false;
        title = `No match by ${method}`;
      } else {
        disabled = true;
        checked = false;
        title = `Comparision not available on ${method}`;
      }
      return (
        <label htmlFor={method} aria-label={method} title={title}>
          <input
            type="checkbox"
            data-id={method}
            id={method}
            checked={checked}
            disabled={disabled}
          />
        </label>
      );
    },
  });
}

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
    // TODO: expand/collapse showing for P05067 when it shouldn't be there
    return (
      <TableFromData
        id="foo"
        columns={columns}
        data={agrOrthologsResponse?.data?.results}
        getRowId={getRowId}
      />
    );
  }

  return null;
};

export default AgrOrthology;
