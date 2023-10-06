import ReviewedUnreviewedTabs from './ReviewedUnreviewedTabs';
import StatsTable from './StatsTable';

import { CategoryName, CategoryToStatistics } from './StatisticsPage';

type Props = {
  categoryName: CategoryName;
  reviewedData: CategoryToStatistics;
  unreviewedData: CategoryToStatistics;
  caption?: string;
  reviewedCaption?: string;
  unreviewedCaption?: string;
};

const ReviewedUnreviewedStatsTable = ({
  categoryName,
  reviewedData,
  unreviewedData,
  caption,
  reviewedCaption,
  unreviewedCaption,
}: Props) => (
  <ReviewedUnreviewedTabs title={reviewedData[categoryName].label}>
    <StatsTable
      category={reviewedData[categoryName]}
      caption={reviewedCaption || caption}
    />
    <StatsTable
      category={unreviewedData[categoryName]}
      caption={unreviewedCaption || caption}
    />
  </ReviewedUnreviewedTabs>
);

export default ReviewedUnreviewedStatsTable;
