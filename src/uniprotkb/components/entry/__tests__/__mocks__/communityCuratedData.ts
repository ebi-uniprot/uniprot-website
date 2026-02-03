import { type Reference } from '../../../../../supporting-data/citations/adapters/citationsConverter';

// This is from https://rest.uniprot.org/uniprotkb/P0DTC2/publications?facetFilter=(types:"0") but then
// modified to be a bit more interesting ie missing/different submission dates
const data: Reference[] = [
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '37000302',
    sourceCategories: ['Phenotypes & Variants'],
    communityAnnotation: {
      proteinOrGene: 'S',
      disease: 'COVID-19 (DOID:0080600).',
      comment:
        'Epidemiological study describing preserved indel mutations in Spike protein on SARS-Co-V2 sublineages.',
      submissionDate: '2022-01-28',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '36483199',
    sourceCategories: ['Function', 'Phenotypes & Variants'],
    communityAnnotation: {
      proteinOrGene: 'S',
      function: 'IgG binding (GO:0019864).',
      disease: 'COVID-19 (DOID:0080600).',
      submissionDate: '2023-05-28',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '36052466',
    sourceCategories: ['Phenotypes & Variants'],
    communityAnnotation: {
      proteinOrGene: 'S',
      disease: 'PASC (DOID:0080848). COVID-19 (DOID:0080600).',
      comment:
        'Detection of circulating spike protein in PASC patients, suggesting a viral reservoir in the body of long COVID patients.',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '35660160',
    sourceCategories: ['Phenotypes & Variants', 'Structure'],
    communityAnnotation: {
      proteinOrGene: 'Spike glycoprotein; S.',
      comment: 'Molecular simulation study.',
      submissionDate: '2023-06-28',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '35300999',
    sourceCategories: ['Function', 'Phenotypes & Variants', 'Structure'],
    communityAnnotation: {
      proteinOrGene: 'S',
      disease: 'COVID-19 (DOID:0080600).',
      comment: 'Review',
      submissionDate: '2023-05-28',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '35215888',
    sourceCategories: ['Function', 'Phenotypes & Variants'],
    communityAnnotation: {
      proteinOrGene: 'S',
      function: 'Pathogen-derived receptor ligand activity (GO:0140295).',
      disease: 'COVID-19',
      comment: 'Evidence:Computational analysis.',
      submissionDate: '2021-12-28',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0009-0006-0769-8175',
    },
    citationId: '35039785',
    sourceCategories: ['Phenotypes & Variants'],
    communityAnnotation: {
      proteinOrGene: 'S',
      disease: 'COVID-19 (DOID:0080600).',
      comment:
        'Epidemiological study describing indel variants, with all major indel types identified here occurred at the NTD domain of S protein.',
      submissionDate: '2023-05-28',
    },
  },
  {
    source: {
      name: 'ORCID',
      id: '0000-0003-0651-4769',
    },
    citationId: '34930824',
    sourceCategories: ['Function', 'PTM / Processing', 'Interaction'],
    communityAnnotation: {
      proteinOrGene: 'Spike S.',
      function:
        "Membrane fusion requires the proteolytic cleavage at the S2' site.",
      comment: "R815 is a proteolytic cleavage site for S2' generation.",
      submissionDate: '2022-01-05',
    },
  },
];

export default data;
