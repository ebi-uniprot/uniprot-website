import React from 'react';

import FunctionSection from '../components/entry/FunctionSection';
import NamesAndTaxonomySection from '../components/entry/NamesAndTaxonomySection';
import DiseaseAndDrugsSection from '../components/entry/DiseaseAndDrugsSection';
import ProteinProcessingSection from '../components/entry/ProteinProcessingSection';
import ExpressionSection from '../components/entry/ExpressionSection';
import SubcellularLocationSection from '../components/entry/SubcellularLocationSection';
import SequenceSection from '../components/entry/SequenceSection';
import InteractionSection from '../components/entry/InteractionSection';
import FamilyAndDomainsSection from '../components/entry/FamilyAndDomainsSection';
import StructureSection from '../components/entry/StructureSection';

import { UniProtkbUIModel } from '../adapters/uniProtkbConverter';
import { FunctionUIModel } from '../adapters/functionConverter';
import EntrySection from '../types/entrySection';

const UniProtKBEntryConfig: {
  id: EntrySection;
  sectionContent: (entryData: UniProtkbUIModel) => JSX.Element;
}[] = [
  {
    id: EntrySection.Function,
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
    id: EntrySection.NamesAndTaxonomy,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <NamesAndTaxonomySection
        data={data[EntrySection.NamesAndTaxonomy]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.NamesAndTaxonomy}
      />
    ),
  },
  {
    id: EntrySection.SubCellularLocation,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <SubcellularLocationSection
        data={data[EntrySection.SubCellularLocation]}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.SubCellularLocation}
      />
    ),
  },
  {
    id: EntrySection.DiseaseAndDrugs,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <DiseaseAndDrugsSection
        data={data[EntrySection.DiseaseAndDrugs]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        taxId={data[EntrySection.NamesAndTaxonomy].organismData?.taxonId}
        key={EntrySection.DiseaseAndDrugs}
      />
    ),
  },
  {
    id: EntrySection.ProteinProcessing,
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
    id: EntrySection.Expression,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <ExpressionSection
        data={data[EntrySection.Expression]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.FamilyAndDomains}
      />
    ),
  },
  {
    id: EntrySection.Interaction,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <InteractionSection
        data={data[EntrySection.Interaction]}
        primaryAccession={data.primaryAccession}
        key={EntrySection.Interaction}
      />
    ),
  },
  {
    id: EntrySection.Structure,
    sectionContent: (data: UniProtkbUIModel): JSX.Element => (
      <StructureSection
        data={data[EntrySection.Structure]}
        primaryAccession={data.primaryAccession}
        sequence={data[EntrySection.Sequence].sequence.value}
        key={EntrySection.Structure}
        crc64={data[EntrySection.Sequence].sequence.crc64}
      />
    ),
  },
  {
    id: EntrySection.FamilyAndDomains,
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
    id: EntrySection.Sequence,
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
