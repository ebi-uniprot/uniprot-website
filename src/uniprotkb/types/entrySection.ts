enum EntrySection {
  Function = 'function',
  FamilyAndDomains = 'family_and_domains',
  Expression = 'expression',
  Interaction = 'interaction',
  NamesAndTaxonomy = 'names_and_taxonomy',
  DiseaseVariants = 'disease_variants',
  PhenotypesVariants = 'phenotypes_variants',
  ProteinProcessing = 'ptm_processing',
  Sequence = 'sequences',
  Structure = 'structure',
  SubCellularLocation = 'subcellular_location',
  ExternalLinks = 'external_links',
  SimilarProteins = 'similar_proteins',
}

export type EntrySectionWithFeatures =
  | EntrySection.DiseaseVariants
  | EntrySection.FamilyAndDomains
  | EntrySection.Function
  | EntrySection.ProteinProcessing
  | EntrySection.Sequence
  | EntrySection.Structure
  | EntrySection.SubCellularLocation;

export type EntrySectionNameAndId = {
  name: string;
  id: EntrySection;
};

export const entrySectionToCommunityAnnotationField: Map<EntrySection, string> =
  new Map([
    [EntrySection.Function, 'function'],
    [EntrySection.NamesAndTaxonomy, 'proteinOrGene'],
    [EntrySection.DiseaseVariants, 'disease'],
    [EntrySection.PhenotypesVariants, 'disease'],
  ]);

export default EntrySection;
