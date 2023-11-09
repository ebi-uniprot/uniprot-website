import { Tab, Tabs } from 'franklin-sites';

import { ReviewedLabel, UnreviewedLabel } from './UniProtKBLabels';

type Props = {
  title?: string;
  children: [reviewed: React.ReactNode, unreviewed: React.ReactNode];
};

const ReviewedUnreviewedTabs = ({
  title,
  children: [reviewed, unreviewed],
}: Props) => (
  <>
    {title && <h3>{title}</h3>}
    <Tabs>
      <Tab cache title={<ReviewedLabel />}>
        {reviewed}
      </Tab>
      <Tab cache title={<UnreviewedLabel />}>
        {unreviewed}
      </Tab>
    </Tabs>
  </>
);

export default ReviewedUnreviewedTabs;
