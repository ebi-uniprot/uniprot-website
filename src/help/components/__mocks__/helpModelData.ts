import { HelpSearchResponse } from '../../adapters/helpConverter';

// Retrieved 2021-09-08 from:
// https://www.ebi.ac.uk/uniprot/beta/api/help/search?facets=category&query=canonical&size=500
// TODO: this API is unstable so the mock data here will want to be updated

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
          count: 4,
        },
        {
          value: 'Cross-references',
          count: 3,
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
          count: 2,
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
          count: 3,
        },
        {
          value: 'Sequence',
          count: 21,
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
          count: 10,
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
          count: 10,
        },
        {
          value: 'help',
          count: 3,
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
          'What is the <span class="match-highlight">canonical</span> sequence? To reduce redundancy, the UniProtKB/Swiss-Prot policy is to',
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
          ' entries in these formats each contain only one protein sequence, the so-called \'<span class="match-highlight">canonical</span>\' sequence',
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
      id: 'proteome',
      title: 'What are proteomes?',
      lastModified: '2021-07-16',
      categories: ['Proteomes', 'UniProtKB', 'Keywords', 'Sequence', 'faq'],
      matches: {
        content: [
          ' of <span class="match-highlight">canonical</span> and additional sequences), gene mapping files, Coding DNA Sequence (CDS) FASTA files and',
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
          ' <span class="match-highlight">canonical</span> sequence displayed by default in the entry. Note: The so-called \'<span class="match-highlight">canonical</span>\' sequence is the most',
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
          ' in the sense that it contains one representative (<span class="match-highlight">canonical</span>) sequence for each currently known human',
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
          ' <span class="match-highlight">canonical</span> sequence, displayed by default in the entry, and the sequence reported in the indicated reference',
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
          'This subsection of the Sequence section indicates if the <span class="match-highlight">canonical</span> sequence displayed by default in',
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
      id: 'cross_references_section',
      title: 'Cross-references section',
      lastModified: '2021-07-16',
      categories: ['Cross-references', 'manual'],
      matches: {
        content: [
          ' with the <span class="match-highlight">canonical</span> sequence, these latter are documented in the \'Sequence conflict\' subsection of the',
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
      id: 'sequence_status',
      title: 'Sequence status',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          'This subsection of the Sequence section indicates if the <span class="match-highlight">canonical</span> sequence displayed by default in',
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
      id: 'unsure',
      title: 'Sequence uncertainty',
      lastModified: '2021-07-16',
      categories: ['Sequence', 'manual'],
      matches: {
        content: [
          ' indicated in the \'description\' field. Example: P00279 Related documents What is the <span class="match-highlight">canonical</span> sequence? Are',
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
          ' <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? How can I retrieve them? How to retrieve a',
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
          ' displayed by default in the entry (also called the <span class="match-highlight">canonical</span> sequence) is usually the most common',
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
          ', UniProtKB/Swiss-Prot and UniProtKB/TrEMBL? How do we manually annotate a UniProtKB entry? What is the <span class="match-highlight">canonical</span>',
        ],
      },
    },
    {
      id: 'homo_sapiens',
      title: 'Homo sapiens',
      lastModified: '2021-07-16',
      categories: ['Human', 'Proteomes', 'Biocuration', 'help'],
      matches: {
        content: [
          ' (<span class="match-highlight">canonical</span>) sequence for each currently known human gene. About half of these 20\'000 entries contain manually',
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
          ' defining a CDS as a protein? What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? (2',
        ],
      },
    },
    {
      id: 'ncbi_mappings',
      title:
        'Mapping between UniProtKB and NCBI resources (GeneID, RefSeq): how does it work?',
      lastModified: '2021-07-16',
      categories: ['UniProtKB', 'Sequence', 'Cross-references', 'faq'],
      matches: {
        content: [
          ', we create a RefSeq protein-centric mapping. If a UniProtKB protein (<span class="match-highlight">canonical</span> or isoform sequence) is',
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
          '. See also: What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? How do we manually',
        ],
      },
    },
    {
      id: 'query-fields',
      title: 'UniProtKB query fields',
      lastModified: '2021-09-07',
      categories: ['Text search', 'Technical', 'Website', 'help'],
      matches: {
        content: [
          ' <span class="match-highlight">canonical</span> isoform accessions P62988. To search over secondary accessions, we have introduced the sec_acc',
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
          ' represented in UniProtKB? What is the <span class="match-highlight">canonical</span> sequence? Are all isoforms described in one entry? Reducing',
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
          ' sequence is fully edited, the <span class="match-highlight">canonical</span> protein sequence displayed by default in the entry corresponds to',
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
          ' nucleotide sequence that corresponds to the <span class="match-highlight">canonical</span> UniProtKB sequence? Sequences Related terms: imported',
        ],
      },
    },
  ],
};

export default helpModelData;
