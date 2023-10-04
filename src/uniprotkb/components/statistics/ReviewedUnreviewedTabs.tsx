import { Tab, Tabs } from 'franklin-sites';

type Props = {
  children: [reviewed: React.ReactNode, unreviewed: React.ReactNode];
};

const ReviewedUnreviewedTabs = ({
  children: [reviewed, unreviewed],
}: Props) => (
  <Tabs>
    <Tab title="Reviewed (Swiss-Prot)">{reviewed}</Tab>
    <Tab title="Unreviewed (TrEMBL)">{unreviewed}</Tab>
  </Tabs>
);

export default ReviewedUnreviewedTabs;
