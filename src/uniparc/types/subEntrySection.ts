enum SubEntrySection {
  Function = 'function',
  NamesAndTaxonomy = 'names_and_taxonomy',
  SubcellularLocation = 'subcellular_location',
  Expression = 'expression',
  ProteinProcessing = 'ptm_processing',
  Interaction = 'interaction',
  Structure = 'structure',
  FamilyAndDomains = 'family_and_domains',
  Sequence = 'sequence',
  SimilarProteins = 'similar_proteins',
  Keywords = 'keywords',
}

export type EntrySectionNameAndId = {
  name: string;
  id: SubEntrySection;
};

export default SubEntrySection;
