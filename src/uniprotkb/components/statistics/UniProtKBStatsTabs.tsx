import { Tab, Tabs } from 'franklin-sites';

import { ReviewedLabel, UnreviewedLabel } from './UniProtKBLabels';

type Props = {
  title?: string;
  children: [
    uniprotkb: React.ReactNode,
    reviewed: React.ReactNode,
    unreviewed: React.ReactNode,
  ];
};

const UniProtKBStatsTabs = ({
  title,
  children: [uniprotkb, reviewed, unreviewed],
}: Props) => (
  <>
    {title && <h3>{title}</h3>}
    <Tabs bordered>
      <Tab title="UniProtKB">{uniprotkb}</Tab>
      <Tab title={<ReviewedLabel />}>{reviewed}</Tab>
      <Tab title={<UnreviewedLabel />}>{unreviewed}</Tab>
    </Tabs>
  </>
);

export default UniProtKBStatsTabs;
