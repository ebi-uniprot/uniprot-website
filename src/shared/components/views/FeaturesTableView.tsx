import { useCallback, useState, FC } from 'react';
import { TemplateResult } from 'lit-html';
import { Feature as VariantFeature } from 'protvista-variation-adapter/dist/es/variants';
import { TransformedVariant } from 'protvista-variation-adapter';

import { UniProtEvidenceTagContent } from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';

import useCustomElement from '../../hooks/useCustomElement';

import { EvidenceData } from '../../../uniprotkb/config/evidenceCodes';
import { Evidence } from '../../../uniprotkb/types/modelTypes';
import { ColumnConfig, ProcessedFeature } from './FeaturesView';

export type FeatureColumns = {
  [name: string]: {
    label: string;
    resolver: (
      d: ProcessedFeature & TransformedVariant
    ) =>
      | undefined
      | string
      | number
      | TemplateResult
      | Array<TemplateResult | undefined>;
  };
};

export type FeaturesTableCallback = (
  evidenceData: EvidenceData,
  references: Evidence[] | undefined
) => void;

const FeaturesTableView: FC<{
  data: ProcessedFeature[] | VariantFeature[];
  columnConfig: ColumnConfig;
}> = ({ data, columnConfig }) => {
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [
    selectedEvidenceData,
    setSelectedEvidenceData,
  ] = useState<EvidenceData>();
  const [selectedReferences, setSelectedReferences] = useState<Evidence[]>();

  const evidenceTagCallback: FeaturesTableCallback = (
    evidenceData,
    references
  ) => {
    setSelectedEvidenceData(evidenceData);
    setSelectedReferences(references);
    setShowEvidenceTagData(true);
  };

  const datatableDefined = useCustomElement(
    /* istanbul ignore next */
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const setTableData = useCallback(
    (node): void => {
      if (node && datatableDefined) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = columnConfig(evidenceTagCallback);
      }
    },
    [datatableDefined, data, columnConfig]
  );

  return (
    <>
      <protvista-datatable ref={setTableData} filter-scroll />
      <div
        className={`evidence-tag-content ${
          showEvidenceTagData && 'evidence-tag-content--visible'
        }`}
      >
        {selectedEvidenceData && selectedReferences && (
          <UniProtEvidenceTagContent
            evidenceData={selectedEvidenceData}
            evidences={selectedReferences}
          />
        )}
      </div>
    </>
  );
};

export default FeaturesTableView;
