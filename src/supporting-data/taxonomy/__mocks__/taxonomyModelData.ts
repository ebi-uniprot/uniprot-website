import { SearchResults } from '../../../shared/types/results';
import { TaxonomyAPIModel } from '../adapters/taxonomyConverter';

// Source: taxonomy/search?size=2&query=primate
// Retrieved: 2024-07-24
const mock: SearchResults<TaxonomyAPIModel> = {
  results: [
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
          rank: 'superkingdom',
          hidden: false,
        },
        {
          scientificName: 'Riboviria',
          taxonId: 2559587,
          rank: 'clade',
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
          scientificName: 'Vesicular exanthema of swine virus',
          commonName: 'VESV',
          taxonId: 35612,
          rank: 'species',
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
    {
      scientificName: 'primate papillomaviruses',
      taxonId: 333933,
      mnemonic: '9PAPI',
      parent: {
        scientificName: 'unclassified Papillomaviridae',
        taxonId: 333774,
      },
      rank: 'clade',
      hidden: false,
      active: true,
      lineage: [
        {
          scientificName: 'Viruses',
          taxonId: 10239,
          rank: 'superkingdom',
          hidden: false,
        },
        {
          scientificName: 'Monodnaviria',
          commonName: 'single-stranded DNA viruses',
          taxonId: 2731342,
          rank: 'clade',
          hidden: false,
        },
        {
          scientificName: 'Shotokuvirae',
          taxonId: 2732092,
          rank: 'kingdom',
          hidden: false,
        },
        {
          scientificName: 'Cossaviricota',
          taxonId: 2732415,
          rank: 'phylum',
          hidden: false,
        },
        {
          scientificName: 'Papovaviricetes',
          taxonId: 2732421,
          rank: 'class',
          hidden: false,
        },
        {
          scientificName: 'Zurhausenvirales',
          taxonId: 2732533,
          rank: 'order',
          hidden: false,
        },
        {
          scientificName: 'Papillomaviridae',
          taxonId: 151340,
          rank: 'family',
          hidden: false,
        },
        {
          scientificName: 'unclassified Papillomaviridae',
          taxonId: 333774,
          rank: 'no rank',
          hidden: true,
        },
      ],
      statistics: {
        reviewedProteinCount: 0,
        unreviewedProteinCount: 59,
        referenceProteomeCount: 0,
        proteomeCount: 0,
      },
    },
  ],
};
export default mock.results;
