enum EntrySection {
  Function = 'Function',
  FamilyAndDomains = 'Family & Domains',
  Expression = 'Expression',
  Interaction = 'Interaction',
  NamesAndTaxonomy = 'Names & Taxonomy',
  DiseaseAndDrugs = 'Disease & Drugs',
  Phenotypes = 'Phenotypes',
  ProteinProcessing = 'PTM/Processing',
  Sequence = 'Sequence',
  SequenceAndSingleIsoform = 'Sequence & Isoform',
  SequenceAndMultipleIsoforms = 'Sequence & Isoforms',
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
  [EntrySection.NamesAndTaxonomy]: 'names-and-taxonomy',
  [EntrySection.DiseaseAndDrugs]: 'disease-and-drugs',
  [EntrySection.Phenotypes]: 'phenotypes',
  [EntrySection.ProteinProcessing]: 'ptm-processing',
  [EntrySection.Sequence]: 'sequence',
  [EntrySection.SequenceAndSingleIsoform]: 'sequence',
  [EntrySection.SequenceAndMultipleIsoforms]: 'sequence',
  [EntrySection.Structure]: 'structure',
  [EntrySection.SubCellularLocation]: 'subcellular-location',
  [EntrySection.ExternalLinks]: 'external-links',
};
