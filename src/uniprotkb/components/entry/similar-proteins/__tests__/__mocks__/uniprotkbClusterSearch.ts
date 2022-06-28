import { SetOptional } from 'type-fest';

import { UniProtkbAPIModel } from '../../../../../adapters/uniProtkbConverter';

const mock: {
  results: SetOptional<
    UniProtkbAPIModel,
    'annotationScore' | 'proteinExistence'
  >[];
} = {
  results: [
    {
      entryType: 'UniProtKB unreviewed (TrEMBL)',
      primaryAccession: 'A0A2J8MQ83',
      uniProtkbId: 'A0A2J8MQ83_PANTR',
      organism: {
        scientificName: 'Pan troglodytes',
        commonName: 'Chimpanzee',
        taxonId: 9598,
        evidences: [
          {
            evidenceCode: 'ECO:0000313',
            source: 'EMBL',
            id: 'PNI61672.1',
          },
          {
            evidenceCode: 'ECO:0000313',
            source: 'Proteomes',
            id: 'UP000236370',
          },
        ],
        lineage: [
          'Eukaryota',
          'Metazoa',
          'Chordata',
          'Craniata',
          'Vertebrata',
          'Euteleostomi',
          'Mammalia',
          'Eutheria',
          'Euarchontoglires',
          'Primates',
          'Haplorrhini',
          'Catarrhini',
          'Hominidae',
          'Pan',
        ],
      },
      proteinDescription: {
        recommendedName: {
          fullName: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'RuleBase',
                id: 'RU367156',
              },
            ],
            value: 'Amyloid-beta A4 protein',
          },
        },
        flag: 'Fragment',
      },
      sequence: {
        value:
          'GGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVRVSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEA',
        length: 180,
        molWeight: 20267,
        crc64: 'A6B8F24A1832A535',
        md5: 'C11FF97A3645794792E29B0831B3431E',
      },
    },
    {
      entryType: 'UniProtKB unreviewed (TrEMBL)',
      primaryAccession: 'A0A2J8UKJ9',
      uniProtkbId: 'A0A2J8UKJ9_PONAB',
      organism: {
        scientificName: 'Pongo abelii',
        commonName: 'Sumatran orangutan',
        synonyms: ['Pongo pygmaeus abelii'],
        taxonId: 9601,
        evidences: [
          {
            evidenceCode: 'ECO:0000313',
            source: 'EMBL',
            id: 'PNJ45799.1',
          },
          {
            evidenceCode: 'ECO:0000313',
            source: 'Proteomes',
            id: 'UP000236516',
          },
        ],
        lineage: [
          'Eukaryota',
          'Metazoa',
          'Chordata',
          'Craniata',
          'Vertebrata',
          'Euteleostomi',
          'Mammalia',
          'Eutheria',
          'Euarchontoglires',
          'Primates',
          'Haplorrhini',
          'Catarrhini',
          'Hominidae',
          'Pongo',
        ],
      },
      proteinDescription: {
        recommendedName: {
          fullName: {
            evidences: [
              {
                evidenceCode: 'ECO:0000256',
                source: 'RuleBase',
                id: 'RU367156',
              },
            ],
            value: 'Amyloid-beta A4 protein',
          },
        },
        flag: 'Fragment',
      },
      sequence: {
        value:
          'GGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVRVSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEA',
        length: 180,
        molWeight: 20267,
        crc64: 'A6B8F24A1832A535',
        md5: 'C11FF97A3645794792E29B0831B3431E',
      },
    },
  ],
};

export default mock;
