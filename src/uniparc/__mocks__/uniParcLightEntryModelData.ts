import { UniParcLiteAPIModel } from '../adapters/uniParcConverter';

// Manually update it. As some fields like molWeight, md5 are not available as return fields
// uniparc/UPI0000000001/light?fields=gene,organism,protein,proteome,common_taxons,checksum,length,sequence,accession,cdd,Gene3D,HAMAP,PANTHER,pfam,PIRSF,PRINTS,PROSITE,SFLD,SMART,SUPFAM,NCBIfam
// Retrieved: 2024-11-26
const mock: UniParcLiteAPIModel = {
  uniParcId: 'UPI0000000001',
  crossReferenceCount: 55,
  commonTaxons: [
    {
      topLevel: 'other entries',
      commonTaxon: 'synthetic construct',
      commonTaxonId: 32630,
    },
    {
      topLevel: 'cellular organisms',
      commonTaxon: 'Homo sapiens',
      commonTaxonId: 9606,
    },
    {
      topLevel: 'Viruses',
      commonTaxon: 'Orthopoxvirus',
      commonTaxonId: 10242,
    },
  ],
  uniProtKBAccessions: [
    'P07612.1',
    'Q71TT2',
    'P07612',
    'Q76QK2',
    'Q76ZT7.1',
    'Q0GNZ6',
    'A0A2I2MDI1',
    'Q6RZL4',
    'G0XTE8',
    'A0A7I8V511.1',
  ],
  sequence: {
    value:
      'MGAAASIQTTVNTLSERISSKLEQEANASAQTKCDIEIGNFYIRQNHGCNLTVKNMCSADADAQLDAVLSAATETYSGLTPEQKAYVPAMFTAALNIQTSVNTVVRDFENYVKQTCNSSAVVDNKLKIQNVIIDECYGAPGSPTNLEFINTGSSKGNCAIKALMQLTTKATTQIAPKQVAGTGVQFYMIVIGVIILAALFMYYAKRMLFTSTNDKIKLILANKENVHWTTYMDTFFRTSPMVIATTDMQN',
    length: 250,
    molWeight: 27279,
    crc64: '28FE89850863372D',
    md5: 'EF8A186543FE2E2243B5F2C571E8CE69',
  },
  sequenceFeatures: [
    {
      interproGroup: {
        id: 'IPR003472',
        name: 'Virion membrane protein, poxvirus L1-related',
      },
      database: 'Pfam',
      databaseId: 'PF02442',
      locations: [
        {
          start: 1,
          end: 200,
        },
      ],
    },
  ],
  oldestCrossRefCreated: '1988-11-01',
  mostRecentCrossRefUpdated: '2024-11-27',
  organisms: [
    {
      scientificName: 'Vaccinia virus (strain Western Reserve)',
      commonName: 'VACV',
      taxonId: 10254,
    },
    {
      scientificName: 'Rabbitpox virus (strain Utrecht)',
      commonName: 'RPV',
      taxonId: 45417,
    },
    {
      scientificName: 'Cowpox virus (strain GRI-90 / Grishak)',
      commonName: 'CPV',
      taxonId: 265871,
    },
    {
      scientificName: 'Vaccinia virus',
      taxonId: 10245,
    },
    {
      scientificName: 'Horsepox virus',
      commonName: 'HSPV',
      taxonId: 397342,
    },
    {
      scientificName: 'Cowpox virus',
      commonName: 'CPV',
      taxonId: 10243,
    },
    {
      scientificName: 'Homo sapiens',
      commonName: 'Human',
      taxonId: 9606,
    },
    {
      scientificName: 'Rabbitpox virus',
      taxonId: 32606,
    },
    {
      scientificName: 'synthetic construct',
      taxonId: 32630,
    },
  ],
  proteinNames: [
    'Entry-fusion complex associated protein OPG095',
    'RPXV077',
    'N1R protein',
    'L1R',
    'HSPV089',
    'IMV membrane protein',
    'Polyprotein',
    'IMV membrane protein L1R',
    'Myristylated MP IMV',
    'Neutralizing antibody IMV membrane protein target',
    'Neutralizing antibody MV membrane protein',
    'F2 polypeptide',
    'Protein L1',
    'Uncharacterized protein',
    'Hypothetical protein',
  ],
  geneNames: [
    'OPG099',
    'RPXV077',
    'N1R',
    'L1R',
    'HSPV_VK05_RKI-089',
    'CPXV_FIN2000_MAN_093',
    'VACV VK01 RKI-115 CDS',
    'OPG095',
    'OCZ32_gp108',
    'VACWR088',
    'VACV_TT8_108',
    'VACV_TT12_108',
    'VAC_TKT3_078',
    'VAC_TKT4_078',
    'VACV_IOC_B141_114',
    'VACV_IOC_B388_114',
    'LIVPclone14_096',
    'VACV_VK01_RKI-115',
    'VACV_VK02_RKI-092',
    'VACV_VK08_RKI-108',
    'VACV_VK12_RKI-121',
    'VACV_MFDV-1902_109',
  ],
  proteomes: [
    {
      id: 'UP000000344',
      component: 'Genome',
    },
    {
      id: 'UP000137384',
      component: 'Segment',
    },
    {
      id: 'UP000166173',
      component: 'Segment',
    },
    {
      id: 'UP000111173',
      component: 'Genome',
    },
    {
      id: 'UP000113999',
      component: 'Genome',
    },
    {
      id: 'UP000181229',
      component: 'Genome',
    },
    {
      id: 'UP000181062',
      component: 'Genome',
    },
    {
      id: 'UP000181110',
      component: 'Genome',
    },
    {
      id: 'UP000153808',
      component: 'Genome',
    },
    {
      id: 'UP000097422',
      component: 'Genome',
    },
    {
      id: 'UP000181484',
      component: 'Genome',
    },
    {
      id: 'UP000831909',
      component: 'Genome',
    },
    {
      id: 'UP000831853',
      component: 'Genome',
    },
    {
      id: 'UP000274976',
      component: 'Genome',
    },
    {
      id: 'UP000315999',
      component: 'Genome',
    },
    {
      id: 'UP000501395',
      component: 'Genome',
    },
    {
      id: 'UP000830577',
      component: 'Genome',
    },
    {
      id: 'UP000830584',
      component: 'Genome',
    },
    {
      id: 'UP000830110',
      component: 'Genome',
    },
    {
      id: 'UP000830598',
      component: 'Genome',
    },
    {
      id: 'UP000830701',
      component: 'Genome',
    },
    {
      id: 'UP000829986',
      component: 'Genome',
    },
  ],
};

export default mock;
