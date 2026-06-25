import { Card } from 'franklin-sites';
import { lazy } from 'react';

import { type Sequence } from '../../../shared/types/sequence';
import { entrySectionToLabel } from '../../config/UniParcSubEntrySectionLabels';
import SubEntrySection from '../../types/subEntrySection';
import styles from './styles/uniparc-structure-section.module.scss';

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
      className={styles['structure-section']}
    >
      <StructureView checksum={data.md5} isUniProtKBAccession={false} />
    </Card>
  );

export default UniParcStructureView;
