import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import ProteinNamesView from '../protein-data-views/ProteinNamesView';
import { hasContent } from '../../utils';
import EntrySection from '../../types/entrySection';
import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';
import GeneNamesView from '../protein-data-views/GeneNamesView';
import { OrganismListView } from '../protein-data-views/OrganismView';
import ProteomesListView from '../protein-data-views/ProteomesView';
import XRefView from '../protein-data-views/XRefView';

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
        <h3>Protein names</h3>
        <ProteinNamesView proteinNames={data.proteinNamesData} />
        {data.geneNamesData && (
          <Fragment>
            <h3>Gene names</h3>
            <GeneNamesView geneNamesData={data.geneNamesData} />
          </Fragment>
        )}
        <h3>Organism names</h3>
        <OrganismListView data={data.organismData} hosts={data.virusHosts} />
        <h3>Proteome</h3>
        <ProteomesListView data={data.proteomesData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default NamesAndTaxonomySection;
