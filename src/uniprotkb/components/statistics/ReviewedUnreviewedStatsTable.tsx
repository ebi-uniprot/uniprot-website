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
  reviewedNumberReleaseEntries: number;
  unreviewedNumberReleaseEntries: number;
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
  reviewedNumberReleaseEntries,
  unreviewedNumberReleaseEntries,
}: Props) => (
  <ReviewedUnreviewedTabs title={title || reviewedData[categoryName].label}>
    <StatsTable
      key="reviewed"
      dataset="reviewed"
      category={reviewedData[categoryName]}
      countLabel={countLabel}
      nameLabel={nameLabel}
      caption={reviewedCaption}
      numberReleaseEntries={reviewedNumberReleaseEntries}
    />
    <StatsTable
      key="unreviewed"
      dataset="unreviewed"
      category={unreviewedData[categoryName]}
      countLabel={countLabel}
      nameLabel={nameLabel}
      caption={unreviewedCaption}
      numberReleaseEntries={unreviewedNumberReleaseEntries}
    />
  </ReviewedUnreviewedTabs>
);

export default ReviewedUnreviewedStatsTable;
