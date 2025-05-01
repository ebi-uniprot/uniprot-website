import { Card } from 'franklin-sites';
import { lazy } from 'react';

import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntry';

const StructureView = lazy(
  () =>
    import(
      /* webpackChunkName: "structure-view" */ '../../../uniprotkb/components/protein-data-views/StructureView'
    )
);

type Props = {
  data: UniParcSubEntryUIModel['subEntry'];
};

/*
Comment from Aurel's PR:
Not sure if this logic is valid always. Some UniProtKB entries don't have structures,
and we'll still want to show the structures for the UniProtKB entries that will be removed
soon and also for external IDs as eventually it should be based on the sequence. The 
issue is that we can't query the 3D Beacons API like this yet, so I guess it'll do for now
*/
export const hasStructure = (data: UniParcSubEntryUIModel['subEntry']) =>
  data.isUniprotkbEntry && data.active && data.id;

const StructureSection = ({ data }: Props) =>
  // TODO: don't need this duplicate check - how to fix in TS?
  !data.id || !hasStructure(data) ? null : (
    <Card
      header={
        <h2 data-article-id="structure_section">
          {entrySectionToLabel[SubEntrySection.Structure]}
        </h2>
      }
      id={SubEntrySection.Structure}
      data-entry-section
    >
      <StructureView primaryAccession={data.id} />
    </Card>
  );

export default StructureSection;
