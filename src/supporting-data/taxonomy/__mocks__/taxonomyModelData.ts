import { type SearchResults } from '../../../shared/types/results';
import { type TaxonomyAPIModel } from '../adapters/taxonomyConverter';

// Source: taxonomy/search?size=2&query=primate
// Retrieved: 2026-01-26
const mock: SearchResults<TaxonomyAPIModel> = {
  results: [
    {
      scientificName: 'primate metagenome',
      taxonId: 1441288,
      mnemonic: '9ZZZZ',
      parent: {
        scientificName: 'organismal metagenomes',
        taxonId: 410656,
      },
      rank: 'species',
      hidden: true,
      active: true,
      otherNames: ['primate microbiota'],
      lineage: [
        {
          scientificName: 'unclassified entries',
          taxonId: 2787823,
          rank: 'no rank',
          hidden: true,
        },
        {
          scientificName: 'unclassified sequences',
          taxonId: 12908,
          rank: 'no rank',
          hidden: false,
        },
        {
          scientificName: 'metagenomes',
          taxonId: 408169,
          rank: 'no rank',
          hidden: false,
        },
        {
          scientificName: 'organismal metagenomes',
          taxonId: 410656,
          rank: 'no rank',
          hidden: false,
        },
      ],
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 0,
        referenceProteomeCount: 0,
        proteomeCount: 0,
      },
    },
    {
      scientificName: 'Primate calicivirus',
      taxonId: 37299,
      mnemonic: 'VESV',
      parent: {
        scientificName: 'Vesicular exanthema of swine virus',
        commonName: 'VESV',
        taxonId: 35612,
      },
      rank: 'no rank',
      hidden: true,
      active: true,
      lineage: [
        {
          scientificName: 'Viruses',
          taxonId: 10239,
          rank: 'no rank',
          hidden: false,
        },
        {
          scientificName: 'Riboviria',
          commonName: 'RNA viruses and retroviruses',
          taxonId: 2559587,
          rank: 'realm',
          hidden: false,
        },
        {
          scientificName: 'Orthornavirae',
          taxonId: 2732396,
          rank: 'kingdom',
          hidden: false,
        },
        {
          scientificName: 'Pisuviricota',
          taxonId: 2732408,
          rank: 'phylum',
          hidden: false,
        },
        {
          scientificName: 'Pisoniviricetes',
          taxonId: 2732506,
          rank: 'class',
          hidden: false,
        },
        {
          scientificName: 'Picornavirales',
          taxonId: 464095,
          rank: 'order',
          hidden: false,
        },
        {
          scientificName: 'Caliciviridae',
          taxonId: 11974,
          rank: 'family',
          hidden: false,
        },
        {
          scientificName: 'Vesivirus',
          taxonId: 95337,
          rank: 'genus',
          hidden: false,
        },
        {
          scientificName: 'Vesivirus exanthema',
          taxonId: 3433198,
          rank: 'species',
          hidden: false,
        },
        {
          scientificName: 'Vesicular exanthema of swine virus',
          commonName: 'VESV',
          taxonId: 35612,
          rank: 'no rank',
          hidden: false,
        },
      ],
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 3,
        referenceProteomeCount: 0,
        proteomeCount: 0,
      },
    },
  ],
};
export default mock.results;
