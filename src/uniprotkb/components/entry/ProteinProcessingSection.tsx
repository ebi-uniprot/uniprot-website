import { memo } from 'react';
import { Card, Loader } from 'franklin-sites';

import EntrySection from '../../types/entrySection';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FreeTextView from '../protein-data-views/FreeTextView';

import useDataApi from '../../../shared/hooks/useDataApi';

import { hasContent } from '../../../shared/utils/utils';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import { convertPtmExchangeFeatures } from '../../adapters/ptmExchangeFeaturesConverter';
import { getEntrySectionNameAndId } from '../../utils/entrySection';

import { FreeTextComment } from '../../types/commentTypes';
import { ProteomicsPtm } from '../../types/proteomicsPtm';
import { UIModel } from '../../adapters/sectionConverter';

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence?: string;
};

const ProteinProcessingSection = ({
  data,
  sequence,
  primaryAccession,
}: Props) => {
  const { loading: proteomicsPtmLoading, data: proteomicsPtmData } =
    useDataApi<ProteomicsPtm>(
      apiUrls.proteinsApi.proteomicsPtm(primaryAccession)
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
