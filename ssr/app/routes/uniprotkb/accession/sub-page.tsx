import { getSubPages } from '../../../../../src/app/routes/loaders/composable-helpers';
import apiUrls from '../../../../../src/shared/config/apiUrls/apiUrls';
import { Namespace } from '../../../../../src/shared/types/namespaces';
import type { SearchResults } from '../../../../../src/shared/types/results';
import type {
  CitationsAPIModel,
  Reference,
} from '../../../../../src/supporting-data/citations/adapters/citationsConverter';
import type { UniProtkbAPIModel } from '../../../../../src/uniprotkb/adapters/uniProtkbConverter';
import UniProtKBEntryPage from '../../../../../src/uniprotkb/components/entry/Entry';
import uniprotkbApiUrls from '../../../../../src/uniprotkb/config/apiUrls/apiUrls';
import { TabLocation } from '../../../../../src/uniprotkb/types/entry';
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

const uniprotkbSubPages = getSubPages(
  new Set(Object.values(TabLocation)),
  TabLocation.Entry,
  new Map([
    ['protvista', TabLocation.FeatureViewer],
    ['features-viewer', TabLocation.FeatureViewer],
    ['variants-viewer', TabLocation.VariantViewer],
  ])
);

const getData = async (accession: string) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const request = await fetch(
    apiUrls.entry.entry(accession, Namespace.uniprotkb)!
  );
  const data: UniProtkbAPIModel = await request.json();
  return data;
};

const getImportedVariants = async (accession: string) => {
  const request = await fetch(apiUrls.proteinsApi.variation(accession), {
    method: 'HEAD',
  });
  const count = +(request.headers.get('x-feature-records') ?? 0);
  if (request.status === 200 && !Number.isNaN(count)) {
    return count;
  }
  return 0;
};

const getHasGenomicCoordinates = async (accession: string) => {
  const request = await fetch(apiUrls.proteinsApi.coordinates(accession), {
    method: 'HEAD',
  });
  return request.status === 200;
};

const getCommunityReferences = async (accession: string) => {
  const request = await fetch(
    uniprotkbApiUrls.publications.entryPublications({
      accession: accession,
      selectedFacets: [
        {
          name: 'types',
          value: '0',
        },
      ],
    })
  );
  const data: SearchResults<CitationsAPIModel> = await request.json();
  const filteredReferences = data?.results?.flatMap(({ references }) =>
    references?.filter((reference) => reference.source?.name === 'ORCID')
  );
  return filteredReferences?.filter((r): r is Reference => Boolean(r)) || [];
};

export async function loader(args: Route.LoaderArgs) {
  uniprotkbSubPages(args);

  const {
    params: { accession },
  } = args;

  const [data, importedVariants, hasGenomicCoordinates, communityReferences] =
    await Promise.all([
      getData(accession),
      getImportedVariants(accession),
      getHasGenomicCoordinates(accession),
      getCommunityReferences(accession),
    ]);

  return { data, importedVariants, hasGenomicCoordinates, communityReferences };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return <UniProtKBEntryPage {...loaderData} />;
}
