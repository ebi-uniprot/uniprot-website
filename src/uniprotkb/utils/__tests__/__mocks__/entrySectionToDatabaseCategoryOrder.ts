import EntrySection from '../../../types/entrySection';
import { EntrySectionToDatabaseCategoryOrder } from '../../database';

const entrySectionToDatabaseCategoryOrder: EntrySectionToDatabaseCategoryOrder =
  new Map([
    [EntrySection.DiseaseAndDrugs, ['ORG', 'CHEMISTRY', 'GVD', 'PFAM', 'MISC']],
    [EntrySection.Expression, ['GEP', 'ORG']],
    [EntrySection.FamilyAndDomains, ['PLG', 'FMD', 'PFAM']],
    [EntrySection.Function, ['EAP', 'PFAM', 'CHEMISTRY']],
    [EntrySection.Interaction, ['PPI', 'CHEMISTRY']],
    [EntrySection.NamesAndTaxonomy, ['ORG', 'GMA']],
    [EntrySection.ProteinProcessing, ['PROTEOMIC', '2DG', 'PTM']],
    [EntrySection.Sequence, ['SEQ', 'GMA']],
    [EntrySection.Structure, ['3DS', 'MISC']],
    [EntrySection.ExternalLinks, ['MISC', 'PAM', 'ORG', '3DS']],
  ]);

export default entrySectionToDatabaseCategoryOrder;
