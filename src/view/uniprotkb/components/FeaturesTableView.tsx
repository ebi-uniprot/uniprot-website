import React, { Fragment, useCallback, useState, FC } from 'react';
import { TemplateResult } from 'lit-html';
import ProtvistaDatatable from 'protvista-datatable';
import { UniProtEvidenceTagContent } from '../../../components/UniProtEvidenceTag';
import { loadWebComponent } from '../../../utils/utils';
import { ProtvistaFeature, ProcessedFeature } from './FeaturesView';
import { ProtvistaVariant } from './VariationView';
import { EvidenceData } from '../../../model/types/EvidenceCodes';
import { Evidence } from '../../../model/types/modelTypes';

loadWebComponent('protvista-datatable', ProtvistaDatatable);

type FeatureColumns = {
  [name: string]: {
    label: string;
    resolver: (
      d: ProtvistaFeature & ProtvistaVariant
    ) => string | number | TemplateResult | TemplateResult[];
  };
};

export type FeaturesTableCallback = (
  evidenceData: EvidenceData,
  references: Evidence[] | undefined
) => void;

const FeaturesTableView: FC<{
  data: ProcessedFeature[] | ProtvistaVariant[];
  getColumnConfig: (
    callback: (
      evidenceData: EvidenceData,
      references: Evidence[] | undefined
    ) => void
  ) => FeatureColumns;
}> = ({ data, getColumnConfig }) => {
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] = useState();
  const [selectedReferences, setSelectedReferences] = useState();

  const evidenceTagCallback: FeaturesTableCallback = (
    evidenceData,
    references
  ) => {
    setSelectedEvidenceData(evidenceData);
    setSelectedReferences(references);
    setShowEvidenceTagData(true);
  };

  const setTableData = useCallback(
    (node): void => {
      if (node) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = getColumnConfig(evidenceTagCallback);
      }
    },
    [data, getColumnConfig]
  );

  return (
    <Fragment>
      <protvista-datatable ref={setTableData} />
      <div
        className={`evidence-tag-content ${showEvidenceTagData &&
          'evidence-tag-content--visible'}`}
      >
        {selectedEvidenceData && selectedReferences && (
          <UniProtEvidenceTagContent
            evidenceData={selectedEvidenceData}
            references={selectedReferences}
          />
        )}
      </div>
    </Fragment>
  );
};

export default FeaturesTableView;
