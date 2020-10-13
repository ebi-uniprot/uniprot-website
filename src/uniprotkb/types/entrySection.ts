enum EntrySection {
  Function = 'Function',
  FamilyAndDomains = 'Family & Domains',
  Expression = 'Expression',
  Interaction = 'Interaction',
  // Miscellaneous = 'Miscellaneous',
  NamesAndTaxonomy = 'Names & Taxonomy',
  DiseaseAndDrugs = 'Disease & Drugs',
  ProteinProcessing = 'PTM/Processing',
  Sequence = 'Sequence & Isoforms',
  Structure = 'Structure',
  SubCellularLocation = 'Subcellular Location',
  ExternalLinks = 'External Links',
}

export default EntrySection;

export const EntrySectionIDs = {
  [EntrySection.Function]: 'function',
  [EntrySection.FamilyAndDomains]: 'family-and-domains',
  [EntrySection.Expression]: 'expression',
  [EntrySection.Interaction]: 'interaction',
  // [EntrySection.Miscellaneous]: 'miscellaneous',
  [EntrySection.NamesAndTaxonomy]: 'names-and-taxonomy',
  [EntrySection.DiseaseAndDrugs]: 'disease-and-drugs',
  [EntrySection.ProteinProcessing]: 'ptm-processing',
  [EntrySection.Sequence]: 'sequence',
  [EntrySection.Structure]: 'structure',
  [EntrySection.SubCellularLocation]: 'subcellular-location',
  [EntrySection.ExternalLinks]: 'external-links',
};
