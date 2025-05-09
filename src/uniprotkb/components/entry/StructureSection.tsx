import { Button, Card, Message } from 'franklin-sites';
import { groupBy } from 'lodash-es';
import { lazy, memo, useState } from 'react';

import LazyComponent from '../../../shared/components/LazyComponent';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import { UIModel } from '../../adapters/sectionConverter';
import { DatabaseCategory } from '../../types/databaseRefs';
import EntrySection from '../../types/entrySection';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import {
  partitionStructureDatabases,
  XrefUIModel,
} from '../../utils/xrefUtils';
import XRefView from '../protein-data-views/XRefView';

const StructureView = lazy(
  () =>
    import(
      /* webpackChunkName: "structure-view" */ '../protein-data-views/StructureView'
    )
);

type Props = {
  data: UIModel;
  primaryAccession: string;
  crc64?: string;
};

const StructureSection = ({ data, primaryAccession, crc64 }: Props) => {
  const databaseInfoMaps = useDatabaseInfoMaps();
  const isSmallScreen = useSmallScreen();
  const [displayStructure, setDisplayStructure] = useState(!isSmallScreen);

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
      databaseInfoMaps?.entrySectionToDatabaseCategoryOrder.get(
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
      header={
        <h2 data-article-id="structure_section">
          {getEntrySectionNameAndId(EntrySection.Structure).name}
        </h2>
      }
      id={EntrySection.Structure}
      data-entry-section
    >
      {displayStructure ? (
        <LazyComponent rootMargin="800px 0px">
          <StructureView primaryAccession={primaryAccession} />
        </LazyComponent>
      ) : (
        <>
          <br />
          <Message level="info">
            <small>
              The structure viewer has not automatically been loaded on this
              device.
            </small>
          </Message>
          <Button variant="secondary" onClick={() => setDisplayStructure(true)}>
            Click to load the structure viewer
          </Button>
        </>
      )}
      {XrefViewNode}
    </Card>
  );
};

export default memo(StructureSection);
