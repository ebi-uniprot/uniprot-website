import apiUrls from '../utils/apiUrls';

const mockResultFieldsApi = {
  request: apiUrls.resultsFields,
  response: [
    {
      groupName: 'Names & Taxonomy',
      fields: [
        {
          label: 'Entry',
          name: 'accession',
        },
        {
          label: 'Entry Name',
          name: 'id',
        },
        {
          label: 'Gene Names',
          name: 'gene_names',
        },
        {
          label: 'Gene Names (ordered locus)',
          name: 'gene_oln',
        },
      ],
    },
    {
      groupName: 'Sequence',
      fields: [
        {
          label: 'EMBL',
          name: 'dr:embl',
        },
        {
          label: 'CCDS',
          name: 'dr:ccds',
        },
        {
          label: 'PIR',
          name: 'dr:pir',
        },
        {
          label: 'RefSeq',
          name: 'dr:refseq',
        },
      ],
      isDatabase: true,
    },
  ],
};

export default mockResultFieldsApi;
