import { FC } from 'react';
import { DoughnutChart } from 'franklin-sites';

export const annotationScoreToBin = (annotationScore: number) => {
  /*
    0-19  | bin 1
    20-39 | bin 2
    40-59 | bin 3
    60-79 | bin 4
    >=80  | bin 5
  */
  const bin = Math.floor(annotationScore / 20) + 1;
  return Math.min(bin, 5);
};

export enum DoughnutChartSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

type AnnotationScoreDoughnutChartProps = {
  score: number;
  size?: DoughnutChartSize;
};

const AnnotationScoreDoughnutChart: FC<AnnotationScoreDoughnutChartProps> = ({
  score,
  size = DoughnutChartSize.medium,
}) => {
  const annotationScoreBin = annotationScoreToBin(score);
  return (
    <span title="Annotation Score">
      <strong>Annotation score:</strong>
      <DoughnutChart percent={annotationScoreBin * 20} size={size}>
        {`${annotationScoreBin}/5`}
      </DoughnutChart>
    </span>
  );
};

export default AnnotationScoreDoughnutChart;
