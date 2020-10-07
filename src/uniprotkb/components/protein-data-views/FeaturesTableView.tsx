import React, { useCallback, useState, FC } from 'react';
import { TemplateResult } from 'lit-html';
import { Feature as VariantFeature } from 'protvista-variation-adapter/dist/es/variants';

import { UniProtEvidenceTagContent } from './UniProtKBEvidenceTag';
import { ProtvistaFeature, ProcessedFeature } from './FeaturesView';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import { EvidenceData } from '../../config/evidenceCodes';
import { Evidence } from '../../types/modelTypes';

type FeatureColumns = {
  [name: string]: {
    label: string;
    resolver: (
      d: ProcessedFeature & VariantFeature
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
  getColumnConfig: (
    callback: (
      evidenceData: EvidenceData,
      references: Evidence[] | undefined
    ) => void
  ) => FeatureColumns;
}> = ({ data, getColumnConfig }) => {
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] = useState<
    EvidenceData
  >();
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
        node.columns = getColumnConfig(evidenceTagCallback);
      }
    },
    [datatableDefined, data, getColumnConfig]
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
