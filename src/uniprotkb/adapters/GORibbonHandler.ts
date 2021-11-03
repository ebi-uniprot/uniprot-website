/* eslint-disable camelcase */
import axios from 'axios';
import { GroupedGoTerms } from './functionConverter';

const SLIM_SETS_URL =
  'https://www.ebi.ac.uk/QuickGO/services/internal/presets?fields=goSlimSets';

const SLIMMING_URL = 'https://www.ebi.ac.uk/QuickGO/services/ontology/go/slim';

type GOAspect =
  | 'cellular_component'
  | 'molecular_function'
  | 'biological_process';

type GOSLimSets = {
  goSlimSets: {
    name: string;
    id: string;
    associations: {
      name: string;
      id: `GO:${number}`;
      aspect: GOAspect;
    }[];
  }[];
};

type GOSlimmedData = {
  numberOfHits: number;
  pageInfo?: string;
  results: {
    slimsFromId: `GO:${number}`;
    slimsToIds: `GO:${number}`[];
  }[];
};

type AGRRibbonData = {
  categories: {
    description: string;
    id: `GO:${number}`;
    label: GOAspect;
    groups: {
      id: `GO:${number}`;
      label: string;
      description: string;
      type: string;
    }[];
  }[];
  subjects: {
    id: string;
    nb_classes: number; // n of children
    nb_annotations: number; // n of evidences
    label: string;
    taxon_id: string;
    taxon_label: string;
    groups: {
      [key: `GO:${number}`]: {
        [key: string]: {
          nb_classes: number;
          nb_annotations: number;
        };
      };
    };
  }[];
};

const getAGRSlimSet = async () => {
  const slimSets = await axios.get<GOSLimSets>(SLIM_SETS_URL);
  const agrSlimSet = slimSets.data?.goSlimSets.find(
    (slimSet) => slimSet.id === 'goslim_agr'
  );
  return agrSlimSet?.associations.map((association) => association.id);
};

const slimData = async (
  agrSlimSet: `GO:${number}`[],
  fromList: `GO:${number}`[]
) => {
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

const slimDataToAGRRibbon = (data: GOSlimmedData): AGRRibbonData => {};

const handleGOData = async (goTerms?: GroupedGoTerms) => {
  if (!goTerms) {
    return;
  }

  const fromList = Array.from(goTerms.values()).flatMap((goTerm) =>
    goTerm.map((term) => term.id)
  ) as `GO:${number}`[];

  const agrSlimSet = await getAGRSlimSet();
  if (!agrSlimSet) {
    return;
  }
  const slimmedData = await slimData(agrSlimSet, fromList);
  const ribbonData = slimDataToAGRRibbon(slimmedData);
  return ribbonData;
};

export default handleGOData;
