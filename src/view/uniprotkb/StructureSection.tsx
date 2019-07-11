import React, { FC } from 'react';
import { Card } from 'franklin-sites';
import ProtvistaStructure from 'protvista-structure';
import { loadWebComponent } from '../../utils/utils';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import FeaturesView from './components/FeaturesView';
import 'litemol/dist/css/LiteMol-plugin.css';
import XRefView from './components/XRefView';

const StructureSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
}> = ({ data, primaryAccession, sequence }) => {
  if (!hasContent(data)) {
    return null;
  }
  loadWebComponent('protvista-structure', ProtvistaStructure);
  return (
    <div id={EntrySection.Structure}>
      <Card title={EntrySection.Structure}>
        <protvista-structure accession={primaryAccession} />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        {/* TODO: filter out PDB */}
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default StructureSection;
