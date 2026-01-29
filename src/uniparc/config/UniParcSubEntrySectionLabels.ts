import SubEntrySection from '../types/subEntrySection';

export const entrySectionToLabel = {
  [SubEntrySection.Function]: 'Function',
  [SubEntrySection.NamesAndTaxonomy]: 'Names & Taxonomy',
  [SubEntrySection.SubcellularLocation]: 'Subcellular Location',
  [SubEntrySection.Expression]: 'Expression',
  [SubEntrySection.ProteinProcessing]: 'PTM/Processing',
  [SubEntrySection.Interaction]: 'Interaction',
  [SubEntrySection.Structure]: 'Structure',
  [SubEntrySection.FamilyAndDomains]: 'Family & Domains',
  [SubEntrySection.Sequence]: 'Sequence',
  [SubEntrySection.SimilarProteins]: 'Similar Proteins',
  [SubEntrySection.KeywordsAndGO]: 'Keywords/GO',
};
