import { type JSX } from 'react';

import { type TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type FunctionUIModel } from '../../uniprotkb/adapters/functionConverter';
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
import { hasAnnotationContent } from '../utils/subEntry';
import { entrySectionToLabel } from './UniParcSubEntrySectionLabels';

export type SectionExtras = {
  lineageData?: TaxonomyAPIModel;
  proteomeComponentObject?: Record<string, string>;
};

const uniParcSubEntryConfig: Record<
  EntrySection,
  {
    id: EntrySection;
    label: string;
    sectionContent: (
      entryData: UniParcSubEntryUIModel,
      annotations?: UniProtkbUIModel,
      extras?: SectionExtras
    ) => JSX.Element | null;
  }
> = {
  [EntrySection.Function]: {
    id: EntrySection.Function,
    label: entrySectionToLabel[EntrySection.Function],
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
          // accession-keyed external fetches.
          enableExternalData={false}
          // The sub-entry page owns its own document <head>; this reused
          // section must not inject a page meta description.
          emitMetaDescription={false}
        />
      ) : null,
  },
  [EntrySection.NamesAndTaxonomy]: {
    id: EntrySection.NamesAndTaxonomy,
    label: entrySectionToLabel[EntrySection.NamesAndTaxonomy],
    // Hybrid, kept bespoke: imported protein/gene/organism from the UniParc
    // cross-reference plus predicted names from `annotations` (source-agnostic,
    // UniFire or precomputed).
    sectionContent: (data, annotations, extras) => (
      <SubEntryNamesAndTaxonomySection
        data={data}
        annotations={annotations}
        lineageData={extras?.lineageData}
        proteomeComponentObject={extras?.proteomeComponentObject}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  [EntrySection.SubcellularLocation]: {
    id: EntrySection.SubcellularLocation,
    label: entrySectionToLabel[EntrySection.SubcellularLocation],
    // The viz needs `organism.lineage` to pick the right body diagram, but
    // neither UniFire nor precomputed supplies it — `buildSubEntryAnnotations`
    // splices it in from the UniParc xref via `withOrganism`.
    sectionContent: (data, annotations) =>
      annotations ? (
        <SubcellularLocationSection
          data={
            annotations[
              UniProtKBEntrySection.SubCellularLocation
            ] as SubcellularLocationUIModel
          }
          sequence={data.entry.sequence?.value}
          // UniParc sub-entry: synthetic accession — suppress the
          // accession-keyed feature viewer tools.
          enableExternalData={false}
        />
      ) : null,
  },
  [EntrySection.Expression]: {
    id: EntrySection.Expression,
    label: entrySectionToLabel[EntrySection.Expression],
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
    sectionContent: (data, annotations) =>
      annotations ? (
        <ProteinProcessingSection
          data={annotations[UniProtKBEntrySection.ProteinProcessing]}
          primaryAccession={annotations.primaryAccession}
          sequence={data.entry.sequence?.value}
          // UniParc sub-entry: synthetic accession — skip the proteomics-PTM
          // fetch.
          enableExternalData={false}
        />
      ) : null,
  },
  [EntrySection.Interaction]: {
    id: EntrySection.Interaction,
    label: entrySectionToLabel[EntrySection.Interaction],
    sectionContent: (data, annotations) =>
      annotations ? (
        <InteractionSection
          data={annotations[UniProtKBEntrySection.Interaction]}
          primaryAccession={annotations.primaryAccession}
          // UniParc sub-entry: synthetic accession — skip the IntAct viewer
          // fetch.
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
  // Catch-all "Keywords & Gene Ontology" section. UniFire `keyword` / `xref.GO`
  // predictions are uncategorised, so `uniProtKbConverter` cannot section them —
  // they render here from the raw `unifire` predictions. Precomputed keywords
  // are categorised and mostly flow into their proper sections; the few whose
  // category has no dedicated sub-entry section (Disease, Coding sequence
  // diversity, Technical term) fall back here so they are not dropped.
  [EntrySection.KeywordsAndGO]: {
    id: EntrySection.KeywordsAndGO,
    label: entrySectionToLabel[EntrySection.KeywordsAndGO],
    sectionContent: (data, annotations) => (
      <SubEntryKeywordsSection
        unifire={data.unifire}
        annotations={annotations}
      />
    ),
  },
};

export default uniParcSubEntryConfig;
