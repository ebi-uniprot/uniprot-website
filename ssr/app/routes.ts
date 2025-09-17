// eslint-disable-next-line import/no-extraneous-dependencies
import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('uniprotkb', [
    index('routes/uniprotkb/index.tsx'),
    route(':accession', 'routes/uniprotkb/accession.tsx', [
      index('routes/uniprotkb/accession/index.tsx'),
      route(':subPage', 'routes/uniprotkb/accession/sub-page.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
