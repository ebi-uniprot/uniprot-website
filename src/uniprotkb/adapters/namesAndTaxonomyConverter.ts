import { Xref } from '../../shared/types/apiModel';
import { TaxonomyDatum } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import EntrySection from '../types/entrySection';
import { GeneLocation } from '../types/geneLocationType';
import { ValueWithEvidence } from '../types/modelTypes';
import { DatabaseInfoMaps } from '../utils/database';
import { convertSection, UIModel } from './sectionConverter';
import { Flag } from './sequenceConverter';
import {
  UniProtkbAPIModel,
  UniProtKBSimplifiedTaxonomy,
} from './uniProtkbConverter';

export type ProteinNames = {
  fullName: ValueWithEvidence;
  shortNames?: ValueWithEvidence[];
  ecNumbers?: ValueWithEvidence[];
};

export type ProteinDescription = {
  recommendedName?: ProteinNames;
  submissionNames?: ProteinNames[];
  alternativeNames?: ProteinNames[];
  allergenName?: ValueWithEvidence;
  biotechName?: ValueWithEvidence;
  cdAntigenNames?: ValueWithEvidence[];
  innNames?: ValueWithEvidence[];
  flag?: Flag;
};

export type ProteinNamesData = ProteinDescription & {
  includes?: ProteinDescription[];
  contains?: ProteinDescription[];
};

export type GeneNamesData = {
  geneName?: ValueWithEvidence;
  synonyms?: ValueWithEvidence[];
  orfNames?: ValueWithEvidence[];
  orderedLocusNames?: ValueWithEvidence[];
}[];

export type NamesAndTaxonomyUIModel = {
  primaryAccession?: string;
  secondaryAccessions?: string[];
  proteinNamesData?: ProteinNamesData;
  protnlmProteinNamesData?: ProteinNamesData;
  geneNamesData?: GeneNamesData;
  organismData?: UniProtKBSimplifiedTaxonomy;
  proteomesData?: Xref[];
  organismHosts?: TaxonomyDatum[];
  geneLocations?: GeneLocation[];
} & UIModel;

export const convertNamesAndTaxonomy = (
  data: UniProtkbAPIModel,
  databaseInfoMaps: DatabaseInfoMaps,
  uniProtKBCrossReferences?: Xref[]
) => {
  const namesAndTaxonomyData: NamesAndTaxonomyUIModel = convertSection(
    data,
    databaseInfoMaps,
    undefined,
    undefined,
    undefined,
    EntrySection.NamesAndTaxonomy,
    uniProtKBCrossReferences
  );

  namesAndTaxonomyData.primaryAccession = data.primaryAccession;
  namesAndTaxonomyData.secondaryAccessions = data.secondaryAccessions;

  if (data.proteinDescription) {
    namesAndTaxonomyData.proteinNamesData = data.proteinDescription;
  }
  if (data.genes) {
    namesAndTaxonomyData.geneNamesData = data.genes;
  }
  if (data.organism) {
    namesAndTaxonomyData.organismData = data.organism;
  }
  if (data.organismHosts) {
    namesAndTaxonomyData.organismHosts = data.organismHosts;
  }
  if (data.geneLocations) {
    namesAndTaxonomyData.geneLocations = data.geneLocations;
  }
  if (uniProtKBCrossReferences) {
    namesAndTaxonomyData.proteomesData = uniProtKBCrossReferences.filter(
      (db) => db.database === 'Proteomes'
    );
  }

  return namesAndTaxonomyData;
};
