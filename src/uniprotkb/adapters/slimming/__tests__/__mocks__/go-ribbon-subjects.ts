import { AGRRibbonSubject } from '../../GORibbonHandler';

const goRibbonSubjects: AGRRibbonSubject[] = [
  {
    id: 'P05067',
    nb_classes: 169,
    nb_annotations: 442,
    label: 'TP53',
    taxon_id: 'NCBITaxon:9606',
    taxon_label: 'Homo sapiens',
    groups: {
      'GO:0006508': {
        ALL: { nb_classes: 1, nb_annotations: 0, terms: ['GO:0019538'] },
      },
      'GO:0016540': {
        ALL: { nb_classes: 1, nb_annotations: 0, terms: ['GO:0019538'] },
      },
      'GO:0004252': {
        ALL: {
          nb_classes: 2,
          nb_annotations: 0,
          terms: ['GO:0003824', 'GO:0019538'],
        },
      },
      'GO:0070062': {
        ALL: { nb_classes: 1, nb_annotations: 0, terms: ['GO:0005576'] },
      },
      'GO:0008236': {
        ALL: {
          nb_classes: 2,
          nb_annotations: 0,
          terms: ['GO:0003824', 'GO:0019538'],
        },
      },
      'GO:0005886': {
        ALL: { nb_classes: 1, nb_annotations: 1, terms: ['GO:0005886'] },
      },
      'GO:0005887': {
        ALL: { nb_classes: 1, nb_annotations: 1, terms: ['GO:0005886'] },
      },
      'GO:0005576': {
        ALL: { nb_classes: 1, nb_annotations: 0, terms: ['GO:0005576'] },
      },
      'GO:0005654': {
        ALL: { nb_classes: 1, nb_annotations: 0, terms: ['GO:0005634'] },
      },
      'GO:0005044': {
        ALL: { nb_classes: 1, nb_annotations: 0, terms: ['GO:0051234'] },
      },
      'GO:0003674-other': {
        ALL: { nb_classes: 0, nb_annotations: 0, terms: [] },
      },
      'GO:0008150-other': {
        ALL: { nb_classes: 1, nb_annotations: 3, terms: ['GO:0046598'] },
      },
      'GO:0005575-other': {
        ALL: { nb_classes: 0, nb_annotations: 0, terms: [] },
      },
    },
  },
];

export default goRibbonSubjects;
