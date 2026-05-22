import { type JSX } from 'react';

import { hasContent } from '../../shared/utils/utils';
import { type FunctionUIModel } from '../../uniprotkb/adapters/functionConverter';
import { type UIModel } from '../../uniprotkb/adapters/sectionConverter';
import { type SubcellularLocationUIModel } from '../../uniprotkb/adapters/subcellularLocationConverter';
import { type UniProtkbUIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import ExpressionSection from '../../uniprotkb/components/entry/ExpressionSection';
import FunctionSection from '../../uniprotkb/components/entry/FunctionSection';
import InteractionSection from '../../uniprotkb/components/entry/InteractionSection';
import ProteinProcessingSection from '../../uniprotkb/components/entry/ProteinProcessingSection';
import SubcellularLocationSection from '../../uniprotkb/components/entry/SubcellularLocationSection';
import UniProtKBEntrySection from '../../uniprotkb/types/entrySection';
import { type UniParcSubEntryUIModel } from '../adapters/uniParcSubEntryConverter';
import SubEntryFamilyAndDomains from '../components/sub-entry/SubEntryFamilyAndDomainsSection';
import SubEntryKeywordsSection from '../components/sub-entry/SubEntryKeywordsSection';
import SubEntryNamesAndTaxonomySection from '../components/sub-entry/SubEntryNamesAndTaxonomySection';
import SubEntrySequenceSection from '../components/sub-entry/SubEntrySequenceSection';
import SubEntrySimilarProteinsSection from '../components/sub-entry/SubEntrySimilarProteinsSection';
import SubEntryStructureSection from '../components/sub-entry/SubEntryStructureSection';
import EntrySection from '../types/subEntrySection';
import { entrySectionToLabel } from './UniParcSubEntrySectionLabels';

// `hasContent` on a whole section UIModel is fooled by metadata fields some
// converters add (e.g. functionConverter's `entryType`); check only the
// renderable UIModel content fields.
const hasAnnotationContent = (section?: UIModel): boolean =>
  Boolean(
    section &&
    hasContent({
      commentsData: section.commentsData,
      featuresData: section.featuresData,
      keywordData: section.keywordData,
      xrefData: section.xrefData,
    })
  );

const uniParcSubEntryConfig: Record<
  EntrySection,
  {
    id: EntrySection;
    label: string;
    sectionContent: (
      entryData: UniParcSubEntryUIModel,
      annotations?: UniProtkbUIModel
    ) => JSX.Element | null;
  }
> = {
  [EntrySection.Function]: {
    id: EntrySection.Function,
    label: entrySectionToLabel[EntrySection.Function],
    // Phase 4 — migrated to the UniProtKB FunctionSection (spec.md §6).
    // Gated on real content — FunctionSection's own `hasContent` guard is fooled
    // by the `entryType` metadata functionConverter sets, so without this it
    // renders an empty Card for an entry with no function annotations.
    sectionContent: (data, annotations) =>
      annotations &&
      hasAnnotationContent(annotations[UniProtKBEntrySection.Function]) ? (
        <FunctionSection
          data={annotations[UniProtKBEntrySection.Function] as FunctionUIModel}
          primaryAccession={annotations.primaryAccession}
          sequence={data.entry.sequence?.value}
          communityReferences={[]}
          // UniParc sub-entry: the accession is synthetic, so skip the
          // accession-keyed external fetches (spec.md §12.1).
          enableExternalData={false}
        />
      ) : null,
  },
  [EntrySection.NamesAndTaxonomy]: {
    id: EntrySection.NamesAndTaxonomy,
    label: entrySectionToLabel[EntrySection.NamesAndTaxonomy],
    // Hybrid, kept bespoke: imported protein/gene/organism from the UniParc
    // cross-reference plus predicted names from `annotations` (source-agnostic,
    // UniFire or precomputed).
    sectionContent: (data, annotations) => (
      <SubEntryNamesAndTaxonomySection data={data} annotations={annotations} />
    ),
  },
  [EntrySection.SubcellularLocation]: {
    id: EntrySection.SubcellularLocation,
    label: entrySectionToLabel[EntrySection.SubcellularLocation],
    // Phase 4 — migrated to the UniProtKB SubcellularLocationSection. Needs
    // `organism` (with a lineage) supplemented onto the model upstream — the
    // viz renders nothing without it; see SubEntry.tsx.
    sectionContent: (data, annotations) =>
      annotations ? (
        <SubcellularLocationSection
          data={
            annotations[
              UniProtKBEntrySection.SubCellularLocation
            ] as SubcellularLocationUIModel
          }
          sequence={data.entry.sequence?.value}
        />
      ) : null,
  },
  [EntrySection.Expression]: {
    id: EntrySection.Expression,
    label: entrySectionToLabel[EntrySection.Expression],
    // Phase 4 — migrated to the UniProtKB ExpressionSection.
    sectionContent: (data, annotations) =>
      annotations ? (
        <ExpressionSection
          data={annotations[UniProtKBEntrySection.Expression]}
          primaryAccession={annotations.primaryAccession}
        />
      ) : null,
  },
  [EntrySection.ProteinProcessing]: {
    id: EntrySection.ProteinProcessing,
    label: entrySectionToLabel[EntrySection.ProteinProcessing],
    // Phase 4 — migrated to the UniProtKB ProteinProcessingSection.
    sectionContent: (data, annotations) =>
      annotations ? (
        <ProteinProcessingSection
          data={annotations[UniProtKBEntrySection.ProteinProcessing]}
          primaryAccession={annotations.primaryAccession}
          sequence={data.entry.sequence?.value}
          // UniParc sub-entry: synthetic accession — skip the proteomics-PTM
          // fetch (spec.md §12.1).
          enableExternalData={false}
        />
      ) : null,
  },
  [EntrySection.Interaction]: {
    id: EntrySection.Interaction,
    label: entrySectionToLabel[EntrySection.Interaction],
    // Phase 4 — migrated to the UniProtKB InteractionSection.
    sectionContent: (data, annotations) =>
      annotations ? (
        <InteractionSection
          data={annotations[UniProtKBEntrySection.Interaction]}
          primaryAccession={annotations.primaryAccession}
          // UniParc sub-entry: synthetic accession — skip the IntAct viewer
          // fetch (spec.md §12.1).
          enableExternalData={false}
        />
      ) : null,
  },
  [EntrySection.Structure]: {
    id: EntrySection.Structure,
    label: entrySectionToLabel[EntrySection.Structure],
    sectionContent: (data) => <SubEntryStructureSection data={data} />,
  },
  [EntrySection.FamilyAndDomains]: {
    id: EntrySection.FamilyAndDomains,
    label: entrySectionToLabel[EntrySection.FamilyAndDomains],
    // Entry-driven hybrid, kept bespoke: the entry's InterPro `sequenceFeatures`
    // plus the family/domain annotations from `annotations` (source-agnostic —
    // UniFire or precomputed).
    sectionContent: (data, annotations) => (
      <SubEntryFamilyAndDomains data={data} annotations={annotations} />
    ),
  },
  [EntrySection.Sequence]: {
    id: EntrySection.Sequence,
    label: entrySectionToLabel[EntrySection.Sequence],
    sectionContent: (data) => <SubEntrySequenceSection data={data} />,
  },
  [EntrySection.SimilarProteins]: {
    id: EntrySection.SimilarProteins,
    label: entrySectionToLabel[EntrySection.SimilarProteins],
    sectionContent: (data) => (
      <SubEntrySimilarProteinsSection uniparcId={data.entry.uniParcId} />
    ),
  },
  // Dedicated section for Keywords and GO as we don't know which section they correspond to yet. Ideally we need to have keyword ids to link and the section they belong to.
  [EntrySection.KeywordsAndGO]: {
    id: EntrySection.KeywordsAndGO,
    label: entrySectionToLabel[EntrySection.KeywordsAndGO],
    sectionContent: ({ unifire }) => <SubEntryKeywordsSection data={unifire} />,
  },
};

export default uniParcSubEntryConfig;
