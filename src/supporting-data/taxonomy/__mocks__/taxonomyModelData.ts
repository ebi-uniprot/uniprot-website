import { TaxonomyAPIModel } from '../adapters/taxonomyConverter';

// Source: /api/taxonomy/search?size=2&query=primate
// Retrieved: 2021-10-15
const mock: TaxonomyAPIModel[] = [
  {
    scientificName: 'Primate lentivirus group',
    taxonId: 11652,
    mnemonic: '9PLVG',
    parent: {
      scientificName: 'Lentivirus',
      taxonId: 11646,
    },
    rank: 'no rank',
    hidden: false,
    active: true,
    otherNames: ['Primate immunodeficiency viruses'],
    lineage: [
      {
        scientificName: 'Lentivirus',
        taxonId: 11646,
        rank: 'genus',
        hidden: false,
      },
      {
        scientificName: 'Orthoretrovirinae',
        taxonId: 327045,
        rank: 'subfamily',
        hidden: false,
      },
      {
        scientificName: 'Retroviridae',
        taxonId: 11632,
        rank: 'family',
        hidden: false,
      },
      {
        scientificName: 'Ortervirales',
        taxonId: 2169561,
        rank: 'order',
        hidden: false,
      },
      {
        scientificName: 'Revtraviricetes',
        taxonId: 2732514,
        rank: 'class',
        hidden: false,
      },
      {
        scientificName: 'Artverviricota',
        taxonId: 2732409,
        rank: 'phylum',
        hidden: false,
      },
      {
        scientificName: 'Pararnavirae',
        taxonId: 2732397,
        rank: 'kingdom',
        hidden: false,
      },
      {
        scientificName: 'Riboviria',
        taxonId: 2559587,
        rank: 'no rank',
        hidden: false,
      },
      {
        scientificName: 'Viruses',
        taxonId: 10239,
        rank: 'superkingdom',
        hidden: false,
      },
    ],
    statistics: {
      reviewedProteinCount: 0,
      unreviewedProteinCount: 35809,
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
        scientificName: 'Vesicular exanthema of swine virus',
        commonName: 'VESV',
        taxonId: 35612,
        rank: 'species',
        hidden: true,
      },
      {
        scientificName: 'Vesivirus',
        taxonId: 95337,
        rank: 'genus',
        hidden: false,
      },
      {
        scientificName: 'Caliciviridae',
        taxonId: 11974,
        rank: 'family',
        hidden: false,
      },
      {
        scientificName: 'Picornavirales',
        taxonId: 464095,
        rank: 'order',
        hidden: false,
      },
      {
        scientificName: 'Pisoniviricetes',
        taxonId: 2732506,
        rank: 'class',
        hidden: false,
      },
      {
        scientificName: 'Pisuviricota',
        taxonId: 2732408,
        rank: 'phylum',
        hidden: false,
      },
      {
        scientificName: 'Orthornavirae',
        taxonId: 2732396,
        rank: 'kingdom',
        hidden: false,
      },
      {
        scientificName: 'Riboviria',
        taxonId: 2559587,
        rank: 'no rank',
        hidden: false,
      },
      {
        scientificName: 'Viruses',
        taxonId: 10239,
        rank: 'superkingdom',
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
];

export default mock;
