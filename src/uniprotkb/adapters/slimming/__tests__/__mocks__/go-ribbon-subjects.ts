import { AGRRibbonSubject } from '../../GORibbonHandler';

const goRibbonSubjects: AGRRibbonSubject[] = [
  {
    id: 'accession',
    nb_classes: 169,
    nb_annotations: 442,
    label: 'TP53',
    taxon_id: 'NCBITaxon:9606',
    taxon_label: 'Homo sapiens',
    groups: {
      'GO:0006508': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0016540': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0004252': { ALL: { nb_classes: 2, nb_annotations: 0 } },
      'GO:0070062': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0008236': { ALL: { nb_classes: 2, nb_annotations: 0 } },
      'GO:0005886': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0005887': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0005576': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0005654': { ALL: { nb_classes: 1, nb_annotations: 0 } },
      'GO:0005044': { ALL: { nb_classes: 1, nb_annotations: 0 } },
    },
  },
];

export default goRibbonSubjects;
