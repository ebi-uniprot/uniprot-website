import { Card } from 'franklin-sites';

import ProteinNamesView from '../protein-data-views/ProteinNamesView';
import GeneNamesView from '../protein-data-views/GeneNamesView';
import ProteomesListView from '../protein-data-views/ProteomesView';
import XRefView from '../protein-data-views/XRefView';

import { hasContent } from '../../../shared/utils/utils';

import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

import { TaxonomyListView } from '../../../shared/components/entry/TaxonomyView';
import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import AccessionsView from '../protein-data-views/AccessionsView';

type Props = {
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
};

const NamesAndTaxonomySection = ({ data, primaryAccession }: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Card
      header={
        <h2>{getEntrySectionNameAndId(EntrySection.NamesAndTaxonomy).name}</h2>
      }
      id={EntrySection.NamesAndTaxonomy}
      data-entry-section
    >
      <h3>Protein names</h3>
      <ProteinNamesView proteinNames={data.proteinNamesData} />
      {data.geneNamesData && (
        <>
          <h3>Gene names</h3>
          <GeneNamesView geneNamesData={data.geneNamesData} />
        </>
      )}
      <h3>Organism names</h3>
      <TaxonomyListView data={data.organismData} hosts={data.organismHosts} />
      <h3>Accessions</h3>
      <AccessionsView data={data} />
      {!!data.proteomesData?.length && (
        <>
          <h3>Proteome</h3>
          <ProteomesListView data={data.proteomesData} />
        </>
      )}
      <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default NamesAndTaxonomySection;
