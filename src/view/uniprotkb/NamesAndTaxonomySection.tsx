import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import { EntryProteinNames } from './components/ProteinNamesView';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { NamesAndTaxonomyUIModel } from '../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import { GeneNamesListView } from './components/GeneNamesView';
import { OrganismEntryView } from './components/OrganismView';
import { ProteomesEntryView } from './components/ProteomesView';
import XRefView from './components/XRefView';

const NamesAndTaxonomySection: FC<{
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.NamesAndTaxonomy}>
      <Card title={EntrySection.NamesAndTaxonomy}>
        <h4>Protein names</h4>
        <EntryProteinNames proteinNames={data.proteinNamesData} />
        <h4>Gene names</h4>
        <GeneNamesListView {...data.geneNamesData} />
        <h4>Organism names</h4>
        <OrganismEntryView data={data.organismData} />
        <h4>Proteome</h4>
        <ProteomesEntryView data={data.proteomesData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default NamesAndTaxonomySection;
