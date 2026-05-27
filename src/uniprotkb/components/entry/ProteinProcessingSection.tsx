import { Card, Loader } from 'franklin-sites';
import { memo } from 'react';

import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { hasContent } from '../../../shared/utils/utils';
import { convertPtmExchangeFeatures } from '../../adapters/ptmExchangeFeaturesConverter';
import { type UIModel } from '../../adapters/sectionConverter';
import { type FreeTextComment } from '../../types/commentTypes';
import EntrySection from '../../types/entrySection';
import { type ProteomicsPtm } from '../../types/proteomicsPtm';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import FreeTextView from '../protein-data-views/FreeTextView';
import KeywordView from '../protein-data-views/KeywordView';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import XRefView from '../protein-data-views/XRefView';

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence?: string;
  // Whether `primaryAccession` is a real UniProtKB accession. The
  // proteomics-PTM lookup is keyed by one, so for synthetic accessions
  // (e.g. UniParc sub-entries) callers pass `false` to skip the fetch.
  // Defaults to `true`.
  isUniProtKBAccession?: boolean;
};

const ProteinProcessingSection = ({
  data,
  sequence,
  primaryAccession,
  isUniProtKBAccession = true,
}: Props) => {
  const { loading: proteomicsPtmLoading, data: proteomicsPtmData } =
    useDataApi<ProteomicsPtm>(
      isUniProtKBAccession
        ? apiUrls.proteinsApi.proteomicsPtm(primaryAccession)
        : null
    );

  if (proteomicsPtmLoading) {
    return <Loader />;
  }

  const convertedPtmExchangeFeatures = proteomicsPtmData
    ? convertPtmExchangeFeatures(proteomicsPtmData.features)
    : [];

  if (!hasContent(data) && !convertedPtmExchangeFeatures.length) {
    return null;
  }
  const { featuresData, keywordData, xrefData, commentsData } = data;
  return (
    <Card
      header={
        <h2 data-article-id="ptm_processing_section">
          {getEntrySectionNameAndId(EntrySection.ProteinProcessing).name}
        </h2>
      }
      id={EntrySection.ProteinProcessing}
      data-entry-section
    >
      <FeaturesView
        primaryAccession={primaryAccession}
        features={[...featuresData, ...convertedPtmExchangeFeatures]}
        sequence={sequence}
        showSourceColumn={!!convertedPtmExchangeFeatures.length}
      />
      <FreeTextView
        comments={commentsData.get('PTM') as FreeTextComment[] | undefined}
        articleId="post-translational_modification"
        title="Post-translational modification"
      />
      <KeywordView keywords={keywordData} />
      <XRefView xrefs={xrefData} primaryAccession={primaryAccession} />
    </Card>
  );
};

export default memo(ProteinProcessingSection);
