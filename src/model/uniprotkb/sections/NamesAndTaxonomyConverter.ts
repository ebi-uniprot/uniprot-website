import { ValueWithEvidence } from '../../types/modelTypes';
import { Flag } from './SequenceConverter';
import { UniProtkbAPIModel } from '../UniProtkbConverter';
import { Xref } from '../../types/CommentTypes';
import { convertSection, UIModel } from '../SectionConverter';
import EntrySection from '../../types/EntrySection';

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
  geneName?: {
    value: string;
  };
  synonyms?: [{ value: string }];
  orfNames?: [{ value: string }];
  orderedLocusNames?: [{ value: string }];
}[];

export type OrganismData = {
  scientificName?: string;
  commonName?: string;
  synonyms?: string[];
  taxonId?: number;
  lineage?: string[];
};

export type NamesAndTaxonomyUIModel = {
  proteinNamesData?: ProteinNamesData;
  geneNamesData?: GeneNamesData;
  organismData?: OrganismData;
  proteomesData?: Xref[];
  organismHosts?: OrganismData[];
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
  if (data.organismHosts) {
    namesAndTaxonomyData.organismHosts = data.organismHosts;
  }
  if (data.databaseCrossReferences) {
    namesAndTaxonomyData.proteomesData = data.databaseCrossReferences.filter(
      db => db.databaseType === 'Proteomes'
    );
  }

  return namesAndTaxonomyData;
};
