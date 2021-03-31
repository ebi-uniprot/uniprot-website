import { IDMappingFormConfig } from '../../../types/idMappingFormConfig';

const data: IDMappingFormConfig = {
  fields: [
    {
      groupName: 'UniProt',
      displayName: 'UniProtKB AC/ID',
      name: 'UniProtKB_AC-ID',
      from: true,
      to: false,
      ruleId: 1,
    },
    {
      groupName: 'UniProt',
      displayName: 'UniRef90',
      name: 'UniRef90',
      from: true,
      to: true,
      ruleId: 4,
    },
    {
      groupName: 'UniProt',
      displayName: 'Gene Name',
      name: 'Gene_Name',
      from: true,
      to: true,
      ruleId: 6,
    },
    {
      groupName: 'UniProt',
      displayName: 'UniProtKB',
      name: 'UniProtKB',
      from: false,
      to: true,
    },
  ],
  rules: [
    {
      ruleId: 1,
      tos: ['CCDS', 'PDB', 'BioGRID', 'ComplexPortal', 'DIP', 'STRING'], // And many more
      taxonId: false,
    },
    {
      ruleId: 4,
      tos: ['UniProtKB', 'UniProtKB-Swiss-Prot', 'UniRef90'],
      taxonId: false,
    },
    {
      ruleId: 6,
      tos: ['UniProtKB', 'UniProtKB-Swiss-Prot'],
      taxonId: true,
    },
  ],
};

export default data;
