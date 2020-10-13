import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import ProteinNamesView from '../protein-data-views/ProteinNamesView';
import GeneNamesView from '../protein-data-views/GeneNamesView';
import ProteomesListView from '../protein-data-views/ProteomesView';
import XRefView from '../protein-data-views/XRefView';

import { hasContent } from '../../../shared/utils/utils';

import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

import { TaxonomyListView } from '../../../shared/components/entry/TaxonomyView';
import EntrySection, { EntrySectionIDs } from '../../types/entrySection';

const NamesAndTaxonomySection: FC<{
  data: NamesAndTaxonomyUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySectionIDs[EntrySection.NamesAndTaxonomy]} data-entry-section>
      <Card title={EntrySection.NamesAndTaxonomy}>
        <h3>Protein names</h3>
        <ProteinNamesView proteinNames={data.proteinNamesData} />
        {data.geneNamesData && (
          <>
            <h3>Gene names</h3>
            <GeneNamesView geneNamesData={data.geneNamesData} />
          </>
        )}
        <h3>Organism names</h3>
        <TaxonomyListView data={data.organismData} hosts={data.virusHosts} />
        <h3>Proteome</h3>
        <ProteomesListView data={data.proteomesData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default NamesAndTaxonomySection;
