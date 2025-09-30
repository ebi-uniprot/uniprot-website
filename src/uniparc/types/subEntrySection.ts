enum SubEntrySection {
  Function = 'function',
  NamesAndTaxonomy = 'names_and_taxonomy',
  SubcellularLocation = 'subcellular_location',
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
