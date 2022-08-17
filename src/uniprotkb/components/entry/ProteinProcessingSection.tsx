import { Card, Loader } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import FreeTextView from '../protein-data-views/FreeTextView';

import useDataApi from '../../../shared/hooks/useDataApi';

import { hasContent } from '../../../shared/utils/utils';
import { proteinsApi } from '../../../shared/config/apiUrls';

import { FreeTextComment } from '../../types/commentTypes';
import { UIModel } from '../../adapters/sectionConverter';

type ProteomicsPtm = {
  accession: string;
  entryName: string;
  sequence: string;
  sequenceChecksum: string;
  taxid: number;
  features: Feature[];
};

type Feature = {
  type: string;
  begin: string;
  end: string;
  xrefs: Xref[];
  evidences: Evidence[];
  peptide: string;
  unique: boolean;
  ptms: Ptm[];
};

type Evidence = {
  code: string;
  source: Source;
};

type Source = {
  id: string;
  url: string;
};

type Ptm = {
  name: string;
  position: number;
  sources: string[];
  dbReferences: DBReference[];
};

type DBReference = {
  id: string;
  properties: Properties;
};

type Properties = {
  'Pubmed ID': string;
  'PSM Score': string;
  'Dataset ID': string;
  'Organism part': string;
  'Binomial final adjusted q_value': string;
  'Universal Spectrum Id': string;
  'PSM Count': string;
  'Final adjusted site probability': string;
  'Site probability': string;
};

type Xref = {
  name: string;
  id: string;
  url: string;
};

type Props = {
  data: UIModel;
  primaryAccession: string;
  sequence: string;
};

const ProteinProcessingSection = ({
  data,
  sequence,
  primaryAccession,
}: Props) => {
  const { loading: proteomicsPtmLoading, data: proteomicsPtmData } =
    useDataApi<ProteomicsPtm>(proteinsApi.proteomicsPtm(primaryAccession));

  if (proteomicsPtmLoading) {
    return <Loader />;
  }

  console.log(proteomicsPtmData);

  if (!hasContent(data)) {
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
        features={featuresData}
        sequence={sequence}
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

export default ProteinProcessingSection;
