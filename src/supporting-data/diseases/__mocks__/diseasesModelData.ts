import { DiseasesAPIModel } from '../adapters/diseasesConverter';

// Source: /api/diseases/search?query=cancer&size=2
// Retrieved: 2021-10-15
const mock: DiseasesAPIModel[] = [
  {
    name: 'Hereditary non-polyposis colorectal cancer 1',
    id: 'DI-00550',
    acronym: 'HNPCC1',
    definition:
      "An autosomal dominant disease associated with marked increase in cancer susceptibility. It is characterized by a familial predisposition to early-onset colorectal carcinoma (CRC) and extra- colonic tumors of the gastrointestinal, urological and female reproductive tracts. HNPCC is reported to be the most common form of inherited colorectal cancer in the Western world. Clinically, HNPCC is often divided into two subgroups. Type I is characterized by hereditary predisposition to colorectal cancer, a young age of onset, and carcinoma observed in the proximal colon. Type II is characterized by increased risk for cancers in certain tissues such as the uterus, ovary, breast, stomach, small intestine, skin, and larynx in addition to the colon. Diagnosis of classical HNPCC is based on the Amsterdam criteria: 3 or more relatives affected by colorectal cancer, one a first degree relative of the other two; 2 or more generation affected; 1 or more colorectal cancers presenting before 50 years of age; exclusion of hereditary polyposis syndromes. The term 'suspected HNPCC' or 'incomplete HNPCC' can be used to describe families who do not or only partially fulfill the Amsterdam criteria, but in whom a genetic basis for colon cancer is strongly suspected.",
    alternativeNames: [
      'Hereditary non-polyposis colorectal cancer 3',
      'HNPCC3',
      'Lynch cancer family syndrome',
      'Lynch syndrome',
      'Lynch syndrome type I',
      'Lynch syndrome type II',
    ],
    crossReferences: [
      {
        databaseType: 'MIM',
        id: '120435',
        properties: ['phenotype'],
      },
      {
        databaseType: 'MedGen',
        id: 'C0009405',
      },
      {
        databaseType: 'MedGen',
        id: 'C1333990',
      },
      {
        databaseType: 'MedGen',
        id: 'CN068508',
      },
      {
        databaseType: 'MeSH',
        id: 'D003123',
      },
    ],
    keywords: [
      {
        name: 'Hereditary nonpolyposis colorectal cancer',
        id: 'KW-0362',
      },
    ],
    statistics: {
      reviewedProteinCount: 1,
      unreviewedProteinCount: 0,
    },
  },
  {
    name: 'Hereditary non-polyposis colorectal cancer 2',
    id: 'DI-00551',
    acronym: 'HNPCC2',
    definition:
      "An autosomal dominant disease associated with marked increase in cancer susceptibility. It is characterized by a familial predisposition to early-onset colorectal carcinoma (CRC) and extra- colonic tumors of the gastrointestinal, urological and female reproductive tracts. HNPCC is reported to be the most common form of inherited colorectal cancer in the Western world. Clinically, HNPCC is often divided into two subgroups. Type I is characterized by hereditary predisposition to colorectal cancer, a young age of onset, and carcinoma observed in the proximal colon. Type II is characterized by increased risk for cancers in certain tissues such as the uterus, ovary, breast, stomach, small intestine, skin, and larynx in addition to the colon. Diagnosis of classical HNPCC is based on the Amsterdam criteria: 3 or more relatives affected by colorectal cancer, one a first degree relative of the other two; 2 or more generation affected; 1 or more colorectal cancers presenting before 50 years of age; exclusion of hereditary polyposis syndromes. The term 'suspected HNPCC' or 'incomplete HNPCC' can be used to describe families who do not or only partially fulfill the Amsterdam criteria, but in whom a genetic basis for colon cancer is strongly suspected.",
    crossReferences: [
      {
        databaseType: 'MIM',
        id: '609310',
        properties: ['phenotype'],
      },
      {
        databaseType: 'MedGen',
        id: 'C1333991',
      },
      {
        databaseType: 'MeSH',
        id: 'D003123',
      },
    ],
    keywords: [
      {
        name: 'Hereditary nonpolyposis colorectal cancer',
        id: 'KW-0362',
      },
    ],
    statistics: {
      reviewedProteinCount: 1,
      unreviewedProteinCount: 0,
    },
  },
];

export default mock;
