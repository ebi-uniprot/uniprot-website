import EntrySection, { EntrySectionNameAndId } from '../types/entrySection';

export const getEntrySectionNameAndId = (
  section: EntrySection,
  taxId?: number,
  numberOfIsoforms?: number
  // eslint-disable-next-line consistent-return
): EntrySectionNameAndId => {
  // eslint-disable-next-line default-case
  switch (section) {
    case EntrySection.Function:
      return {
        name: 'Function',
        id: EntrySection.Function,
      };
    case EntrySection.FamilyAndDomains:
      return {
        name: 'Family & Domains',
        id: EntrySection.FamilyAndDomains,
      };
    case EntrySection.Expression:
      return {
        name: 'Expression',
        id: EntrySection.Expression,
      };
    case EntrySection.Interaction:
      return {
        name: 'Interaction',
        id: EntrySection.Interaction,
      };
    case EntrySection.NamesAndTaxonomy:
      return {
        name: 'Names & Taxonomy',
        id: EntrySection.NamesAndTaxonomy,
      };
    case EntrySection.ProteinProcessing:
      return {
        name: 'PTM/Processing',
        id: EntrySection.ProteinProcessing,
      };
    case EntrySection.Structure:
      return {
        name: 'Structure',
        id: EntrySection.Structure,
      };
    case EntrySection.SubCellularLocation:
      return {
        name: 'Subcellular Location',
        id: EntrySection.SubCellularLocation,
      };
    case EntrySection.ExternalLinks:
      return {
        name: 'External Links',
        id: EntrySection.ExternalLinks,
      };
    case EntrySection.DiseaseVariants:
    case EntrySection.PhenotypesVariants:
      return taxId && taxId === 9606
        ? {
            name: 'Disease & Variants',
            id: EntrySection.DiseaseVariants,
          }
        : {
            name: 'Phenotypes & Variants',
            id: EntrySection.PhenotypesVariants,
          };

    case EntrySection.Sequence: {
      let name = 'Sequence';
      // Note: each entry will have at least one isoform -- the canonical one.
      if (!!numberOfIsoforms && numberOfIsoforms > 2) {
        name = 'Sequence & Isoforms';
      }

      if (!!numberOfIsoforms && numberOfIsoforms === 2) {
        name = 'Sequence & Isoform';
      }

      return { name, id: EntrySection.Sequence };
    }
    case EntrySection.SimilarProteins: {
      return {
        name: 'Similar Proteins',
        id: EntrySection.SimilarProteins,
      };
    }
  }
};
