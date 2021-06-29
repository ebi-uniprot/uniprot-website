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

type Props = {
  data: SequenceUIModel;
  primaryAccession: string;
};

const SequenceSection = ({ data, primaryAccession }: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  const numberOfIsoforms = data?.alternativeProducts?.isoforms.length;
  return (
    <Card
      header={
        <h2>
          {
            getEntrySectionNameAndId(
              EntrySection.Sequence,
              undefined,
              numberOfIsoforms
            ).name
          }
        </h2>
      }
      id={EntrySection.Sequence}
      data-entry-section
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
      {data.polymorphism && data.polymorphism.length > 0 && (
        <>
          <h3>Polymorphism</h3>
          <FreeTextView comments={data.polymorphism} />
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
  );
};

export default SequenceSection;
