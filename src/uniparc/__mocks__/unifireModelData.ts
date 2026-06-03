import type { UniFireModel } from '../adapters/uniParcSubEntryConverter';

// unifire/run?id=UPI000002A2F6&taxId=9606
// 2026-06-03
const mock: UniFireModel = {
  accession: 'UPI0000000012:10249',
  predictions: [
    {
      evidence: ['ARBA00025415'],
      annotationType: 'comment.function',
      annotationValue:
        'Binds to the hairpin form of the viral telomeric sequence. Might direct genome encapsidation into the virus particle',
    },
    {
      evidence: ['ARBA00034738'],
      annotationType: 'comment.similarity',
      annotationValue: 'Belongs to the orthopoxvirus OPG082 family',
    },
    {
      evidence: ['ARBA00004328'],
      annotationType: 'comment.subcellular_location',
      annotationValue: 'Virion',
    },
    {
      evidence: ['ARBA00023125'],
      annotationType: 'keyword',
      annotationValue: 'DNA-binding',
    },
    {
      evidence: ['ARBA00022844'],
      annotationType: 'keyword',
      annotationValue: 'Virion',
    },
    {
      evidence: ['ARBA00034835'],
      annotationType: 'protein.recommendedName.fullName',
      annotationValue: 'Telomere-binding protein OPG082',
    },
  ],
};

export default mock;
