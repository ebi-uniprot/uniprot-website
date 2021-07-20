import { RouteChildrenProps } from 'react-router-dom';

import SingleColumnLayout from '../../shared/components/layouts/SingleColumnLayout';

const HelpEntry = (props: RouteChildrenProps<{ accession: string }>) => (
  <SingleColumnLayout>
    Help entry: {props.match?.params.accession}
  </SingleColumnLayout>
);

export default HelpEntry;
