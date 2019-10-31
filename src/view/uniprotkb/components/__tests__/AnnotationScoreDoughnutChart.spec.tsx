import React from 'react';
import { render } from '@testing-library/react';
import AnnotationScoreDoughnutChart, {
  annotationScoreToBin,
} from '../AnnotationScoreDoughnutChart';

describe('AnnotationScoreDoughnutChart component', () => {
  test('should render', () => {
    const { asFragment } = render(<AnnotationScoreDoughnutChart score={50} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('annotationScoreToBin function', () => {
  /*
    0-19  | bin 1
    20-39 | bin 2
    40-59 | bin 3
    60-79 | bin 4
    >=80  | bin 5
  */
  const annotationScoreToBinTestPoints = [
    // [annotation score, bin]
    [0, 1],
    [1, 1],
    [19, 1],
    [20, 2],
    [39, 2],
    [40, 3],
    [59, 3],
    [60, 4],
    [79, 4],
    [80, 5],
    [81, 5],
    [1000, 5],
  ];
  annotationScoreToBinTestPoints.forEach(([annotationScore, bin]) => {
    test(`Should convert annotationScore of ${annotationScore} to bin ${bin}`, () => {
      expect(annotationScoreToBin(annotationScore)).toEqual(bin);
    });
  });
});
