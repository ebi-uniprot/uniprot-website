import { groupBy } from 'lodash-es';
import { Card } from 'franklin-sites';

import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import { UIModel } from '../../adapters/sectionConverter';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import XRefView from '../protein-data-views/XRefView';
import StructureView from '../protein-data-views/StructureView';

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
  const databaseInfoMaps = useDatabaseInfoMaps();
  if (!databaseInfoMaps) {
    return null;
  }
  // NOTE: do not check if content is there or not, always display because of AF
  const { arrayStructureDatabases, otherDatabases } = groupBy(
    data.xrefData,
    ({ category }) =>
      category === DatabaseCategory.STRUCTURE
        ? 'arrayStructureDatabases'
        : 'otherDatabases'
  );

  // Need to save these as we want to display them in the xrefs section
  const nonPDBDatabases = otherDatabases || [];

  const structureDatabases =
    arrayStructureDatabases &&
    arrayStructureDatabases.length === 1 &&
    arrayStructureDatabases[0];
  if (structureDatabases) {
    const { otherStructureDatabases } = partitionStructureDatabases(
      structureDatabases.databases
    );
    const nonPDBStructureDatabases: XrefUIModel = {
      category: DatabaseCategory.STRUCTURE,
      databases: otherStructureDatabases,
    };
    nonPDBDatabases.push(nonPDBStructureDatabases);
  }

  let XrefViewNode;
  if (nonPDBDatabases && nonPDBDatabases.length) {
    // The non-PDB databases need to be re-ordered accordingly
    const categoryOrder =
      databaseInfoMaps.entrySectionToDatabaseCategoryOrder.get(
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
      <StructureView primaryAccession={primaryAccession} />
      <FeaturesView features={data.featuresData} sequence={sequence} />
      {XrefViewNode}
    </Card>
  );
};

export default StructureSection;
