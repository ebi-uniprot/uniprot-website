import HomePage from '../../../src/app/components/home-page/HomePage';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'UniProt' },
    {
      name: 'description',
      content:
        "UniProt is the world's leading high-quality, comprehensive and freely accessible resource of protein sequence and functional information.",
    },
  ];
}

export default function Component() {
  return <HomePage />;
}
