import { useMemo, FC, ReactNode } from 'react';
import { countBy, uniqBy } from 'lodash-es';
import { Facets, Loader } from 'franklin-sites';

import EntryTypeIcon, {
  EntryType,
} from '../../../shared/components/entry/EntryTypeIcon';

import {
  databaseToEntryType,
  UniParcAPIModel,
  UniParcXRef,
  XRefsInternalDatabases,
  XRefsInternalDatabasesEnum,
} from '../../adapters/uniParcConverter';
import { UseDataAPIWithStaleState } from '../../../shared/hooks/useDataApiWithStale';
import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { FacetObject, FacetValue } from '../../../shared/types/results';

import helper from '../../../shared/styles/helper.module.scss';

const exceptions = new Set<string | XRefsInternalDatabases>([
  XRefsInternalDatabasesEnum.REVIEWED,
  XRefsInternalDatabasesEnum.UNREVIEWED,
]);

const sortByCount = (a: FacetValue<ReactNode>, b: FacetValue<ReactNode>) => {
  if (exceptions.has(a.value) && exceptions.has(b.value)) {
    return a.value === XRefsInternalDatabasesEnum.REVIEWED ? -1 : 1;
  }
  if (exceptions.has(a.value)) {
    return -1;
  }
  if (exceptions.has(b.value)) {
    return 1;
  }
  return b.count - a.count;
};

type OrganismTuple = [taxon: TaxonomyDatum, count: number];

const xrefsToFacets = (xrefs?: UniParcXRef[]): FacetObject<ReactNode>[] => {
  if (!xrefs?.length) {
    return [];
  }
  const organisms = xrefs
    .map((xref) => xref.organism)
    .filter((organism: TaxonomyDatum | undefined): organism is TaxonomyDatum =>
      Boolean(organism)
    );
  const taxonObjects = uniqBy<TaxonomyDatum>(
    organisms,
    (organism) => organism.taxonId
  );
  const taxonCounts = countBy<TaxonomyDatum>(
    organisms,
    (organism) => organism.taxonId
  );
  const taxonomyFacetValues = taxonObjects
    .map((taxon): OrganismTuple => [taxon, taxonCounts[taxon.taxonId]])
    .sort(([, countA], [, countB]) => countB - countA);

  return [
    // Status facet
    {
      label: 'Status',
      name: 'active', // needs to match the accepted field in the API
      values: Object.entries(countBy(xrefs, (xref) => xref.active))
        .map(([value, count]) => ({
          label: value === 'true' ? 'Active' : 'Inactive',
          value,
          count,
        }))
        .sort(sortByCount),
      allowMultipleSelection: false,
    },
    // Organisms facet
    {
      label: 'Organisms',
      name: 'taxonIds', // needs to match the accepted field in the API
      values: taxonomyFacetValues.map(([taxon, count]) => {
        let title = `taxon ID ${taxon.taxonId}`;
        if (taxon?.commonName || taxon?.scientificName) {
          title = `${taxon.commonName ? `${taxon.commonName}, ` : ''}${
            taxon.scientificName
          }, ${title}`;
        }
        return {
          label: (
            <span title={title}>
              {taxon.commonName || taxon.scientificName || taxon.taxonId}
            </span>
          ),
          value: `${taxon.taxonId}`,
          count,
        };
      }),
      allowMultipleSelection: false,
    },
    {
      label: 'Databases',
      name: 'dbTypes',
      values: Object.entries(countBy(xrefs, (xref) => xref.database))
        .map(([value, count]) => {
          let label: ReactNode = value;
          const entryType = databaseToEntryType.get(value);
          if (entryType === EntryType.REVIEWED) {
            label = (
              <>
                <EntryTypeIcon entryType={entryType} />
                UniProtKB reviewed
                {value.includes('isoforms') ? ' protein isoforms' : ''}
              </>
            );
          } else if (entryType === EntryType.UNREVIEWED) {
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
      allowMultipleSelection: false,
    },
  ];
};

const XRefsFacets: FC<{
  xrefs?: UseDataAPIWithStaleState<UniParcAPIModel>;
}> = ({ xrefs }) => {
  const facets = useMemo(
    () => xrefsToFacets(xrefs?.data?.uniParcCrossReferences),
    [xrefs]
  );

  if (xrefs?.loading && !xrefs.isStale) {
    return <Loader />;
  }

  if (!xrefs?.data) {
    return null;
  }

  return (
    <Facets
      data={facets}
      className={xrefs.isStale ? helper.stale : undefined}
    />
  );
};

export default XRefsFacets;
