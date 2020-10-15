import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import EntrySection, { EntrySectionIDs } from '../../types/entrySection';
import FeaturesView from '../protein-data-views/FeaturesView';
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
import ComputationalyMappedSequences from './ComputationalyMappedSequences';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySectionIDs[EntrySection.Sequence]} data-entry-section>
      <Card title={EntrySection.Sequence}>
        <SequenceView data={data} accession={primaryAccession} />
        <ComputationalyMappedSequences accession={primaryAccession} />
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
