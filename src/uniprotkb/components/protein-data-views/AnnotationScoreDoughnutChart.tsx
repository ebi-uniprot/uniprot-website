import { DoughnutChart } from 'franklin-sites';

type DoughnutChartSize = 'small' | 'medium' | 'large';

export type AnnotationScoreValue = 1 | 2 | 3 | 4 | 5;

type AnnotationScoreDoughnutChartProps = {
  score: AnnotationScoreValue;
  size?: DoughnutChartSize;
};

const AnnotationScoreDoughnutChart = ({
  score,
  size = 'medium',
}: AnnotationScoreDoughnutChartProps) => (
  <span title="Annotation Score">
    <strong>Annotation score:</strong>
    <DoughnutChart percent={score * 20} size={size}>
      {`${score}/5`}
    </DoughnutChart>
  </span>
);

export default AnnotationScoreDoughnutChart;
