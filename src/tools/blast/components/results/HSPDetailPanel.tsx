/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { FC, useMemo } from 'react';
import { Loader, CloseIcon } from 'franklin-sites';
import SlidingPanel, {
  Position,
} from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { getAccessionsURL } from '../../../../shared/config/apiUrls';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import AlignmentView, {
  MSAInput,
  View,
  Tool,
} from '../../../components/AlignmentView';

import './styles/HSPDetailPanel.scss';
import { removeFeaturesWithUnknownModifier } from '../../../utils/sequences';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  extra?: UniProtkbAPIModel;
  onClose: () => void;
  hitLength: number;
  queryLength: number;
};

export const convertHSPtoMSAInputs = (
  hsp: BlastHsp,
  queryLength: number,
  hitLength: number,
  hitAccession: string,
  extra?: UniProtkbAPIModel
) => {
  const {
    hsp_query_from,
    hsp_query_to,
    hsp_qseq,
    hsp_hit_from,
    hsp_hit_to,
    hsp_hseq,
  } = hsp;
  return [
    {
      name: 'Query',
      sequence: hsp_qseq,
      from: hsp_query_from,
      to: hsp_query_to,
      length: queryLength,
    },
    {
      name: `Match:${hitAccession}`,
      sequence: hsp_hseq,
      from: hsp_hit_from,
      to: hsp_hit_to,
      length: hitLength,
      accession: hitAccession,
      features: extra
        ? processFeaturesData(
            removeFeaturesWithUnknownModifier(extra?.features)
          )
        : [],
    },
  ];
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({
  hsp,
  hitAccession,
  onClose,
  hitLength,
  queryLength,
  extra,
}) => {
  const { hsp_align_len } = hsp;

  const { loading, data, status, error } = useDataApi<UniProtkbAccessionsAPI>(
    getAccessionsURL([hitAccession], { facets: [] })
  );
  const apiData = extra || data?.results?.[0];

  const recommendedName =
    apiData?.proteinDescription?.recommendedName?.fullName.value;
  const organism = apiData?.organism?.scientificName;

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const alignment: MSAInput[] = useMemo(
    () =>
      convertHSPtoMSAInputs(hsp, queryLength, hitLength, hitAccession, apiData),
    [apiData, hitAccession, hitLength, hsp, queryLength]
  );

  const containerClass = 'hsp-detail-panel';
  const containerSelector = `.${containerClass}`;
  let content;
  if (!apiData) {
    if (error) {
      content = <ErrorHandler status={status} />;
    } else if (loading) {
      content = <Loader />;
    }
  } else {
    content = (
      <>
        <div className="hsp-detail-panel__header">
          <h4>{title}</h4>
          <button type="button" onClick={onClose}>
            <CloseIcon width="16" height="16" />
          </button>
        </div>
        <div className="hsp-detail-panel__body">
          <AlignmentView
            alignmentLength={hsp_align_len}
            alignment={alignment}
            defaultView={View.overview}
            tool={Tool.blast}
            containerSelector={containerSelector}
          />
        </div>
      </>
    );
  }

  return (
    <SlidingPanel
      position={Position.bottom}
      className={containerClass}
      onClose={onClose}
    >
      {content}
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
