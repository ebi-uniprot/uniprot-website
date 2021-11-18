/* eslint-disable camelcase */
import axios from 'axios';
import { groupBy } from 'lodash-es';

import { GoTerm, GroupedGoTerms } from '../functionConverter';

export const SLIM_SETS_URL =
  'https://www.ebi.ac.uk/QuickGO/services/internal/presets?fields=goSlimSets';

const SLIMMING_URL = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim';

type GOAspect =
  | 'cellular_component'
  | 'molecular_function'
  | 'biological_process';

type GOTerm = `GO:${number}${string}`;

export type SlimSet = {
  name: string;
  id: string;
  associations: {
    name: string;
    id: GOTerm;
    aspect: GOAspect;
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
    slimsFromId: GOTerm;
    slimsToIds: GOTerm[];
  }[];
};

export type AGRRibbonCategory = {
  // Each category represents an aspect
  description: string;
  id: GOTerm;
  label: GOAspect;
  groups: {
    id: GOTerm;
    label: string;
    description: string;
    type: 'All' | 'Term' | 'Other';
  }[];
};

type Groups = {
  [key: GOTerm]: {
    [key: string]: {
      // This is the evidence tag
      terms?: GOTerm[];
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

const slimData = async (agrSlimSet: GOTerm[], fromList: GOTerm[]) => {
  // TODO handle pagination
  const slimmedData = await axios.get<GOSlimmedData>(SLIMMING_URL, {
    params: {
      slimsToIds: agrSlimSet?.join(','),
      slimsFromIds: fromList.join(','),
      relations: 'is_a,part_of,occurs_in,regulates',
    },
  });
  return slimmedData.data;
};

export const getCategories = (slimSet: SlimSet): AGRRibbonCategory[] => {
  // Aspects at the top
  const slimsByAspect = groupBy(slimSet.associations, 'aspect');
  // TODO remove the 3 aspects from slim set

  // Convert to object
  const categoriesObj: AGRRibbonCategory[] = Object.keys(slimsByAspect).map(
    (aspectName) => ({
      id: 'GO:1234', // TODO get aspect id and description from...somewhere?!?
      description: '',
      label: aspectName as GOAspect,
      groups: slimsByAspect[aspectName].map((term) => ({
        id: term.id,
        label: term.name,
        description: '',
        type: 'Term',
      })),
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
  // TODO handle go terms which haven't been slimmed, guess they go under "All"??
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
  ) as GOTerm[];

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
