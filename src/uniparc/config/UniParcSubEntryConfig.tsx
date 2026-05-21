import { type JSX } from 'react';

import { type FunctionUIModel } from '../../uniprotkb/adapters/functionConverter';
import { type SubcellularLocationUIModel } from '../../uniprotkb/adapters/subcellularLocationConverter';
import { type UniProtkbUIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import ExpressionSection from '../../uniprotkb/components/entry/ExpressionSection';
import FamilyAndDomainsSection from '../../uniprotkb/components/entry/FamilyAndDomainsSection';
import FunctionSection from '../../uniprotkb/components/entry/FunctionSection';
import InteractionSection from '../../uniprotkb/components/entry/InteractionSection';
import NamesAndTaxonomySection from '../../uniprotkb/components/entry/NamesAndTaxonomySection';
import ProteinProcessingSection from '../../uniprotkb/components/entry/ProteinProcessingSection';
import SubcellularLocationSection from '../../uniprotkb/components/entry/SubcellularLocationSection';
import UniProtKBEntrySection from '../../uniprotkb/types/entrySection';
import { type UniParcSubEntryUIModel } from '../adapters/uniParcSubEntryConverter';
import SubEntryKeywordsSection from '../components/sub-entry/SubEntryKeywordsSection';
import SubEntrySequenceSection from '../components/sub-entry/SubEntrySequenceSection';
import SubEntrySimilarProteinsSection from '../components/sub-entry/SubEntrySimilarProteinsSection';
import SubEntryStructureSection from '../components/sub-entry/SubEntryStructureSection';
import EntrySection from '../types/subEntrySection';
import { entrySectionToLabel } from './UniParcSubEntrySectionLabels';

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
    sectionContent: (data, annotations) =>
      annotations ? (
        <FunctionSection
          data={annotations[UniProtKBEntrySection.Function] as FunctionUIModel}
          primaryAccession={annotations.primaryAccession}
          sequence={data.entry.sequence?.value}
          communityReferences={[]}
        />
      ) : null,
  },
  [EntrySection.NamesAndTaxonomy]: {
    id: EntrySection.NamesAndTaxonomy,
    label: entrySectionToLabel[EntrySection.NamesAndTaxonomy],
    // Phase 4 — migrated to the UniProtKB NamesAndTaxonomySection.
    sectionContent: (data, annotations) =>
      annotations ? (
        <NamesAndTaxonomySection
          data={annotations[UniProtKBEntrySection.NamesAndTaxonomy]}
          primaryAccession={annotations.primaryAccession}
          communityReferences={[]}
        />
      ) : null,
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
        />
      ) : null,
  },
  [EntrySection.Structure]: {
    id: EntrySection.Structure,
    label: entrySectionToLabel[EntrySection.Structure],
    sectionContent: (data) => (
      <SubEntryStructureSection data={data} key={EntrySection.Structure} />
    ),
  },
  [EntrySection.FamilyAndDomains]: {
    id: EntrySection.FamilyAndDomains,
    label: entrySectionToLabel[EntrySection.FamilyAndDomains],
    // Phase 4 — migrated to the UniProtKB FamilyAndDomainsSection.
    sectionContent: (data, annotations) =>
      annotations ? (
        <FamilyAndDomainsSection
          data={annotations[UniProtKBEntrySection.FamilyAndDomains]}
          primaryAccession={annotations.primaryAccession}
          sequence={data.entry.sequence?.value}
        />
      ) : null,
  },
  [EntrySection.Sequence]: {
    id: EntrySection.Sequence,
    label: entrySectionToLabel[EntrySection.Sequence],
    sectionContent: (data) => (
      <SubEntrySequenceSection data={data} key={EntrySection.Sequence} />
    ),
  },
  [EntrySection.SimilarProteins]: {
    id: EntrySection.SimilarProteins,
    label: entrySectionToLabel[EntrySection.SimilarProteins],
    sectionContent: (data) => (
      <SubEntrySimilarProteinsSection
        uniparcId={data.entry.uniParcId}
        key={EntrySection.SimilarProteins}
      />
    ),
  },
  // Dedicated section for Keywords and GO as we don't know which section they correspond to yet. Ideally we need to have keyword ids to link and the section they belong to.
  [EntrySection.KeywordsAndGO]: {
    id: EntrySection.KeywordsAndGO,
    label: entrySectionToLabel[EntrySection.KeywordsAndGO],
    sectionContent: ({ unifire }) => (
      <SubEntryKeywordsSection
        data={unifire}
        key={EntrySection.KeywordsAndGO}
      />
    ),
  },
};

export default uniParcSubEntryConfig;
