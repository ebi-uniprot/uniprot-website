enum SubEntrySection {
  NamesAndTaxonomy = 'names_and_taxonomy',
  Structure = 'structure',
  FamilyAndDomains = 'family_and_domains',
  Sequence = 'sequence',
  SimilarProteins = 'similar_proteins',
}

export type EntrySectionNameAndId = {
  name: string;
  id: SubEntrySection;
};

export default SubEntrySection;
