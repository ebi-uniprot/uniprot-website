import joinUrl from 'url-join';

import { stringifyUrl } from '../../shared/utils/url';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import { defaultFacets as helpDefaultFacets } from './HelpFacetConfiguration';
import { ApiDocsDefinition } from '../types/apiDocumentation';

const entry = (id?: string) => id && joinUrl(apiPrefix, 'help', id);

const search = ({
  query,
  sort,
  fields,
  queryFacets,
  facets = helpDefaultFacets,
  size,
}: Record<string, string[] | string | null>) =>
  stringifyUrl(joinUrl(apiPrefix, 'help/search'), {
    query: [
      query || '*',
      ...(Array.isArray(queryFacets)
        ? queryFacets
        : (queryFacets || '').split(',')
      )
        .filter(Boolean)
        // Sort in order to improve cache hits
        .sort()
        .map((facet) => {
          const [facetName, facetValue] = (facet || '').split(':');
          return `(${facetName}:${
            facetValue.includes(' ') ? `"${facetValue}"` : facetValue
          })`;
        }),
    ]
      .filter(Boolean)
      .join(' AND '),
    sort,
    fields,
    facets,
    size,
  });

const apiDocumnentationDefinition = (d: ApiDocsDefinition) =>
  `https://wwwdev.ebi.ac.uk/uniprot/api/${d}/api/docs`;

export default { entry, search, apiDocumnentationDefinition };
