import { redirect } from 'react-router';

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
import type { FreeTextComment } from '../../../../../src/uniprotkb/types/commentTypes';
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
  const response = await fetch(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    apiUrls.entry.entry(accession, Namespace.uniprotkb)!
  );
  const data: UniProtkbAPIModel = await response.json();
  return data;
};

const getImportedVariants = async (accession: string) => {
  const response = await fetch(apiUrls.proteinsApi.variation(accession), {
    method: 'HEAD',
  });
  const count = +(response.headers.get('x-feature-records') ?? 0);
  if (response.status === 200 && !Number.isNaN(count)) {
    return count;
  }
  return 0;
};

const getHasGenomicCoordinates = async (accession: string) => {
  const response = await fetch(apiUrls.proteinsApi.coordinates(accession), {
    method: 'HEAD',
  });
  return response.status === 200;
};

const getCommunityReferences = async (accession: string) => {
  const response = await fetch(
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
  const data: SearchResults<CitationsAPIModel> = await response.json();
  const filteredReferences = data?.results?.flatMap(({ references }) =>
    references?.filter((reference) => reference.source?.name === 'ORCID')
  );
  return filteredReferences?.filter((r): r is Reference => Boolean(r)) || [];
};

const getAISummary = async (accession: string) => {
  try {
    const response = await fetch(
      `https://wwwdev.ebi.ac.uk/uniprot/api/lmic/${accession.slice(-2)}/${accession}.dat`
    );
    const text = await response.text();
    const comments: FreeTextComment[] = text
      .split(/\s*\n\s*/)
      .map((paragraph) => ({
        commentType: 'FUNCTION',
        texts: [{ value: paragraph }],
      }));
    return comments;
  } catch {
    return undefined;
  }
};

const redirectSummaryEntry = (request: Request, subPage: string) => {
  if (subPage !== TabLocation.Entry && subPage !== TabLocation.Summary) {
    return;
  }
  const { search } = new URL(request.url);

  const saveData = request.headers.get('Save-Data');
  const downlink = +(request.headers.get('Downlink') || 0);
  const deviceMemory = +(request.headers.get('Device-Memory') || 0);
  const RTT = +(request.headers.get('RTT') || 0); // Round-trip time
  const ECT = request.headers.get('ECT'); // Effective connection type
  console.log(
    `Save-Data: ${saveData}; Downlink: ${downlink}MB/s; Device-Memory: ${deviceMemory}MB; RTT: ${RTT}ms; ECT: ${ECT}`
  );

  const sp = new URLSearchParams(search);
  if (sp.has('force')) {
    return;
  }

  const shouldGoToSummary =
    saveData === 'on' ||
    downlink < 1 ||
    deviceMemory < 4 ||
    RTT > 300 ||
    ECT === 'slow-2g' ||
    ECT === '2g' ||
    ECT === '3g';

  if (shouldGoToSummary && subPage === TabLocation.Entry) {
    throw redirect(`../${TabLocation.Summary}`);
  } else if (!shouldGoToSummary && subPage === TabLocation.Summary) {
    throw redirect(`../${TabLocation.Entry}`);
  }
};

export async function loader(args: Route.LoaderArgs) {
  uniprotkbSubPages(args);

  redirectSummaryEntry(args.request, args.params.subPage);

  const {
    params: { accession },
  } = args;

  const [
    data,
    importedVariants,
    hasGenomicCoordinates,
    communityReferences,
    aiSummary,
  ] = await Promise.all([
    getData(accession),
    getImportedVariants(accession),
    getHasGenomicCoordinates(accession),
    getCommunityReferences(accession),
    getAISummary(accession),
  ]);

  return {
    data,
    importedVariants,
    hasGenomicCoordinates,
    communityReferences,
    aiSummary,
  };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return <UniProtKBEntryPage {...loaderData} />;
}
