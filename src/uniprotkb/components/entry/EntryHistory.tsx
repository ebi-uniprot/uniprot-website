import { Card } from 'franklin-sites';

import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';

type EntryHistoryProps = {
  transformedData: UniProtkbUIModel;
};

const EntryHistoryLinks = ({ transformedData }: EntryHistoryProps) => {
  console.log(transformedData);

  return <Card header={<h2>Entry history</h2>}>Entry history</Card>;
};

export default EntryHistoryLinks;
