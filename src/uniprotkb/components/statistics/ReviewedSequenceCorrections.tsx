import { LongNumber } from 'franklin-sites';
import { CategoryToStatistics } from './StatisticsPage';
import { getSequenceCorrections } from './utils';

type Props = {
  data: CategoryToStatistics;
};

const ReviewedSequenceCorrections = ({ data }: Props) => {
  const corrections = getSequenceCorrections(data);
  return (
    <>
      {!!corrections && (
        <>
          <h3>Sequence corrections</h3>
          Number of Reviewed (Swiss-Prot) entries with at least one sequence
          correction: <LongNumber>{corrections.count}</LongNumber>
        </>
      )}
    </>
  );
};

export default ReviewedSequenceCorrections;
