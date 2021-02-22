import { useMemo, FC, ReactNode } from 'react';
import { countBy, uniqBy } from 'lodash-es';
import { Facets, Facet } from 'franklin-sites';

import { EntryTypeIcon } from '../../../shared/components/entry/EntryTypeIcon';

import { EntryType } from '../../../uniprotkb/adapters/uniProtkbConverter';

import {
  UniParcXRef,
  databaseToEntryType,
} from '../../adapters/uniParcConverter';
import { FacetValue } from '../../../uniprotkb/types/responseTypes';
import { OrganismData } from '../../../uniprotkb/adapters/namesAndTaxonomyConverter';

const sortByCount = (a: FacetValue, b: FacetValue) => b.count - a.count;

type OrganismTuple = [taxon: OrganismData, count: number];

const XRefsFacets: FC<{ xrefs?: UniParcXRef[] }> = ({ xrefs }) => {
  const taxonomyFacetValues = useMemo(() => {
    const organisms = xrefs
      ?.map((xref) => xref.organism)
      .filter((organism: OrganismData | undefined): organism is OrganismData =>
        Boolean(organism)
      );
    const taxonObjects = uniqBy<OrganismData>(
      organisms,
      (organism) => organism.taxonId
    );
    const taxonCounts = countBy<OrganismData>(
      organisms,
      (organism) => organism.taxonId
    );
    return taxonObjects
      .map((taxon): OrganismTuple => [taxon, taxonCounts[taxon.taxonId]])
      .sort((tupleA, tupleB) => tupleB[1] - tupleA[1]);
  }, [xrefs]);

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
          }),
          [taxonomyFacetValues]
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
