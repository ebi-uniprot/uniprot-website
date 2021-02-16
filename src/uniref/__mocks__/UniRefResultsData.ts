import { FacetObject } from '../../uniprotkb/types/responseTypes';
import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';

type Payload = {
  facets: FacetObject[];
  results: Partial<UniRefLiteAPIModel>[];
};

// generated with the text query "glucose", default columns
const mock: Payload = {
  facets: [
    {
      label: 'Clusters',
      name: 'identity',
      allowMultipleSelection: true,
      values: [
        { label: '100%', value: '1.0', count: 728513 },
        { label: '90%', value: '0.9', count: 288809 },
        { label: '50%', value: '0.5', count: 37152 },
      ],
    },
  ],
  results: [
    {
      id: 'UniRef100_A0A0B7GQ86',
      name:
        'Cluster: PTS system glucose-specific EIICBA component [includes: glucose permease IIC component glucose-specific phosphotransferase enzyme IIB component glucose-specific phosphotransferase enzyme IIA compon...',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Streptococcus sanguinis',
        sequence: { length: 730 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A0B7GQ86'],
      organisms: [{ scientificName: 'Streptococcus sanguinis', taxonId: 1305 }],
    },
    {
      id: 'UniRef90_A0A0B7GQ86',
      name:
        'Cluster: PTS system glucose-specific EIICBA component [includes: glucose permease IIC component glucose-specific phosphotransferase enzyme IIB component glucose-specific phosphotransferase enzyme IIA compon...',
      entryType: 'UniRef90',
      memberCount: 76,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Streptococcus sanguinis',
        sequence: { length: 730 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)', 'UniParc'],
      members: [
        'A0A0B7GQ86',
        'F0IWQ1',
        'F3SFV0',
        'E8KMV1',
        'A0A496KEK6',
        'F0IKR3',
        'F3UTY6',
        'J4Q813',
        'A0A427ZH79',
        'A0A139MX82',
      ],
      organisms: [
        { scientificName: 'Streptococcus sanguinis', taxonId: 1305 },
        {
          scientificName: 'Streptococcus sanguinis SK160',
          taxonId: 888812,
        },
        {
          scientificName: 'Streptococcus sanguinis SK1087',
          taxonId: 888824,
        },
        {
          scientificName: 'Streptococcus sanguinis VMC66',
          taxonId: 888825,
        },
        { scientificName: 'Streptococcus sp', taxonId: 1306 },
        {
          scientificName: 'Streptococcus sanguinis SK150',
          taxonId: 888811,
        },
        {
          scientificName: 'Streptococcus sanguinis SK355',
          taxonId: 888816,
        },
        { scientificName: 'Streptococcus sp. AS14', taxonId: 936577 },
        { scientificName: 'Streptococcus cristatus', taxonId: 45634 },
        {
          scientificName: 'Streptococcus sanguinis',
          commonName: 'strain SK36',
          taxonId: 388919,
        },
      ],
    },
    {
      id: 'UniRef100_A0A0A8XAZ0',
      name:
        'Cluster: PTS system, glucose-specific IIC component /PTS system, glucose-specific IIB component /PTS system, glucose-specific IIA component',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus selenatarsenatis SF-1',
        sequence: { length: 691 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A0A8XAZ0'],
      organisms: [
        {
          scientificName: 'Bacillus selenatarsenatis SF-1',
          taxonId: 1321606,
        },
      ],
    },
    {
      id: 'UniRef100_A0A0V8H5A3',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus enclensis',
        sequence: { length: 693 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A0V8H5A3'],
      organisms: [{ scientificName: 'Bacillus enclensis', taxonId: 1402860 }],
    },
    {
      id: 'UniRef100_A0A1G6MM22',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Alkalihalobacillus lonarensis',
        sequence: { length: 672 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1G6MM22'],
      organisms: [
        {
          scientificName: 'Alkalihalobacillus lonarensis',
          taxonId: 1464122,
        },
      ],
    },
    {
      id: 'UniRef100_A0A1G7XJS9',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Aneurinibacillus thermoaerophilus',
        sequence: { length: 678 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1G7XJS9'],
      organisms: [
        {
          scientificName: 'Aneurinibacillus thermoaerophilus',
          taxonId: 143495,
        },
      ],
    },
    {
      id: 'UniRef100_A0A1G8WTQ8',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Salimicrobium halophilum',
        sequence: { length: 677 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1G8WTQ8'],
      organisms: [
        { scientificName: 'Salimicrobium halophilum', taxonId: 86666 },
      ],
    },
    {
      id: 'UniRef100_A0A1G9WUA4',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Fictibacillus solisalsi',
        sequence: { length: 678 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1G9WUA4'],
      organisms: [
        { scientificName: 'Fictibacillus solisalsi', taxonId: 459525 },
      ],
    },
    {
      id: 'UniRef100_A0A1H0JPG0',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family (TC 4.A.1.1.9)/PTS system D-glucose-specific IIB component, Glc family (TC 4.A.1.1.9)/PTS system D-glucose-specific IIC component, Glc family...',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus daliensis',
        sequence: { length: 679 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1H0JPG0'],
      organisms: [{ scientificName: 'Bacillus daliensis', taxonId: 745820 }],
    },
    {
      id: 'UniRef100_A0A1H3GD40',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Thermoactinomyces sp. DSM 45892',
        sequence: { length: 648 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1H3GD40'],
      organisms: [
        {
          scientificName: 'Thermoactinomyces sp. DSM 45892',
          taxonId: 1882753,
        },
      ],
    },
    {
      id: 'UniRef100_A0A1H5WSG5',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Caloramator fervidus',
        sequence: { length: 505 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1H5WSG5'],
      organisms: [{ scientificName: 'Caloramator fervidus', taxonId: 29344 }],
    },
    {
      id: 'UniRef100_A0A1H7W6Y3',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Paenibacillus sp. cl141a',
        sequence: { length: 693 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1H7W6Y3'],
      organisms: [
        { scientificName: 'Paenibacillus sp. cl141a', taxonId: 1761877 },
      ],
    },
    {
      id: 'UniRef100_A0A1H8J2Q0',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Terribacillus saccharophilus',
        sequence: { length: 695 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1H8J2Q0'],
      organisms: [
        { scientificName: 'Terribacillus saccharophilus', taxonId: 361277 },
      ],
    },
    {
      id: 'UniRef100_A0A1H8KGT2',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Mesobacillus persicus',
        sequence: { length: 690 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1H8KGT2'],
      organisms: [{ scientificName: 'Mesobacillus persicus', taxonId: 930146 }],
    },
    {
      id: 'UniRef100_A0A1I1TQ41',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus sp. OV194',
        sequence: { length: 678 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1I1TQ41'],
      organisms: [{ scientificName: 'Bacillus sp. OV194', taxonId: 1881065 }],
    },
    {
      id: 'UniRef100_A0A1I6CFT0',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus sp. cl95',
        sequence: { length: 688 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1I6CFT0'],
      organisms: [{ scientificName: 'Bacillus sp. cl95', taxonId: 1761761 }],
    },
    {
      id: 'UniRef100_A0A1K1XKY6',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus altitudinis',
        sequence: { length: 699 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1K1XKY6'],
      organisms: [{ scientificName: 'Bacillus altitudinis', taxonId: 293387 }],
    },
    {
      id: 'UniRef100_A0A1M6QA16',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Caminicella sporogenes DSM 14501',
        sequence: { length: 677 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1M6QA16'],
      organisms: [
        {
          scientificName: 'Caminicella sporogenes DSM 14501',
          taxonId: 1121266,
        },
      ],
    },
    {
      id: 'UniRef100_A0A1N6ZK92',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 3,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus cereus',
        sequence: { length: 706 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)', 'UniParc'],
      members: ['A0A1N6ZK92', 'A0A420GRU3', 'UPI0013C341DE'],
      organisms: [
        { scientificName: 'Bacillus cereus', taxonId: 1396 },
        { scientificName: 'Bacillus toyonensis', taxonId: 155322 },
        { scientificName: 'Klebsiella pneumoniae', taxonId: 573 },
      ],
    },
    {
      id: 'UniRef100_A0A1N7JH97',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Salimicrobium flavidum',
        sequence: { length: 677 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1N7JH97'],
      organisms: [
        { scientificName: 'Salimicrobium flavidum', taxonId: 570947 },
      ],
    },
    {
      id: 'UniRef100_A0A1X7K8B7',
      name:
        'Cluster: PTS system D-glucose-specific IIA component, Glc family /PTS system D-glucose-specific IIB component, Glc family /PTS system D-glucose-specific IIC component, Glc family',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Paenibacillus aquistagni',
        sequence: { length: 529 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A1X7K8B7'],
      organisms: [
        { scientificName: 'Paenibacillus aquistagni', taxonId: 1852522 },
      ],
    },
    {
      id: 'UniRef100_A0A2V4VB48',
      name:
        'Cluster: PTS system D-glucose-specific IIA component (Glc family) /PTS system D-glucose-specific IIB component (Glc family) /PTS system D-glucose-specific IIC component (Glc family)',
      entryType: 'UniRef100',
      memberCount: 2,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Paenibacillus barcinonensis',
        sequence: { length: 668 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)', 'UniParc'],
      members: ['A0A2V4VB48', 'UPI000DA199EA'],
      organisms: [
        { scientificName: 'Paenibacillus barcinonensis', taxonId: 198119 },
      ],
    },
    {
      id: 'UniRef100_A0A366DSZ9',
      name:
        'Cluster: PTS system D-glucose-specific IIA component (Glc family) /PTS system D-glucose-specific IIB component (Glc family) /PTS system D-glucose-specific IIC component (Glc family)',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Paraliobacillus ryukyuensis',
        sequence: { length: 675 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A366DSZ9'],
      organisms: [
        { scientificName: 'Paraliobacillus ryukyuensis', taxonId: 200904 },
      ],
    },
    {
      id: 'UniRef100_A0A368WTA0',
      name:
        'Cluster: PTS system D-glucose-specific IIA component (Glc family) /PTS system D-glucose-specific IIB component (Glc family) /PTS system D-glucose-specific IIC component (Glc family)',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Bacillus sp. NFR08',
        sequence: { length: 683 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A368WTA0'],
      organisms: [{ scientificName: 'Bacillus sp. NFR08', taxonId: 1566284 }],
    },
    {
      id: 'UniRef100_A0A497YPU5',
      name:
        'Cluster: PTS system D-glucose-specific IIA component (Glc family) /PTS system D-glucose-specific IIB component (Glc family) /PTS system D-glucose-specific IIC component (Glc family)',
      entryType: 'UniRef100',
      memberCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        organismName: 'Planococcus citreus',
        sequence: { length: 686 },
      },
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A497YPU5'],
      organisms: [{ scientificName: 'Planococcus citreus', taxonId: 1373 }],
    },
  ],
};

export default mock;
