import { SingleColumnLayout } from '../../../../src/shared/components/layouts/SingleColumnLayout';
import GenericResultsPage from '../../../../src/shared/components/results/Results';
import UniProtKBLandingPage from '../../../../src/uniprotkb/components/landing-page/LandingPage';
import { isLandingPageLoader } from '../_utils/result-or-landing';
import type { Route } from './+types/index';

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

export function loader({ request }: Route.LoaderArgs) {
  const [isLandingPage] = isLandingPageLoader(request);
  return isLandingPage;
}

export default function Component({
  loaderData: isLandingPage,
}: Route.ComponentProps) {
  if (isLandingPage) {
    return (
      <SingleColumnLayout>
        <UniProtKBLandingPage />
      </SingleColumnLayout>
    );
  }
  return <GenericResultsPage />;
}
