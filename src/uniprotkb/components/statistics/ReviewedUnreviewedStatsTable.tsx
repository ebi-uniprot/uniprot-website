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
  title?: string;
};

const ReviewedUnreviewedStatsTable = ({
  categoryName,
  reviewedData,
  unreviewedData,
  caption,
  reviewedCaption,
  unreviewedCaption,
  title,
}: Props) => (
  <ReviewedUnreviewedTabs title={title || reviewedData[categoryName].label}>
    <StatsTable
      key="reviewed"
      category={reviewedData[categoryName]}
      caption={reviewedCaption || caption}
    />
    <StatsTable
      key="unreviewed"
      category={unreviewedData[categoryName]}
      caption={unreviewedCaption || caption}
    />
  </ReviewedUnreviewedTabs>
);

export default ReviewedUnreviewedStatsTable;
