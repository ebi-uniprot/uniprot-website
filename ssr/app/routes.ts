// eslint-disable-next-line import/no-extraneous-dependencies
import { index, prefix, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('uniprotkb', [index('routes/uniprotkb/index.tsx')]),
] satisfies RouteConfig;
