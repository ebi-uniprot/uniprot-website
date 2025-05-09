/* eslint-disable camelcase */
import './styles/HSPDetailPanel.scss';

import { Loader, SlidingPanel } from 'franklin-sites';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { Namespace } from '../../../../shared/types/namespaces';
import { UniParcAPIModel } from '../../../../uniparc/adapters/uniParcConverter';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/UniProtKBFeaturesView';
import { UniRefLiteAPIModel } from '../../../../uniref/adapters/uniRefConverter';
import AlignmentView, { Tool, View } from '../../../components/AlignmentView';
import { MSAInput } from '../../../types/alignment';
import { removeFeaturesWithUnknownModifier } from '../../../utils/sequences';
import { BlastHsp } from '../../types/blastResults';

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  onClose: () => void;
  hitLength: number;
  queryLength: number;
  namespace: Namespace;
};

const convertHSPtoMSAInputs = (
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
              removeFeaturesWithUnknownModifier(extra.features),
              hitAccession,
              hsp_hseq
            )
          : [],
    },
  ];
};

type ApiData = UniProtkbAPIModel | UniRefLiteAPIModel | UniParcAPIModel;

const HSPDetailPanel = ({
  hsp,
  hitAccession,
  onClose,
  hitLength,
  queryLength,
  namespace,
}: HSPDetailPanelProps) => {
  const { pathname } = useLocation();
  const { hsp_align_len } = hsp;
  let url = apiUrls.entry.entry(hitAccession, namespace);
  if (namespace === Namespace.uniref) {
    url += '/light';
  }
  const { data, loading, status, error } = useDataApi<ApiData>(url);

  let recommendedName: string | undefined;
  if (data && 'proteinDescription' in data) {
    recommendedName = data?.proteinDescription?.recommendedName?.fullName.value;
  }
  if (data && 'representativeMember' in data) {
    recommendedName = data?.representativeMember?.proteinName;
  }

  let organism: string | undefined;
  if (data && 'organism' in data) {
    organism = data?.organism?.scientificName;
  }
  if (data && 'commonTaxon' in data && typeof data.commonTaxon !== 'string') {
    organism = data?.commonTaxon?.scientificName;
  }

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const alignment: MSAInput[] = useMemo(
    () =>
      convertHSPtoMSAInputs(hsp, queryLength, hitLength, hitAccession, data),
    [data, hitAccession, hitLength, hsp, queryLength]
  );

  const containerClass = 'hsp-detail-panel';
  const containerSelector = `.${containerClass}`;
  let content;
  if (!data) {
    if (loading) {
      content = <Loader />;
    } else {
      content = <ErrorHandler status={status} error={error} />;
    }
  } else {
    content = (
      <div className="hsp-detail-panel__body">
        <AlignmentView
          alignmentLength={hsp_align_len}
          alignment={alignment}
          defaultView={View.overview}
          tool={Tool.blast}
          containerSelector={containerSelector}
        />
      </div>
    );
  }

  return (
    <SlidingPanel
      title={title}
      position="bottom"
      className={containerClass}
      onClose={onClose}
      pathname={pathname}
    >
      <ErrorBoundary>{content}</ErrorBoundary>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
