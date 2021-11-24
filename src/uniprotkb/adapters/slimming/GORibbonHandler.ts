/* eslint-disable camelcase */
import { useMemo } from 'react';
import queryString from 'query-string';
import { groupBy } from 'lodash-es';

import useDataApi from '../../../shared/hooks/useDataApi';

import * as logging from '../../../shared/utils/logging';

import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  GoTerm,
  GroupedGoTerms,
  GOTermID,
  GOAspectName,
  goAspects,
} from '../functionConverter';
import { GeneNamesData } from '../namesAndTaxonomyConverter';

export const SLIM_SETS_URL =
  'https://www.ebi.ac.uk/QuickGO/services/internal/presets?fields=goSlimSets';

const SLIMMING_URL = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim';

export type SlimSet = {
  name: string;
  id: string;
  associations: {
    name: string;
    id: GOTermID;
    aspect: GOAspectName;
    associations?: null; // WTF?
  }[];
};

type GOSLimSets = {
  goSlimSets: SlimSet[];
};

export type GOSlimmedData = {
  numberOfHits: number;
  pageInfo?: string | null; // should this be null or bug with endpoint?
  results: {
    slimsFromId: GOTermID;
    slimsToIds: GOTermID[];
  }[];
};

type CategoryType = 'All' | 'Term' | 'Other';

export type AGRRibbonGroup = {
  id: GOTermID;
  label: string;
  description: string;
  type: CategoryType;
};

export type AGRRibbonCategory = {
  // Each category represents an aspect
  description: string;
  id: GOTermID;
  label: GOAspectName;
  groups: AGRRibbonGroup[];
};

type Groups = {
  [key: GOTermID]: {
    [key: string]: {
      // This is the evidence tag
      terms?: GOTermID[];
      nb_classes: number; // Number of slimmed terms
      nb_annotations: number; // ??
    };
  };
};

export type AGRRibbonSubject = {
  id: string; // The accession
  nb_classes: number; // n of children
  nb_annotations: number; // n of evidences
  label: string; // Protein name
  taxon_id?: string;
  taxon_label?: string;
  groups: Groups;
};

export type AGRRibbonData = {
  categories: AGRRibbonCategory[];
  subjects: AGRRibbonSubject[];
};

export const getCategories = (slimSet: SlimSet): AGRRibbonCategory[] => {
  // Aspects at the top
  const slimsByAspect = groupBy(slimSet.associations, 'aspect');

  // Convert to object
  const categoriesObj: AGRRibbonCategory[] = goAspects.map(
    ({ id, label, name }): AGRRibbonCategory => ({
      id,
      description: '',
      label: name,
      groups: [
        {
          id,
          label: `All ${label}`,
          description: `Show all ${label} annotations`,
          type: 'All',
        },
        ...slimsByAspect[name].map(
          (term): AGRRibbonGroup => ({
            id: term.id,
            label: term.name,
            description: '',
            type: 'Term',
          })
        ),
        {
          id,
          label: `Other ${label}`,
          description: '',
          type: 'Other',
        },
      ],
    })
  );
  return categoriesObj;
};

const countEvidences = (terms: GoTerm[], ids: string[]) => {
  let count = 0;
  ids.forEach((id) => {
    const term = terms.find((term) => term.id === id);
    count += term?.evidences?.length || 0;
  });
  return count;
};

export const getSubjects = (
  goTerms: GroupedGoTerms,
  slimmedData: GOSlimmedData,
  primaryAccession: string,
  geneNamesData?: GeneNamesData,
  organismData?: TaxonomyDatum
) => {
  const goTermsFlat = Array.from(goTerms.values()).flat();

  const subjectGroups = slimmedData.results.reduce((obj: Groups, mapping) => {
    // eslint-disable-next-line no-param-reassign
    obj[mapping.slimsFromId] = {
      ALL: {
        nb_classes: mapping.slimsToIds.length,
        nb_annotations: countEvidences(goTermsFlat, mapping.slimsToIds),
        // TODO check if this is the right way round...
        terms: mapping.slimsToIds,
      },
    };
    return obj;
  }, {});

  // Look for unslimmed terms
  const notSlimmed: GoTerm[] = [];
  goTermsFlat.forEach((term) => {
    const found = slimmedData.results.some((slimmedDataItem) =>
      slimmedDataItem.slimsToIds.includes(term.id)
    );
    if (!found) {
      notSlimmed.push(term);
    }
  });

  // Terms that have not been slimmed should map
  // directly to aspects
  const notSlimmedByAspect = groupBy(notSlimmed, 'aspect');
  goAspects.forEach(({ id, label }) => {
    subjectGroups[`${id}-other`] = {
      ALL: {
        nb_classes: notSlimmedByAspect[label].length,
        nb_annotations: countEvidences(
          goTermsFlat,
          notSlimmedByAspect[label].map(({ id }) => id)
        ),
        // TODO check if this is the right way round...
        terms: notSlimmedByAspect[label].map(({ id }) => id),
      },
    };
  });

  // TODO
  // Iterate over aspects again and populate ALL
  // also caculate totals at the same time

  const label =
    geneNamesData?.[0].geneName?.value ||
    geneNamesData?.[0].synonyms?.[0].value ||
    '';
  if (!label) {
    logging.warn('label value unavailable for GO Ribbon');
  }

  let taxon_id: string;
  if (organismData?.taxonId) {
    taxon_id = `NCBITaxon:${organismData?.taxonId}`;
  } else {
    taxon_id = '';
    logging.warn('taxon_id value unavailable for GO Ribbon');
  }

  let taxon_label: string;
  if (organismData?.scientificName) {
    taxon_label = organismData?.scientificName;
  } else {
    taxon_label = '';
    logging.warn('taxon_label value unavailable for GO Ribbon');
  }

  return [
    {
      id: primaryAccession,
      nb_classes: 169, // TODO
      nb_annotations: 442, // TODO
      label,
      taxon_id,
      taxon_label,
      groups: subjectGroups,
    },
  ];
};

export const useGOData = (
  goTerms?: GroupedGoTerms,
  slimSetName = 'goslim_agr'
): { loading: boolean; slimmedData?: GOSlimmedData; slimSet?: SlimSet } => {
  const { data: slimSetsData, loading: loading1 } = useDataApi<GOSLimSets>(
    goTerms && SLIM_SETS_URL
  );

  const slimSet = slimSetsData?.goSlimSets.find(
    (slimSet) => slimSet.id === slimSetName
  );

  const slimmingUrl = useMemo(() => {
    const slimsToIds = slimSet?.associations
      .map((association) => association.id)
      .sort()
      .join(',');
    const slimsFromIds =
      goTerms &&
      [...goTerms.values()]
        .flatMap((groupedTerm) => groupedTerm.map(({ id }) => id))
        .sort()
        .join(',');
    return (
      slimsToIds &&
      slimsFromIds &&
      `${SLIMMING_URL}?${queryString.stringify({
        slimsToIds,
        slimsFromIds,
        relations: 'is_a,part_of,occurs_in,regulates',
      })}`
    );
  }, [goTerms, slimSet]);

  const { data: slimmedData, loading: loading2 } =
    useDataApi<GOSlimmedData>(slimmingUrl);

  return { loading: loading1 || loading2, slimmedData, slimSet };
};
