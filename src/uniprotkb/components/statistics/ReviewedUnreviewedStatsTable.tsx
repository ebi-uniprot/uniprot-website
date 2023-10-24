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
  countLabel?: string;
};

const ReviewedUnreviewedStatsTable = ({
  categoryName,
  reviewedData,
  unreviewedData,
  caption,
  reviewedCaption,
  unreviewedCaption,
  title,
  countLabel,
}: Props) => (
  <ReviewedUnreviewedTabs title={title || reviewedData[categoryName].label}>
    <StatsTable
      key="reviewed"
      category={reviewedData[categoryName]}
      caption={reviewedCaption || caption}
      countLabel={countLabel}
    />
    <StatsTable
      key="unreviewed"
      category={unreviewedData[categoryName]}
      caption={unreviewedCaption || caption}
      countLabel={countLabel}
    />
  </ReviewedUnreviewedTabs>
);

export default ReviewedUnreviewedStatsTable;
