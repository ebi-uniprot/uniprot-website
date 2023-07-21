import { memo } from 'react';
import { Card, Message } from 'franklin-sites';
import { Link } from 'react-router-dom';

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
import ComputationalyMappedSequences from './ComputationallyMappedSequences';

import { hasContent } from '../../../shared/utils/utils';
import { getEntryPath } from '../../../app/config/urls';

import { Namespace } from '../../../shared/types/namespaces';
import { TabLocation } from './Entry';
import { SequenceUIModel } from '../../adapters/sequenceConverter';

type Props = {
  data: SequenceUIModel;
  primaryAccession: string;
  hasGenomicCoordinates: boolean;
};

const SequenceSection = ({
  data,
  primaryAccession,
  hasGenomicCoordinates,
}: Props) => {
  if (!hasContent(data)) {
    return null;
  }
  const numberOfIsoforms = data?.alternativeProducts?.isoforms.length;
  return (
    <Card
      header={
        <h2 data-article-id="sequences_section">
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
      {data.sequenceCaution && data.sequenceCaution.length > 0 && (
        <>
          <h3 data-article-id="sequence_caution">Sequence caution</h3>
          <SequenceCautionView data={data.sequenceCaution} />
        </>
      )}
      {data.featuresData && (
        <FeaturesView
          primaryAccession={primaryAccession}
          features={data.featuresData}
          sequence={data.sequence.value}
        />
      )}
      {data.massSpectrometry && data.massSpectrometry.length > 0 && (
        <>
          <h3 data-article-id="mass_spectrometry">Mass Spectrometry</h3>
          <MassSpectrometryView data={data.massSpectrometry} />
        </>
      )}
      {data.polymorphism && data.polymorphism.length > 0 && (
        <>
          <h3 data-article-id="polymorphism">Polymorphism</h3>
          <FreeTextView comments={data.polymorphism} />
        </>
      )}
      {data.rnaEditing && data.rnaEditing.length > 0 && (
        <>
          <h3 data-article-id="rna_editing">RNA Editing</h3>
          <RNAEditingView data={data.rnaEditing} />
        </>
      )}
      {data.keywordData && <KeywordView keywords={data.keywordData} />}
      {data.xrefData && (
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      )}
      {hasGenomicCoordinates && (
        <Message level="info">
          Discover the new{' '}
          <Link
            to={getEntryPath(
              Namespace.uniprotkb,
              primaryAccession,
              TabLocation.GenomicCoordinates
            )}
          >
            Genomic coordinates
          </Link>{' '}
          tab with more genomic information about this entry
        </Message>
      )}
    </Card>
  );
};

export default memo(SequenceSection);
