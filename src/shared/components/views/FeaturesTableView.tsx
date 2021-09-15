import { useCallback, useState } from 'react';

import { UniProtEvidenceTagContent } from '../../../uniprotkb/components/protein-data-views/UniProtKBEvidenceTag';

import useCustomElement from '../../hooks/useCustomElement';

import { EvidenceData } from '../../../uniprotkb/config/evidenceCodes';
import { Evidence } from '../../../uniprotkb/types/modelTypes';

export type FeaturesTableCallback = (
  evidenceData: EvidenceData,
  references: Evidence[] | undefined
) => void;

type FeaturesTableProps<T> = {
  data: T[];
  columnConfig: ColumnConfig<T>;
};

const FeaturesTableView = <T extends Record<string, unknown>>({
  data,
  columnConfig,
}: FeaturesTableProps<T>) => {
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] =
    useState<EvidenceData>();
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
      <protvista-datatable ref={setTableData} filter-scroll>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>{/* Iteration here */}</tbody>
        </table>
      </protvista-datatable>
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
