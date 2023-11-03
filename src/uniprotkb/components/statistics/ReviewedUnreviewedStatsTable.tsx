import ReviewedUnreviewedTabs from './ReviewedUnreviewedTabs';
import StatsTable from './StatsTable';

import { CategoryName, CategoryToStatistics } from './StatisticsPage';

type Props = {
  categoryName: CategoryName;
  reviewedData: CategoryToStatistics;
  unreviewedData: CategoryToStatistics;
  reviewedCaption?: string;
  unreviewedCaption?: string;
  title?: string;
  countLabel?: string;
  nameLabel?: string;
};

const ReviewedUnreviewedStatsTable = ({
  categoryName,
  reviewedData,
  unreviewedData,
  title,
  countLabel,
  nameLabel,
  reviewedCaption,
  unreviewedCaption,
}: Props) => (
  <ReviewedUnreviewedTabs title={title || reviewedData[categoryName].label}>
    <StatsTable
      key="reviewed"
      category={reviewedData[categoryName]}
      countLabel={countLabel}
      nameLabel={nameLabel}
      caption={reviewedCaption}
    />
    <StatsTable
      key="unreviewed"
      category={unreviewedData[categoryName]}
      countLabel={countLabel}
      nameLabel={nameLabel}
      caption={unreviewedCaption}
    />
  </ReviewedUnreviewedTabs>
);

export default ReviewedUnreviewedStatsTable;
