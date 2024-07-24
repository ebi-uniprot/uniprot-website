import { lazy } from 'react';
import { Card } from 'franklin-sites';

import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';

import { UniParcSubEntryUIModel } from '../../adapters/uniParcSubEntryConverter';
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

// TODO: this only works for uniprotkb entries but I'm not showing these here
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