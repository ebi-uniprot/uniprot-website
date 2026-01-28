import { type HelpSearchResponse } from '../../types/apiModel';

// Source: help/search?facets=category&query=canonical&size=500
// Retrieved: 2026-01-26
const helpModelData: HelpSearchResponse = {
  facets: [
    {
      label: 'Category',
      name: 'category',
      allowMultipleSelection: true,
      values: [
        {
          value: '3D structure',
          count: 1,
        },
        {
          value: 'About UniProt',
          count: 1,
        },
        {
          value: 'Biocuration',
          count: 3,
        },
        {
          value: 'Cross-references',
          count: 2,
        },
        {
          value: 'Download',
          count: 3,
        },
        {
          value: 'Entry information',
          count: 1,
        },
        {
          value: 'Human',
          count: 1,
        },
        {
          value: 'Keywords',
          count: 3,
        },
        {
          value: 'Programmatic access',
          count: 1,
        },
        {
          value: 'Proteomes',
          count: 2,
        },
        {
          value: 'Sequence',
          count: 20,
        },
        {
          value: 'Technical',
          count: 3,
        },
        {
          value: 'Text search',
          count: 5,
        },
        {
          value: 'UniParc',
          count: 1,
        },
        {
          value: 'UniProtKB',
          count: 9,
        },
        {
          value: 'UniRef',
          count: 1,
        },
        {
          value: 'Website',
          count: 1,
        },
        {
          value: 'faq',
          count: 9,
        },
        {
          value: 'help',
          count: 2,
        },
        {
          value: 'manual',
          count: 15,
        },
      ],
    },
  ],
  results: [
    {
      id: 'canonical_and_isoforms',
      title:
        'What is the canonical sequence? Are all isoforms described in one entry?',
      lastModified: '2022-12-23',
      type: 'help',
      categories: [
        'UniProtKB',
        'Sequence',
        'Text search',
        'Download',
        'Technical',
        'faq',
      ],
      matches: {
        title: [
          'What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry?',
        ],
        content: [
          'What is the <span class="match-highlight">canonical</span> sequence? Each UniProtKB/Swiss-Prot entry contains all curated protein',
        ],
      },
    },
    {
      id: 'retrieve_sets',
      title: 'How to retrieve sets of protein sequences?',
      lastModified: '2026-01-07',
      type: 'help',
      categories: [
        'UniProtKB',
        'Sequence',
        'Text search',
        'Download',
        'Technical',
        'Programmatic access',
        'faq',
      ],
      matches: {
        content: [
          ' entries in these formats each contain only one protein sequence, the so-called \'<span class="match-highlight">canonical\'</span> sequence.',
        ],
      },
    },
    {
      id: 'conflict',
      title: 'Sequence conflict',
      lastModified: '2025-11-26',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the \'Sequence\' section reports difference(s) between the <span class="match-highlight">canonical</span> sequence',
        ],
      },
    },
    {
      id: 'sequence_processing',
      title: 'Sequence processing',
      lastModified: '2022-04-28',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the Sequence section indicates if the <span class="match-highlight">canonical</span> sequence displayed by default in',
        ],
      },
    },
    {
      id: 'alternative_products',
      title: 'Alternative products',
      lastModified: '2023-11-24',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> sequence displayed by default in the entry. Note : The so-called \'<span class="match-highlight">canonical\'</span> sequence is selected',
        ],
      },
    },
    {
      id: 'proteome',
      title: 'What are proteomes?',
      lastModified: '2026-01-07',
      type: 'help',
      categories: ['Proteomes', 'UniProtKB', 'Keywords', 'Sequence', 'faq'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> and additional sequences), gene mapping files, Coding DNA Sequence (CDS) FASTA files and database',
        ],
      },
    },
    {
      id: 'sequence_caution',
      title: 'Sequence caution',
      lastModified: '2022-04-28',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> sequence, displayed by default in the entry, and the sequence reported in the indicated reference',
        ],
      },
    },
    {
      id: 'canonical_nucleotide',
      title:
        'How do I get the nucleotide sequence that corresponds to the UniProtKB sequence?',
      lastModified: '2023-08-21',
      type: 'help',
      categories: [
        'UniProtKB',
        'Sequence',
        'Cross-references',
        'Text search',
        'faq',
      ],
      matches: {
        content: [
          'How do I get the nucleotide sequence that corresponds to the <span class="match-highlight">canonical</span> UniProtKB sequence? You',
        ],
      },
    },
    {
      id: 'sequences',
      title: 'Sequences',
      lastModified: '2025-11-26',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This section displays by default the <span class="match-highlight">canonical</span> protein sequence and upon request all isoforms',
        ],
      },
    },
    {
      id: 'human_proteome',
      title: "What is UniProt's human proteome?",
      lastModified: '2025-11-26',
      type: 'help',
      categories: [
        'Proteomes',
        'Download',
        'UniProtKB',
        'Keywords',
        'Sequence',
        'Human',
        'faq',
      ],
      matches: {
        content: [
          ' the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry?). Query: proteome:up000005640 AND',
        ],
      },
    },
    {
      id: 'sequence_length',
      title: 'Sequence length',
      lastModified: '2022-04-28',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This indicates the number of amino acids in the <span class="match-highlight">canonical</span> sequence displayed by default in the',
        ],
      },
    },
    {
      id: 'structure_section',
      title: 'Structure annotation in UniProt',
      lastModified: '2025-10-24',
      type: 'help',
      categories: ['3D structure', 'manual'],
      matches: {
        content: [
          ' (see the PDB cross-reference <span class="match-highlight">help</span> page). These structures may cover different ranges of the sequence,',
        ],
      },
    },
    {
      id: 'unsure',
      title: 'Sequence uncertainty',
      lastModified: '2022-04-28',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' indicated in the \'description\' field. Example: P00279 Related documents What is the <span class="match-highlight">canonical</span> sequence? Are',
        ],
      },
    },
    {
      id: 'sequence_status',
      title: 'Sequence status',
      lastModified: '2023-10-12',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the Sequence section indicates if the <span class="match-highlight">canonical</span> sequence displayed by default in',
        ],
      },
    },
    {
      id: 'var_seq',
      title: 'Alternative sequence',
      lastModified: '2022-04-28',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? How can I retrieve them? How to retrieve a',
        ],
      },
    },
    {
      id: 'cross_references_section',
      title: 'Cross-references section',
      lastModified: '2025-02-04',
      type: 'help',
      categories: ['Cross-references', 'manual'],
      matches: {
        content: [
          ' with the <span class="match-highlight">canonical</span> sequence, these latter are documented in the \'Sequence conflict\' subsection of the',
        ],
      },
    },
    {
      id: 'sequences_section',
      title: 'Sequence section',
      lastModified: '2023-06-06',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This section displays by default the <span class="match-highlight">canonical</span> protein sequence and upon request all isoforms',
        ],
      },
    },
    {
      id: 'variant',
      title: 'Natural variant',
      lastModified: '2025-10-17',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' by default in the entry (also called the <span class="match-highlight">canonical</span> sequence) is usually the most common polymorphic',
        ],
      },
    },
    {
      id: 'entry_history',
      title: 'Entry history',
      lastModified: '2022-04-28',
      type: 'help',
      categories: ['Entry information', 'manual'],
      matches: {
        content: [
          ' modified\'). The version number for both the entry and the <span class="match-highlight">canonical</span> sequence are also displayed. Example',
        ],
      },
    },
    {
      id: 'protein_diversity',
      title:
        'How are protein sequence variety and protein diversity represented in UniProtKB?',
      lastModified: '2025-11-26',
      type: 'help',
      categories: [
        'UniProtKB',
        'Keywords',
        'Text search',
        'Biocuration',
        'Sequence',
        'faq',
      ],
      matches: {
        content: [
          ' the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? How do we manually annotate a',
        ],
      },
    },
    {
      id: 'gene_centric_isoform_mapping',
      title:
        'Automatic gene-centric isoform mapping for eukaryotic reference proteome entries',
      lastModified: '2025-10-17',
      type: 'help',
      categories: ['help'],
      matches: {
        content: [
          '/Swiss-Prot and UniProtKB/TrEMBL? How do we manually annotate a UniProtKB entry? What is the <span class="match-highlight">canonical</span>',
        ],
      },
    },
    {
      id: 'sequence_origin',
      title: 'Where do the UniProtKB protein sequences come from?',
      lastModified: '2025-11-26',
      type: 'help',
      categories: ['UniProtKB', 'Sequence', 'faq'],
      matches: {
        content: [
          ' the <span class="match-highlight">canonical</span> UniProtKB sequence? Sequences Related terms: imported, source, origin',
        ],
      },
    },
    {
      id: 'manual_curation',
      title: 'How do we manually annotate a UniProtKB entry?',
      lastModified: '2025-06-12',
      type: 'help',
      categories: ['UniProtKB', 'Biocuration', 'About UniProt', 'faq'],
      matches: {
        content: [
          ' defining a CDS as a protein? What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? (2)',
        ],
      },
    },
    {
      id: 'redundancy',
      title: 'How redundant are the UniProt databases?',
      lastModified: '2025-02-04',
      type: 'help',
      categories: [
        'UniParc',
        'UniProtKB',
        'Sequence',
        'UniRef',
        'Biocuration',
        'faq',
      ],
      matches: {
        content: [
          ' variety and protein diversity represented in UniProtKB? What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms',
        ],
      },
    },
    {
      id: 'rna_editing',
      title: 'RNA editing',
      lastModified: '2025-03-05',
      type: 'help',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' When the mRNA sequence is fully edited, the <span class="match-highlight">canonical</span> protein sequence displayed by default in the',
        ],
      },
    },
    {
      id: 'query-fields',
      title: 'UniProtKB query fields',
      lastModified: '2025-11-26',
      type: 'help',
      categories: ['Text search', 'Technical', 'Website', 'help'],
      matches: {
        content: [
          ' -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | | accession | accession:P62988 | This will list all primary / <span class="match-highlight">canonical</span> isoform accessions P62988.',
        ],
      },
    },
  ],
};
export default helpModelData;
