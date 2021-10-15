import { HelpSearchResponse } from '../../adapters/helpConverter';

// Source: /api/help/search?facets=category&query=canonical&size=500
// Retrieved: 2021-10-15
// TODO: this API is unstable so the mock data here will want to be updated jira: https://www.ebi.ac.uk/panda/jira/browse/TRM-26569
const helpModelData: HelpSearchResponse = {
  facets: [
    {
      label: 'Category',
      name: 'category',
      allowMultipleSelection: true,
      values: [
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
          count: 14,
        },
      ],
    },
  ],
  results: [
    {
      id: 'canonical_and_isoforms',
      title:
        'What is the canonical sequence? Are all isoforms described in one entry?',
      lastModified: '2021-07-16',
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
          'What is the <span class="match-highlight">canonical</span> sequence? To reduce redundancy, the UniProtKB/Swiss-Prot policy',
        ],
      },
    },
    {
      id: 'canonical_nucleotide',
      title:
        'How do I get the nucleotide sequence that corresponds to the canonical UniProtKB sequence?',
      lastModified: '2021-07-16',
      categories: [
        'UniProtKB',
        'Sequence',
        'Cross-references',
        'Text search',
        'faq',
      ],
      matches: {
        title: [
          'How do I get the nucleotide sequence that corresponds to the <span class="match-highlight">canonical</span> UniProtKB sequence?',
        ],
        content: [
          'How do I get the nucleotide sequence that corresponds to the <span class="match-highlight">canonical</span> UniProtKB sequence? You',
        ],
      },
    },
    {
      id: 'conflict',
      title: 'Sequence conflict',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the \'Sequence\' section reports difference(s) between the <span class="match-highlight">canonical</span> sequence',
        ],
      },
    },
    {
      id: 'retrieve_sets',
      title: 'How to retrieve sets of protein sequences?',
      lastModified: '2021-07-16',
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
      id: 'sequence_processing',
      title: 'Sequence processing',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the Sequence section indicates if the <span class="match-highlight">canonical</span> sequence displayed by default',
        ],
      },
    },
    {
      id: 'sequence_caution',
      title: 'Sequence caution',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' in the \'Sequence conflict\' subsection. In this subsection, we list the differences between the <span class="match-highlight">canonical</span>',
        ],
      },
    },
    {
      id: 'sequences',
      title: 'Sequences',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This section displays by default the <span class="match-highlight">canonical</span> protein sequence and upon request all isoforms',
        ],
      },
    },
    {
      id: 'alternative_products',
      title: 'Alternative products',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> sequence displayed by default in the entry. Note: The so-called \'<span class="match-highlight">canonical\'</span> sequence is the most',
        ],
      },
    },
    {
      id: 'proteome',
      title: 'What are proteomes?',
      lastModified: '2021-07-16',
      categories: ['Proteomes', 'UniProtKB', 'Keywords', 'Sequence', 'faq'],
      matches: {
        content: [
          ' FASTA files (composed of <span class="match-highlight">canonical</span> and additional sequences), gene mapping files, Coding DNA Sequence',
        ],
      },
    },
    {
      id: 'sequence_length',
      title: 'Sequence length',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This indicates the number of amino acids in the <span class="match-highlight">canonical</span> sequence displayed by default in the',
        ],
      },
    },
    {
      id: 'unsure',
      title: 'Sequence uncertainty',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' is indicated in the \'description\' field. Example: P00279 Related documents What is the <span class="match-highlight">canonical</span> sequence?',
        ],
      },
    },
    {
      id: 'human_proteome',
      title: "What is UniProt's human proteome?",
      lastModified: '2021-07-16',
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
          ' over 22\'000 additional sequences (see What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described',
        ],
      },
    },
    {
      id: 'sequence_status',
      title: 'Sequence status',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the Sequence section indicates if the <span class="match-highlight">canonical</span> sequence displayed by default',
        ],
      },
    },
    {
      id: 'var_seq',
      title: 'Alternative sequence',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? How can I retrieve them? How to retrieve',
        ],
      },
    },
    {
      id: 'sequences_section',
      title: 'Sequence section',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This section displays by default the <span class="match-highlight">canonical</span> protein sequence and upon request all isoforms',
        ],
      },
    },
    {
      id: 'cross_references_section',
      title: 'Cross-references section',
      lastModified: '2021-07-16',
      categories: ['Cross-references', 'manual'],
      matches: {
        content: [
          " <span class=\"match-highlight\">canonical</span> sequence, these latter are documented in the 'Sequence conflict' subsection of the 'Sequence'",
        ],
      },
    },
    {
      id: 'variant',
      title: 'Natural variant',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' The sequence displayed by default in the entry (also called the <span class="match-highlight">canonical</span> sequence) is usually the',
        ],
      },
    },
    {
      id: 'rna_editing',
      title: 'RNA editing',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' sequence is fully edited, the <span class="match-highlight">canonical</span> protein sequence displayed by default in the entry corresponds',
        ],
      },
    },
    {
      id: 'protein_diversity',
      title:
        'How are protein sequence variety and protein diversity represented in UniProtKB?',
      lastModified: '2021-07-16',
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
          ' splicing, variant, isoform, mRNA editing, ribosomal frameshifting. See also: What is the <span class="match-highlight">canonical</span> sequence?',
        ],
      },
    },
    {
      id: 'entry_history',
      title: 'Entry history',
      lastModified: '2021-07-16',
      categories: ['Entry information', 'manual'],
      matches: {
        content: [
          ' modified\'). The version number for both the entry and the <span class="match-highlight">canonical</span> sequence are also displayed. Example',
        ],
      },
    },
    {
      id: 'gene_centric_isoform_mapping',
      title:
        'Automatic gene-centric isoform mapping for eukaryotic reference proteome entries',
      lastModified: '2021-07-16',
      categories: ['help'],
      matches: {
        content: [
          ' do we manually annotate a UniProtKB entry? What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described',
        ],
      },
    },
    {
      id: 'sequence_origin',
      title: 'Where do the UniProtKB protein sequences come from?',
      lastModified: '2021-07-16',
      categories: ['UniProtKB', 'Sequence', 'faq'],
      matches: {
        content: [
          ' do I get the nucleotide sequence that corresponds to the <span class="match-highlight">canonical</span> UniProtKB sequence? Sequences Related',
        ],
      },
    },
    {
      id: 'manual_curation',
      title: 'How do we manually annotate a UniProtKB entry?',
      lastModified: '2021-07-16',
      categories: ['UniProtKB', 'Biocuration', 'About UniProt', 'faq'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? (2) Sequence analysis. Sequences are analyzed',
        ],
      },
    },
    {
      id: 'redundancy',
      title: 'How redundant are the UniProt databases?',
      lastModified: '2021-07-16',
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
          ' diversity represented in UniProtKB? What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry?',
        ],
      },
    },
    {
      id: 'query-fields',
      title: 'UniProtKB query fields',
      lastModified: '2021-10-13',
      categories: ['Text search', 'Technical', 'Website', 'help'],
      matches: {
        content: [
          ' primary or secondary accession number P62988. The new behaviour will list all primary / <span class="match-highlight">canonical</span> isoform',
        ],
      },
    },
  ],
};

export default helpModelData;
