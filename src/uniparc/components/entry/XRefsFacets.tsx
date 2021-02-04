import { useMemo, FC, ReactNode } from 'react';
import { countBy } from 'lodash-es';
import { Facets, Facet } from 'franklin-sites';

import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';

import { getAPIQueryUrl } from '../../../shared/config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../../shared/types/namespaces';

import {
  UniParcXRef,
  databaseToEntryType,
} from '../../adapters/uniParcConverter';
import { FacetValue } from '../../../uniprotkb/types/responseTypes';
import { Taxonomy } from '../../../proteomes/adapters/proteomesConverter';

// Max number of items that we can ask the API for in one request
const ITEMS_DISPLAYED = 5;
const MAX_API_SIZE = 500;

const sortByCount = (a: FacetValue, b: FacetValue) => b.count - a.count;

const XRefsFacets: FC<{ xrefs?: UniParcXRef[] }> = ({ xrefs }) => {
  const [taxonomyFacetValues, priorityURL, extraURL] = useMemo(() => {
    const facetValues = Object.entries(
      countBy(
        xrefs,
        (xref) =>
          xref.properties?.find(
            (property) => property.key === 'NCBI_taxonomy_id'
          )?.value
      )
    )
      .filter(([value]) => value !== 'undefined')
      .map(([value, count]) => ({ value, count }))
      .sort(sortByCount)
      .slice(0, MAX_API_SIZE + ITEMS_DISPLAYED);

    const mapper = ({ value }: FacetValue) => `(id:${value})`;

    const priorityBatch = facetValues.slice(0, ITEMS_DISPLAYED);
    const priorityURL = priorityBatch.length
      ? getAPIQueryUrl({
          namespace: Namespace.taxonomy,
          query: priorityBatch.map(mapper).sort().join(' OR '),
          size: priorityBatch.length,
        })
      : undefined;

    const extraBatch = facetValues.slice(
      ITEMS_DISPLAYED,
      MAX_API_SIZE + ITEMS_DISPLAYED
    );
    const extraURL = extraBatch.length
      ? getAPIQueryUrl({
          namespace: Namespace.taxonomy,
          query: extraBatch.map(mapper).sort().join(' OR '),
          size: extraBatch.length,
        })
      : undefined;
    return [facetValues, priorityURL, extraURL];
  }, [xrefs]);

  const priorityData = useDataApi<{ results: Taxonomy[] }>(priorityURL);
  // wait for the priority to have finished before loading the rest
  const extraData = useDataApi<{ results: Taxonomy[] }>(
    priorityData.loading ? undefined : extraURL
  );

  const taxonomyMap = useMemo(
    () =>
      new Map(
        [
          ...(priorityData.data?.results || []),
          ...(extraData.data?.results || []),
        ].map((taxon) => [`${taxon.taxonId}`, taxon])
      ),
    [priorityData.data, extraData.data]
  );
  return (
    <Facets>
      <Facet
        data={useMemo(
          () => ({
            label: 'Status',
            name: 'active',
            values: Object.entries(countBy(xrefs, (xref) => xref.active))
              .map(([value, count]) => ({
                label: value === 'true' ? 'Active' : 'Inactive',
                value,
                count,
              }))
              .sort(sortByCount),
          }),
          [xrefs]
        )}
      />
      <Facet
        data={useMemo(
          () => ({
            label: 'Organisms',
            name: 'organisms',
            values: taxonomyFacetValues.map(({ value, count }) => {
              const taxon = taxonomyMap.get(value);
              return {
                label: taxon ? (
                  <span
                    title={`${taxon.commonName ? `${taxon.commonName}, ` : ''}${
                      taxon.scientificName
                    }, taxon ID ${value}`}
                  >
                    {taxon.commonName || taxon.scientificName}
                  </span>
                ) : (
                  value
                ),
                value,
                count,
              };
            }),
          }),
          [taxonomyFacetValues, taxonomyMap]
        )}
      />
      <Facet
        data={useMemo(
          () => ({
            label: 'Databases',
            name: 'databases',
            values: Object.entries(countBy(xrefs, (xref) => xref.database))
              .map(([value, count]) => {
                let label: ReactNode = value;
                const entryType = databaseToEntryType[value];
                if (entryType === EntryType.REVIEWED) {
                  label = (
                    <>
                      <EntryTypeIcon entryType={entryType} />
                      UniProtKB reviewed
                    </>
                  );
                }
                if (entryType === EntryType.UNREVIEWED) {
                  label = (
                    <>
                      <EntryTypeIcon entryType={entryType} />
                      UniProtKB unreviewed
                    </>
                  );
                }
                return {
                  label,
                  value,
                  count,
                };
              })
              .sort(sortByCount),
          }),
          [xrefs]
        )}
      />
    </Facets>
  );
};

export default XRefsFacets;
