import { memo } from 'react';
import { Card } from 'franklin-sites';

import ProteinNamesView from '../protein-data-views/ProteinNamesView';
import GeneNamesView from '../protein-data-views/GeneNamesView';
import ProteomesListView from '../protein-data-views/ProteomesView';
import XRefView from '../protein-data-views/XRefView';
import AccessionsView from '../protein-data-views/AccessionsView';
import { TaxonomyListView } from '../../../shared/components/entry/TaxonomyView';

import { hasContent, pluralise } from '../../../shared/utils/utils';

import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';

type Props = {
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
};

const NamesAndTaxonomySection = ({ data, primaryAccession }: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  const domains = data.proteinNamesData?.includes;
  return (
    <Card
      header={
        <h2 data-article-id="names_and_taxonomy_section">
          {getEntrySectionNameAndId(EntrySection.NamesAndTaxonomy).name}
        </h2>
      }
      id={EntrySection.NamesAndTaxonomy}
      data-entry-section
    >
      <h3 data-article-id="protein_names">Protein names</h3>
      <ProteinNamesView proteinNames={data.proteinNamesData} />
      {!!domains?.length && (
        <>
          <h4 className="tiny">{`Including ${domains.length} ${pluralise(
            'domain',
            domains.length,
            'domains'
          )}:`}</h4>
          {domains.map((domain, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ProteinNamesView key={index} proteinNames={domain} />
          ))}
        </>
      )}
      {data.geneNamesData && (
        <>
          <h3 data-article-id="gene_name">Gene names</h3>
          <GeneNamesView geneNamesData={data.geneNamesData} />
        </>
      )}
      <h3>Organism names</h3>
      <TaxonomyListView data={data.organismData} hosts={data.organismHosts} />
      <h3>Accessions</h3>
      <AccessionsView data={data} />
      {!!data.proteomesData?.length && (
        <>
          <h3 data-article-id="proteomes_manual">Proteomes</h3>
          <ProteomesListView data={data.proteomesData} />
        </>
      )}
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(NamesAndTaxonomySection);
