import React from 'react';
import idx from 'idx';
import FunctionSection from '../components/entry/FunctionSection';
import NamesAndTaxonomySection from '../components/entry/NamesAndTaxonomySection';
import PathologyAndBiotechSection from '../components/entry/PathologyAndBiotechSection';
import ProteinProcessingSection from '../components/entry/ProteinProcessingSection';
import ExpressionSection from '../components/entry/ExpressionSection';
import SubcellularLocationSection from '../components/entry/SubcellularLocationSection';
import SequenceSection from '../components/entry/SequenceSection';
import InteractionSection from '../components/entry/InteractionSection';
import FamilyAndDomainsSection from '../components/entry/FamilyAndDomainsSection';
import StructureSection from '../components/entry/StructureSection';
import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import { FunctionUIModel } from '../adapters/functionConverter';
import EntrySection, { EntrySectionIDs } from '../types/entrySection';

const UniProtKBEntryConfig: {
  name: EntrySection;
  id: typeof EntrySectionIDs[EntrySection];
  sectionContent: (entryData: UniProtkbUIModel) => JSX.Element;
}[] = [
  {
    name: EntrySection.Function,
    id: EntrySectionIDs[EntrySection.Function],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <FunctionSection
        data={data[EntrySection.Function] as FunctionUIModel}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Function}
      />
    ),
  },
  {
    name: EntrySection.NamesAndTaxonomy,
    id: EntrySectionIDs[EntrySection.NamesAndTaxonomy],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  {
    name: EntrySection.SubCellularLocation,
    id: EntrySectionIDs[EntrySection.SubCellularLocation],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <SubcellularLocationSection
        data={data[EntrySection.SubCellularLocation]}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    name: EntrySection.PathologyAndBioTech,
    id: EntrySectionIDs[EntrySection.PathologyAndBioTech],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <PathologyAndBiotechSection
        data={data[EntrySection.PathologyAndBioTech]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.PathologyAndBioTech}
      />
    ),
  },
  {
    name: EntrySection.ProteinProcessing,
    id: EntrySectionIDs[EntrySection.ProteinProcessing],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <ProteinProcessingSection
        data={data[EntrySection.ProteinProcessing]}
        sequence={data[EntrySection.Sequence].sequence.value}
        primaryAccession={data.primaryAccession}
        key={EntrySection.ProteinProcessing}
      />
    ),
  },
  {
    name: EntrySection.Expression,
    id: EntrySectionIDs[EntrySection.Expression],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    name: EntrySection.Interaction,
    id: EntrySectionIDs[EntrySection.Interaction],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <InteractionSection
        data={data[EntrySection.Interaction]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    name: EntrySection.Structure,
    id: EntrySectionIDs[EntrySection.Structure],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <StructureSection
        data={data[EntrySection.Structure]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Structure}
        crc64={
          idx(data, (o) => o[EntrySection.Sequence].sequence.crc64) || undefined
        }
      />
    ),
  },
  {
    name: EntrySection.FamilyAndDomains,
    id: EntrySectionIDs[EntrySection.FamilyAndDomains],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <FamilyAndDomainsSection
        data={data[EntrySection.FamilyAndDomains]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Expression}
      />
    ),
  },
  {
    name: EntrySection.Sequence,
    id: EntrySectionIDs[EntrySection.Sequence],
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
