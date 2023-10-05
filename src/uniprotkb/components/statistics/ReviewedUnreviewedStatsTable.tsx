import ReviewedUnreviewedTabs from './ReviewedUnreviewedTabs';
import StatsTable from './StatsTable';

import { CategoryName, CategoryToStatistics } from './StatisticsPage';

type Props = {
  categoryName: CategoryName;
  reviewedData: CategoryToStatistics;
  unreviewedData: CategoryToStatistics;
  caption?: string;
};

const ReviewedUnreviewedStatsTable = ({
  categoryName,
  reviewedData,
  unreviewedData,
  caption,
}: Props) => (
  <ReviewedUnreviewedTabs title={reviewedData[categoryName].label}>
    <StatsTable category={reviewedData[categoryName]} caption={caption} />
    <StatsTable category={unreviewedData[categoryName]} caption={caption} />
  </ReviewedUnreviewedTabs>
);

export default ReviewedUnreviewedStatsTable;
