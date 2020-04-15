import {
  calculatePredictionScoreAvg,
  getFilteredVariants,
  colorConfig,
} from '../variationFilters';
import FeatureType from '../../../../../model/types/FeatureType';

const transformedVariantPositions = [
  {
    variants: [
      {
        accession: 'A',
        begin: 1,
        end: 1,
        start: '1',
        tooltipContent: '',
        sourceType: 'source',
        variant: 'V',
        protvistaFeatureId: 'id1',
        xrefNames: [],
        type: FeatureType[FeatureType.VARIANT],
        wildType: 'A',
        alternativeSequence: 'V',
        consequenceType: 'disease',
        clinicalSignificances: 'disease',
        xrefs: [],
      },
      {
        accession: 'B',
        begin: 1,
        end: 1,
        start: '1',
        tooltipContent: '',
        sourceType: 'source',
        variant: 'D',
        protvistaFeatureId: 'id2',
        xrefNames: [],
        type: FeatureType[FeatureType.VARIANT],
        wildType: 'A',
        alternativeSequence: 'D',
        consequenceType: 'disease',
        clinicalSignificances: 'benign',
        xrefs: [],
      },
    ],
  },
  {
    variants: [
      {
        accession: 'C',
        begin: 2,
        end: 2,
        start: '2',
        tooltipContent: '',
        sourceType: 'source',
        variant: 'V',
        protvistaFeatureId: 'id1',
        xrefNames: [],
        type: FeatureType[FeatureType.VARIANT],
        wildType: 'A',
        alternativeSequence: 'V',
        consequenceType: 'disease',
        clinicalSignificances: 'uncertain',
        xrefs: [],
      },
    ],
  },
  {
    variants: [
      {
        accession: 'D',
        begin: 3,
        end: 3,
        start: '3',
        tooltipContent: '',
        sourceType: 'source',
        variant: 'V',
        protvistaFeatureId: 'id1',
        xrefNames: [],
        type: FeatureType[FeatureType.VARIANT],
        wildType: 'A',
        alternativeSequence: 'V',
        consequenceType: 'disease',
        siftScore: 0.5,
        xrefs: [],
      },
    ],
  },
];

describe('Variation filter config', () => {
  test('it should calculate the average score', () => {
    expect(calculatePredictionScoreAvg(1, 0.01)).toEqual(0.995);
  });

  test('it should calculate the average score with no sift score', () => {
    expect(calculatePredictionScoreAvg(null, 0.01)).toEqual(0.99);
  });

  test('it should calculate the average score with no polyphen score', () => {
    expect(calculatePredictionScoreAvg(0.9, null)).toEqual(0.9);
  });

  test('it should filter according to the callback function', () => {
    const filteredVariants = getFilteredVariants(
      transformedVariantPositions,
      (variant) => variant.accession === 'A'
    );
    expect(filteredVariants).toEqual([
      {
        variants: [transformedVariantPositions[0].variants[0]],
      },
      {
        variants: [],
      },
      {
        variants: [],
      },
    ]);
  });

  test('it should get the right colour for disease', () => {
    const firstVariant = colorConfig(
      transformedVariantPositions[0].variants[0]
    );
    expect(firstVariant).toEqual('#990000');
  });

  test('it should get the right colour for non disease', () => {
    const secondVariant = colorConfig(
      transformedVariantPositions[0].variants[1]
    );
    expect(secondVariant).toEqual('#99cc00');
  });

  test('it should get the right colour for other', () => {
    const thirdVariant = colorConfig(
      transformedVariantPositions[1].variants[0]
    );
    expect(thirdVariant).toEqual('#009e73');
  });

  test('it should get the right colour for predicted', () => {
    const thirdVariant = colorConfig(
      transformedVariantPositions[2].variants[0]
    );
    expect(thirdVariant).toEqual('rgb(72, 132, 202)');
  });
});
