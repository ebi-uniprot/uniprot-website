import { type SearchResults } from '../../../shared/types/results';
import { type TaxonomyAPIModel } from '../adapters/taxonomyConverter';

// Source: taxonomy/search?size=2&query=primate
// Retrieved: 2026-08-31
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
      scientificName: 'Primate lentivirus group',
      taxonId: 11652,
      mnemonic: '9PLVG',
      parent: {
        scientificName: 'unclassified Lentivirus',
        taxonId: 348386,
      },
      rank: 'clade',
      hidden: false,
      active: true,
      otherNames: ['Primate immunodeficiency viruses'],
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
          scientificName: 'Pararnavirae',
          taxonId: 2732397,
          rank: 'kingdom',
          hidden: false,
        },
        {
          scientificName: 'Artverviricota',
          taxonId: 2732409,
          rank: 'phylum',
          hidden: false,
        },
        {
          scientificName: 'Revtraviricetes',
          taxonId: 2732514,
          rank: 'class',
          hidden: false,
        },
        {
          scientificName: 'Ortervirales',
          taxonId: 2169561,
          rank: 'order',
          hidden: false,
        },
        {
          scientificName: 'Retroviridae',
          taxonId: 11632,
          rank: 'family',
          hidden: false,
        },
        {
          scientificName: 'Orthoretrovirinae',
          taxonId: 327045,
          rank: 'subfamily',
          hidden: false,
        },
        {
          scientificName: 'Lentivirus',
          taxonId: 11646,
          rank: 'genus',
          hidden: false,
        },
        {
          scientificName: 'unclassified Lentivirus',
          taxonId: 348386,
          rank: 'no rank',
          hidden: true,
        },
      ],
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 0,
        referenceProteomeCount: 0,
        proteomeCount: 0,
      },
    },
  ],
};
export default mock.results;
