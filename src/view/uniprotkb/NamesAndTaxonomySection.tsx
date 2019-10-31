import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import ProteinNamesView from './components/ProteinNamesView';
import hasContent from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { NamesAndTaxonomyUIModel } from '../../model/uniprotkb/sections/NamesAndTaxonomyConverter';
import GeneNamesView from './components/GeneNamesView';
import { OrganismListView } from './components/OrganismView';
import ProteomesListView from './components/ProteomesView';
import XRefView from './components/XRefView';

const NamesAndTaxonomySection: FC<{
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.NamesAndTaxonomy}>
      <Card title={EntrySection.NamesAndTaxonomy}>
        <h4>Protein names</h4>
        <ProteinNamesView proteinNames={data.proteinNamesData} />
        {data.geneNamesData && (
          <Fragment>
            <h4>Gene names</h4>
            <GeneNamesView geneNamesData={data.geneNamesData} />
          </Fragment>
        )}
        <h4>Organism names</h4>
        <OrganismListView data={data.organismData} hosts={data.organismHosts} />
        <h4>Proteome</h4>
        <ProteomesListView data={data.proteomesData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default NamesAndTaxonomySection;
