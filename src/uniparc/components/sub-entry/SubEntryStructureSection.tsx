import { lazy } from 'react';
import { Card } from 'franklin-sites';

import UniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';

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

const StructureSection = ({ data }: Props) =>
  data.isUniprotkbEntry &&
  data.id && (
    <Card
      header={
        <h2 data-article-id="structure_section">
          {UniParcSubEntryConfig[SubEntrySection.Structure].label}
        </h2>
      }
      id={SubEntrySection.Structure}
      data-entry-section
    >
      <StructureView primaryAccession={data.id} />
    </Card>
  );

export default StructureSection;
