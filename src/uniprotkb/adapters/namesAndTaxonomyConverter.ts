import { ValueWithEvidence, Evidence } from '../types/modelTypes';
import { Flag } from './sequenceConverter';
import { UniProtkbAPIModel } from './uniProtkbConverter';
import { Xref } from '../types/commentTypes';
import { convertSection, UIModel } from './sectionConverter';
import EntrySection from '../types/entrySection';

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
  cdAntigenNames?: ValueWithEvidence;
  innNames?: ValueWithEvidence;
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

export type OrganismData = {
  scientificName?: string;
  commonName?: string;
  synonyms?: string[];
  taxonId?: number;
  evidences?: Evidence[];
  lineage?: string[];
};

export type LineageData = {
  scientificName?: string;
  commonName?: string;
  synonyms?: string[];
  taxonId?: number;
  rank?: string;
  hidden?: boolean;
};

export type NamesAndTaxonomyUIModel = {
  proteinNamesData?: ProteinNamesData;
  geneNamesData?: GeneNamesData;
  organismData?: OrganismData;
  proteomesData?: Xref[];
  virusHosts?: OrganismData[];
} & UIModel;

export const convertNamesAndTaxonomy = (data: UniProtkbAPIModel) => {
  const namesAndTaxonomyData: NamesAndTaxonomyUIModel = convertSection(
    data,
    undefined,
    undefined,
    undefined,
    EntrySection.NamesAndTaxonomy
  );

  if (data.proteinDescription) {
    namesAndTaxonomyData.proteinNamesData = data.proteinDescription;
  }
  if (data.genes) {
    namesAndTaxonomyData.geneNamesData = data.genes;
  }
  if (data.organism) {
    namesAndTaxonomyData.organismData = data.organism;
  }
  if (data.virusHosts) {
    namesAndTaxonomyData.virusHosts = data.virusHosts;
  }
  if (data.uniProtKBCrossReferences) {
    namesAndTaxonomyData.proteomesData = data.uniProtKBCrossReferences.filter(
      db => db.database === 'Proteomes'
    );
  }

  return namesAndTaxonomyData;
};
