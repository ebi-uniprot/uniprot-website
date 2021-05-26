import { DiseaseComment } from '../../../../types/commentTypes';

const mock: DiseaseComment[] = [
  {
    commentType: 'DISEASE',
    disease: {
      diseaseId: 'Alzheimers',
      diseaseAccession: 'ASDASDAS',
      acronym: 'AD',
      description: 'Some description',
      diseaseCrossReference: {
        database: 'EMBL',
        id: 'some ref id',
        properties: {
          prop1: 'value1',
        },
        isoformId: 'some isoform',
      },
      evidences: [],
    },
    note: {
      texts: [
        {
          value: 'Some disease note',
        },
      ],
    },
  },
];

export default mock;
