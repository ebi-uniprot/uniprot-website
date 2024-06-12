import { SearchResults } from '../../../shared/types/results';
import { CitationsAPIModel } from '../adapters/citationsConverter';

// Source: citations/search?query=nature&size=2
// Retrieved: 2024-06-10
const mock: SearchResults<CitationsAPIModel> = {
  results: [
    {
      citation: {
        id: 'CI-7TL41NBKJTRQJ',
        citationType: 'submission',
        authors: ['Wang J.', 'Liu S.J.', 'Xiao J.'],
        title: 'Nature gynogenetic fish.',
        publicationDate: 'DEC-2007',
        submissionDatabase: 'EMBL/GenBank/DDBJ databases',
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 2,
        computationallyMappedProteinCount: 0,
        communityMappedProteinCount: 0,
      },
    },
    {
      citation: {
        id: '22303823',
        citationType: 'UniProt indexed literatures',
        authors: [
          'Sakai K.',
          'Imamoto Y.',
          'Su C.Y.',
          'Tsukamoto H.',
          'Yamashita T.',
          'Terakita A.',
          'Yau K.W.',
          'Shichida Y.',
        ],
        citationCrossReferences: [
          {
            database: 'PubMed',
            id: '22303823',
          },
          {
            database: 'DOI',
            id: '10.1021/bi2018283',
          },
        ],
        title: 'Photochemical nature of parietopsin.',
        publicationDate: '2012',
        journal: 'Biochemistry',
        firstPage: '1933',
        lastPage: '1941',
        volume: '51',
        completeAuthorList: true,
        literatureAbstract:
          'Parietopsin is a nonvisual green light-sensitive opsin closely related to vertebrate visual opsins and was originally identified in lizard parietal eye photoreceptor cells. To obtain insight into the functional diversity of opsins, we investigated by UV-visible absorption spectroscopy the molecular properties of parietopsin and its mutants exogenously expressed in cultured cells and compared the properties to those of vertebrate and invertebrate visual opsins. Our mutational analysis revealed that the counterion in parietopsin is the glutamic acid (Glu) in the second extracellular loop, corresponding to Glu181 in bovine rhodopsin. This arrangement is characteristic of invertebrate rather than vertebrate visual opsins. The photosensitivity and the molar extinction coefficient of parietopsin were also lower than those of vertebrate visual opsins, features likewise characteristic of invertebrate visual opsins. On the other hand, irradiation of parietopsin yielded meta-I, meta-II, and meta-III intermediates after batho and lumi intermediates, similar to vertebrate visual opsins. The pH-dependent equilibrium profile between meta-I and meta-II intermediates was, however, similar to that between acid and alkaline metarhodopsins in invertebrate visual opsins. Thus, parietopsin behaves as an "evolutionary intermediate" between invertebrate and vertebrate visual opsins.',
      },
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 1,
        computationallyMappedProteinCount: 0,
        communityMappedProteinCount: 0,
      },
    },
  ],
};

export default mock.results;
