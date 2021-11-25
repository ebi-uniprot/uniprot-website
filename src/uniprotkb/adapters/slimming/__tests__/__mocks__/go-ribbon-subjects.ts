import { AGRRibbonSubject } from '../../GORibbonHandler';

const goRibbonSubjects: AGRRibbonSubject[] = [
  {
    id: 'P05067',
    nb_classes: 11,
    nb_annotations: 12,
    label: 'TP53',
    taxon_id: 'NCBITaxon:9606',
    taxon_label: 'Homo sapiens',
    groups: {
      'GO:0019538': {
        ALL: {
          nb_classes: 4,
          nb_annotations: 4,
          terms: ['GO:0006508', 'GO:0016540', 'GO:0004252', 'GO:0008236'],
        },
      },
      'GO:0003824': {
        ALL: {
          nb_classes: 2,
          nb_annotations: 1,
          terms: ['GO:0004252', 'GO:0008236'],
        },
      },
      'GO:0005576': {
        ALL: {
          nb_classes: 2,
          nb_annotations: 3,
          terms: ['GO:0070062', 'GO:0005576'],
        },
      },
      'GO:0005886': {
        ALL: {
          nb_classes: 2,
          nb_annotations: 2,
          terms: ['GO:0005886', 'GO:0005887'],
        },
      },
      'GO:0005634': {
        ALL: {
          nb_classes: 1,
          nb_annotations: 0,
          terms: ['GO:0005654'],
        },
      },
      'GO:0051234': {
        ALL: {
          nb_classes: 1,
          nb_annotations: 0,
          terms: ['GO:0005044'],
        },
      },
      'GO:0003674': {
        ALL: {
          nb_classes: 3,
          nb_annotations: 1,
          terms: ['GO:0005044', 'GO:0004252', 'GO:0008236'],
        },
      },
      'GO:0003674-other': {
        ALL: {
          nb_classes: 0,
          nb_annotations: 0,
          terms: [],
        },
      },
      'GO:0008150': {
        ALL: {
          nb_classes: 3,
          nb_annotations: 6,
          terms: ['GO:0046598', 'GO:0016540', 'GO:0006508'],
        },
      },
      'GO:0008150-other': {
        ALL: {
          nb_classes: 1,
          nb_annotations: 3,
          terms: ['GO:0046598'],
        },
      },
      'GO:0005575': {
        ALL: {
          nb_classes: 5,
          nb_annotations: 5,
          terms: [
            'GO:0070062',
            'GO:0005576',
            'GO:0005887',
            'GO:0005654',
            'GO:0005886',
          ],
        },
      },
      'GO:0005575-other': {
        ALL: {
          nb_classes: 0,
          nb_annotations: 0,
          terms: [],
        },
      },
    },
  },
];

export default goRibbonSubjects;
