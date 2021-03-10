import { FC } from 'react';
import { Card } from 'franklin-sites';

import EntrySection, {
  getEntrySectionNameAndId,
} from '../../types/entrySection';
import FeaturesView from '../protein-data-views/UniProtKBFeaturesView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import SequenceView, {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
} from '../../../shared/components/entry/SequenceView';
import FreeTextView from '../protein-data-views/FreeTextView';

import { hasContent } from '../../../shared/utils/utils';

import { SequenceUIModel } from '../../adapters/sequenceConverter';
import ComputationalyMappedSequences from './ComputationallyMappedSequences';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  const numberOfIsoforms = data?.alternativeProducts?.isoforms.length;
  return (
    <div id={EntrySection.Sequence} data-entry-section>
      <Card
        title={
          getEntrySectionNameAndId(
            EntrySection.Sequence,
            undefined,
            numberOfIsoforms
          ).name
        }
      >
        <SequenceView data={data} accession={primaryAccession} />
        <ComputationalyMappedSequences primaryAccession={primaryAccession} />
        {data.featuresData && (
          <FeaturesView
            features={data.featuresData}
            sequence={data.sequence.value}
          />
        )}
        {data.sequenceCaution && data.sequenceCaution.length > 0 && (
          <>
            <h3>Sequence caution</h3>
            <SequenceCautionView data={data.sequenceCaution} />
          </>
        )}
        {data.massSpectrometry && data.massSpectrometry.length > 0 && (
          <>
            <h3>Mass Spectrometry</h3>
            <MassSpectrometryView data={data.massSpectrometry} />
          </>
        )}
        {data.polymorphysm && data.polymorphysm.length > 0 && (
          <>
            <h3>Polymorphysm</h3>
            <FreeTextView comments={data.polymorphysm} />
          </>
        )}
        {data.rnaEditing && data.rnaEditing.length > 0 && (
          <>
            <h3>RNA Editing</h3>
            <RNAEditingView data={data.rnaEditing} />
          </>
        )}
        {data.keywordData && <KeywordView keywords={data.keywordData} />}
        {data.xrefData && (
          <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
        )}
      </Card>
    </div>
  );
};

export default SequenceSection;
