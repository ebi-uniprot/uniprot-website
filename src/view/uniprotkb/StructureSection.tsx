import React, { FC } from 'react';
import { groupBy } from 'lodash';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import FeaturesView from './components/FeaturesView';
import XRefView from './components/XRefView';
import PDBView from './components/PDBView';
import {
  partitionStructureDatabases,
  XrefUIModel,
} from '../../model/utils/XrefUtils';
import { DatabaseCategory } from '../../model/types/DatabaseRefs';
import { entrySectionToDatabaseCategoryOrder } from '../../data/database';

const StructureSection: FC<{
  data: UIModel;
  primaryAccession: string;
  sequence: string;
  crc64?: string;
}> = ({ data, primaryAccession, sequence, crc64 }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  const { arrayStructureDatabases, otherDatabases } = groupBy(
    data.xrefData,
    ({ category }) =>
      category === DatabaseCategory.STRUCTURE
        ? 'arrayStructureDatabases'
        : 'otherDatabases'
  );

  // Need to save these as we want to display them in the xrefs section
  const nonPDBDatabases = otherDatabases || [];

  let PDBViewNode;
  const structureDatabases =
    arrayStructureDatabases &&
    arrayStructureDatabases.length === 1 &&
    arrayStructureDatabases[0];
  if (structureDatabases) {
    const {
      PDBDatabase,
      otherStructureDatabases,
    } = partitionStructureDatabases(structureDatabases.databases);
    if (PDBDatabase && PDBDatabase.xrefs.length) {
      PDBViewNode = (
        <PDBView
          xrefs={PDBDatabase.xrefs}
          primaryAccession={primaryAccession}
        />
      );
    }
    const nonPDBStructureDatabases: XrefUIModel = {
      category: DatabaseCategory.STRUCTURE,
      databases: otherStructureDatabases,
    };
    nonPDBDatabases.push(nonPDBStructureDatabases);
  }

  let XrefViewNode;
  if (nonPDBDatabases && nonPDBDatabases.length) {
    // The non-PDB databases need to be re-ordered accordingly
    const categoryOrder = entrySectionToDatabaseCategoryOrder.get(
      EntrySection.Structure
    );
    if (categoryOrder) {
      XrefViewNode = (
        <XRefView
          xrefs={nonPDBDatabases.sort(
            (a, b) =>
              categoryOrder.indexOf(a.category) -
              categoryOrder.indexOf(b.category)
          )}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      );
    }
  }

  return (
    <div id={EntrySection.Structure}>
      <Card title={EntrySection.Structure}>
        {PDBViewNode}
        <FeaturesView features={data.featuresData} sequence={sequence} />
        {XrefViewNode}
      </Card>
    </div>
  );
};

export default StructureSection;
