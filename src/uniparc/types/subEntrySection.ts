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
  // UniFire-only catch-all section: UniFire `keyword` / `xref.GO`
  // predictions are uncategorised so cannot be distributed into the sectioned
  // components. The value stays 'keywords_and_go' — it is the DOM id and
  // in-page-nav anchor, and provenance belongs in the identifier, not the URL.
  UniFireKeywordsAndGO = 'keywords_and_go',
}

export type EntrySectionNameAndId = {
  name: string;
  id: SubEntrySection;
};

export default SubEntrySection;
