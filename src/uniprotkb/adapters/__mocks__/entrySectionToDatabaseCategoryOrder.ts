import EntrySection from '../../types/entrySection';

const entrySectionToDatabaseCategoryOrder: Map<EntrySection, string[]> =
  new Map([
    ['disease-and-drugs', ['ORG', 'CHEMISTRY', 'GVD', 'PFAM', 'MISC']],
    ['expression', ['GEP', 'ORG']],
    ['family-and-domains', ['PLG', 'FMD', 'PFAM']],
    ['function', ['EAP', 'PFAM', 'CHEMISTRY']],
    ['interaction', ['PPI', 'CHEMISTRY']],
    ['names-and-taxonomy', ['ORG', 'GMA']],
    ['ptm-processing', ['PROTEOMIC', '2DG', 'PTM']],
    ['sequence', ['SEQ', 'GMA']],
    ['structure', ['3DS', 'MISC']],
    ['external-links', ['MISC', 'PAM', 'ORG', '3DS']],
  ]);

export default entrySectionToDatabaseCategoryOrder;
