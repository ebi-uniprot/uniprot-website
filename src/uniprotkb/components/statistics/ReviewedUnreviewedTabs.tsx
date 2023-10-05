import { Tab, Tabs } from 'franklin-sites';

type Props = {
  title: string;
  children: [reviewed: React.ReactNode, unreviewed: React.ReactNode];
};

const ReviewedUnreviewedTabs = ({
  title,
  children: [reviewed, unreviewed],
}: Props) => (
  <>
    <h3>{title}</h3>
    <Tabs>
      <Tab title="Reviewed (Swiss-Prot)">{reviewed}</Tab>
      <Tab title="Unreviewed (TrEMBL)">{unreviewed}</Tab>
    </Tabs>
  </>
);

export default ReviewedUnreviewedTabs;
