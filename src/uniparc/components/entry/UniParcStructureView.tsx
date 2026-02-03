import { Card } from 'franklin-sites';
import { lazy } from 'react';

import { type Sequence } from '../../../shared/types/sequence';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';

const StructureView = lazy(
  () =>
    import(
      /* webpackChunkName: "structure-view" */ '../../../uniprotkb/components/protein-data-views/StructureView'
    )
);

type Props = {
  data: Sequence;
};

const UniParcStructureView = ({ data }: Props) =>
  !data?.md5 ? null : (
    <Card
      header={
        <h2 data-article-id="structure_section">
          {entrySectionToLabel[SubEntrySection.Structure]}
        </h2>
      }
      id={SubEntrySection.Structure}
      data-entry-section
    >
      <StructureView checksum={data.md5} viewerOnly />
    </Card>
  );

export default UniParcStructureView;
