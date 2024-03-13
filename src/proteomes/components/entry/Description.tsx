import { Card } from 'franklin-sites';

import HTMLHead from '../../../shared/components/HTMLHead';

import '../styles/overview.scss';

const Description = ({ children }: { children: string }) => (
  <Card header={<h2>Description</h2>}>
    <HTMLHead>
      <meta name="description" content={children} />
    </HTMLHead>
    {children}
  </Card>
);

export default Description;
