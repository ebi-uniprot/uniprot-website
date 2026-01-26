import { type FacetObject } from '../../shared/types/results';
import { type UniRefLiteAPIModel } from '../adapters/uniRefConverter';

type Payload = {
  facets: FacetObject[];
  results: Partial<UniRefLiteAPIModel>[];
};

// Source: uniref/search?facets=identity&query=glucose&size=1
// Retrieved: 2025-10-15
const mock: Payload = {
  facets: [
    {
      label: 'Clusters',
      name: 'identity',
      allowMultipleSelection: true,
      values: [
        {
          label: '100%',
          value: '1.0',
          count: 1230334,
        },
        {
          label: '90%',
          value: '0.9',
          count: 367753,
        },
        {
          label: '50%',
          value: '0.5',
          count: 47919,
        },
      ],
    },
  ],
  results: [
    {
      id: 'UniRef50_A0A1D3CUQ5',
      name: 'Cluster: Glucose',
      updated: '2016-11-30',
      entryType: 'UniRef50',
      commonTaxon: {
        scientificName: 'Cyclospora cayetanensis',
        taxonId: 88456,
      },
      memberCount: 1,
      organismCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        memberId: 'A0A1D3CUQ5_9EIME',
        organismName: 'Cyclospora cayetanensis',
        organismTaxId: 88456,
        sequenceLength: 127,
        proteinName: 'Glucose',
        accessions: ['A0A1D3CUQ5'],
        uniref90Id: 'UniRef90_A0A1D3CUQ5',
        uniref100Id: 'UniRef100_A0A1D3CUQ5',
        uniparcId: 'UPI00086F6574',
        seed: true,
        sequence: {
          value:
            'MQIGEEGVKGVAQSIAGLMCVAAGFSICVAGAVLQPLQQDFRLCGSQFACTEKGAFVAVFAPGAAVGSLVGGFVADAVGRWRSLFWTSLAFIAATGLTVMSATYAPLGWREGRFESSALSETLPSVY',
          length: 127,
          molWeight: 13118,
          crc64: 'F39F2BBDF6EB0234',
          md5: '96B17A3C27CEEC4943C0FCA2A801381C',
        },
      },
      seedId: 'A0A1D3CUQ5',
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1D3CUQ5'],
      organisms: [
        {
          scientificName: 'Cyclospora cayetanensis',
          taxonId: 88456,
        },
      ],
      goTerms: [
        {
          goId: 'GO:0022857',
          aspect: 'GO Molecular Function',
        },
        {
          goId: 'GO:0016020',
          aspect: 'GO Cellular Component',
        },
      ],
    },
  ],
};

export default mock;
