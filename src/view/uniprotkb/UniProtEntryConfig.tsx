import React from 'react';
import FunctionSection from './FunctionSection';
import NamesAndTaxonomySection from './NamesAndTaxonomySection';
import PathologyAndBiotechSection from './PathologyAndBiotechSection';
import EntrySection from '../../model/types/EntrySection';
import ProteinProcessingSection from './ProteinProcessingSection';
import ExpressionSection from './ExpressionSection';
import SubcellularLocationSection from './SubcellularLocationSection';
import SequenceSection from './SequenceSection';
import { UniProtkbUIModel } from '../../model/uniprotkb/UniProtkbConverter';
import InteractionSection from './InteractionSection';
import FamilyAndDomainsSection from './FamilyAndDomainsSection';
import StructureSection from './StructureSection';

const UniProtKBEntryConfig: {
  name: EntrySection;
  sectionContent: (entryData: any) => JSX.Element;
}[] = [
  {
    name: EntrySection.Function,
    sectionContent: (data: UniProtkbUIModel) => (
      <FunctionSection
        data={data[EntrySection.Function]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Function}
      />
    ),
  },
  {
    name: EntrySection.NamesAndTaxonomy,
    sectionContent: (data: UniProtkbUIModel) => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  {
    name: EntrySection.SubCellularLocation,
    sectionContent: (data: UniProtkbUIModel) => (
      <SubcellularLocationSection
        data={data[EntrySection.SubCellularLocation]}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    name: EntrySection.PathologyAndBioTech,
    sectionContent: (data: UniProtkbUIModel) => (
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
    sectionContent: (data: UniProtkbUIModel) => (
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
    sectionContent: (data: UniProtkbUIModel) => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    name: EntrySection.Interaction,
    sectionContent: (data: UniProtkbUIModel) => (
      <InteractionSection
        data={data[EntrySection.Interaction]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    name: EntrySection.Structure,
    sectionContent: (data: UniProtkbUIModel) => (
      <StructureSection
        data={data[EntrySection.Structure]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Structure}
      />
    ),
  },
  {
    name: EntrySection.FamilyAndDomains,
    sectionContent: (data: UniProtkbUIModel) => (
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
    sectionContent: (data: UniProtkbUIModel) => (
      <SequenceSection
        data={data[EntrySection.Sequence]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Sequence}
      />
    ),
  },
];

export default UniProtKBEntryConfig;
