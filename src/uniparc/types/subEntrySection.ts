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
  // Catch-all keywords section. Renders UniFire `keyword` / `xref.GO`
  // predictions (uncategorised, so `uniProtKbConverter` cannot section them)
  // and, as a fallback, precomputed keywords whose category has no dedicated
  // sub-entry section. The value is the DOM id and in-page-nav anchor.
  KeywordsAndGO = 'keywords_and_go',
}

export type EntrySectionNameAndId = {
  name: string;
  id: SubEntrySection;
};

export default SubEntrySection;
