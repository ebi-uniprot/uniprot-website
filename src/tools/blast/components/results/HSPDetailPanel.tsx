/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { FC } from 'react';
import { Loader, CloseIcon } from 'franklin-sites';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
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
      name: 'Match:',
      sequence: hsp_hseq,
      from: hsp_hit_from,
      to: hsp_hit_to,
      length: hitLength,
      accession: hitAccession,
      features: extra?.features,
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

  // const totalLength = getFullAlignmentLength(hsp, queryLength, hitLength);

  // Reset view when different hit is being viewed
  // useEffect(() => {
  //   setActiveView(View.overview);
  //   setAnnotation(undefined);
  //   setHighlightProperty(undefined);
  // }, [hitAccession]);

  const { loading, data, status, error } = useDataApi<UniProtkbAccessionsAPI>(
    getAccessionsURL([hitAccession], { facets: [] })
  );

  let apiData = extra || data?.results?.[0];
  apiData = {
    ...apiData,
    features: removeFeaturesWithUnknownModifier(apiData?.features),
  } as UniProtkbAPIModel;

  const recommendedName =
    apiData?.proteinDescription?.recommendedName?.fullName.value;
  const organism = apiData?.organism?.scientificName;

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const alignment: MSAInput[] = convertHSPtoMSAInputs(
    hsp,
    queryLength,
    hitLength,
    hitAccession,
    apiData
  );

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
          />
        </div>
      </>
    );
  }

  return (
    <SlidingPanel position="bottom" className="hsp-detail-panel">
      {content}
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
