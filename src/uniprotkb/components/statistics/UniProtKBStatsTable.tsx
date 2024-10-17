import UniProtKBStatsTabs from './UniProtKBStatsTabs';
import StatsTable from './StatsTable';

import { CategoryName, CategoryToStatistics } from './StatisticsPage';

type Props = {
  categoryName: CategoryName;
  uniprotkbData: CategoryToStatistics;
  reviewedData: CategoryToStatistics;
  unreviewedData: CategoryToStatistics;
  reviewedCaption?: string;
  unreviewedCaption?: string;
  title?: string;
  countLabel?: string;
  nameLabel?: string;
  uniprotkbNumberReleaseEntries: number;
  reviewedNumberReleaseEntries: number;
  unreviewedNumberReleaseEntries: number;
};

const UniProtKBStatsTable = ({
  categoryName,
  uniprotkbData,
  reviewedData,
  unreviewedData,
  title,
  countLabel,
  nameLabel,
  reviewedCaption,
  unreviewedCaption,
  uniprotkbNumberReleaseEntries,
  reviewedNumberReleaseEntries,
  unreviewedNumberReleaseEntries,
}: Props) => (
  <UniProtKBStatsTabs title={title || reviewedData[categoryName].label}>
    <StatsTable
      key="uniprotkb"
      dataset="uniprotkb"
      category={uniprotkbData[categoryName]}
      countLabel={countLabel}
      nameLabel={nameLabel}
      caption={reviewedCaption}
      numberReleaseEntries={uniprotkbNumberReleaseEntries}
    />
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
  </UniProtKBStatsTabs>
);

export default UniProtKBStatsTable;
