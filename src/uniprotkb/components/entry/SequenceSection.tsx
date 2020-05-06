import React, { FC, Fragment } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../utils/utils';
import EntrySection from '../../types/EntrySection';
import FeaturesView from './FeaturesView';
import KeywordView from './KeywordView';
import XRefView from './XRefView';
import SequenceView, {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
} from './SequenceView';
import { SequenceUIModel } from '../../adapters/SequenceConverter';
import FreeTextView from './FreeTextView';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Sequence}>
      <Card title={EntrySection.Sequence}>
        <SequenceView data={data} accession={primaryAccession} />
        <FeaturesView
          features={data.featuresData}
          sequence={data.sequence.value}
        />
        {data.sequenceCaution && data.sequenceCaution.length > 0 && (
          <Fragment>
            <h3>Sequence caution</h3>
            <SequenceCautionView data={data.sequenceCaution} />
          </Fragment>
        )}
        {data.massSpectrometry && data.massSpectrometry.length > 0 && (
          <Fragment>
            <h3>Mass Spectrometry</h3>
            <MassSpectrometryView data={data.massSpectrometry} />
          </Fragment>
        )}
        {data.polymorphysm && data.polymorphysm.length > 0 && (
          <Fragment>
            <h3>Polymorphysm</h3>
            <FreeTextView comments={data.polymorphysm} />
          </Fragment>
        )}
        {data.rnaEditing && data.rnaEditing.length > 0 && (
          <Fragment>
            <h3>RNA Editing</h3>
            <RNAEditingView data={data.rnaEditing} />
          </Fragment>
        )}
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default SequenceSection;
