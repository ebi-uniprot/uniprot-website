/* eslint-disable camelcase */
import { useMemo } from 'react';
import queryString from 'query-string';
import { groupBy } from 'lodash-es';

import useDataApi from '../../../shared/hooks/useDataApi';

import * as logging from '../../../shared/utils/logging';

import { TaxonomyDatum } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { UniProtKBSimplifiedTaxonomy } from '../uniProtkbConverter';
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
  id: GOTermID | 'all';
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
  [key in GOTermID | 'all' | 'all-other']?: {
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
    ({ id, label, name }) => ({
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
        // Handle the case where there is no slimmed annotation for an aspect
        ...(slimsByAspect[name] || []).map(
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
    // Add actual evidence then specific GO evidence
    count += term?.evidences?.length || 0;
    count += term?.properties?.GoEvidenceType ? 1 : 0;
  });
  return count;
};

export const getSubjects = (
  goTerms: GroupedGoTerms,
  slimmedData: GOSlimmedData,
  primaryAccession: string,
  geneNamesData?: GeneNamesData,
  organismData?: TaxonomyDatum | UniProtKBSimplifiedTaxonomy
) => {
  const goTermsFlat = Array.from(goTerms.values()).flat();

  // Save the GO IDs from entry xref data which has been slimmed to be used for making the aspect-other subject groups
  const slimmedXrefGoIDs = new Set();
  // Create a mapping from slim IDs (eg AGR) to the GO IDs from entry xref data
  const slimIdToXrefGoIds: Record<GOTermID, GOTermID[]> = {};
  slimmedData.results.forEach(({ slimsFromId, slimsToIds }) => {
    slimmedXrefGoIDs.add(slimsFromId);
    slimsToIds.forEach((slimsToId) => {
      slimIdToXrefGoIds[slimsToId] =
        slimsToId in slimIdToXrefGoIds
          ? [...slimIdToXrefGoIds[slimsToId], slimsFromId]
          : [slimsFromId];
    });
  });

  const subjectGroups: Groups = Object.fromEntries(
    Object.entries(slimIdToXrefGoIds).map(([slimId, xrefGoIds]) => [
      slimId,
      {
        ALL: {
          nb_classes: xrefGoIds.length,
          nb_annotations: countEvidences(goTermsFlat, xrefGoIds),
          terms: xrefGoIds,
        },
      },
    ])
  );

  let total_nb_classes = 0;
  let total_nb_annotations = 0;

  // Terms that have not been slimmed should map directly to aspects
  goAspects.forEach(({ id, label }) => {
    const aspectGoTerms = goTerms.get(label);
    if (!aspectGoTerms) {
      return;
    }

    // "all" for aspect
    const aspectGoIDs = aspectGoTerms.map(({ id }) => id).filter(Boolean);
    const evidenceCount = countEvidences(goTermsFlat, aspectGoIDs);
    subjectGroups[id] = {
      ALL: {
        nb_classes: aspectGoIDs.length,
        nb_annotations: evidenceCount,
        terms: aspectGoIDs,
      },
    };

    total_nb_classes += aspectGoIDs.length;
    total_nb_annotations += evidenceCount;

    // "other" for aspect
    const unslimmedGoIDs = aspectGoIDs.filter(
      (id) => !slimmedXrefGoIDs.has(id)
    );
    subjectGroups[`${id}-other`] = {
      ALL: {
        nb_classes: unslimmedGoIDs.length,
        nb_annotations: countEvidences(goTermsFlat, unslimmedGoIDs),
        terms: unslimmedGoIDs,
      },
    };
  });

  const label =
    geneNamesData?.[0].geneName?.value ||
    geneNamesData?.[0].synonyms?.[0].value ||
    geneNamesData?.[0].orderedLocusNames?.[0].value ||
    geneNamesData?.[0].orfNames?.[0].value ||
    // Can happen, but display something, otherwise it would show ":undefined"
    '<no gene name>';

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
      nb_classes: total_nb_classes,
      nb_annotations: total_nb_annotations,
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
): {
  loading: boolean;
  slimmedData?: GOSlimmedData;
  selectedSlimSet?: SlimSet;
  slimSets?: string[];
} => {
  const { data: slimSetsData, loading: loadingSlimSets } =
    useDataApi<GOSLimSets>(goTerms && SLIM_SETS_URL);

  const selectedSlimSet = slimSetsData?.goSlimSets.find(
    (slimSet) => slimSet.id === slimSetName
  );

  const slimSets = slimSetsData?.goSlimSets.map((slimSet) => slimSet.id);

  const slimmingUrl = useMemo(() => {
    const slimsToIds = selectedSlimSet?.associations
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
  }, [goTerms, selectedSlimSet]);

  const { data: slimmedData, loading: loadingSlimmedData } =
    useDataApi<GOSlimmedData>(slimmingUrl);

  return {
    loading: loadingSlimSets || loadingSlimmedData,
    slimmedData,
    selectedSlimSet,
    slimSets,
  };
};
