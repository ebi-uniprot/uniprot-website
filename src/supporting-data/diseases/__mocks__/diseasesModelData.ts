import { SearchResults } from '../../../shared/types/results';
import { DiseasesAPIModel } from '../adapters/diseasesConverter';

// Source: diseases/search?query=cancer&size=2
// Retrieved: 2024-06-10
const mock: SearchResults<DiseasesAPIModel> = {
  results: [
    {
      name: 'Breast-ovarian cancer, familial, 1',
      id: 'DI-01559',
      acronym: 'BROVCA1',
      definition:
        'A condition associated with familial predisposition to cancer of the breast and ovaries. Characteristic features in affected families are an early age of onset of breast cancer (often before age 50), increased chance of bilateral cancers (cancer that develop in both breasts, or both ovaries, independently), frequent occurrence of breast cancer among men, increased incidence of tumors of other specific organs, such as the prostate.',
      alternativeNames: [
        'Breast cancer familial 1',
        'Ovarian cancer familial 1',
      ],
      crossReferences: [
        {
          databaseType: 'MIM',
          id: '604370',
          properties: ['phenotype'],
        },
        {
          databaseType: 'MedGen',
          id: 'C2676676',
        },
        {
          databaseType: 'MedGen',
          id: 'C2676677',
        },
        {
          databaseType: 'MedGen',
          id: 'C2676678',
        },
        {
          databaseType: 'MeSH',
          id: 'D001943',
        },
        {
          databaseType: 'MeSH',
          id: 'D010051',
        },
      ],
      statistics: {
        reviewedProteinCount: 1,
        unreviewedProteinCount: 0,
      },
    },
    {
      name: 'Breast-ovarian cancer, familial, 2',
      id: 'DI-02603',
      acronym: 'BROVCA2',
      definition:
        'A condition associated with familial predisposition to cancer of the breast and ovaries. Characteristic features in affected families are an early age of onset of breast cancer (often before age 50), increased chance of bilateral cancers (cancer that develop in both breasts, or both ovaries, independently), frequent occurrence of breast cancer among men, increased incidence of tumors of other specific organs, such as the prostate.',
      alternativeNames: [
        'Breast cancer familial 2',
        'Ovarian cancer familial 2',
      ],
      crossReferences: [
        {
          databaseType: 'MIM',
          id: '612555',
          properties: ['phenotype'],
        },
        {
          databaseType: 'MedGen',
          id: 'C2675520',
        },
        {
          databaseType: 'MedGen',
          id: 'C2675521',
        },
        {
          databaseType: 'MedGen',
          id: 'C2675522',
        },
        {
          databaseType: 'MeSH',
          id: 'D001943',
        },
        {
          databaseType: 'MeSH',
          id: 'D010051',
        },
      ],
      statistics: {
        reviewedProteinCount: 1,
        unreviewedProteinCount: 0,
      },
    },
  ],
};

export default mock.results;
