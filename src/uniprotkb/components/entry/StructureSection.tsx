import { groupBy } from 'lodash-es';
import { Card } from 'franklin-sites';

import { useDBMaps } from '../../../shared/contexts/database';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { UIModel } from '../../adapters/sectionConverter';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import XRefView from '../protein-data-views/XRefView';
import PDBView from '../protein-data-views/PDBView';

import { hasContent } from '../../../shared/utils/utils';

import {
  partitionStructureDatabases,
  XrefUIModel,
} from '../../utils/xrefUtils';
import { DatabaseCategory } from '../../types/databaseRefs';

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence: string;
  crc64?: string;
};

const StructureSection = ({
  data,
  primaryAccession,
  sequence,
  crc64,
}: Props) => {
  const dbMaps = useDBMaps();
  if (!hasContent(data) || !dbMaps) {
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
    const { PDBDatabase, otherStructureDatabases } =
      partitionStructureDatabases(structureDatabases.databases);
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
    const categoryOrder = dbMaps.entrySectionToDatabaseCategoryOrder.get(
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
    <Card
      header={<h2>{getEntrySectionNameAndId(EntrySection.Structure).name}</h2>}
      id={EntrySection.Structure}
      data-entry-section
    >
      {PDBViewNode}
      <FeaturesView features={data.featuresData} sequence={sequence} />
      {XrefViewNode}
    </Card>
  );
};

export default StructureSection;
