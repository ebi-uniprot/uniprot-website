/* eslint-disable camelcase */
import { useMemo } from 'react';
import { Loader, SlidingPanel } from 'franklin-sites';

import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import AlignmentView, {
  MSAInput,
  View,
  Tool,
} from '../../../components/AlignmentView';

import { removeFeaturesWithUnknownModifier } from '../../../utils/sequences';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';

import { BlastHsp } from '../../types/blastResults';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';

import './styles/HSPDetailPanel.scss';

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  extra?: UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;
  onClose: () => void;
  hitLength: number;
  queryLength: number;
  loading?: boolean;
};

export const convertHSPtoMSAInputs = (
  hsp: BlastHsp,
  queryLength: number,
  hitLength: number,
  hitAccession: string,
  extra?: UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel
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
      features:
        extra && 'features' in extra
          ? processFeaturesData(
              removeFeaturesWithUnknownModifier(extra.features)
            )
          : [],
    },
  ];
};

const HSPDetailPanel = ({
  hsp,
  hitAccession,
  onClose,
  hitLength,
  queryLength,
  extra,
  loading,
}: HSPDetailPanelProps) => {
  const { hsp_align_len } = hsp;

  let recommendedName: string | undefined;
  if (extra && 'proteinDescription' in extra) {
    recommendedName =
      extra?.proteinDescription?.recommendedName?.fullName.value;
  }
  if (extra && 'representativeMember' in extra) {
    recommendedName = extra?.representativeMember?.proteinName;
  }

  let organism: string | undefined;
  if (extra && 'organism' in extra) {
    organism = extra?.organism?.scientificName;
  }
  if (
    extra &&
    'commonTaxon' in extra &&
    typeof extra.commonTaxon !== 'string'
  ) {
    organism = extra?.commonTaxon?.scientificName;
  }

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const alignment: MSAInput[] = useMemo(
    () =>
      convertHSPtoMSAInputs(hsp, queryLength, hitLength, hitAccession, extra),
    [extra, hitAccession, hitLength, hsp, queryLength]
  );

  const containerClass = 'hsp-detail-panel';
  const containerSelector = `.${containerClass}`;
  let content;
  if (!extra) {
    if (loading) {
      content = <Loader />;
    } else {
      content = <ErrorHandler />;
    }
  } else {
    content = (
      <>
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
      title={title}
      withCloseButton
      position="bottom"
      className={containerClass}
      onClose={onClose}
    >
      <ErrorBoundary>{content}</ErrorBoundary>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
