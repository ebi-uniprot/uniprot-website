import { RouteChildrenProps } from 'react-router';

import HelpEntry from '../entry/Entry';

const Entry = (props: RouteChildrenProps<{ accession: string }>) => (
  <HelpEntry inPanel {...props} />
);

export default Entry;
