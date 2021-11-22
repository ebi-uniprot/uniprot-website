/* eslint-disable camelcase */
import axios from 'axios';
import { groupBy } from 'lodash-es';

import {
  GoTerm,
  GroupedGoTerms,
  GOTermID,
  GOAspectName,
  goAspects,
} from '../functionConverter';

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

export type AGRRibbonCategory = {
  // Each category represents an aspect
  description: string;
  id: GOTermID;
  label: GOAspectName;
  groups: {
    id: GOTermID;
    label: string;
    description: string;
    type: CategoryType;
  }[];
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

const getAGRSlimSet = async () => {
  const slimSets = await axios.get<GOSLimSets>(SLIM_SETS_URL);
  const agrSlimSet = slimSets.data?.goSlimSets.find(
    (slimSet) => slimSet.id === 'goslim_agr'
  );
  return agrSlimSet;
};

const slimData = async (agrSlimSet: GOTermID[], fromList: GOTermID[]) => {
  const slimmedData = await axios.get<GOSlimmedData>(SLIMMING_URL, {
    params: {
      slimsToIds: agrSlimSet.join(','),
      slimsFromIds: fromList.join(','),
      relations: 'is_a,part_of,occurs_in,regulates',
    },
  });
  return slimmedData.data;
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
        ...slimsByAspect[name].map((term) => ({
          id: term.id,
          label: term.name,
          description: '',
          type: 'Term' as CategoryType,
        })),
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
  primaryAccession: string
) => {
  const goTermsFlat = Array.from(goTerms.values()).flat();

  const subjectGroups = slimmedData.results.reduce((obj: Groups, mapping) => {
    // eslint-disable-next-line no-param-reassign
    obj[mapping.slimsFromId] = {
      ALL: {
        nb_classes: mapping.slimsToIds.length,
        nb_annotations: countEvidences(goTermsFlat, mapping.slimsToIds),
      },
    };
    return obj;
  }, {});

  // Look for unslimmed terms
  const notSlimmed: GoTerm[] = [];
  goTermsFlat.forEach((term) => {
    const found = slimmedData.results.some((slimmedDataItem) =>
      slimmedDataItem.slimsToIds.includes(term.id as GOTermID)
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
          notSlimmedByAspect[label].map(({ id }) => id) as string[]
        ),
      },
    };
  });

  return [
    {
      id: primaryAccession,
      nb_classes: 169, // TODO
      nb_annotations: 442, // TODO
      label: 'TP53', // TODO
      taxon_id: 'NCBITaxon:9606', // TODO
      taxon_label: 'Homo sapiens', // TODO
      groups: subjectGroups,
    },
  ];
};

const handleGOData = async (
  goTerms: GroupedGoTerms,
  primaryAccession: string
): Promise<AGRRibbonData | null> => {
  if (!goTerms) {
    return null;
  }

  const fromList = [...goTerms.values()].flatMap((groupedTerm) =>
    groupedTerm.map(({ id }) => id)
  ) as GOTermID[];

  const agrSlimSet = await getAGRSlimSet();
  if (!agrSlimSet) {
    return null;
  }

  const slimmedData = await slimData(
    agrSlimSet?.associations.map((association) => association.id),
    fromList
  );
  const categories = getCategories(agrSlimSet);
  const subjects = getSubjects(goTerms, slimmedData, primaryAccession);
  return { categories, subjects };
};

export default handleGOData;
