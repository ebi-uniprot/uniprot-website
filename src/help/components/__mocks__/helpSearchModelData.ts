import { HelpSearchResponse } from '../../adapters/helpConverter';

// Source: /help/search?facets=category&query=canonical&size=500
// Retrieved: 2021-10-15
// TODO: this API is unstable so the mock data here will want to be updated jira: https://www.ebi.ac.uk/panda/jira/browse/TRM-26569
const helpModelData: HelpSearchResponse = {
  facets: [
    {
      label: 'Category',
      name: 'category',
      allowMultipleSelection: true,
      values: [
        { value: 'About UniProt', count: 1 },
        { value: 'Biocuration', count: 3 },
        { value: 'Cross-references', count: 2 },
        { value: 'Download', count: 3 },
        { value: 'Entry information', count: 1 },
        { value: 'Human', count: 1 },
        { value: 'Keywords', count: 3 },
        { value: 'Programmatic access', count: 1 },
        { value: 'Proteomes', count: 2 },
        { value: 'Sequence', count: 20 },
        { value: 'Technical', count: 3 },
        { value: 'Text search', count: 5 },
        { value: 'UniParc', count: 1 },
        { value: 'UniProtKB', count: 9 },
        { value: 'UniRef', count: 1 },
        { value: 'Website', count: 1 },
        { value: 'faq', count: 9 },
        { value: 'help', count: 2 },
        { value: 'manual', count: 14 },
      ],
    },
  ],
  results: [
    {
      id: 'canonical_and_isoforms',
      title:
        'What is the canonical sequence? Are all isoforms described in one entry?',
      lastModified: '2022-04-28',
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
      id: 'canonical_nucleotide',
      title:
        'How do I get the nucleotide sequence that corresponds to the canonical UniProtKB sequence?',
      lastModified: '2022-04-28',
      type: 'help',
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
      lastModified: '2022-04-28',
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
      lastModified: '2022-04-28',
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
  ],
};

export default helpModelData;
